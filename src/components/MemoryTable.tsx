
import React from 'react';
import { FilterConfig, SortConfig, OfferDevice } from '../types/memory';
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';

interface MemoryTableProps {
  offerDevices: OfferDevice[];
  filters: FilterConfig[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
  showOfferTitles: boolean;
}

const MemoryTable = ({ 
  offerDevices, 
  filters, 
  sortConfig, 
  onSort,
  showOfferTitles 
}: MemoryTableProps) => {
  const formatValue = (offerDevice: OfferDevice, field: string, unit?: string) => {
    const { device, offer } = offerDevice;
    
    if (field === 'price') {
      return `${offer.price.toFixed(2)}${offer.currency === 'EUR' ? '€' : '$'}`;
    }

    if (field === 'euroPerGB') {
      if (!offer.euroPerGB) return 'N/A';
      return `${offer.euroPerGB.toFixed(3)} €/GB`;
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

    const value = device[field as keyof typeof device];
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

    // Always add title column if offer titles should be shown
    if (showOfferTitles) {
      // Add title at the beginning
      visFilters.unshift({
        field: 'title',
        label: 'Titre',
        type: 'text',
        isVisible: true
      });
    }

    // Add URL column if it's not already there (it might be added as a regular filter)
    const hasUrlColumn = visFilters.some(f => f.field === 'offerUrl');
    if (!hasUrlColumn) {
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
          {offerDevices.length === 0 ? (
            <tr>
              <td colSpan={visibleFilters.length} className="px-4 py-8 text-center text-muted-foreground">
                No devices match your filters
              </td>
            </tr>
          ) : (
            offerDevices.map((offerDevice, index) => {
              const { device } = offerDevice;
              
              return (
                <tr
                  key={`${device.id}-${offerDevice.offer.id}`}
                  className={`
                    border-b border-border hover:bg-muted/20 transition-colors
                    ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                  `}
                >
                  {visibleFilters.map((filter) => (
                    <td key={`${device.id}-${offerDevice.offer.id}-${filter.field}`} className="px-4 py-4 text-sm">
                      {formatValue(offerDevice, filter.field, filter.unit)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemoryTable;
