import React from 'react';

const PageFooter = () => {
  return (
    <footer className="border-t border-border bg-card py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          TopDisks.eu © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default PageFooter;
