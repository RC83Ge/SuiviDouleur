import React, { useState, useCallback } from 'react';
import Body, { ExtendedBodyPart } from '@mjcdev/react-body-highlighter';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: string, intensity: number) => void;
}

type ViewTab = 'front' | 'back';

// Build a composite key: "muscle" or "muscle-left" / "muscle-right"
function zoneKey(slug: string, side?: string): string {
  if (!side || side === 'none') return slug;
  return `${slug}-${side}`;
}

function parseZoneKey(key: string): { slug: string; side?: 'left' | 'right' } {
  if (key.endsWith('-left')) return { slug: key.replace(/-left$/, ''), side: 'left' };
  if (key.endsWith('-right')) return { slug: key.replace(/-right$/, ''), side: 'right' };
  return { slug: key };
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneIntensities = {},
  onZoneIntensityChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');

  const handleClick = useCallback(
    (bodyPart: ExtendedBodyPart, side?: string) => {
      const key = zoneKey(bodyPart.slug, side);
      if (selectedZones.includes(key)) {
        onZonesChange(selectedZones.filter((z) => z !== key));
      } else {
        onZonesChange([...selectedZones, key]);
        onZoneIntensityChange?.(key, 5);
      }
    },
    [selectedZones, onZonesChange, onZoneIntensityChange]
  );

  // Build data for the highlighter with side info
  const data: ExtendedBodyPart[] = selectedZones.map((key) => {
    const { slug, side } = parseZoneKey(key);
    return { slug, intensity: 1, side } as ExtendedBodyPart;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Body model */}
      <div className="w-[160px]">
        <Body
          data={data}
          onBodyPartClick={handleClick}
          side={view === 'front' ? 'front' : 'back'}
          scale={1.7}
          border="#dfdfdf"
          highlightedColors={['#93c5fd']}
        />
      </div>

      {/* Toggle buttons */}
      <div className="flex gap-2">
        {(['front', 'back'] as ViewTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setView(tab)}
            className={cn(
              'px-6 py-2 rounded-lg text-sm font-semibold transition-all',
              view === tab
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {tab === 'front' ? 'Face' : 'Dos'}
          </button>
        ))}
      </div>

      {/* Selected zones badges */}
      {selectedZones.length > 0 && (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée{selectedZones.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={() => onZonesChange([])}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground border border-border"
              >
                {key}
                <span
                  onClick={() => onZonesChange(selectedZones.filter((z) => z !== key))}
                  className="ml-0.5 p-0.5 rounded-full hover:bg-destructive/20 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
