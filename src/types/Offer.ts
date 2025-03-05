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
