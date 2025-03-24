
import React from 'react';
import { FilterConfig, SortConfig } from '../../types/memory';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TableHeaderProps {
  filters: FilterConfig[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
}

const TableHeader = ({ filters, sortConfig, onSort }: TableHeaderProps) => {
  const renderSortArrow = (field: string) => {
    if (sortConfig.field !== field) return null;

    return sortConfig.direction === 'asc'
      ? <ArrowUp className="inline ml-1 w-4 h-4" />
      : <ArrowDown className="inline ml-1 w-4 h-4" />;
  };

  // Desired column order: Capacité (GB), Capacité (TB), Prix, Euro/GB, Euro/TB, Marque, Technologie, Vitesse lecture, Vitesse écriture, RPM, Cache, Format, Type, Interface, Poids, Garantie, Évaluation, Lien affilié
  const columnOrder = [
    'capacityGB', 'capacityTB', 'price', 'euroPerGB', 'euroPerTB', 'brand', 'technology', 'readSpeed', 'writeSpeed', 'rpm',
    'cache', 'format', 'type', 'interface', 'weight', 'warranty', 'rating',  'affiliateLink'
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

    // Always add affiliate link column at the end
    const hasAffiliateColumn = visFilters.some(f => f.field === 'affiliateLink');
    if (!hasAffiliateColumn) {
      visFilters.push({
        field: 'affiliateLink',
        // label: 'Lien affilié',
        label: 'Lien',
        type: 'text',
        isVisible: true
      });
    }

    return visFilters;
  };

  const visibleFilters = getVisibleFilters();

  return (
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
  );
};

export default TableHeader;
