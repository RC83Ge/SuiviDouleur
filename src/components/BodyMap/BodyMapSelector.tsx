import React, { useState, useCallback } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FRONT_PATHS, BACK_PATHS, ZonePath } from './svgPaths';
import { PainIntensitySheet, getIntensityColor } from './PainIntensitySheet';

export interface ZonePainData {
  zoneId: BodyZone;
  painLevel: number;
  bodySide: 'front' | 'back';
}

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: BodyZone, intensity: number) => void;
}

type ViewTab = 'front' | 'back';

// Determine which view a zone belongs to
const FRONT_ZONE_IDS = new Set(FRONT_PATHS.map((p) => p.id));
const BACK_ZONE_IDS = new Set(BACK_PATHS.map((p) => p.id));

function getZoneSide(zoneId: BodyZone): 'front' | 'back' {
  if (FRONT_ZONE_IDS.has(zoneId)) return 'front';
  return 'back';
}

function BodyZonePath({
  zone,
  isSelected,
  intensity,
  onClick,
}: {
  zone: ZonePath;
  isSelected: boolean;
  intensity: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const fillColor = isSelected
    ? getIntensityColor(intensity)
    : undefined;

  return (
    <path
      d={zone.d}
      id={zone.id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'cursor-pointer transition-all duration-200',
        !isSelected && !hovered && 'fill-muted stroke-border',
        !isSelected && hovered && 'fill-accent stroke-border',
      )}
      fill={isSelected ? fillColor : undefined}
      stroke={isSelected ? fillColor : undefined}
      strokeWidth="0.5"
      strokeLinejoin="round"
      style={{
        fillOpacity: isSelected ? 0.85 : undefined,
        filter: isSelected
          ? `drop-shadow(0 0 5px ${getIntensityColor(intensity)}66)`
          : 'none',
      }}
    >
      <title>{zone.label}</title>
    </path>
  );
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneIntensities = {},
  onZoneIntensityChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');
  const [activeSheet, setActiveSheet] = useState<BodyZone | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewChange = useCallback((newView: ViewTab) => {
    if (newView === view) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setView(newView);
      setIsTransitioning(false);
    }, 150);
  }, [view]);

  const handleZoneClick = useCallback(
    (zoneId: BodyZone) => {
      if (selectedZones.includes(zoneId)) {
        // Already selected — open intensity sheet
        setActiveSheet(zoneId);
      } else {
        // Select the zone with default intensity
        onZonesChange([...selectedZones, zoneId]);
        onZoneIntensityChange?.(zoneId, 5);
        setActiveSheet(zoneId);
      }
    },
    [selectedZones, onZonesChange, onZoneIntensityChange]
  );

  const handleRemoveZone = useCallback(
    (zoneId: BodyZone) => {
      onZonesChange(selectedZones.filter((z) => z !== zoneId));
      if (activeSheet === zoneId) setActiveSheet(null);
    },
    [selectedZones, onZonesChange, activeSheet]
  );

  const clearSelection = () => {
    onZonesChange([]);
    setActiveSheet(null);
  };

  const paths = view === 'front' ? FRONT_PATHS : BACK_PATHS;

  // Count zones per side for the badges
  const frontCount = selectedZones.filter((z) => FRONT_ZONE_IDS.has(z)).length;
  const backCount = selectedZones.filter((z) => BACK_ZONE_IDS.has(z)).length;

  return (
    <div className="space-y-4">
      {/* View toggle — top */}
      <div className="flex justify-center">
        <div className="flex bg-muted rounded-xl p-1 gap-0.5">
          {(['front', 'back'] as ViewTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleViewChange(tab)}
              className={cn(
                'relative px-6 py-2 text-xs font-semibold rounded-lg transition-all duration-200',
                view === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'front' ? 'Face' : 'Dos'}
              {/* Badge count */}
              {((tab === 'front' && frontCount > 0) ||
                (tab === 'back' && backCount > 0)) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                  {tab === 'front' ? frontCount : backCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Body — centered with fade transition */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-[200px] transition-all duration-150',
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          )}
        >
          <svg
            viewBox="0 0 200 480"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ userSelect: 'none', touchAction: 'manipulation' }}
          >
            {paths.map((zone) => (
              <BodyZonePath
                key={zone.id + view}
                zone={zone}
                isSelected={selectedZones.includes(zone.id)}
                intensity={zoneIntensities[zone.id] ?? 5}
                onClick={() => handleZoneClick(zone.id)}
              />
            ))}
          </svg>
        </div>

        {/* View label */}
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">
          {view === 'front' ? 'Vue de face' : 'Vue de dos'}
        </p>
      </div>

      {/* Selected zones list */}
      {selectedZones.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée
              {selectedZones.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              Effacer tout
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((zone) => {
              const intensity = zoneIntensities[zone] ?? 5;
              const color = getIntensityColor(intensity);
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setActiveSheet(zone)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: `${color}18`,
                    color: color,
                    borderColor: `${color}40`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {BODY_ZONE_LABELS[zone]}
                  <span className="font-bold">{intensity}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveZone(zone);
                    }}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedZones.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Touchez une zone du corps pour localiser la douleur
        </p>
      )}

      {/* Pain Intensity Bottom Sheet */}
      <PainIntensitySheet
        zoneId={activeSheet}
        intensity={activeSheet ? (zoneIntensities[activeSheet] ?? 5) : 5}
        onIntensityChange={(val) => {
          if (activeSheet) {
            onZoneIntensityChange?.(activeSheet, val);
          }
        }}
        onClose={() => setActiveSheet(null)}
      />
    </div>
  );
}

/** Helper to export zone data in the requested format */
export function getZonePainData(
  selectedZones: BodyZone[],
  zoneIntensities: Record<string, number>
): ZonePainData[] {
  return selectedZones.map((zoneId) => ({
    zoneId,
    painLevel: zoneIntensities[zoneId] ?? 0,
    bodySide: getZoneSide(zoneId),
  }));
}
