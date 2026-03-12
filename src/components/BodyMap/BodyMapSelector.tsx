import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

// Zone definition: id, label, position (% based), size
interface HotspotZone {
  id: string;
  label: string;
  x: number; // center X in %
  y: number; // center Y in %
  w: number; // width in %
  h: number; // height in %
  shape?: 'circle' | 'ellipse';
}

// FRONT hotspots — positioned over the LEFT silhouette of the image
const FRONT_ZONES: HotspotZone[] = [
  // Head & neck
  { id: 'head', label: 'Tête', x: 50, y: 5.5, w: 12, h: 7, shape: 'ellipse' },
  { id: 'neck', label: 'Cou', x: 50, y: 11, w: 6, h: 3 },
  // Shoulders
  { id: 'right-shoulder', label: 'Épaule droite', x: 37, y: 14.5, w: 8, h: 4 },
  { id: 'left-shoulder', label: 'Épaule gauche', x: 63, y: 14.5, w: 8, h: 4 },
  // Chest & torso
  { id: 'chest', label: 'Thorax', x: 50, y: 19, w: 18, h: 7 },
  { id: 'abdomen', label: 'Abdomen', x: 50, y: 28, w: 16, h: 7 },
  { id: 'pelvis', label: 'Bassin', x: 50, y: 36, w: 16, h: 5 },
  // Arms — right side of patient (screen left)
  { id: 'right-upper-arm', label: 'Bras droit', x: 30, y: 21, w: 6, h: 8 },
  { id: 'right-elbow', label: 'Coude droit', x: 27, y: 28, w: 5, h: 3 },
  { id: 'right-forearm', label: 'Avant-bras droit', x: 25, y: 33, w: 5, h: 7 },
  { id: 'right-hand', label: 'Main droite', x: 23, y: 41, w: 5, h: 4, shape: 'ellipse' },
  // Arms — left side of patient (screen right)
  { id: 'left-upper-arm', label: 'Bras gauche', x: 70, y: 21, w: 6, h: 8 },
  { id: 'left-elbow', label: 'Coude gauche', x: 73, y: 28, w: 5, h: 3 },
  { id: 'left-forearm', label: 'Avant-bras gauche', x: 75, y: 33, w: 5, h: 7 },
  { id: 'left-hand', label: 'Main gauche', x: 77, y: 41, w: 5, h: 4, shape: 'ellipse' },
  // Legs — right (screen left)
  { id: 'right-thigh', label: 'Cuisse droite', x: 43, y: 46, w: 9, h: 10 },
  { id: 'right-knee', label: 'Genou droit', x: 43, y: 57, w: 7, h: 4 },
  { id: 'right-shin', label: 'Tibia droit', x: 43, y: 65, w: 6, h: 11 },
  { id: 'right-ankle', label: 'Cheville droite', x: 43, y: 78, w: 5, h: 3 },
  { id: 'right-foot', label: 'Pied droit', x: 43, y: 83, w: 6, h: 4, shape: 'ellipse' },
  // Legs — left (screen right)
  { id: 'left-thigh', label: 'Cuisse gauche', x: 57, y: 46, w: 9, h: 10 },
  { id: 'left-knee', label: 'Genou gauche', x: 57, y: 57, w: 7, h: 4 },
  { id: 'left-shin', label: 'Tibia gauche', x: 57, y: 65, w: 6, h: 11 },
  { id: 'left-ankle', label: 'Cheville gauche', x: 57, y: 78, w: 5, h: 3 },
  { id: 'left-foot', label: 'Pied gauche', x: 57, y: 83, w: 6, h: 4, shape: 'ellipse' },
];

// BACK hotspots
const BACK_ZONES: HotspotZone[] = [
  { id: 'head-back', label: 'Tête (dos)', x: 50, y: 5.5, w: 12, h: 7, shape: 'ellipse' },
  { id: 'neck-back', label: 'Nuque', x: 50, y: 11, w: 6, h: 3 },
  { id: 'right-shoulder-blade', label: 'Omoplate droite', x: 40, y: 17, w: 8, h: 6 },
  { id: 'left-shoulder-blade', label: 'Omoplate gauche', x: 60, y: 17, w: 8, h: 6 },
  { id: 'upper-back', label: 'Haut du dos', x: 50, y: 19, w: 12, h: 5 },
  { id: 'middle-back', label: 'Milieu du dos', x: 50, y: 25, w: 14, h: 5 },
  { id: 'lower-back', label: 'Bas du dos', x: 50, y: 32, w: 14, h: 5 },
  // Arms back
  { id: 'right-arm-back', label: 'Bras droit (dos)', x: 28, y: 26, w: 6, h: 14 },
  { id: 'left-arm-back', label: 'Bras gauche (dos)', x: 72, y: 26, w: 6, h: 14 },
  // Buttocks
  { id: 'right-buttock', label: 'Fessier droit', x: 44, y: 38, w: 8, h: 5 },
  { id: 'left-buttock', label: 'Fessier gauche', x: 56, y: 38, w: 8, h: 5 },
  // Legs back
  { id: 'right-hamstring', label: 'Ischio-jambier droit', x: 43, y: 48, w: 9, h: 10 },
  { id: 'left-hamstring', label: 'Ischio-jambier gauche', x: 57, y: 48, w: 9, h: 10 },
  { id: 'right-calf', label: 'Mollet droit', x: 43, y: 65, w: 7, h: 11 },
  { id: 'left-calf', label: 'Mollet gauche', x: 57, y: 65, w: 7, h: 11 },
  { id: 'right-ankle-back', label: 'Cheville droite (dos)', x: 43, y: 78, w: 5, h: 3 },
  { id: 'left-ankle-back', label: 'Cheville gauche (dos)', x: 57, y: 78, w: 5, h: 3 },
];

