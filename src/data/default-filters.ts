
import { FilterConfig } from '../types/memory';

export const getDefaultFilters = (): FilterConfig[] => [
  { field: 'capacityGB', label: 'Capacité (GB)', type: 'range', min: 0, max: 10000, unit: 'GB', isVisible: true },
  { field: 'type', label: 'Type', type: 'select', options: ['HDD', 'SSD', 'NVMe', 'USB', 'SD', 'microSD', 'other'], isVisible: false },
  { field: 'brand', label: 'Marque', type: 'select', options: ['Seagate', 'Western Digital', 'Samsung', 'Crucial', 'Kingston', 'SanDisk'], isVisible: true },
  { field: 'price', label: 'Prix', type: 'range', min: 0, max: 500, unit: '€', isVisible: true },
  { field: 'technology', label: 'Technologie', type: 'select', options: ['CMR', '3D NAND', '3D V-NAND', 'NVMe'], isVisible: false },
  { field: 'format', label: 'Format', type: 'select', options: ['2.5"', '3.5"', 'M.2 2280', 'Portable'], isVisible: false },
  { field: 'interface', label: 'Interface', type: 'select', options: ['SATA 6Gb/s', 'PCIe Gen 3.0 x4, NVMe', 'PCIe Gen 4.0 x4, NVMe', 'USB-C 3.2 Gen 2x2'], isVisible: false },
  { field: 'rpm', label: 'RPM', type: 'range', min: 5400, max: 15000, unit: 'RPM', isVisible: true },
  { field: 'readSpeed', label: 'Vitesse lecture', type: 'range', min: 0, max: 7000, unit: 'MB/s', isVisible: true },
  { field: 'writeSpeed', label: 'Vitesse écriture', type: 'range', min: 0, max: 7000, unit: 'MB/s', isVisible: true },
  { field: 'cache', label: 'Cache', type: 'range', min: 0, max: 2048, unit: 'MB', isVisible: true },
  { field: 'weight', label: 'Poids', type: 'range', min: 0, max: 1000, unit: 'g', isVisible: false },
  { field: 'warranty', label: 'Garantie', type: 'range', min: 0, max: 60, unit: 'mois', isVisible: false },
  { field: 'rating', label: 'Évaluation', type: 'range', min: 0, max: 5, unit: '★', isVisible: true }
];
