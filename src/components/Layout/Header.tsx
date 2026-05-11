import React from 'react';
import appLogo from '@/assets/app-logo-final.png';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 safe-area-inset">
      <div className="flex items-center gap-3 h-14 px-4 max-w-lg mx-auto">
        <img
          src={appLogo}
          alt="Pain Mapper logo"
          className="w-9 h-9 rounded-xl object-cover"
        />
        <h1 className="text-lg font-semibold text-foreground font-display">{title}</h1>
      </div>
    </header>
  );
}
