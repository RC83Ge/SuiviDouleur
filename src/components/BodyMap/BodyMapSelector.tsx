import React, { useState, useCallback } from 'react';
import Body, { type ExtendedBodyPart } from '@mjcdev/react-body-highlighter';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

// Map (slug, side) → BodyZone
function inferSideFromSlug(slug: string): 'left' | 'right' | undefined {
  if (slug.startsWith('left-') || slug.endsWith('-left') || slug.includes('left')) return 'left';
  if (slug.startsWith('right-') || slug.endsWith('-right') || slug.includes('right')) return 'right';
  return undefined;
}

function slugToZone(slug: string, side?: 'left' | 'right'): BodyZone | null {
  const map: Record<string, BodyZone | Record<'left' | 'right', BodyZone>> = {
    'head': 'head',
    'neck': 'neck',
    'deltoids': { left: 'left-shoulder', right: 'right-shoulder' },
    'chest': 'chest',
    'biceps': { left: 'left-arm', right: 'right-arm' },
    'triceps': { left: 'left-arm', right: 'right-arm' },
    'forearm': { left: 'left-forearm', right: 'right-forearm' },
    'hands': { left: 'left-hand', right: 'right-hand' },
    'abs': 'abdomen',
    'obliques': 'pelvis',
    'adductors': { left: 'left-hip', right: 'right-hip' },
    'quadriceps': { left: 'left-thigh', right: 'right-thigh' },
    'hamstring': { left: 'left-thigh', right: 'right-thigh' },
    'abductors': { left: 'left-hip', right: 'right-hip' },
    'knees': { left: 'left-knee', right: 'right-knee' },
    'calves': { left: 'left-leg', right: 'right-leg' },
    'tibialis': { left: 'left-leg', right: 'right-leg' },
    'ankles': { left: 'left-foot', right: 'right-foot' },
    'feet': { left: 'left-foot', right: 'right-foot' },
    'gluteal': 'pelvis',
    'trapezius': 'upper-back',
    'upper-back': 'upper-back',
    'lower-back': 'lower-back',
  };

  const entry = map[slug];
  if (!entry) return null;
  if (typeof entry === 'string') return entry;

  const resolvedSide = side ?? inferSideFromSlug(slug);
  if (!resolvedSide) return null;
  return entry[resolvedSide] || null;
}

// Reverse: zone → highlight data
function zoneToHighlightData(zone: BodyZone): ExtendedBodyPart[] {
  const mapping: Record<string, { slug: string; side?: 'left' | 'right' }[]> = {
    'head': [{ slug: 'head' }],
    'neck': [{ slug: 'neck' }],
    'left-shoulder': [{ slug: 'deltoids', side: 'left' }],
    'right-shoulder': [{ slug: 'deltoids', side: 'right' }],
    'chest': [{ slug: 'chest' }],
    'left-arm': [{ slug: 'biceps', side: 'left' }, { slug: 'triceps', side: 'left' }],
    'right-arm': [{ slug: 'biceps', side: 'right' }, { slug: 'triceps', side: 'right' }],
    'left-forearm': [{ slug: 'forearm', side: 'left' }],
    'right-forearm': [{ slug: 'forearm', side: 'right' }],
    'left-hand': [{ slug: 'hands', side: 'left' }],
    'right-hand': [{ slug: 'hands', side: 'right' }],
    'abdomen': [{ slug: 'abs' }],
    'left-hip': [{ slug: 'adductors', side: 'left' }, { slug: 'abductors', side: 'left' }],
    'right-hip': [{ slug: 'adductors', side: 'right' }, { slug: 'abductors', side: 'right' }],
    'pelvis': [{ slug: 'obliques' }, { slug: 'gluteal' }],
    'left-thigh': [{ slug: 'quadriceps', side: 'left' }, { slug: 'hamstring', side: 'left' }],
    'right-thigh': [{ slug: 'quadriceps', side: 'right' }, { slug: 'hamstring', side: 'right' }],
    'left-knee': [{ slug: 'knees', side: 'left' }],
    'right-knee': [{ slug: 'knees', side: 'right' }],
    'left-leg': [{ slug: 'calves', side: 'left' }, { slug: 'tibialis', side: 'left' }],
    'right-leg': [{ slug: 'calves', side: 'right' }, { slug: 'tibialis', side: 'right' }],
    'left-foot': [{ slug: 'feet', side: 'left' }, { slug: 'ankles', side: 'left' }],
    'right-foot': [{ slug: 'feet', side: 'right' }, { slug: 'ankles', side: 'right' }],
    'upper-back': [{ slug: 'trapezius' }, { slug: 'upper-back' }],
    'lower-back': [{ slug: 'lower-back' }],
  };
  const entries = mapping[zone] || [];
  return entries.map(e => ({ slug: e.slug, intensity: 1, side: e.side } as ExtendedBodyPart));
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<BodyView>('front');

  const handleClick = useCallback(
    (part: ExtendedBodyPart, side?: 'left' | 'right') => {
      const partWithSide = part as ExtendedBodyPart & { side?: 'left' | 'right' };
      const resolvedSide = side ?? partWithSide.side;
      const zone = slugToZone(part.slug, resolvedSide);
      if (!zone) return;

      if (selectedZones.includes(zone)) {
        onZonesChange(selectedZones.filter(z => z !== zone));
      } else {
        onZonesChange([...selectedZones, zone]);
      }
    },
    [selectedZones, onZonesChange]
  );

  const clearSelection = () => {
    onZonesChange([]);
  };

  const highlightData: ExtendedBodyPart[] = selectedZones.flatMap(zoneToHighlightData);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {/* Body model */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[160px] [&_svg]:!p-0 [&_svg]:!m-0">
            <Body
              data={highlightData}
              gender="male"
              side={view === 'front' ? 'front' : 'back'}
              scale={1.2}
              border="#D4A574"
              onBodyPartClick={handleClick}
            />
          </div>

          <Tabs
            value={view}
            onValueChange={(v) => setView(v as BodyView)}
            className="mt-2"
          >
            <TabsList className="h-8">
              <TabsTrigger value="front" className="text-xs px-4">
                Avant
              </TabsTrigger>
              <TabsTrigger value="back" className="text-xs px-4">
                Arrière
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
                {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée{selectedZones.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedZones.map((zone, index) => (
                  <span
                    key={zone}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
                      "bg-primary/10 text-primary border border-primary/20",
                      "hover:bg-primary/15 transition-all duration-200",
                      "animate-in fade-in-0 zoom-in-95"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {BODY_ZONE_LABELS[zone]}
                    <button
                      type="button"
                      onClick={() => {
                        onZonesChange(selectedZones.filter(z => z !== zone));
                      }}
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
