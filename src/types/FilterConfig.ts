
import { Device } from './Device';

export type FilterConfig = {
  field: keyof Device | 'price' | 'euroPerGB' | 'euroPerTB' | 'offerUrl' | 'affiliateLink' | 'capacityTB';
  label: string;
  type: 'range' | 'select' | 'text' | 'switch' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  isVisible: boolean;
}
