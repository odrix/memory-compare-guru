
import React from 'react';
import MemoryTable from '@/components/MemoryTable';
import FilterPanel from '@/components/FilterPanel';
import { FilterConfig, MemoryDevice, SortConfig } from '@/types/memory';
import FilterToggle from './FilterToggle';

interface ContentAreaProps {
  isFilterPanelOpen: boolean;
  toggleFilterPanel: () => void;
  filters: FilterConfig[];
  activeFilters: { [key: string]: any };
  devices: MemoryDevice[];
  filteredDevices: MemoryDevice[];
  onFilterChange: (field: string, value: any) => void;
  onVisibilityChange: (field: string, visible: boolean) => void;
  onResetFilters: () => void;
  onClose: () => void;
  sortConfig: SortConfig;
  onSort: (field: string) => void;
}

const ContentArea = ({
  isFilterPanelOpen,
  toggleFilterPanel,
  filters,
  activeFilters,
  devices,
  filteredDevices,
  onFilterChange,
  onVisibilityChange,
  onResetFilters,
  onClose,
  sortConfig,
  onSort
}: ContentAreaProps) => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <FilterToggle 
        isFilterPanelOpen={isFilterPanelOpen} 
        toggleFilterPanel={toggleFilterPanel} 
      />

      <div className="flex flex-col md:flex-row gap-6">
        <FilterPanel
          filters={filters}
          activeFilters={activeFilters}
          devices={devices}
          onFilterChange={onFilterChange}
          onVisibilityChange={onVisibilityChange}
          onResetFilters={onResetFilters}
          isOpen={isFilterPanelOpen}
          onClose={onClose}
        />

        <div className="flex-1 overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDevices.length} of {devices.length} devices
            </p>
          </div>
          
          <div className="animate-fade-in">
            <MemoryTable 
              devices={filteredDevices}
              filters={filters}
              sortConfig={sortConfig}
              onSort={onSort}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContentArea;
