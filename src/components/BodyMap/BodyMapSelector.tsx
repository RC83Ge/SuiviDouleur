import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS, PainType, PainDuration } from '@/types/pain';
import { PainLogBodyMap } from './PainLogBodyMap';
import { IntensitySlider } from '@/components/PainForm/IntensitySlider';
import { PainTypeSelector } from '@/components/PainForm/PainTypeSelector';
import { DurationSelector } from '@/components/PainForm/DurationSelector';
import { X, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
  intensity: number;
  onIntensityChange: (v: number) => void;
  painTypes: PainType[];
  onPainTypesChange: (t: PainType[]) => void;
  duration: PainDuration;
  onDurationChange: (d: PainDuration) => void;
  otherDescription?: string;
  onOtherDescriptionChange?: (v: string) => void;
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  intensity,
  onIntensityChange,
  painTypes,
  onPainTypesChange,
  duration,
  onDurationChange,
  otherDescription = '',
  onOtherDescriptionChange,
}: BodyMapSelectorProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastClickedZone, setLastClickedZone] = useState<BodyZone | null>(null);

  const handleZoneClick = (zone: BodyZone) => {
    if (selectedZones.includes(zone)) {
      onZonesChange(selectedZones.filter(z => z !== zone));
    } else {
      onZonesChange([...selectedZones, zone]);
      setLastClickedZone(zone);
      setDrawerOpen(true);
    }
  };

  const clearSelection = () => {
    onZonesChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Body map */}
        <div className="flex-1 flex justify-center">
          <PainLogBodyMap
            selectedZone={selectedZones.length > 0 ? selectedZones[selectedZones.length - 1] : null}
            onSelectZone={handleZoneClick}
          />
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
                      onClick={() => handleZoneClick(zone)}
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

      {/* Mini form drawer on zone click */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-base">
              {lastClickedZone ? BODY_ZONE_LABELS[lastClickedZone] : 'Détails de la douleur'}
            </DrawerTitle>
            <p className="text-xs text-muted-foreground">
              Ces valeurs s'appliquent à toutes les zones sélectionnées
            </p>
          </DrawerHeader>
          <div className="px-4 space-y-5 pb-2 max-h-[60vh] overflow-y-auto">
            <IntensitySlider value={intensity} onChange={onIntensityChange} />
            <PainTypeSelector
              selectedTypes={painTypes}
              onChange={onPainTypesChange}
              otherDescription={otherDescription}
              onOtherDescriptionChange={onOtherDescriptionChange}
            />
            <DurationSelector value={duration} onChange={onDurationChange} />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="w-full gap-2">
                <Check className="w-4 h-4" />
                Confirmer
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
