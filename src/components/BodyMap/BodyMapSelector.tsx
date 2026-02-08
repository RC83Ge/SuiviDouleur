import React from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { BodyMapSVG } from './BodyMapSVG';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      {/* View toggle */}
      <div className="flex bg-muted rounded-lg p-1 w-fit">
        <button
          type="button"
          onClick={() => setView('front')}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            view === 'front' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Face
        </button>
        <button
          type="button"
          onClick={() => setView('back')}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            view === 'back' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Dos
        </button>
      </div>

      <div className="flex gap-4">
        {/* Body map */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[200px] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent rounded-2xl -z-10" />
            <BodyMapSVG
              view={view}
              selectedZones={selectedZones}
              onZoneClick={handleZoneClick}
            />
          </div>
        </div>
        
        {/* Selected zones panel */}
        <div className="flex-1 min-w-[140px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Zones sélectionnées
              </span>
            </div>
            {selectedZones.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Effacer
              </button>
            )}
          </div>
          
          {selectedZones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 px-3 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Touchez le corps pour sélectionner les zones douloureuses
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground mb-2">
                {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée{selectedZones.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedZones.map((zone, index) => (
                  <span
                    key={zone}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium",
                      "bg-primary/10 text-primary border border-primary/20",
                      "hover:bg-primary/15 transition-all duration-200",
                      "animate-in fade-in-0 zoom-in-95"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {BODY_ZONE_LABELS[zone]}
                    <button
                      type="button"
                      onClick={() => handleZoneClick(zone)}
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200 -mr-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
