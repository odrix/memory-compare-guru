
import React from 'react';
import MemoryTable from '@/components/MemoryTable';
import FilterPanel from '@/components/FilterPanel';
import { FilterConfig, SortConfig, OfferDevice } from '../types/memory';
import FilterToggle from './FilterToggle';

interface ContentAreaProps {
  isFilterPanelOpen: boolean;
  toggleFilterPanel: () => void;
  filters: FilterConfig[];
  activeFilters: { [key: string]: any };
  offerDevices: OfferDevice[];
  onFilterChange: (field: string, value: any) => void;
  onVisibilityChange: (field: string, visible: boolean) => void;
  onResetFilters: () => void;
  onClose: () => void;
  sortConfig: SortConfig;
  onSort: (field: string) => void;
  showOfferTitles: boolean;
  onToggleOfferTitles: (checked: boolean) => void;
}

const ContentArea = ({
  isFilterPanelOpen,
  toggleFilterPanel,
  filters,
  activeFilters,
  offerDevices,
  onFilterChange,
  onVisibilityChange,
  onResetFilters,
  onClose,
  sortConfig,
  onSort,
  showOfferTitles,
  onToggleOfferTitles
}: ContentAreaProps) => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <FilterToggle 
        isFilterPanelOpen={isFilterPanelOpen} 
        toggleFilterPanel={toggleFilterPanel} 
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative md:h-[calc(100vh-12rem)] md:overflow-hidden border-r border-border md:pr-6">
          <FilterPanel
            filters={filters}
            activeFilters={activeFilters}
            devices={devices}
            onFilterChange={onFilterChange}
            onVisibilityChange={onVisibilityChange}
            onResetFilters={onResetFilters}
            isOpen={isFilterPanelOpen}
            onClose={onClose}
            showOfferTitles={showOfferTitles}
            onToggleOfferTitles={onToggleOfferTitles}
          />
        </div>

        <div className="flex-1 md:h-[calc(100vh-12rem)] md:overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {offerDevices.length} offres
            </p>
          </div>
          
          <div className="animate-fade-in">
            <MemoryTable 
              offerDevices={offerDevices}
              filters={filters}
              sortConfig={sortConfig}
              onSort={onSort}
              showOfferTitles={showOfferTitles}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContentArea;
