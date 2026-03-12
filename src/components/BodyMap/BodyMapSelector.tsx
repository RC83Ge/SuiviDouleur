import React, { useState, useCallback } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FRONT_PATHS, BACK_PATHS, ZonePath } from './svgPaths';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

type ViewTab = 'front' | 'back';

// Clean medical palette — neutral skin-tone inspired
const BODY_FILL = 'hsl(var(--muted))';
const BODY_STROKE = 'hsl(var(--border))';
const BODY_FILL_HOVER = 'hsl(var(--accent))';
const SELECTED_FILL = 'hsl(var(--primary))';
const SELECTED_STROKE = 'hsl(var(--primary))';

function BodyZonePath({
  zone,
  isSelected,
  onClick,
}: {
  zone: ZonePath;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <path
      d={zone.d}
      id={zone.id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'cursor-pointer transition-all duration-150',
        isSelected
          ? 'fill-primary stroke-primary'
          : hovered
          ? 'fill-accent stroke-border'
          : 'fill-muted stroke-border'
      )}
      strokeWidth="0.5"
      strokeLinejoin="round"
      style={{
        filter: isSelected ? 'drop-shadow(0 0 4px hsl(var(--primary) / 0.4))' : 'none',
      }}
    >
      <title>{zone.label}</title>
    </path>
  );
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');

  const handleZoneClick = useCallback(
    (zoneId: BodyZone) => {
      if (selectedZones.includes(zoneId)) {
        onZonesChange(selectedZones.filter((z) => z !== zoneId));
      } else {
        onZonesChange([...selectedZones, zoneId]);
      }
    },
    [selectedZones, onZonesChange]
  );

  const clearSelection = () => onZonesChange([]);
  const paths = view === 'front' ? FRONT_PATHS : BACK_PATHS;

  return (
    <div className="space-y-4">
      {/* SVG Body - centered */}
      <div className="flex flex-col items-center">
        <div className="w-[180px]">
          <svg
            viewBox="0 0 200 480"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ userSelect: 'none' }}
          >
            {paths.map((zone) => (
              <BodyZonePath
                key={zone.id + zone.d.slice(0, 20)}
                zone={zone}
                isSelected={selectedZones.includes(zone.id)}
                onClick={() => handleZoneClick(zone.id)}
              />
            ))}
          </svg>
        </div>

        {/* View toggle */}
        <div className="flex mt-3 bg-muted rounded-lg p-1 gap-0.5">
          {(['front', 'back'] as ViewTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setView(tab)}
              className={cn(
                'px-5 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
                view === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'front' ? 'Face' : 'Dos'}
            </button>
          ))}
        </div>
      </div>

      {/* Selected zones */}
      {selectedZones.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée
              {selectedZones.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((zone) => (
              <span
                key={zone}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25"
              >
                {BODY_ZONE_LABELS[zone]}
                <button
                  type="button"
                  onClick={() =>
                    onZonesChange(selectedZones.filter((z) => z !== zone))
                  }
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedZones.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Touchez une zone du corps pour localiser la douleur
        </p>
      )}
    </div>
  );
}
