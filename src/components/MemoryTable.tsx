import React from 'react';
import { FilterConfig, MemoryDevice, SortConfig } from '../types/memory';
import { getBestPrice } from '@/utils/filter-utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MemoryTableProps {
  devices: MemoryDevice[];
  filters: FilterConfig[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
}

const MemoryTable = ({ devices, filters, sortConfig, onSort }: MemoryTableProps) => {
  const formatValue = (device: MemoryDevice, field: string, unit?: string) => {
    if (field === 'price') {
      const price = getBestPrice(device);
      return price !== null ? `${price.toFixed(2)}€` : 'N/A';
    }

    if (field === 'euroPerGB') {
      const price = getBestPrice(device);
      const capacity = device.capacityGB;
      if (price !== null && capacity) {
        return `${(price / capacity).toFixed(2)} €/GB`;
      }
      return 'N/A';
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

  // Desired column order: Capacité (GB), Prix, Euro/GB, Marque, Technologie, Vitesse lecture, Vitesse écriture, RPM, Cache, Format, Type, Interface, Poids, Garantie, Évaluation
  const columnOrder = [
    'capacityGB', 'price', 'euroPerGB', 'brand', 'technology', 'readSpeed', 'writeSpeed', 'rpm',
    'cache', 'format', 'type', 'interface', 'weight', 'warranty', 'rating'
  ];

  // Get visible filters and sort them according to the column order
  const visibleFilters = filters
    .filter(filter => filter.isVisible || filter.field === 'euroPerGB')
    .sort((a, b) => {
      const indexA = columnOrder.indexOf(a.field);
      const indexB = columnOrder.indexOf(b.field);
      return indexA - indexB;
    });

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
            devices.map((device, i) => (
              <tr
                key={device.id}
                className={`
                  border-b border-border hover:bg-muted/20 transition-colors
                  ${i % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                `}
              >
                {visibleFilters.map((filter) => (
                  <td key={`${device.id}-${filter.field}`} className="px-4 py-4 text-sm">
                    {formatValue(device, filter.field, filter.unit)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemoryTable;
