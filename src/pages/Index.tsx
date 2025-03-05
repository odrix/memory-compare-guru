
import React, { useState, useEffect } from 'react';
import { FilterConfig, Device, SortConfig, OfferDevice } from '@/types/memory';
import { memoryDevices, getDefaultFilters } from '@/data/memory-data';
import { filterOfferDevices } from '@/utils/filter-utils';
import { sortOfferDevices } from '@/utils/sort-utils';
import { createOfferDevices, getBestPrice } from '@/utils/utils';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/PageHeader';
import ContentArea from '@/components/ContentArea';
import PageFooter from '@/components/PageFooter';

const Index = () => {
  const { toast } = useToast();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>(memoryDevices);
  const [offerDevices, setOfferDevices] = useState<OfferDevice[]>([]);
  const [filteredOfferDevices, setFilteredOfferDevices] = useState<OfferDevice[]>([]);
  const [filters, setFilters] = useState<FilterConfig[]>(getDefaultFilters());
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'capacityGB',
    direction: 'desc'
  });
  const [showOfferTitles, setShowOfferTitles] = useState<boolean>(true);

  // Initialize offerDevices from devices
  useEffect(() => {
    const newOfferDevices = createOfferDevices(devices);
    setOfferDevices(newOfferDevices);
  }, [devices]);

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
    let result = [...offerDevices];
    
    const processedFilters = { ...activeFilters };
    Object.keys(processedFilters).forEach(key => {
      if (processedFilters[key] === 'all') {
        delete processedFilters[key];
      }
    });
    
    result = filterOfferDevices(result, processedFilters);
    result = sortOfferDevices(result, sortConfig);
    
    setFilteredOfferDevices(result);
  }, [offerDevices, activeFilters, sortConfig]);

  const handleFilterChange = (field: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value
    }));

    toast({
      title: "Filtre appliqué",
      description: `Filtre ${field} mis à jour`,
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
    const typedField = field as keyof Device | "price" | "euroPerGB" | "offerUrl";
    
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
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été effacés",
      duration: 1500,
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(prev => !prev);
  };

  const handleToggleOfferTitles = (checked: boolean) => {
    setShowOfferTitles(checked);
    
    toast({
      title: "Affichage modifié",
      description: checked ? "Titres des offres affichés" : "Titres des offres masqués",
      duration: 1500,
    });
  };

  // Create a modified ContentArea component to pass offerDevices
  const renderContentArea = () => {
    const contentAreaProps = {
      isFilterPanelOpen,
      toggleFilterPanel,
      filters,
      activeFilters,
      offerDevices: filteredOfferDevices,
      onFilterChange: handleFilterChange,
      onVisibilityChange: handleColumnVisibilityChange,
      onResetFilters: resetFilters,
      onClose: () => setIsFilterPanelOpen(false),
      sortConfig,
      onSort: handleSort,
      showOfferTitles,
      onToggleOfferTitles: handleToggleOfferTitles
    };

    return <ContentArea {...contentAreaProps} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />

      {renderContentArea()}

      <PageFooter />
    </div>
  );
};

export default Index;
