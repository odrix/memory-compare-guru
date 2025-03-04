
export interface Offer {
  id: string;
  price: number;
  currency: string;
  countryCode: string;
  url: string;
  store?: string;
  date?: string;
  inactive: boolean;
  inactivedDateUTC?: string;
  createdDateUTC: string;
  lastCheckedDateUTC?: string;
}

export interface MemoryDevice {
  id: string;
  title: string;
  subtitle?: string;
  brand: string;
  model: string;
  type: 'HDD' | 'SSD' | 'NVMe' | 'USB' | 'SD' | 'microSD' | 'other';
  technology: string;
  capacityGB: number;
  capacityTB?: number;
  capacityBytes?: number;
  format: string;
  interface: string;
  rpm?: number;
  readSpeed?: number;
  writeSpeed?: number;
  cache?: number;
  weight?: number;
  warranty?: number;
  rating?: number;
  offers: Offer[];
  isVisible?: boolean;
  sku: string;
  ean: string;
}

export type FilterConfig = {
  field: keyof MemoryDevice | 'price' | 'euroPerGB' | 'offerUrl';
  label: string;
  type: 'range' | 'select' | 'text' | 'switch' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  isVisible: boolean;
}

export type SortConfig = {
  field: keyof MemoryDevice | 'price' | 'euroPerGB' | 'offerUrl';
  direction: 'asc' | 'desc';
}
