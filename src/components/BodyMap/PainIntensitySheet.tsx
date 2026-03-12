import React, { useRef, useEffect } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PainIntensitySheetProps {
  zoneId: BodyZone | null;
  intensity: number;
  onIntensityChange: (value: number) => void;
  onClose: () => void;
}

const INTENSITY_COLORS = [
  'hsl(160, 60%, 50%)',  // 0 - green
  'hsl(140, 55%, 50%)',  // 1
  'hsl(100, 50%, 50%)',  // 2
  'hsl(60, 55%, 50%)',   // 3 - yellow
  'hsl(45, 60%, 52%)',   // 4
  'hsl(35, 70%, 55%)',   // 5 - orange
  'hsl(25, 75%, 52%)',   // 6
  'hsl(15, 80%, 50%)',   // 7
  'hsl(8, 85%, 50%)',    // 8 - red
  'hsl(4, 85%, 48%)',    // 9
  'hsl(0, 80%, 45%)',    // 10 - dark red
];

export function PainIntensitySheet({
  zoneId,
  intensity,
  onIntensityChange,
  onClose,
}: PainIntensitySheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isOpen = zoneId !== null;

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !zoneId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          'relative w-full max-w-md bg-card rounded-t-2xl border-t border-x border-border p-5 pb-8',
          'animate-slide-up'
        )}
        style={{ boxShadow: 'var(--shadow-xl)' }}
      >
        {/* Handle bar */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {BODY_ZONE_LABELS[zoneId]}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Niveau de douleur
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Intensity display */}
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white transition-colors duration-200"
            style={{ backgroundColor: INTENSITY_COLORS[intensity] }}
          >
            {intensity}
          </div>
        </div>

        {/* Intensity label */}
        <p className="text-center text-xs font-medium text-muted-foreground mb-4">
          {intensity === 0 && 'Pas de douleur'}
          {intensity >= 1 && intensity <= 3 && 'Douleur légère'}
          {intensity >= 4 && intensity <= 6 && 'Douleur modérée'}
          {intensity >= 7 && intensity <= 8 && 'Douleur intense'}
          {intensity >= 9 && 'Douleur extrême'}
        </p>

        {/* Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(90deg, ${INTENSITY_COLORS[0]} 0%, ${INTENSITY_COLORS[3]} 30%, ${INTENSITY_COLORS[5]} 50%, ${INTENSITY_COLORS[7]} 70%, ${INTENSITY_COLORS[10]} 100%)`,
            }}
          />
          <div className="flex justify-between px-0.5">
            <span className="text-[10px] text-muted-foreground">0</span>
            <span className="text-[10px] text-muted-foreground">5</span>
            <span className="text-[10px] text-muted-foreground">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Returns a fill color for a given pain intensity (0-10) */
export function getIntensityColor(intensity: number): string {
  return INTENSITY_COLORS[Math.min(10, Math.max(0, Math.round(intensity)))];
}
