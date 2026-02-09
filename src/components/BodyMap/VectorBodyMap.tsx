import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type BodyViewMode = 'avant' | 'gauche' | 'droite';

interface BodyZoneData {
  id: string;
  label: string;
  path: string;
}

const FRONT_ZONES: BodyZoneData[] = [
  {
    id: 'head',
    label: 'Tête',
    path: 'M148,8 C148,8 130,10 122,28 C116,42 116,58 120,70 C124,80 132,90 148,94 C164,90 172,80 176,70 C180,58 180,42 174,28 C166,10 148,8 148,8 Z',
  },
  {
    id: 'neck',
    label: 'Cou',
    path: 'M136,94 L136,116 C136,120 140,124 148,124 C156,124 160,120 160,116 L160,94 C156,96 152,98 148,98 C144,98 140,96 136,94 Z',
  },
  {
    id: 'chest',
    label: 'Thorax',
    path: 'M104,124 L192,124 L196,130 C200,140 202,160 200,180 L196,194 L148,200 L100,194 L96,180 C94,160 96,140 100,130 Z',
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    path: 'M100,194 L196,194 L194,230 C192,250 188,268 184,280 L148,290 L112,280 C108,268 104,250 102,230 Z',
  },
  {
    id: 'left-arm',
    label: 'Bras gauche',
    path: 'M96,124 L80,128 C72,132 64,148 60,170 L56,210 L54,260 C52,280 54,300 56,310 L62,310 C64,300 66,280 68,260 L72,210 L76,170 C78,156 82,140 88,132 L96,126 Z',
  },
  {
    id: 'right-arm',
    label: 'Bras droit',
    path: 'M200,124 L216,128 C224,132 232,148 236,170 L240,210 L242,260 C244,280 242,300 240,310 L234,310 C232,300 230,280 228,260 L224,210 L220,170 C218,156 214,140 208,132 L200,126 Z',
  },
  {
    id: 'left-leg',
    label: 'Jambe gauche',
    path: 'M112,280 L148,290 L146,320 L140,370 L136,420 L132,470 L128,500 L124,530 C122,545 120,555 118,560 L110,560 C110,550 112,535 114,520 L118,470 L120,420 L118,370 L114,320 L110,290 Z',
  },
  {
    id: 'right-leg',
    label: 'Jambe droite',
    path: 'M184,280 L148,290 L150,320 L156,370 L160,420 L164,470 L168,500 L172,530 C174,545 176,555 178,560 L186,560 C186,550 184,535 182,520 L178,470 L176,420 L178,370 L182,320 L186,290 Z',
  },
];

interface VectorBodyMapProps {
  className?: string;
}

export function VectorBodyMap({ className }: VectorBodyMapProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<BodyViewMode>('avant');

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(prev => (prev === zoneId ? null : zoneId));
  };

  const selectedLabel = FRONT_ZONES.find(z => z.id === selectedZone)?.label;

  return (
    <div className={cn('flex flex-col items-center gap-4 w-full max-w-sm mx-auto', className)}>
      {/* View toggle */}
      <div className="flex bg-muted rounded-xl p-1 gap-1">
        {(['avant', 'gauche', 'droite'] as BodyViewMode[]).map(mode => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-lg capitalize transition-all duration-200',
              viewMode === mode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Body SVG */}
      <div className="relative w-full aspect-[3/5] max-w-[280px]">
        {viewMode === 'avant' ? (
          <svg
            viewBox="40 0 216 570"
            className="w-full h-full select-none"
            style={{ touchAction: 'manipulation' }}
          >
            <defs>
              <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor="hsl(199, 89%, 48%)" floodOpacity="0.45" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-hover" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="hsl(199, 70%, 70%)" floodOpacity="0.3" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="bodyFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(210, 20%, 92%)" />
                <stop offset="100%" stopColor="hsl(210, 15%, 86%)" />
              </linearGradient>
            </defs>

            {/* Body outline silhouette background */}
            <path
              d="M148,8 C130,10 122,28 116,42 C112,55 114,70 120,82 L120,70 C116,58 116,42 122,28 C130,10 148,8 148,8 C148,8 166,10 174,28 C180,42 180,58 176,70 L176,82 C182,70 184,55 180,42 C174,28 166,10 148,8 Z"
              fill="none"
              stroke="hsl(210, 20%, 82%)"
              strokeWidth="0.5"
              opacity="0.3"
            />

            {FRONT_ZONES.map(zone => {
              const isSelected = selectedZone === zone.id;
              const isHovered = hoveredZone === zone.id;

              return (
                <path
                  key={zone.id}
                  d={zone.path}
                  className="cursor-pointer transition-all duration-200"
                  fill={
                    isSelected
                      ? 'hsl(199, 89%, 48%)'
                      : isHovered
                        ? 'hsl(199, 70%, 70%)'
                        : 'hsl(210, 20%, 92%)'
                  }
                  fillOpacity={isSelected ? 0.5 : isHovered ? 0.35 : 0.6}
                  stroke={
                    isSelected
                      ? 'hsl(199, 89%, 48%)'
                      : isHovered
                        ? 'hsl(199, 60%, 60%)'
                        : 'hsl(210, 15%, 78%)'
                  }
                  strokeWidth={isSelected ? 2 : 1}
                  strokeLinejoin="round"
                  filter={isSelected ? 'url(#glow-blue)' : isHovered ? 'url(#glow-hover)' : undefined}
                  onClick={() => handleZoneClick(zone.id)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onTouchStart={() => setHoveredZone(zone.id)}
                  onTouchEnd={() => setHoveredZone(null)}
                />
              );
            })}
          </svg>
        ) : (
          <div className="flex items-center justify-center h-full bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20">
            <p className="text-sm text-muted-foreground">
              Vue «&nbsp;{viewMode}&nbsp;» — bientôt disponible
            </p>
          </div>
        )}
      </div>

      {/* Selected zone display */}
      <div className="h-10 flex items-center justify-center">
        {selectedLabel ? (
          <div className="animate-scale-in flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{selectedLabel}</span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Touchez une zone pour la sélectionner
          </p>
        )}
      </div>
    </div>
  );
}
