export interface Offer {
  id: string;
  price: number;
  currency: string;
  countryCode: string;
  url?: string;
  store?: string;
  date?: string;
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
}

export type FilterConfig = {
  field: keyof MemoryDevice | 'price';
  label: string;
  type: 'range' | 'select' | 'text' | 'switch' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  isVisible: boolean;
}

export type SortConfig = {
  field: keyof MemoryDevice | 'price';
  direction: 'asc' | 'desc';
}
