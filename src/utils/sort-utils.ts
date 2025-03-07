
import { OfferDevice, SortConfig } from "../types/memory";

const applySorting = (a: any, b: any, sortConfig: SortConfig) => {
    const valueA = a[sortConfig.field];
    const valueB = b[sortConfig.field];
  
    if (valueA === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueB === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
  
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortConfig.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  
    return sortConfig.direction === 'asc'
      ? valueA - valueB
      : valueB - valueA;
  };
  
  export const sortOfferDevices = (offerDevices: OfferDevice[], sortConfig: SortConfig) => {
    const sortedOfferDevices = [...offerDevices];
    
    return sortedOfferDevices.sort((a, b) => {
      if (sortConfig.field === 'price') {
        const valueA = a.offer.price;
        const valueB = b.offer.price;
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (sortConfig.field === 'euroPerGB') {
        const valueA = a.offer.euroPerGB || 0;
        const valueB = b.offer.euroPerGB || 0;
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (sortConfig.field === 'euroPerTB') {
        // Convert euroPerGB to euroPerTB (multiply by 1024)
        const valueA = (a.offer.euroPerGB || 0) * 1024;
        const valueB = (b.offer.euroPerGB || 0) * 1024;
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (sortConfig.field === 'affiliateLink') {
        // Sort by device title for affiliate links
        const valueA = a.device.title;
        const valueB = b.device.title;
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        // Compare device properties
        const fieldName = sortConfig.field as keyof typeof a.device;
        const valueA = a.device[fieldName];
        const valueB = b.device[fieldName];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortConfig.direction === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortConfig.direction === 'asc'
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      }
    });
  };
