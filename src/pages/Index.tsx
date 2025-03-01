
import React, { useState, useEffect } from 'react';
import { FilterConfig, MemoryDevice, SortConfig } from '@/types/memory';
import { memoryDevices, getDefaultFilters } from '@/data/memory-data';
import { filterDevices, sortDevices, getMinMaxValues, getBestPrice } from '@/utils/filter-utils';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/PageHeader';
import ContentArea from '@/components/ContentArea';
import PageFooter from '@/components/PageFooter';

const Index = () => {
  const { toast } = useToast();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [devices, setDevices] = useState<MemoryDevice[]>(memoryDevices);
  const [filteredDevices, setFilteredDevices] = useState<MemoryDevice[]>(memoryDevices);
  const [filters, setFilters] = useState<FilterConfig[]>(getDefaultFilters());
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'capacityGB',
    direction: 'desc'
  });

  useEffect(() => {
    const prices = devices
      .map(device => getBestPrice(device))
      .filter((price): price is number => price !== null);
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.field === 'price' 
          ? { ...filter, min: minPrice, max: maxPrice } 
          : filter
      )
    );
  }, [devices]);

  useEffect(() => {
    let result = [...devices];
    
    // Process activeFilters by handling 'all' value for select filters
    const processedFilters = { ...activeFilters };
    Object.keys(processedFilters).forEach(key => {
      if (processedFilters[key] === 'all') {
        delete processedFilters[key]; // Remove 'all' filters as they should not filter the data
      }
    });
    
    result = filterDevices(result, processedFilters);
    result = sortDevices(result, sortConfig);
    
    setFilteredDevices(result);
  }, [devices, activeFilters, sortConfig]);

  const handleFilterChange = (field: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value
    }));

    toast({
      title: "Filter applied",
      description: `${field} filter updated`,
      duration: 1500,
    });
  };

  const handleColumnVisibilityChange = (field: string, visible: boolean) => {
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.field === field 
          ? { ...filter, isVisible: visible }
          : filter
      )
    );
  };

  const handleSort = (field: string) => {
    const typedField = field as keyof MemoryDevice | "price";
    
    setSortConfig(prev => ({
      field: typedField,
      direction: prev.field === typedField && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetFilters = () => {
    setActiveFilters({});
    
    setSortConfig({
      field: 'capacityGB',
      direction: 'desc'
    });
    
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
      duration: 1500,
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />

      <ContentArea
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanel={toggleFilterPanel}
        filters={filters}
        activeFilters={activeFilters}
        devices={devices}
        filteredDevices={filteredDevices}
        onFilterChange={handleFilterChange}
        onVisibilityChange={handleColumnVisibilityChange}
        onResetFilters={resetFilters}
        onClose={() => setIsFilterPanelOpen(false)}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <PageFooter />
    </div>
  );
};

export default Index;
