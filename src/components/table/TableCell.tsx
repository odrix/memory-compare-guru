
import React from 'react';
import { OfferDevice } from '../../types/memory';
import { ExternalLink } from 'lucide-react';

interface TableCellProps {
  offerDevice: OfferDevice;
  field: string;
  unit?: string;
}

const TableCell = ({ offerDevice, field, unit }: TableCellProps) => {
  const { device, offer } = offerDevice;
  
  if (field === 'price') {
    return <>{offer.price.toFixed(2)}{offer.currency === 'EUR' ? '€' : '$'}</>;
  }

  if (field === 'euroPerGB') {
    if (!offer.euroPerGB) return <>N/A</>;
    return <>{offer.euroPerGB.toFixed(3)}</>;
  }

  if (field === 'euroPerTB') {
    if (!offer.euroPerGB) return <>N/A</>;
    // Convert €/GB to €/TB (multiply by 1024)
    const euroPerTB = offer.euroPerGB * 1024;
    return <>{euroPerTB.toFixed(2)}</>;
  }

  if (field === 'capacityTB') {
    // Convert GB to TB (divide by 1024)
    const capacityTB = device.capacityGB / 1024;
    return <>{capacityTB.toFixed(2)}</>;
  }

  if (field === 'readSpeed' || field === 'writeSpeed' || field === 'cache') {
    const value = device[field as keyof typeof device];
    if (value === undefined || value === null) return <>N/A</>;
    return <>{value.toString()}</>;
  }

  if (field === 'offerUrl') {
    return (
      <a
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-primary hover:underline text-xs"
      >
        {offer.store || 'Visit store'} <ExternalLink className="ml-1 w-3 h-3" />
      </a>
    );
  }

  if (field === 'affiliateLink') {
    const deviceTitle = device.title || '';
    const deviceSubtitle = device.subtitle || '';
    const storeName = offer.store || 'Voir l\'offre';
    
    return (
      <a
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-primary hover:underline text-xs"
      >
        <span className="truncate mr-1">
          {deviceTitle}{deviceSubtitle ? ` - ${deviceSubtitle}` : ''} - {storeName}
        </span>
        <ExternalLink className="ml-1 w-3 h-3 flex-shrink-0" />
      </a>
    );
  }

  const value = device[field as keyof typeof device];
  if (value === undefined || value === null) return <>N/A</>;

  // Format based on field type
  if (typeof value === 'number') {
    if (field === 'rating') {
      return <>{value.toFixed(1)}★</>;
    }
    return <>{value.toString()}</>;
  }

  return <>{value.toString()}</>;
};

export default TableCell;
