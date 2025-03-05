
import { FilterConfig, MemoryDevice, SortConfig, Offer } from "../types/memory";

export const getMinMaxValues = (devices: MemoryDevice[], field: keyof MemoryDevice) => {
  const values = devices
    .map(device => device[field] as number)
    .filter(value => typeof value === 'number' && !isNaN(value));
  
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
};

export const getUniqueValues = (devices: MemoryDevice[], field: keyof MemoryDevice) => {
  const values = devices.map(device => device[field]);
  return [...new Set(values)].filter(Boolean);
};

export const getBestPrice = (device: MemoryDevice) => {
  if (!device.offers || device.offers.length === 0) return null;
  
  const activeOffers = device.offers.filter(offer => !offer.inactive);
  if (activeOffers.length === 0) return null;
  
  return Math.min(...activeOffers.map(offer => offer.price));
};

export const getAllActivePrices = (device: MemoryDevice) => {
  if (!device.offers || device.offers.length === 0) return [];
  return device.offers
    .filter(offer => !offer.inactive)
    .map(offer => offer.price);
};

export const getActiveOffers = (device: MemoryDevice): Offer[] => {
  if (!device.offers || device.offers.length === 0) return [];
  return device.offers.filter(offer => !offer.inactive);
};

export const filterDevices = (
  devices: MemoryDevice[],
  filters: { [key: string]: any }
) => {
  return devices.filter(device => {
    // For each device, check if it passes all the filters
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue; // Skip empty filters

      if (key === 'price') {
        const prices = getAllActivePrices(device);
        if (prices.length === 0) return false;
        
        // If any price is within range, keep the device
        const anyPriceInRange = prices.some(price => {
          if (value.min && price < value.min) return false;
          if (value.max && price > value.max) return false;
          return true;
        });
        
        if (!anyPriceInRange) return false;
      } else if (key in device) {
        const fieldValue = device[key as keyof MemoryDevice];
        
        // Handle different filter types
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          // Range filter
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        } else if (Array.isArray(value)) {
          // Multi-select filter
          if (value.length > 0 && !value.includes(fieldValue)) return false;
        } else {
          // Exact match filter
          if (fieldValue !== value) return false;
        }
      }
    }
    return true;
  });
};

export const sortDevices = (devices: MemoryDevice[], sortConfig: SortConfig) => {
  // First, create a copy of the devices array to avoid mutation
  const sortedDevices = [...devices];
  
  // For price and euroPerGB fields, we need to expand each device into its offers
  if (sortConfig.field === 'price' || sortConfig.field === 'euroPerGB') {
    return sortedDevices.sort((a, b) => {
      const offersA = getActiveOffers(a);
      const offersB = getActiveOffers(b);
      
      // Handle cases where one or both devices have no offers
      if (offersA.length === 0 && offersB.length === 0) return 0;
      if (offersA.length === 0) return sortConfig.direction === 'asc' ? -1 : 1;
      if (offersB.length === 0) return sortConfig.direction === 'asc' ? 1 : -1;
      
      // Get the best prices (or euro per GB) for comparison
      let valueA, valueB;
      
      if (sortConfig.field === 'price') {
        valueA = Math.min(...offersA.map(offer => offer.price));
        valueB = Math.min(...offersB.map(offer => offer.price));
      } else {
        // Euro per GB calculation
        const priceA = Math.min(...offersA.map(offer => offer.price));
        const priceB = Math.min(...offersB.map(offer => offer.price));
        const capacityA = a.capacityGB || 1;
        const capacityB = b.capacityGB || 1;
        
        valueA = priceA / capacityA;
        valueB = priceB / capacityB;
      }
      
      return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
  
  // For other fields, sort normally by the field value
  return sortedDevices.sort((a, b) => {
    const valueA = a[sortConfig.field] as any;
    const valueB = b[sortConfig.field] as any;
    
    // Handle undefined values
    if (valueA === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueB === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
    
    // Sort strings case-insensitive
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortConfig.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Sort numbers and other types
    return sortConfig.direction === 'asc'
      ? valueA - valueB
      : valueB - valueA;
  });
};
