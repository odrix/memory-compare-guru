import { Device } from './Device';

export type FilterConfig = {
  field: keyof Device | 'price' | 'euroPerGB' | 'offerUrl';
  label: string;
  type: 'range' | 'select' | 'text' | 'switch' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  isVisible: boolean;
}
