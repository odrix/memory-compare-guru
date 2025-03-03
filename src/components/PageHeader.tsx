import React from 'react';
import { Database } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

const PageHeader = () => {
  return (
    <header className="bg-card sticky top-0 z-50 w-full border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Explorateur de Mémoire</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
