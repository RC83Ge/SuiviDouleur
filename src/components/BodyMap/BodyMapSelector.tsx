import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { AnatomyFigure } from './AnatomyFigure';
import { BODY_PATHS, ZONE_LABELS, VIEW_META } from './bodyMapData';
import { ZoneSelectionSummary } from './ZoneSelectionSummary';
import { ZoneDetailSheet } from './ZoneDetailSheet';
import { Button } from '@/components/ui/button';
import { ZonePainDetails } from '@/types/pain';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneDetails: Record<string, ZonePainDetails>;
  onZoneDetailsChange: (zoneId: string, details: ZonePainDetails) => void;
}

type BodyView = 'front' | 'back';

const DEFAULT_ZONE_DETAILS: ZonePainDetails = {
  intensity: 5,
  painTypes: [],
  duration: 'minutes',
  triggerFactors: [],
  reliefFactors: [],
};

function intensityTone(level: number, isHovered = false) {
  const tone = Math.max(1, Math.min(10, Math.round(level)));
  return `hsl(var(--pain-${tone}) / ${isHovered ? '0.7' : '0.9'})`;
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneDetails,
  onZoneDetailsChange,
}: BodyMapSelectorProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [currentView, setCurrentView] = useState<BodyView>('front');
  const [isFlipping, setIsFlipping] = useState(false);
  const [sheetZone, setSheetZone] = useState<string | null>(null);

  const hoveredZones = hoveredZone ? [hoveredZone] : [];

  // Build zoneIntensities from zoneDetails for coloring
  const zoneIntensities: Record<string, number> = {};
  for (const [zoneId, details] of Object.entries(zoneDetails)) {
    zoneIntensities[zoneId] = details.intensity;
  }

  useEffect(() => {
    if (!activeZone && selectedZones.length > 0) {
      setActiveZone(selectedZones[selectedZones.length - 1]);
    }
    if (activeZone && !selectedZones.includes(activeZone)) {
      setActiveZone(selectedZones[selectedZones.length - 1] ?? null);
    }
  }, [activeZone, selectedZones]);

  const handleZoneClick = (zoneId: string) => {
    setActiveZone(zoneId);
    if (selectedZones.includes(zoneId)) {
      // Already selected → open the sheet to edit details
      setSheetZone(zoneId);
      return;
    }
    // New zone → add it with default details and open sheet
    onZonesChange([...selectedZones, zoneId]);
    onZoneDetailsChange(zoneId, zoneDetails[zoneId] ?? { ...DEFAULT_ZONE_DETAILS });
    setSheetZone(zoneId);
  };

  const handleRemoveZone = (zoneId: string) => {
    onZonesChange(selectedZones.filter((z) => z !== zoneId));
    if (sheetZone === zoneId) setSheetZone(null);
  };

  const clearAll = () => {
    setActiveZone(null);
    onZonesChange([]);
  };

  const flipView = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentView((v) => (v === 'front' ? 'back' : 'front'));
      setIsFlipping(false);
    }, 300);
  };

  const figureData = currentView === 'front'
    ? { title: VIEW_META.front.title, subtitle: VIEW_META.front.subtitle, imageSrc: bodyFront, zones: BODY_PATHS.front }
    : { title: VIEW_META.back.title, subtitle: VIEW_META.back.subtitle, imageSrc: bodyBack, zones: BODY_PATHS.back };

  const sheetDetails = sheetZone ? (zoneDetails[sheetZone] ?? { ...DEFAULT_ZONE_DETAILS }) : { ...DEFAULT_ZONE_DETAILS };

  return (
    <div className="space-y-1.5 sm:space-y-5">
      <div className="overflow-hidden rounded-lg border border-primary/10 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--card))_18%,hsl(var(--muted)/0.4))] shadow-medical-lg sm:rounded-[1.9rem]">
        <div className="flex items-center justify-end gap-1 px-2 py-1 sm:px-5 sm:py-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-6 rounded-full px-2 text-[9px] sm:h-8 sm:px-3 sm:text-xs"
            onClick={flipView}
            disabled={isFlipping}
          >
            <RotateCcw className={`mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ${isFlipping ? 'rotate-180' : ''}`} />
            {currentView === 'front' ? 'Voir le dos' : 'Voir la face'}
          </Button>
          <button
            type="button"
            onClick={() => setDebugMode((d) => !d)}
            className={`rounded-full p-1 transition-colors ${debugMode ? 'bg-primary/15 text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground'}`}
            aria-label="Mode debug"
            title="Mode debug"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/><path d="M20 8a8 8 0 1 0-16 0c0 7-3 9-3 9h22s-3-2-3-9"/></svg>
          </button>
        </div>

        <div className="space-y-1.5 px-1.5 py-1.5 sm:space-y-5 sm:px-5 sm:py-5">
          <div className="mx-auto max-w-[200px] sm:max-w-[300px]">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: isFlipping ? 'scale(0.95, 1) rotateY(90deg)' : 'scale(1) rotateY(0deg)' }}
            >
              <AnatomyFigure
                title={figureData.title}
                subtitle={figureData.subtitle}
                imageSrc={figureData.imageSrc}
                zones={figureData.zones}
                selectedZones={selectedZones}
                hoveredZones={hoveredZones}
                debugMode={debugMode}
                zoneIntensities={zoneIntensities}
                onZoneClick={handleZoneClick}
                onZoneHover={setHoveredZone}
                intensityTone={intensityTone}
              />
            </div>
          </div>

          <ZoneSelectionSummary
            activeZone={activeZone}
            draftIntensity={5}
            selectedZones={selectedZones}
            zoneIntensities={zoneIntensities}
            onClear={clearAll}
            onSelectZone={(zoneId) => {
              setActiveZone(zoneId);
              setSheetZone(zoneId);
            }}
          />
        </div>
      </div>

      <ZoneDetailSheet
        open={!!sheetZone}
        zoneId={sheetZone}
        details={sheetDetails}
        onDetailsChange={(details) => {
          if (sheetZone) onZoneDetailsChange(sheetZone, details);
        }}
        onClose={() => setSheetZone(null)}
        intensityTone={intensityTone}
      />
    </div>
  );
}
