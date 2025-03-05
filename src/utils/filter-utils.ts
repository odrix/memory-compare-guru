import { FilterConfig, MemoryDevice, SortConfig } from "../types/memory";

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

export const filterDevices = (
  devices: MemoryDevice[],
  filters: { [key: string]: any }
) => {
  return devices.filter(device => {
    // Check all filter conditions
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
  return [...devices].sort((a, b) => {
    let valueA, valueB;
    
    if (sortConfig.field === 'price') {
      // Get best price from active offers for sorting
      valueA = getBestPrice(a) || 0;
      valueB = getBestPrice(b) || 0;
    } else if (sortConfig.field === 'euroPerGB') {
      const priceA = getBestPrice(a) || 0;
      const priceB = getBestPrice(b) || 0;
      const capacityA = a.capacityGB || 1;
      const capacityB = b.capacityGB || 1;
      
      valueA = priceA / capacityA;
      valueB = priceB / capacityB;
    } else {
      valueA = a[sortConfig.field] as any;
      valueB = b[sortConfig.field] as any;
    }
    
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
