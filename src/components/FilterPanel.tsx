
import React, { useState } from 'react';
import { FilterConfig, MemoryDevice } from '../types/memory';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { getUniqueValues } from '@/utils/filter-utils';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterConfig[];
  activeFilters: { [key: string]: any };
  devices: MemoryDevice[];
  onFilterChange: (field: string, value: any) => void;
  onVisibilityChange: (field: string, visible: boolean) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterPanel = ({
  filters,
  activeFilters,
  devices,
  onFilterChange,
  onVisibilityChange,
  onResetFilters,
  isOpen,
  onClose
}: FilterPanelProps) => {
  const renderFilterControl = (filter: FilterConfig) => {
    const { field, label, type, options, min, max, unit } = filter;
    const value = activeFilters[field] || '';

    switch (type) {
      case 'range':
        const minVal = value?.min || min || 0;
        const maxVal = value?.max || max || 100;
        const currentVal = value?.current !== undefined
          ? [value.current]
          : [Math.floor((minVal + maxVal) / 2)];

        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {minVal} {unit}
              </span>
              <span className="text-sm font-medium">
                {value?.current || currentVal[0]} {unit}
              </span>
              <span className="text-sm text-muted-foreground">
                {maxVal} {unit}
              </span>
            </div>
            <Slider
              min={minVal}
              max={maxVal}
              step={1}
              value={value?.current !== undefined ? [value.current] : currentVal}
              onValueChange={(vals) => {
                onFilterChange(field, {
                  min: minVal,
                  max: maxVal,
                  current: vals[0]
                });
              }}
            />
          </div>
        );

      case 'select':
        // Get dynamic options if not provided
        const selectOptions = options || 
          getUniqueValues(devices, field as keyof MemoryDevice)
            .map(v => String(v));
        
        return (
          <Select
            value={value}
            onValueChange={(val) => onFilterChange(field, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Sélectionner ${label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {selectOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'text':
        return (
          <Input
            placeholder={`Filtrer par ${label}`}
            value={value}
            onChange={(e) => onFilterChange(field, e.target.value)}
            className="w-full"
          />
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {(options || []).map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field}-${option}`}
                  checked={(value || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const newValue = [...(value || [])];
                    if (checked) {
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index > -1) newValue.splice(index, 1);
                    }
                    onFilterChange(field, newValue);
                  }}
                />
                <Label htmlFor={`${field}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed md:relative top-0 left-0 h-full w-full md:w-80 md:max-h-[calc(100vh-12rem)] bg-card z-50 md:z-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="sticky top-0 bg-card z-10 p-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filtres</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onResetFilters}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors md:hidden"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 space-y-6">
        {filters.map((filter) => (
          <div key={filter.field} className="space-y-3">
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
                  className="filter-switch bg-gray-300 data-[state=checked]:bg-green-300"
                />
              </div>
            </div>
            {renderFilterControl(filter)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
