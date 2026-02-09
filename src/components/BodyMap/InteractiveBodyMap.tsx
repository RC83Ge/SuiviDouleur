import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FrontViewSVG, FRONT_ZONES } from './FrontViewSVG';
import { BackViewSVG, BACK_ZONES } from './BackViewSVG';

type BodyView = 'front' | 'back';

// Body outline that matches the zone paths — viewBox 0 0 200 470
const BODY_OUTLINE =
  'M100,0 Q114,0 114,8 L114,32 Q114,46 108,48 L108,56 Q136,56 148,62 Q156,64 158,72 L162,120 L166,170 L170,198 L160,202 L154,172 L150,132 L136,132 L134,195 Q134,207 130,208 L132,260 L130,320 L128,370 L126,432 L128,457 Q128,470 118,470 Q108,470 108,457 L108,432 L106,370 L104,320 L102,260 L100,208 L98,260 L96,320 L94,370 L92,432 L92,457 Q92,470 82,470 Q72,470 72,457 L74,432 L72,370 L70,320 L68,260 L66,208 Q66,207 70,205 L66,195 L66,132 L50,132 L46,172 L40,202 L30,198 L34,170 L38,120 L42,72 Q44,64 52,62 Q64,56 92,56 L92,48 Q86,46 86,32 L86,8 Q86,0 100,0 Z';

const ALL_LABELS: Record<string, string> = {};
[...FRONT_ZONES, ...BACK_ZONES].forEach(z => { ALL_LABELS[z.id] = z.label; });

interface InteractiveBodyMapProps {
  selectedZones?: string[];
  onZoneSelect?: (zone: string) => void;
  className?: string;
}

export function InteractiveBodyMap({
  selectedZones: externalSelected,
  onZoneSelect,
  className,
}: InteractiveBodyMapProps) {
  const [view, setView] = useState<BodyView>('front');
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const selectedZones = externalSelected ?? internalSelected;

  const handleZoneClick = (zone: string) => {
    if (onZoneSelect) {
      onZoneSelect(zone);
    } else {
      setInternalSelected(prev =>
        prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
      );
    }
  };

  const displayedZone =
    hoveredZone ?? (selectedZones.length > 0 ? selectedZones[selectedZones.length - 1] : null);

  const views: { id: BodyView; label: string }[] = [
    { id: 'front', label: 'Face' },
    { id: 'back', label: 'Dos' },
  ];

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* View toggle */}
      <div className="flex bg-muted rounded-xl p-1 gap-0.5">
        {views.map(v => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              view === v.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* SVG Body */}
      <div className="w-full max-w-[260px] mx-auto">
        <svg
          viewBox="0 0 200 475"
          className="w-full h-auto select-none"
          style={{ touchAction: 'manipulation' }}
        >
          <defs>
            <filter id="selectedGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feFlood floodColor="hsl(210, 80%, 60%)" floodOpacity="0.45" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hoverGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="hsl(210, 70%, 65%)" floodOpacity="0.3" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body silhouette */}
          <path
            d={BODY_OUTLINE}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="pointer-events-none"
          />

          {/* Interactive zones */}
          {view === 'front' ? (
            <FrontViewSVG
              selectedZones={selectedZones}
              hoveredZone={hoveredZone}
              onZoneClick={handleZoneClick}
              onZoneHover={setHoveredZone}
            />
          ) : (
            <BackViewSVG
              selectedZones={selectedZones}
              hoveredZone={hoveredZone}
              onZoneClick={handleZoneClick}
              onZoneHover={setHoveredZone}
            />
          )}
        </svg>
      </div>

      {/* Selected zone label */}
      <div className="h-10 flex items-center justify-center">
        {displayedZone ? (
          <div
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
              'bg-primary/10 text-primary border border-primary/20',
              'animate-in fade-in-0 zoom-in-95'
            )}
          >
            📍 {ALL_LABELS[displayedZone] || displayedZone}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Touchez une zone pour la sélectionner
          </p>
        )}
      </div>

      {/* Multi-selection badges */}
      {selectedZones.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {selectedZones.map(z => (
            <span
              key={z}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/15"
            >
              {ALL_LABELS[z] || z}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
