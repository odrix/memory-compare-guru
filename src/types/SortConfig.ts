
import { Device } from './Device';

export type SortConfig = {
  field: keyof Device | 'price' | 'euroPerGB' | 'euroPerTB' | 'offerUrl' | 'affiliateLink' | 'capacityTB';
  direction: 'asc' | 'desc';
}
