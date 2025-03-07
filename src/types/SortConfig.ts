
import { Device } from './Device';

export type SortConfig = {
  field: keyof Device | 'price' | 'euroPerGB' | 'euroPerTB' | 'offerUrl' | 'affiliateLink';
  direction: 'asc' | 'desc';
}
