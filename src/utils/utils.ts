import { Device, Offer, OfferDevice } from "../types/memory";

export const getMinMaxValues = (devices: OfferDevice[], field: keyof OfferDevice) => {
  const values = devices
    .map(device => device[field] as number)
    .filter(value => typeof value === 'number' && !isNaN(value));
  
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
};

export const getUniqueValues = (devices: OfferDevice[], field: keyof OfferDevice) => {
  const values = devices.map(device => device[field]);
  return [...new Set(values)].filter(Boolean);
};

export const getBestPrice = (device: OfferDevice) => {
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
