
import { OfferDevice } from "../types/memory";

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
      } else if (key === 'price') {
        const fieldValue = item.offer.price;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (typeof fieldValue !== 'number') continue;
          if (value.min && fieldValue < value.min) return false;
          if (value.max && fieldValue > value.max) return false;
        }
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
