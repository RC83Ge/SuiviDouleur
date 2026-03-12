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

// Map library body part slugs → our BodyZone types
const SLUG_TO_ZONE: Record<string, BodyZone> = {
  'head': 'head',
  'neck': 'neck',
  'deltoids': 'left-shoulder',
  'chest': 'chest',
  'biceps': 'left-arm',
  'triceps': 'right-arm',
  'forearm': 'left-forearm',
  'hands': 'left-hand',
  'abs': 'abdomen',
  'obliques': 'pelvis',
  'adductors': 'left-hip',
  'quadriceps': 'left-thigh',
  'hamstring': 'right-thigh',
  'abductors': 'right-hip',
  'knees': 'left-knee',
  'calves': 'left-leg',
  'tibialis': 'left-leg',
  'ankles': 'left-foot',
  'feet': 'left-foot',
  'gluteal': 'pelvis',
  'trapezius': 'upper-back',
  'upper-back': 'upper-back',
  'lower-back': 'lower-back',
};

// Reverse: zone → slugs for highlighting
const ZONE_TO_SLUGS: Record<string, string[]> = {};
Object.entries(SLUG_TO_ZONE).forEach(([slug, zone]) => {
  if (!ZONE_TO_SLUGS[zone]) ZONE_TO_SLUGS[zone] = [];
  ZONE_TO_SLUGS[zone].push(slug);
});

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<BodyView>('front');

  const handleClick = useCallback(
    (part: ExtendedBodyPart) => {
      const zone = SLUG_TO_ZONE[part.slug];
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

  // Build data for the highlighter from selected zones
  const highlightData: ExtendedBodyPart[] = selectedZones.flatMap(zone => {
    const slugs = ZONE_TO_SLUGS[zone] || [];
    return slugs.map(slug => ({
      slug,
      intensity: 1,
    } as ExtendedBodyPart));
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Body model */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[220px]">
            <Body
              data={highlightData}
              gender="male"
              side={view === 'front' ? 'front' : 'back'}
              scale={1.5}
              border="#D4A574"
              highlightedColors={['#F97316', '#EA580C', '#DC2626']}
              onBodyPartClick={handleClick}
            />
          </div>

          {/* View tabs centered below */}
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as BodyView)}
            className="mt-3"
          >
            <TabsList className="h-9">
              <TabsTrigger value="front" className="text-xs px-5">
                Avant
              </TabsTrigger>
              <TabsTrigger value="back" className="text-xs px-5">
                Arrière
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
                      onClick={() => {
                        onZonesChange(selectedZones.filter(z => z !== zone));
                      }}
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
