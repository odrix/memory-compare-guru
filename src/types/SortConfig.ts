import { Device } from './Device';

export type SortConfig = {
  field: keyof Device | 'price' | 'euroPerGB' | 'offerUrl';
  direction: 'asc' | 'desc';
}
