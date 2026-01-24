import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 safe-area-inset">
      <div className="flex items-center gap-3 h-14 px-4 max-w-lg mx-auto">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-lg font-semibold text-foreground font-display">{title}</h1>
      </div>
    </header>
  );
}
