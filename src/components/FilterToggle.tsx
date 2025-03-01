
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface FilterToggleProps {
  isFilterPanelOpen: boolean;
  toggleFilterPanel: () => void;
}

const FilterToggle = ({ isFilterPanelOpen, toggleFilterPanel }: FilterToggleProps) => {
  return (
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
  );
};

export default FilterToggle;
