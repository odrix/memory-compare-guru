
import { Device, Offer, OfferDevice } from "../types/memory";

export const getMinMaxValues = (devices: OfferDevice[], field: string) => {
  const values = devices
    .map(device => {
      if (field in device.device) {
        return device.device[field as keyof typeof device.device] as number;
      } else if (field in device.offer) {
        return device.offer[field as keyof typeof device.offer] as number;
      }
      return NaN;
    })
    .filter(value => typeof value === 'number' && !isNaN(value));
  
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
};

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

export const getBestPrice = (device: Device) => {
  if (!device.offers || device.offers.length === 0) return null;
  
  const activeOffers = device.offers.filter(offer => !offer.inactive);
  if (activeOffers.length === 0) return null;
  
  return Math.min(...activeOffers.map(offer => offer.price));
};

export const getAllActivePrices = (device: Device) => {
  if (!device.offers || device.offers.length === 0) return [];
  return device.offers
    .filter(offer => !offer.inactive)
    .map(offer => offer.price);
};

export const getActiveOffers = (device: Device): Offer[] => {
  if (!device.offers || device.offers.length === 0) return [];
  return device.offers.filter(offer => !offer.inactive);
};

export const createOfferDevices = (devices: Device[]): OfferDevice[] => {
    const offerDevices: OfferDevice[] = [];
    
    devices.forEach(device => {
      const activeOffers = getActiveOffers(device);
      
      activeOffers.forEach(offer => {
        const euroPerGB = device.capacityGB ? 
          Number((offer.price / device.capacityGB).toFixed(3)) : 
          undefined;
        
        offerDevices.push({
          device,
          offer: {
            ...offer,
            euroPerGB
          }
        });
      });
    });
    
  return offerDevices;
};
