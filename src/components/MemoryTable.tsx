
import React from 'react';
import { FilterConfig, MemoryDevice, SortConfig, Offer } from '../types/memory';
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';

interface MemoryTableProps {
  devices: MemoryDevice[];
  filters: FilterConfig[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
  showOfferTitles: boolean;
}

const MemoryTable = ({ 
  devices, 
  filters, 
  sortConfig, 
  onSort,
  showOfferTitles 
}: MemoryTableProps) => {
  const formatValue = (device: MemoryDevice, field: string, unit?: string, offer?: Offer) => {
    if (field === 'price' && offer) {
      return `${offer.price.toFixed(2)}${offer.currency === 'EUR' ? '€' : '$'}`;
    }

    if (field === 'euroPerGB' && offer) {
      if (!device.capacityGB) return 'N/A';
      return `${(offer.price / device.capacityGB).toFixed(2)} €/GB`;
    }

    if (field === 'offerUrl' && offer) {
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

    const value = device[field as keyof MemoryDevice];
    if (value === undefined || value === null) return 'N/A';

    // Format based on field type
    if (typeof value === 'number') {
      if (field === 'rating') {
        return `${value.toFixed(1)}★`;
      }
      return unit ? `${value} ${unit}` : value.toString();
    }

    return value.toString();
  };

  const renderSortArrow = (field: string) => {
    if (sortConfig.field !== field) return null;

    return sortConfig.direction === 'asc'
      ? <ArrowUp className="inline ml-1 w-4 h-4" />
      : <ArrowDown className="inline ml-1 w-4 h-4" />;
  };

  const getActiveOffers = (device: MemoryDevice): Offer[] => {
    return device.offers.filter(offer => !offer.inactive);
  };

  // Desired column order: Capacité (GB), Prix, Euro/GB, Marque, Technologie, Vitesse lecture, Vitesse écriture, RPM, Cache, Format, Type, Interface, Poids, Garantie, Évaluation
  const columnOrder = [
    'capacityGB', 'price', 'euroPerGB', 'brand', 'technology', 'readSpeed', 'writeSpeed', 'rpm',
    'cache', 'format', 'type', 'interface', 'weight', 'warranty', 'rating'
  ];

  // Get visible filters and sort them according to the column order
  const getVisibleFilters = () => {
    let visFilters = filters
      .filter(filter => filter.isVisible)
      .sort((a, b) => {
        const indexA = columnOrder.indexOf(a.field);
        const indexB = columnOrder.indexOf(b.field);
        return indexA - indexB;
      });

    // Add URL column if offer titles are not shown
    if (!showOfferTitles) {
      visFilters.push({
        field: 'offerUrl',
        label: 'URL',
        type: 'text',
        isVisible: true
      });
    }

    return visFilters;
  };

  const visibleFilters = getVisibleFilters();

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="bg-muted/50">
            {visibleFilters.map((filter) => (
              <th
                key={filter.field}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground tracking-wider cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onSort(filter.field)}
              >
                <div className="flex items-center">
                  {filter.label}
                  {renderSortArrow(filter.field)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {devices.length === 0 ? (
            <tr>
              <td colSpan={visibleFilters.length} className="px-4 py-8 text-center text-muted-foreground">
                No devices match your filters
              </td>
            </tr>
          ) : (
            devices.flatMap((device, deviceIndex) => {
              const activeOffers = getActiveOffers(device);
              
              if (activeOffers.length === 0) {
                // Render a single row for devices with no active offers
                return (
                  <tr 
                    key={device.id} 
                    className={`
                      border-b border-border hover:bg-muted/20 transition-colors
                      ${deviceIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                    `}
                  >
                    {visibleFilters.map((filter) => (
                      <td key={`${device.id}-${filter.field}`} className="px-4 py-4 text-sm">
                        {formatValue(device, filter.field, filter.unit)}
                      </td>
                    ))}
                  </tr>
                );
              }
              
              // Render a group with a row for each active offer
              return (
                <React.Fragment key={device.id}>
                  {/* Offer title row - only show if showOfferTitles is true */}
                  {showOfferTitles && (
                    <tr className="bg-muted/30 border-t border-border">
                      <td colSpan={visibleFilters.length} className="px-4 py-2 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{device.title} - {activeOffers.length} active offers</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  {/* Render a row for each offer */}
                  {activeOffers.map((offer, offerIndex) => (
                    <tr
                      key={`${device.id}-${offer.id}`}
                      className={`
                        border-b border-border hover:bg-muted/20 transition-colors
                        ${(deviceIndex + offerIndex) % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                      `}
                    >
                      {visibleFilters.map((filter) => (
                        <td key={`${device.id}-${offer.id}-${filter.field}`} className="px-4 py-4 text-sm">
                          {['price', 'euroPerGB', 'offerUrl'].includes(filter.field)
                            ? formatValue(device, filter.field, filter.unit, offer)
                            : formatValue(device, filter.field, filter.unit)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemoryTable;
