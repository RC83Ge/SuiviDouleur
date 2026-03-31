import React, { useEffect, useState } from 'react';
import { RotateCcw, Stethoscope } from 'lucide-react';
import { AnatomyFigure } from './AnatomyFigure';
import { BODY_PATHS, ZONE_LABELS, VIEW_META } from './bodyMapData';
import { ZoneSelectionSummary } from './ZoneSelectionSummary';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: string, intensity: number) => void;
}

type BodyView = 'front' | 'back';

function intensityTone(level: number, isHovered = false) {
  const tone = Math.max(1, Math.min(10, Math.round(level)));
  return `hsl(var(--pain-${tone}) / ${isHovered ? '0.7' : '0.9'})`;
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneIntensities = {},
  onZoneIntensityChange,
}: BodyMapSelectorProps) {
  const [draftIntensity, setDraftIntensity] = useState(5);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [currentView, setCurrentView] = useState<BodyView>('front');
  const [isFlipping, setIsFlipping] = useState(false);

  const hoveredZones = hoveredZone ? [hoveredZone] : [];

  useEffect(() => {
    if (!activeZone && selectedZones.length > 0) {
      setActiveZone(selectedZones[selectedZones.length - 1]);
    }
    if (activeZone && !selectedZones.includes(activeZone)) {
      setActiveZone(selectedZones[selectedZones.length - 1] ?? null);
    }
  }, [activeZone, selectedZones]);

  useEffect(() => {
    if (activeZone) {
      setDraftIntensity(zoneIntensities[activeZone] ?? 5);
    }
  }, [activeZone, zoneIntensities]);

  const handleZoneClick = (zoneId: string) => {
    setActiveZone(zoneId);
    if (selectedZones.includes(zoneId)) {
      onZonesChange(selectedZones.filter((zone) => zone !== zoneId));
      return;
    }
    onZonesChange([...selectedZones, zoneId]);
    onZoneIntensityChange?.(zoneId, zoneIntensities[zoneId] ?? draftIntensity);
  };

  const handleIntensityChange = (value: number[]) => {
    const nextValue = value[0] ?? 5;
    setDraftIntensity(nextValue);
    if (activeZone && selectedZones.includes(activeZone)) {
      onZoneIntensityChange?.(activeZone, nextValue);
    }
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

  const currentIntensity = activeZone ? zoneIntensities[activeZone] ?? draftIntensity : draftIntensity;

  const figureData = currentView === 'front'
    ? { title: VIEW_META.front.title, subtitle: VIEW_META.front.subtitle, imageSrc: bodyFront, zones: BODY_PATHS.front }
    : { title: VIEW_META.back.title, subtitle: VIEW_META.back.subtitle, imageSrc: bodyBack, zones: BODY_PATHS.back };

  return (
    <div className="space-y-2 sm:space-y-5">
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--card))_18%,hsl(var(--muted)/0.4))] shadow-medical-lg sm:rounded-[1.9rem]">
        <div className="flex items-center justify-between border-b border-border/70 bg-card/80 px-2.5 py-1.5 backdrop-blur-sm sm:px-5 sm:py-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:gap-2 sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.22em]">
            <Stethoscope className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Sélection anatomique
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 rounded-full px-2 text-[9px] sm:h-7 sm:px-2.5 sm:text-[10px]"
              onClick={flipView}
              disabled={isFlipping}
            >
              <RotateCcw className={`mr-1 h-3 w-3 transition-transform duration-300 ${isFlipping ? 'rotate-180' : ''}`} />
              {currentView === 'front' ? 'Dos' : 'Face'}
            </Button>
            <button
              type="button"
              onClick={() => setDebugMode((d) => !d)}
              className={`rounded-full p-1 transition-colors sm:p-1.5 ${debugMode ? 'bg-primary/15 text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground'}`}
              aria-label="Activer le mode debug"
              title="Mode debug"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/><path d="M20 8a8 8 0 1 0-16 0c0 7-3 9-3 9h22s-3-2-3-9"/></svg>
            </button>
          </div>
        </div>

        <div className="space-y-2 px-2 py-2 sm:space-y-5 sm:px-5 sm:py-5">
          <div className="mx-auto max-w-[320px] sm:max-w-[360px]" style={{ perspective: '800px' }}>
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: currentView === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div style={{ backfaceVisibility: 'hidden' }}>
                {isFront && (
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
                )}
                {!isFront && (
                  <div style={{ transform: 'rotateY(180deg)' }}>
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
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/95 p-2 shadow-medical-sm backdrop-blur-sm sm:rounded-[1.5rem] sm:p-4">
            <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-4">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">Intensité</p>
                <p className="truncate text-[11px] font-medium text-foreground sm:text-sm">
                  {activeZone ? ZONE_LABELS[activeZone] ?? activeZone : 'Sélectionnez une zone'}
                </p>
              </div>
              <div className="flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground shadow-medical-sm sm:h-11 sm:min-w-11 sm:rounded-2xl sm:px-0 sm:text-base">
                {currentIntensity}
              </div>
            </div>

            <Slider
              min={1}
              max={10}
              step={1}
              value={[currentIntensity]}
              onValueChange={handleIntensityChange}
              disabled={!activeZone || !selectedZones.includes(activeZone)}
              className="py-0.5"
            />

            <div className="mt-1 flex justify-between text-[9px] text-muted-foreground sm:text-[10px]">
              <span>1 léger</span>
              <span>10 intense</span>
            </div>
          </div>

          <ZoneSelectionSummary
            activeZone={activeZone}
            draftIntensity={draftIntensity}
            selectedZones={selectedZones}
            zoneIntensities={zoneIntensities}
            onClear={clearAll}
            onSelectZone={setActiveZone}
          />
        </div>
      </div>
    </div>
  );
}
