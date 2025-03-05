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
        const valueA = a.price;
        const valueB = b.price;
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (sortConfig.field === 'euroPerGB') {
        const valueA = a.price / (a.capacityGB || 1);
        const valueB = b.price / (b.capacityGB || 1);
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return applySorting(a, b, sortConfig);
      }
    });
  };
  
