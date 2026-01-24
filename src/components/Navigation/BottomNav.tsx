import React from 'react';
import { Home, Plus, BookOpen, BarChart3 } from 'lucide-react';

export type NavTab = 'home' | 'add' | 'journal' | 'stats';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as NavTab, icon: Home, label: 'Accueil' },
    { id: 'add' as NavTab, icon: Plus, label: 'Ajouter', special: true },
    { id: 'journal' as NavTab, icon: BookOpen, label: 'Journal' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-inset z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.special) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative -top-4 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-medical-lg transition-transform hover:scale-105 active:scale-95"
                aria-label={tab.label}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={tab.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
