
import { FilterConfig } from '../types/memory';

// Desired column order: Capacité (GB), Capacité (TB), Prix, Euro/GB, Euro/TB, Marque, Technologie, Vitesse lecture, Vitesse écriture, RPM, Cache, Format, Type, Interface, Poids, Garantie, Évaluation, Lien affilié
export const columnOrder = [
  'capacityGB', 'capacityTB', 'price', 'euroPerGB', 'euroPerTB', 'brand', 'technology', 'readSpeed', 'writeSpeed', 'rpm',
  'cache', 'format', 'type', 'interface', 'weight', 'warranty', 'rating', 'affiliateLink'
];

export const getVisibleFilters = (filters: FilterConfig[], showOfferTitles: boolean): FilterConfig[] => {
  let visFilters = filters
    .filter(filter => filter.isVisible)
    .sort((a, b) => {
      const indexA = columnOrder.indexOf(a.field);
      const indexB = columnOrder.indexOf(b.field);
      return indexA - indexB;
    });

  // Add URL column if it's not already there and titles are not shown
  if (!showOfferTitles) {
    const hasUrlColumn = visFilters.some(f => f.field === 'offerUrl');
    if (!hasUrlColumn) {
      visFilters.push({
        field: 'offerUrl',
        label: 'URL',
        type: 'text',
        isVisible: true
      });
    }
  }

  // Always add affiliate link column at the end
  const hasAffiliateColumn = visFilters.some(f => f.field === 'affiliateLink');
  if (!hasAffiliateColumn) {
    visFilters.push({
      field: 'affiliateLink',
      label: 'Lien affilié',
      type: 'text',
      isVisible: true
    });
  }

  return visFilters;
};
