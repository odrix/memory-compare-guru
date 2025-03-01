
import React from 'react';
import SearchBar from './SearchBar';

interface PageHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PageHeader = ({ searchTerm, setSearchTerm }: PageHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Memory Comparison</h1>
            <p className="text-muted-foreground mt-1">
              Compare hard drives, SSDs, and other storage devices
            </p>
          </div>
          
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
