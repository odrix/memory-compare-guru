
import { FilterConfig } from '../types/memory';

export const getDefaultFilters = (): FilterConfig[] => [
  {
    field: 'capacityGB',
    label: 'Capacité (GB)',
    type: 'range',
    min: 0,
    max: 4000,
    step: 10,
    unit: 'GB',
    isVisible: true,
  },
  {
    field: 'price',
    label: 'Prix',
    type: 'range',
    min: 0,
    max: 1000,
    step: 1,
    unit: '€',
    isVisible: true,
  },
  {
    field: 'euroPerGB',
    label: 'Prix/Go',
    type: 'range',
    min: 0,
    max: 2,
    step: 0.001,
    unit: '€',
    isVisible: true,
  },
  {
    field: 'euroPerTB',
    label: 'Prix/To',
    type: 'range',
    min: 0,
    max: 2000,
    step: 1,
    unit: '€',
    isVisible: true,
  },
  {
    field: 'brand',
    label: 'Marque',
    type: 'select',
    isVisible: false,
  },
  {
    field: 'technology',
    label: 'Technologie',
    type: 'select',
    isVisible: false,
  },
  {
    field: 'readSpeed',
    label: 'Vitesse lecture (Mo/s)',
    type: 'range',
    min: 0,
    max: 5000,
    step: 10,
    unit: '',
    isVisible: true,
  },
  {
    field: 'writeSpeed',
    label: 'Vitesse écriture (Mo/s)',
    type: 'range',
    min: 0,
    max: 5000,
    step: 10,
    unit: '',
    isVisible: true,
  },
  {
    field: 'rpm',
    label: 'RPM',
    type: 'range',
    min: 0,
    max: 15000,
    step: 100,
    unit: 'RPM',
    isVisible: false,
  },
  {
    field: 'cache',
    label: 'Cache (MB)',
    type: 'range',
    min: 0,
    max: 2048,
    step: 10,
    unit: '',
    isVisible: true,
  },
  {
    field: 'format',
    label: 'Format',
    type: 'select',
    isVisible: false,
  },
  {
    field: 'type',
    label: 'Type',
    type: 'select',
    isVisible: false,
  },
  {
    field: 'interface',
    label: 'Interface',
    type: 'select',
    isVisible: false,
  },
  {
    field: 'weight',
    label: 'Poids',
    type: 'range',
    min: 0,
    max: 1000,
    step: 10,
    unit: 'g',
    isVisible: false,
  },
  {
    field: 'warranty',
    label: 'Garantie',
    type: 'range',
    min: 0,
    max: 10,
    step: 1,
    unit: 'ans',
    isVisible: false,
  },
  {
    field: 'rating',
    label: 'Évaluation',
    type: 'range',
    min: 0,
    max: 5,
    step: 0.5,
    unit: '★',
    isVisible: true,
  },
];