const ALL_ZONES_MAP = [...FRONT_ZONES, ...BACK_ZONES].reduce(
  (acc, z) => ({ ...acc, [z.id]: z }),
  {} as Record<string, HotspotZone>
);

// Intensity to color
function intensityColor(level: number): string {
  if (level <= 3) return 'rgba(251, 146, 60, 0.45)'; // orange light
  if (level <= 6) return 'rgba(239, 68, 68, 0.5)'; // red
  return 'rgba(185, 28, 28, 0.6)'; // dark red
}

interface BodyMapSelectorProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
  zoneIntensities?: Record<string, number>;
  onZoneIntensityChange?: (zoneId: string, intensity: number) => void;
}

type ViewTab = 'front' | 'back';

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
  zoneIntensities = {},
  onZoneIntensityChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');
  const [intensity, setIntensity] = useState(5);

  const zones = view === 'front' ? FRONT_ZONES : BACK_ZONES;
  const bgImage = view === 'front' ? bodyFront : bodyBack;

  const handleZoneClick = useCallback(
    (zoneId: string) => {
      if (selectedZones.includes(zoneId)) {
        // Deselect
        onZonesChange(selectedZones.filter((z) => z !== zoneId));
      } else {
        // Select with current intensity
        onZonesChange([...selectedZones, zoneId]);
        onZoneIntensityChange?.(zoneId, intensity);
      }
    },
    [selectedZones, onZonesChange, onZoneIntensityChange, intensity]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Body image with hotspot overlay */}
      <div className="relative w-[200px] aspect-[1/2.2] mx-auto">
        {/* Background image */}
        <img
          src={bgImage}
          alt={view === 'front' ? 'Corps de face' : 'Corps de dos'}
          className="w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />

        {/* Hotspot overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ zIndex: 2 }}
        >
          {zones.map((zone) => {
            const isSelected = selectedZones.includes(zone.id);
            const level = zoneIntensities[zone.id] ?? intensity;
            return (
              <ellipse
                key={zone.id}
                cx={zone.x}
                cy={zone.y}
                rx={zone.w / 2}
                ry={zone.h / 2}
                fill={isSelected ? intensityColor(level) : 'rgba(0,100,255,0.15)'}
                stroke={isSelected ? 'rgba(239, 68, 68, 0.7)' : 'rgba(0,100,255,0.4)'}
                strokeWidth="0.3"
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zone.id)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleZoneClick(zone.id);
                }}
                style={{ pointerEvents: 'all' }}
              >
                <title>{zone.label}</title>
              </ellipse>
            );
          })}
        </svg>
      </div>

      {/* View label */}
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
        {view === 'front' ? 'Vue de face' : 'Vue de dos'}
      </p>

      {/* Toggle buttons */}
      <div className="flex gap-2">
        {(['front', 'back'] as ViewTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setView(tab)}
            className={cn(
              'px-6 py-2 rounded-lg text-sm font-semibold transition-all',
              view === tab
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {tab === 'front' ? 'Face' : 'Dos'}
          </button>
        ))}
      </div>

      {/* Intensity slider */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">Intensité de la douleur</span>
          <span
            className="text-sm font-bold px-2 py-0.5 rounded-md text-white"
            style={{ backgroundColor: intensityColor(intensity) }}
          >
            {intensity}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: 'linear-gradient(90deg, rgba(251,146,60,0.6) 0%, rgba(239,68,68,0.7) 50%, rgba(185,28,28,0.8) 100%)',
          }}
        />
        <div className="flex justify-between px-0.5">
          <span className="text-[10px] text-muted-foreground">0</span>
          <span className="text-[10px] text-muted-foreground">5</span>
          <span className="text-[10px] text-muted-foreground">10</span>
        </div>
      </div>

      {/* Selected zones badges */}
      {selectedZones.length > 0 && (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée{selectedZones.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={() => onZonesChange([])}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((key) => {
              const zone = ALL_ZONES_MAP[key];
              const level = zoneIntensities[key] ?? intensity;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border border-border"
                  style={{
                    backgroundColor: `${intensityColor(level)}`,
                    color: 'white',
                  }}
                >
                  {zone?.label ?? key}
                  <span
                    onClick={() => onZonesChange(selectedZones.filter((z) => z !== key))}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-white/30 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
