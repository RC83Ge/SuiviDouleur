import React, { useEffect, useMemo, useState } from 'react';
import { Activity, ScanSearch, Stethoscope, X } from 'lucide-react';
import { AnatomyFigure } from './AnatomyFigure';
import { BODY_PATHS, ZONE_GROUPS, ZONE_LABELS, VIEW_META, type ZoneGroup } from './bodyMapData';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);

  const hoveredZones = useMemo(() => {
    if (hoveredZone) return [hoveredZone];
    if (hoveredGroup) {
      return ZONE_GROUPS.find((group) => group.id === hoveredGroup)?.zones ?? [];
    }
    return [] as string[];
  }, [hoveredGroup, hoveredZone]);

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
      <div className="card-medical-elevated overflow-hidden rounded-[1.75rem] border-primary/10 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--card)))]">
        <div className="flex flex-col gap-4 border-b border-border/80 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <Stethoscope className="h-3.5 w-3.5" />
              Cartographie anatomique
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Déclarez une douleur par zone</h3>
              <p className="text-sm text-muted-foreground">
                Survolez une région à gauche, puis cliquez sur l’anatomie pour enregistrer l’intensité.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 shadow-medical-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ScanSearch className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Mode debug</p>
              <p className="text-xs text-muted-foreground">Contours d’alignement</p>
            </div>
            <Switch checked={debugMode} onCheckedChange={setDebugMode} aria-label="Activer le mode debug" />
          </div>
        </div>

        <div className="grid gap-5 px-5 py-5 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-[1.5rem] border border-border bg-card p-3 shadow-medical-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Zones cliniques</p>
              <div className="space-y-2">
                {ZONE_GROUPS.map((group) => {
                  const isHovered = hoveredGroup === group.id;
                  const isSelected = group.zones.some((zone) => selectedZones.includes(zone));

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onMouseEnter={() => setHoveredGroup(group.id)}
                      onMouseLeave={() => setHoveredGroup(null)}
                      onFocus={() => setHoveredGroup(group.id)}
                      onBlur={() => setHoveredGroup(null)}
                      onClick={() => {
                        const preferredZone = group.zones.find((zone) => !selectedZones.includes(zone)) ?? group.zones[0];
                        handleZoneClick(preferredZone);
                      }}
                      className={`w-full rounded-[1.1rem] border px-3 py-3 text-left transition-all ${
                        isSelected
                          ? 'border-primary/30 bg-primary/10 shadow-medical-sm'
                          : isHovered
                            ? 'border-primary/20 bg-accent'
                            : 'border-border bg-background hover:border-primary/20 hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{group.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{group.description}</p>
                        </div>
                        {isSelected && <Badge variant="secondary">Actif</Badge>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-medical-sm">
              <div className="mb-4 flex items-center justify-between">
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
              />

              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>1 léger</span>
                <span>10 intense</span>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Cliquez sur une zone du corps pour déclarer la douleur, puis ajustez sa valeur ici.
              </p>
            </div>
          </aside>

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

            <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-medical-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Activity className="h-4 w-4 text-primary" />
                  Zones déclarées
                </div>
                {selectedZones.length > 0 && (
                  <Button type="button" variant="ghost" size="sm" onClick={clearAll}>
                    <X className="h-4 w-4" />
                    Effacer
                  </Button>
                )}
              </div>

              {selectedZones.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune zone sélectionnée pour le moment.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedZones.map((zoneId) => (
                    <button
                      key={zoneId}
                      type="button"
                      onClick={() => setActiveZone(zoneId)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        activeZone === zoneId
                          ? 'border-primary/30 bg-primary text-primary-foreground'
                          : 'border-border bg-background text-foreground hover:border-primary/20'
                      }`}
                    >
                      <span>{ZONE_LABELS[zoneId] ?? zoneId}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 ${
                          activeZone === zoneId ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {zoneIntensities[zoneId] ?? draftIntensity}/10
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {selectedGroups.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedGroups.map((group: ZoneGroup) => (
                    <Badge key={group.id} variant="outline" className="rounded-full px-3 py-1 text-xs">
                      {group.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
