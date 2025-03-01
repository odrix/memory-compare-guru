
import React, { useState, useEffect } from 'react';
import MemoryTable from '@/components/MemoryTable';
import FilterPanel from '@/components/FilterPanel';
import { FilterConfig, MemoryDevice, SortConfig } from '@/types/memory';
import { memoryDevices, getDefaultFilters } from '@/data/memory-data';
import { filterDevices, sortDevices, getMinMaxValues, getBestPrice } from '@/utils/filter-utils';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

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
      <header className="bg-card border-b border-border shadow-sm z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Memory Comparison</h1>
              <p className="text-muted-foreground mt-1">
                Compare hard drives, SSDs, and other storage devices
              </p>
            </div>
            
            <div className="w-full md:w-1/3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={toggleFilterPanel}
          >
            <Menu className="mr-2 h-4 w-4" />
            {isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FilterPanel
            filters={filters}
            activeFilters={activeFilters}
            devices={devices}
            onFilterChange={handleFilterChange}
            onVisibilityChange={handleColumnVisibilityChange}
            onResetFilters={resetFilters}
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
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
                onSort={handleSort}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            Memory Comparison Tool © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
