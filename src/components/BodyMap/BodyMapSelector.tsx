import React, { useEffect, useState } from 'react';
import { RotateCcw, Stethoscope } from 'lucide-react';
import { AnatomyFigure } from './AnatomyFigure';
import { BODY_PATHS, ZONE_GROUPS, ZONE_LABELS, VIEW_META } from './bodyMapData';
import { ZoneSelectionSummary } from './ZoneSelectionSummary';
import { Switch } from '@/components/ui/switch';
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
  const [mobileView, setMobileView] = useState<BodyView>('front');

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

  const toggleMobileView = () => {
    setMobileView((current) => (current === 'front' ? 'back' : 'front'));
  };

  const selectedGroups = ZONE_GROUPS.filter((group) =>
    group.zones.some((zone) => selectedZones.includes(zone))
  );

  const currentIntensity = activeZone ? zoneIntensities[activeZone] ?? draftIntensity : draftIntensity;
  const mobileFigure =
    mobileView === 'front'
      ? {
          title: VIEW_META.front.title,
          subtitle: VIEW_META.front.subtitle,
          imageSrc: bodyFront,
          zones: BODY_PATHS.front,
        }
      : {
          title: VIEW_META.back.title,
          subtitle: VIEW_META.back.subtitle,
          imageSrc: bodyBack,
          zones: BODY_PATHS.back,
        };

  return (
    <div className="space-y-3 sm:space-y-5">
      <div className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--card))_18%,hsl(var(--muted)/0.4))] shadow-medical-lg sm:rounded-[1.9rem]">
        <div className="border-b border-border/70 bg-card/80 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5">
          <div className="flex flex-col gap-3 sm:gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:px-3 sm:text-[11px] sm:tracking-[0.22em]">
                <Stethoscope className="h-3.5 w-3.5" />
                Sélection anatomique
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold leading-tight text-foreground sm:text-xl">
                  Déclarez une douleur par zone
                </h3>
                <p className="max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  Touchez le mannequin pour sélectionner une zone, puis ajustez l’intensité de 1 à 10.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/80 bg-background/90 px-3 py-2 shadow-medical-sm sm:justify-start sm:rounded-[1.25rem]">
              <div>
                <p className="text-xs font-medium text-foreground sm:text-sm">Mode debug</p>
                <p className="text-[11px] leading-4 text-muted-foreground sm:text-xs">Contours et repères d’alignement</p>
              </div>
              <Switch checked={debugMode} onCheckedChange={setDebugMode} aria-label="Activer le mode debug" />
            </div>
          </div>
        </div>

        <div className="space-y-3 px-3 py-3 sm:space-y-5 sm:px-5 sm:py-5">
          <div className="space-y-3 sm:space-y-4">
            <div className="sm:hidden">
              <div className="mb-2 flex items-center justify-between gap-2 rounded-[1rem] border border-border/70 bg-card/90 p-2 shadow-medical-sm">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Vue affichée</p>
                  <p className="text-sm font-medium text-foreground">
                    {mobileView === 'front' ? 'Face' : 'Dos'}
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-8 rounded-full px-3" onClick={toggleMobileView}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Voir {mobileView === 'front' ? 'dos' : 'face'}
                </Button>
              </div>

              <AnatomyFigure
                title={mobileFigure.title}
                subtitle={mobileFigure.subtitle}
                imageSrc={mobileFigure.imageSrc}
                zones={mobileFigure.zones}
                selectedZones={selectedZones}
                hoveredZones={hoveredZones}
                debugMode={debugMode}
                zoneIntensities={zoneIntensities}
                onZoneClick={handleZoneClick}
                onZoneHover={setHoveredZone}
                intensityTone={intensityTone}
              />
            </div>

            <div className="hidden gap-3 sm:grid sm:gap-4 lg:grid-cols-2">
              <AnatomyFigure
                title={VIEW_META.front.title}
                subtitle={VIEW_META.front.subtitle}
                imageSrc={bodyFront}
                zones={BODY_PATHS.front}
                selectedZones={selectedZones}
                hoveredZones={hoveredZones}
                debugMode={debugMode}
                zoneIntensities={zoneIntensities}
                onZoneClick={handleZoneClick}
                onZoneHover={setHoveredZone}
                intensityTone={intensityTone}
              />
              <AnatomyFigure
                title={VIEW_META.back.title}
                subtitle={VIEW_META.back.subtitle}
                imageSrc={bodyBack}
                zones={BODY_PATHS.back}
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

          <div className="rounded-[1rem] border border-border/70 bg-card/95 p-2.5 shadow-medical-sm backdrop-blur-sm sm:rounded-[1.5rem] sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3 sm:mb-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">Intensité</p>
                <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                  {activeZone ? ZONE_LABELS[activeZone] ?? activeZone : 'Sélectionnez une zone'}
                </p>
              </div>
              <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-primary px-2 text-xs font-semibold text-primary-foreground shadow-medical-sm sm:h-11 sm:min-w-11 sm:rounded-2xl sm:px-0 sm:text-base">
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
              className="py-1"
            />

            <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
              <span>1 léger</span>
              <span>10 intense</span>
            </div>
          </div>

          <ZoneSelectionSummary
            activeZone={activeZone}
            draftIntensity={draftIntensity}
            selectedZones={selectedZones}
            zoneIntensities={zoneIntensities}
            selectedGroups={selectedGroups.map((group) => ({ id: group.id, label: group.label }))}
            onClear={clearAll}
            onSelectZone={setActiveZone}
          />
        </div>
      </div>
    </div>
  );
}
