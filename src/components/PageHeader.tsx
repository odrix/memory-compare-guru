import React from 'react';
import { Database } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

const PageHeader = () => {
  return (
    <header className="bg-card sticky top-0 z-50 w-full border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo_small.png" alt="Logo" className="h-14" title='TopDisks.eu' />
          <div className="flex flex-col">- </div>
          <span className="text-sm">Comparateur de disques et mémoires</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
