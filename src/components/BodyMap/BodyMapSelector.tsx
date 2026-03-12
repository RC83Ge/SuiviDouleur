import React, { useState, useCallback } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FRONT_PATHS, BACK_PATHS, ZonePath } from './svgPaths';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

function BodyZonePath({
  zone,
  isSelected,
  onClick,
}: {
  zone: ZonePath;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <path
            d={zone.d}
            id={zone.id}
            onClick={onClick}
            className="cursor-pointer transition-all duration-150"
            fill={isSelected ? 'rgba(239, 68, 68, 0.55)' : '#E5E7EB'}
            stroke={isSelected ? '#DC2626' : '#9CA3AF'}
            strokeWidth={isSelected ? '1.2' : '0.6'}
            style={{ filter: isSelected ? 'drop-shadow(0 0 3px rgba(239,68,68,0.4))' : 'none' }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.setAttribute('fill', '#D1D5DB');
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.setAttribute('fill', '#E5E7EB');
              }
            }}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {zone.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<BodyView>('front');

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
    <div className="space-y-3">
      <div className="flex gap-3">
        {/* SVG Body */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[150px]">
            <svg
              viewBox="0 0 200 430"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              style={{ userSelect: 'none' }}
            >
              {/* Background silhouette outline for depth */}
              <defs>
                <filter id="innerShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                  <feOffset dx="0" dy="1" />
                  <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
                  <feFlood floodColor="#9CA3AF" floodOpacity="0.3" />
                  <feComposite in2="shadowDiff" operator="in" />
                  <feComposite in="SourceGraphic" operator="over" />
                </filter>
              </defs>
              <g filter="url(#innerShadow)">
                {paths.map((zone) => (
                  <BodyZonePath
                    key={zone.id}
                    zone={zone}
                    isSelected={selectedZones.includes(zone.id)}
                    onClick={() => handleZoneClick(zone.id)}
                  />
                ))}
              </g>
            </svg>
          </div>

          <Tabs
            value={view}
            onValueChange={(v) => setView(v as BodyView)}
            className="mt-2"
          >
            <TabsList className="h-8">
              <TabsTrigger value="front" className="text-xs px-4">
                Face
              </TabsTrigger>
              <TabsTrigger value="back" className="text-xs px-4">
                Dos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Selected zones panel */}
        <div className="flex-1 min-w-[130px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Zones sélectionnées
              </span>
            </div>
            {selectedZones.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200 flex items-center gap-0.5"
              >
                <X className="w-3 h-3" />
                Effacer
              </button>
            )}
          </div>

          {selectedZones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-4 px-2 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Touchez le corps pour sélectionner les zones douloureuses
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-xs text-muted-foreground">
                {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''}{' '}
                sélectionnée{selectedZones.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedZones.map((zone, index) => (
                  <span
                    key={zone}
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium',
                      'bg-primary/10 text-primary border border-primary/20',
                      'hover:bg-primary/15 transition-all duration-200',
                      'animate-in fade-in-0 zoom-in-95'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {BODY_ZONE_LABELS[zone]}
                    <button
                      type="button"
                      onClick={() =>
                        onZonesChange(selectedZones.filter((z) => z !== zone))
                      }
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                    >
                      <X className="w-2.5 h-2.5" />
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
