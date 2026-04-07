import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Slider } from '@/components/ui/slider';
import {
  PainType,
  PainDuration,
  PAIN_TYPE_LABELS,
  PAIN_DURATION_LABELS,
  TRIGGER_FACTORS,
  RELIEF_FACTORS,
  BODY_ZONE_LABELS,
  BodyZone,
  ZonePainDetails,
} from '@/types/pain';

interface ZoneDetailSheetProps {
  open: boolean;
  zoneId: string | null;
  details: ZonePainDetails;
  onDetailsChange: (details: ZonePainDetails) => void;
  onClose: () => void;
  intensityTone: (level: number, isHovered?: boolean) => string;
}

const painTypes: PainType[] = [
  'burning', 'stabbing', 'electric', 'pulsating',
  'shooting', 'crushing', 'cramping', 'numbness', 'other',
];

const durations: PainDuration[] = ['instant', 'minutes', 'hours', 'continuous'];

export function ZoneDetailSheet({
  open,
  zoneId,
  details,
  onDetailsChange,
  onClose,
  intensityTone,
}: ZoneDetailSheetProps) {
  if (!zoneId) return null;

  const zoneName = BODY_ZONE_LABELS[zoneId as BodyZone] ?? zoneId;

  const update = (patch: Partial<ZonePainDetails>) => {
    onDetailsChange({ ...details, ...patch });
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: intensityTone(details.intensity) }}
            />
            <DrawerTitle className="text-base font-semibold">
              {zoneName}
            </DrawerTitle>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </DrawerHeader>

        <div className="space-y-4 overflow-y-auto px-4 pb-6 pt-4">
          {/* Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Intensité
              </label>
              <span
                className="flex h-8 min-w-8 items-center justify-center rounded-xl px-2 text-sm font-bold text-primary-foreground"
                style={{ background: intensityTone(details.intensity) }}
              >
                {details.intensity}
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[details.intensity]}
              onValueChange={(v) => update({ intensity: v[0] ?? 5 })}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 léger</span>
              <span>10 intense</span>
            </div>
          </div>

          {/* Pain Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Type de douleur
            </label>
            <div className="relative">
              <select
                value={details.painTypes[0] ?? ''}
                onChange={(e) =>
                  update({ painTypes: e.target.value ? [e.target.value as PainType] : [] })
                }
                className="input-medical h-10 w-full appearance-none px-3 py-2 pr-8 text-sm"
              >
                <option value="">Aucun</option>
                {painTypes.map((t) => (
                  <option key={t} value={t}>{PAIN_TYPE_LABELS[t]}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Durée
            </label>
            <div className="relative">
              <select
                value={details.duration}
                onChange={(e) => update({ duration: e.target.value as PainDuration })}
                className="input-medical h-10 w-full appearance-none px-3 py-2 pr-8 text-sm"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{PAIN_DURATION_LABELS[d]}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Trigger Factors */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Facteur déclenchant
            </label>
            <div className="relative">
              <select
                value={details.triggerFactors[0] ?? ''}
                onChange={(e) =>
                  update({ triggerFactors: e.target.value ? [e.target.value] : [] })
                }
                className="input-medical h-10 w-full appearance-none px-3 py-2 pr-8 text-sm"
              >
                <option value="">Aucun</option>
                {TRIGGER_FACTORS.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Relief Factors */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Facteur de soulagement
            </label>
            <div className="relative">
              <select
                value={details.reliefFactors[0] ?? ''}
                onChange={(e) =>
                  update({ reliefFactors: e.target.value ? [e.target.value] : [] })
                }
                className="input-medical h-10 w-full appearance-none px-3 py-2 pr-8 text-sm"
              >
                <option value="">Aucun</option>
                {RELIEF_FACTORS.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
