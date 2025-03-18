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
  const defaultFilters = getDefaultFilters(); // Get default filters here
  const [filters, setFilters] = useState<FilterConfig[]>(defaultFilters);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'capacityGB',
    direction: 'desc'
  });
  const [showOfferTitles, setShowOfferTitles] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [displayInTB, setDisplayInTB] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useEffect(() => {
    // Update filter visibility based on display unit
    const filters = [...defaultFilters];
    filters.forEach(filter => {
      if (filter.field === 'euroPerGB' || filter.field === 'capacityGB') {
        filter.isVisible = !displayInTB;
      }
      if (filter.field === 'euroPerTB' || filter.field === 'capacityTB') {
        filter.isVisible = displayInTB;
      }
    });
    setFilters(filters);
  }, [displayInTB, defaultFilters]);


  const handleFilterChange = (field: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value
    }));

    if (!isMobile) {
      toast({
        title: "Filtre appliqué",
        description: `Filtre ${field} mis à jour`,
        duration: 1500,
      });
    }
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
    const typedField = field as keyof Device | "price" | "euroPerGB" | "offerUrl" | "euroPerTB" | "capacityTB";

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

    if (!isMobile) {
      toast({
        title: "Affichage modifié",
        description: checked ? "Titres des offres affichés" : "Titres des offres masqués",
        duration: 1500,
      });
    }
  };

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
      onToggleOfferTitles: handleToggleOfferTitles,
      displayInTB,
      setDisplayInTB
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