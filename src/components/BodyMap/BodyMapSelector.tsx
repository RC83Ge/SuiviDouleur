import React, { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { AnatomyFigure } from './AnatomyFigure';
import { BODY_PATHS, ZONE_GROUPS, ZONE_LABELS, VIEW_META } from './bodyMapData';
import { ZoneSelectionSummary } from './ZoneSelectionSummary';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: string, intensity: number) => void;
}

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

  const selectedGroups = ZONE_GROUPS.filter((group) =>
    group.zones.some((zone) => selectedZones.includes(zone))
  );

  const currentIntensity = activeZone ? zoneIntensities[activeZone] ?? draftIntensity : draftIntensity;

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--card))_18%,hsl(var(--muted)/0.4))] shadow-medical-lg">
        <div className="border-b border-border/70 bg-card/80 px-5 py-5 backdrop-blur-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Stethoscope className="h-3.5 w-3.5" />
                Sélection anatomique
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Déclarez une douleur par zone</h3>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  Cliquez directement sur le mannequin pour sélectionner une zone, puis ajustez l’intensité de 1 à 10.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[1.25rem] border border-border/80 bg-background/90 px-3 py-2 shadow-medical-sm">
              <div>
                <p className="text-sm font-medium text-foreground">Mode debug</p>
                <p className="text-xs text-muted-foreground">Contours et repères d’alignement</p>
              </div>
              <Switch checked={debugMode} onCheckedChange={setDebugMode} aria-label="Activer le mode debug" />
            </div>
          </div>
        </div>

        <div className="space-y-5 px-5 py-5">
          <div className="rounded-[1.5rem] border border-border/70 bg-card/95 p-4 shadow-medical-sm backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Intensité</p>
                <p className="text-sm font-medium text-foreground">
                  {activeZone ? ZONE_LABELS[activeZone] ?? activeZone : 'Sélectionnez une zone'}
                </p>
              </div>
              <div className="flex h-11 min-w-11 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-medical-sm">
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

            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>1 léger</span>
              <span>10 intense</span>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Cliquez sur une zone anatomique active pour lui attribuer un niveau de douleur précis.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
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
    </div>
  );
}