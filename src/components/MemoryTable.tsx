
import React from 'react';
import { FilterConfig, SortConfig, OfferDevice } from '../types/memory';
import { getVisibleFilters } from '../utils/table-utils';
import TableHeader from './table/TableHeader';
import TableBody from './table/TableBody';

interface MemoryTableProps {
  offerDevices: OfferDevice[];
  filters: FilterConfig[];
  sortConfig: SortConfig;
  onSort: (field: string) => void;
  showOfferTitles: boolean;
  showInTerabytes: boolean;
}

const MemoryTable = ({ 
  offerDevices, 
  filters, 
  sortConfig, 
  onSort,
  showOfferTitles ,
  showInTerabytes
}: MemoryTableProps) => {
  const visibleFilters = getVisibleFilters(filters, showOfferTitles);

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse relative">
        <TableHeader 
          filters={filters} 
          sortConfig={sortConfig} 
          onSort={onSort} 
        />
        <TableBody 
          offerDevices={offerDevices} 
          visibleFilters={visibleFilters} 
          showOfferTitles={showOfferTitles} 
          showInTerabytes={showInTerabytes}
        />
      </table>
    </div>
  );
};

export default MemoryTable;
