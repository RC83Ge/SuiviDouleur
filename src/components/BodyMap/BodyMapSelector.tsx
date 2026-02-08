import React from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { BodyMapSVG } from './BodyMapSVG';
import { RotateCcw } from 'lucide-react';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = React.useState<BodyView>('front');

  const handleZoneClick = (zone: BodyZone) => {
    if (selectedZones.includes(zone)) {
      onZonesChange(selectedZones.filter(z => z !== zone));
    } else {
      onZonesChange([...selectedZones, zone]);
    }
  };

  const clearSelection = () => {
    onZonesChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setView(view === 'front' ? 'back' : 'front')}
          className="btn-medical bg-secondary text-secondary-foreground text-xs px-3 py-1.5 gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {view === 'front' ? 'Voir dos' : 'Voir face'}
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[200px]">
            <BodyMapSVG
              view={view}
              selectedZones={selectedZones}
              onZoneClick={handleZoneClick}
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[140px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Zones sélectionnées
            </span>
            {selectedZones.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Effacer
              </button>
            )}
          </div>
          
          {selectedZones.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Touchez le corps pour sélectionner les zones douloureuses
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {selectedZones.map(zone => (
                <span
                  key={zone}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {BODY_ZONE_LABELS[zone]}
                  <button
                    type="button"
                    onClick={() => handleZoneClick(zone)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
