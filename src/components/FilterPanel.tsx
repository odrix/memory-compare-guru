
import React from 'react';
import { FilterConfig, MemoryDevice } from '../types/memory';
import { X } from 'lucide-react';
import DisplaySettings from './filters/DisplaySettings';
import FilterItem from './filters/FilterItem';

interface FilterPanelProps {
  filters: FilterConfig[];
  activeFilters: { [key: string]: any };
  devices: MemoryDevice[];
  onFilterChange: (field: string, value: any) => void;
  onVisibilityChange: (field: string, visible: boolean) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
  showOfferTitles: boolean;
  onToggleOfferTitles: (checked: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  activeFilters,
  devices,
  onFilterChange,
  onVisibilityChange,
  onResetFilters,
  isOpen,
  onClose,
  showOfferTitles,
  onToggleOfferTitles
}) => {
  return (
    <div
      className={`fixed md:relative top-0 left-0 h-full w-full md:w-80 md:max-h-[calc(100vh-12rem)] bg-card z-50 md:z-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="sticky top-0 bg-card z-10 p-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filtres</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onResetFilters}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors md:hidden"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 space-y-8">
        {/* Display Settings Section */}
        <DisplaySettings 
          showOfferTitles={showOfferTitles}
          onToggleOfferTitles={onToggleOfferTitles}
        />

        {/* Filters Section */}
        {filters.map((filter) => (
          <FilterItem
            key={filter.field}
            filter={filter}
            value={activeFilters[filter.field] || 
              (filter.type === 'range' ? { min: filter.min || 0, max: filter.max || 100 } : '')}
            devices={devices}
            onFilterChange={onFilterChange}
            onVisibilityChange={onVisibilityChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
