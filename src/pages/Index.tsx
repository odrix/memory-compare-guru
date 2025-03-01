
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
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize price range filter based on data
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

  // Apply filters and search
  useEffect(() => {
    let result = [...devices];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(device => 
        device.title.toLowerCase().includes(term) ||
        device.brand.toLowerCase().includes(term) ||
        device.model.toLowerCase().includes(term) ||
        (device.subtitle && device.subtitle.toLowerCase().includes(term))
      );
    }
    
    // Apply active filters
    result = filterDevices(result, activeFilters);
    
    // Apply sorting
    result = sortDevices(result, sortConfig);
    
    setFilteredDevices(result);
  }, [devices, activeFilters, sortConfig, searchTerm]);

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
    // Cast the field to the correct type (keyof MemoryDevice | "price")
    const typedField = field as keyof MemoryDevice | "price";
    
    setSortConfig(prev => ({
      field: typedField,
      direction: prev.field === typedField && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
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
      <PageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
