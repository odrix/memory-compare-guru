
import { Device } from './Device';
import { Offer } from './Offer';

export interface OfferDevice {
  device: Device;
  offer: Offer & {
    euroPerGB?: number;
  };
}
