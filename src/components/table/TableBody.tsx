
import React from 'react';
import { OfferDevice, FilterConfig } from '../../types/memory';
import TableRow from './TableRow';

interface TableBodyProps {
  offerDevices: OfferDevice[];
  visibleFilters: FilterConfig[];
  showOfferTitles: boolean;
}

const TableBody = ({ offerDevices, visibleFilters, showOfferTitles }: TableBodyProps) => {
  if (offerDevices.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={visibleFilters.length} className="px-4 py-8 text-center text-muted-foreground">
            No devices match your filters
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {offerDevices.map((offerDevice, index) => (
        <TableRow
          key={`${offerDevice.device.id}-${offerDevice.offer.id}`}
          offerDevice={offerDevice}
          visibleFilters={visibleFilters}
          index={index}
          showOfferTitles={showOfferTitles}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
