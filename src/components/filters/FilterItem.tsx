
import React from 'react';
import { FilterConfig, MemoryDevice } from '@/types/memory';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FilterControl from './FilterControl';

interface FilterItemProps {
  filter: FilterConfig;
  value: any;
  devices: MemoryDevice[];
  onFilterChange: (field: string, value: any) => void;
  onVisibilityChange: (field: string, visible: boolean) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  value,
  devices,
  onFilterChange,
  onVisibilityChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-bold">{filter.label}</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`show-${filter.field}`} className="text-xs text-muted-foreground">
            Afficher colonne
          </Label>
          <Switch
            id={`show-${filter.field}`}
            checked={filter.isVisible}
            onCheckedChange={(checked) => onVisibilityChange(filter.field, checked)}
            className="filter-switch-small bg-gray-300 data-[state=checked]:bg-green-300"
          />
        </div>
      </div>
      <FilterControl
        filter={filter}
        value={value}
        devices={devices}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default FilterItem;
