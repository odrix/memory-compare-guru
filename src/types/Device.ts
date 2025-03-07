import { Offer } from './Offer';

export interface Device {
  id: string;
  title: string;
  subtitle?: string;
  brand: string;
  model: string;
  type: 'SATA' | 'HDD' | 'SSD' | 'NVMe' | 'USB' | 'SD' | 'microSD' | 'other';
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
