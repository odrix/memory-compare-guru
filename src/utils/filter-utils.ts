
import { OfferDevice } from "../types/memory";

export const getUniqueValues = (devices: OfferDevice[], field: keyof OfferDevice) => {
  const values = devices.map(device => {
    if (field in device.device) {
      return device.device[field as keyof typeof device.device];
    } else if (field in device.offer) {
      return device.offer[field as keyof typeof device.offer];
    }
    return null;
  });
  return [...new Set(values)].filter(Boolean);
};

const applyFilters = (item: OfferDevice, filters: { [key: string]: any }) => {
    // For each device, check if it passes all the filters
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue; // Skip empty filters

      if (key === 'euroPerGB') {
        const fieldValue = item.offer.euroPerGB;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        }
      } else if (key === 'euroPerTB') {
        // Convert euroPerGB to euroPerTB for filtering
        const fieldValue = item.offer.euroPerGB ? item.offer.euroPerGB * 1024 : undefined;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        }
      } else if (key === 'capacityTB') {
        // Convert capacityGB to capacityTB for filtering
        const fieldValue = item.device.capacityGB / 1024;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        }
      } else if (key === 'price') {
        const fieldValue = item.offer.price;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        }
      }  else if (key === 'type') {
        return item.device.type.toLowerCase() === value.toLowerCase();
      } else if (key in item.device) {
        const fieldValue = item.device[key as keyof typeof item.device];
        
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
};

export const filterOfferDevices = (
  offerDevices: OfferDevice[],
  filters: { [key: string]: any }
) => {
  return offerDevices.filter(offerDevice => applyFilters(offerDevice, filters));
};
