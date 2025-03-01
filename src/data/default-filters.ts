
import { FilterConfig } from '../types/memory';

export const getDefaultFilters = (): FilterConfig[] => [
  { field: 'capacityGB', label: 'Capacity (GB)', type: 'range', min: 0, max: 10000, unit: 'GB', isVisible: true },
  { field: 'type', label: 'Type', type: 'select', options: ['HDD', 'SSD', 'NVMe', 'USB', 'SD', 'microSD', 'other'], isVisible: true },
  { field: 'brand', label: 'Brand', type: 'select', options: ['Seagate', 'Western Digital', 'Samsung', 'Crucial', 'Kingston', 'SanDisk'], isVisible: true },
  { field: 'price', label: 'Price', type: 'range', min: 0, max: 500, unit: '$', isVisible: true },
  { field: 'technology', label: 'Technology', type: 'select', options: ['CMR', '3D NAND', '3D V-NAND', 'NVMe'], isVisible: true },
  { field: 'format', label: 'Format', type: 'select', options: ['2.5"', '3.5"', 'M.2 2280', 'Portable'], isVisible: true },
  { field: 'interface', label: 'Interface', type: 'select', options: ['SATA 6Gb/s', 'PCIe Gen 3.0 x4, NVMe', 'PCIe Gen 4.0 x4, NVMe', 'USB-C 3.2 Gen 2x2'], isVisible: true },
  { field: 'rpm', label: 'RPM', type: 'range', min: 5400, max: 15000, unit: 'RPM', isVisible: true },
  { field: 'readSpeed', label: 'Read Speed', type: 'range', min: 0, max: 7000, unit: 'MB/s', isVisible: true },
  { field: 'writeSpeed', label: 'Write Speed', type: 'range', min: 0, max: 7000, unit: 'MB/s', isVisible: true },
  { field: 'cache', label: 'Cache', type: 'range', min: 0, max: 2048, unit: 'MB', isVisible: true },
  { field: 'weight', label: 'Weight', type: 'range', min: 0, max: 1000, unit: 'g', isVisible: true },
  { field: 'warranty', label: 'Warranty', type: 'range', min: 0, max: 60, unit: 'months', isVisible: true },
  { field: 'rating', label: 'Rating', type: 'range', min: 0, max: 5, unit: '★', isVisible: true }
];
