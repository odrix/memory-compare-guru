import React, { useState, useEffect } from "react";
import { FilterConfig, Device, SortConfig, OfferDevice } from "@/types/memory";
import { useParams } from "react-router-dom";
import DeviceTypeMenu from "@/components/DeviceTypeMenu";
import { memoryDevices, getDefaultFilters } from "@/data/memory-data";
import { filterOfferDevices } from "@/utils/filter-utils";
import { sortOfferDevices } from "@/utils/sort-utils";
import { createOfferDevices, getBestPrice } from "@/utils/utils";
import { useToast } from "@/components/ui/use-toast";
import PageHeader from "@/components/PageHeader";
import ContentArea from "@/components/ContentArea";
import WelcomePart from "@/components/WelcomePart";
import PageFooter from "@/components/PageFooter";


const Index = () => {
  const { toast } = useToast();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>(memoryDevices);
  const [offerDevices, setOfferDevices] = useState<OfferDevice[]>([]);
  const [filteredOfferDevices, setFilteredOfferDevices] = useState<
    OfferDevice[]
  >([]);
  const [filters, setFilters] = useState<FilterConfig[]>(() => {
    const defaultFilters = getDefaultFilters();
    return defaultFilters.map((filter) => {
      if (
        ["capacityGB", "pricePerGB", "capacityTB", "pricePerTB"].includes(
          filter.field,
        )
      ) {
        return {
          ...filter,
          isVisible: false,
        };
      }
      return filter;
    });
  });

  const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>(
    {},
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "capacityGB",
    direction: "desc",
  });
  const [showOfferTitles, setShowOfferTitles] = useState<boolean>(false);
  const [showInTerabytes, setShowInTerabytes] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (["capacityGB", "euroPerGB"].includes(filter.field)) {
          return { ...filter, isVisible: !showInTerabytes };
        }
        if (["capacityTB", "euroPerTB"].includes(filter.field)) {
          return { ...filter, isVisible: showInTerabytes };
        }
        return filter;
      }),
    );
  }, [showInTerabytes]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const newOfferDevices = createOfferDevices(devices);
    setOfferDevices(newOfferDevices);
  }, [devices]);

  useEffect(() => {
    const prices = devices
      .map((device) => getBestPrice(device))
      .filter((price): price is number => price !== null);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.field === "price"
          ? { ...filter, min: minPrice, max: maxPrice }
          : filter,
      ),
    );
  }, [devices]);

  const { deviceType } = useParams();

  useEffect(() => {
    let result = [...offerDevices];

    const processedFilters = { ...activeFilters };
    if (deviceType && deviceType !== "all") {
      console.log(deviceType);
      processedFilters.type = deviceType;
    }
    Object.keys(processedFilters).forEach((key) => {
      if (processedFilters[key] === "all") {
        delete processedFilters[key];
      }
    });

    result = filterOfferDevices(result, processedFilters);
    result = sortOfferDevices(result, sortConfig);

    setFilteredOfferDevices(result);
  }, [offerDevices, activeFilters, sortConfig, deviceType]);

  const handleFilterChange = (field: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [field]: value,
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
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.field === field ? { ...filter, isVisible: visible } : filter,
      ),
    );
  };

  const handleSort = (field: string) => {
    const typedField = field as
      | keyof Device
      | "price"
      | "euroPerGB"
      | "offerUrl";

    setSortConfig((prev) => ({
      field: typedField,
      direction:
        prev.field === typedField && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const resetFilters = () => {
    setActiveFilters({});

    setSortConfig({
      field: "capacityGB",
      direction: "desc",
    });

    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été effacés",
      duration: 1500,
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  const handleToggleOfferTitles = (checked: boolean) => {
    setShowOfferTitles(checked);

    if (!isMobile) {
      toast({
        title: "Affichage modifié",
        description: checked
          ? "Titres des offres affichés"
          : "Titres des offres masqués",
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
      showInTerabytes,
      onToggleTerabytes: setShowInTerabytes,
    };

    return <ContentArea {...contentAreaProps} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />
      <DeviceTypeMenu />
      <div className="p-4 text-center bg-gray-100 rounded-md shadow-md">
        <h1 className="text-md mb-1">
          Bienvenue sur topdisks, votre comparateur pour choisir le meilleur disque dur
         </h1>
         <p className="text-sm">
            Que vous cherchiez un SSD rapide pour le gaming, un HDD spacieux pour la sauvegarde, ou un disque dur hybride pour un usage polyvalent,
        </p>
        <p className="text-sm mb-1">
          utilisez nos filtres pour affiner votre recherche par type, capacité, vitesse, et plus encore.
        </p>
        <p className="text-sm">
          Commencez votre recherche dès maintenant et trouvez le disque dur qui répond à tous vos besoins !
        </p>
      </div>
      {renderContentArea()}

      <WelcomePart />
      <PageFooter />
    </div>
  );
};

export default Index;
