
import React from 'react';
import { OfferDevice, FilterConfig } from '../../types/memory';
import TableCell from './TableCell';
import { Button } from '../ui/button';
import { getDeviceTitle } from '../../utils/utils';

interface TableRowProps {
  offerDevice: OfferDevice;
  visibleFilters: FilterConfig[];
  index: number;
  showOfferTitles: boolean;
  showInTerabytes: boolean;
}

const TableRow = ({ offerDevice, visibleFilters, index, showOfferTitles, showInTerabytes }: TableRowProps) => {
  const { device, offer } = offerDevice;
  const deviceTitle = getDeviceTitle(offerDevice);
  
  return (
    <React.Fragment>
      {showOfferTitles && (
        <tr className="bg-muted/5 border-t border-border">
          <td colSpan={visibleFilters.length} className="px-1 pt-1 relative">
            <div className="flex justify-between items-center">
              <span className="text-xxs text-muted-foreground font-medium uppercase sticky left-0 bg-muted/5 pr-2 py-1 z-10">
                {deviceTitle}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs sticky right-0 bg-muted/5 py-1 z-10 text-blue-500 hover:text-blue-700"
                asChild
              >
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Voir l'offre
                </a>
              </Button>
            </div>
          </td>
        </tr>
      )}
      <tr
        className={`
          border-b border-border hover:bg-muted/20 transition-colors
          ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
          ${!showOfferTitles ? 'border-t border-border' : ''}
        `}
      >
        {visibleFilters.map((filter) => (
          <td key={`${device.id}-${offer.id}-${filter.field}`} className="px-4 py-4 text-sm">
            <TableCell offerDevice={offerDevice} field={filter.field} unit={filter.unit} />
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
};

export default TableRow;
