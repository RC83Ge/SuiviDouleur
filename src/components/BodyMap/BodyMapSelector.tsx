import React, { useState, useCallback } from 'react';
import Model, { IExerciseData, IMuscleStats, Muscle } from 'react-body-highlighter';
import { cn } from '@/lib/utils';

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: string, intensity: number) => void;
}

type ViewTab = 'front' | 'back';

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneIntensities = {},
  onZoneIntensityChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');

  const handleClick = useCallback(
    ({ muscle }: IMuscleStats) => {
      if (selectedZones.includes(muscle)) {
        onZonesChange(selectedZones.filter((z) => z !== muscle));
      } else {
        onZonesChange([...selectedZones, muscle]);
        onZoneIntensityChange?.(muscle, 5);
      }
    },
    [selectedZones, onZonesChange, onZoneIntensityChange]
  );

  // Build data array for the highlighter
  const data: IExerciseData[] = selectedZones.map((muscle) => ({
    name: muscle,
    muscles: [muscle as Muscle],
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Body model */}
      <div className="w-[220px]">
        <Model
          data={data}
          style={{ width: '100%', padding: '0' }}
          onClick={handleClick}
          type={view === 'front' ? 'anterior' : 'posterior'}
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

      {/* Selected zones info */}
      {selectedZones.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée{selectedZones.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
