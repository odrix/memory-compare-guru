
import React from 'react';
import { FilterConfig, MemoryDevice } from '@/types/memory';
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
import { Label } from '@/components/ui/label';
import { getUniqueValues } from '@/utils/filter-utils';

interface FilterControlProps {
  filter: FilterConfig;
  value: any;
  devices: MemoryDevice[];
  onFilterChange: (field: string, value: any) => void;
}

const FilterControl: React.FC<FilterControlProps> = ({
  filter,
  value,
  devices,
  onFilterChange,
}) => {
  const { field, label, type, options, min, max, unit } = filter;

  switch (type) {
    case 'range':
      return (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {value.min} {unit}
            </span>
            <span className="text-sm font-medium">
              {value.min} - {value.max} {unit}
            </span>
            <span className="text-sm text-muted-foreground">
              {value.max} {unit}
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={1}
            value={[value.min, value.max]}
            onValueChange={(vals) => {
              onFilterChange(field, {
                min: vals[0],
                max: vals[1]
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

export default FilterControl;
