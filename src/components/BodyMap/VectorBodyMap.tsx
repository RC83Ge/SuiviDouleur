import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type BodyView = 'front' | 'left' | 'right';

export type BodyZoneId =
  | 'head'
  | 'neck'
  | 'chest'
  | 'abdomen'
  | 'left-arm'
  | 'right-arm'
  | 'left-hand'
  | 'right-hand'
  | 'pelvis'
  | 'left-thigh'
  | 'right-thigh'
  | 'left-knee'
  | 'right-knee'
  | 'left-leg'
  | 'right-leg'
  | 'left-foot'
  | 'right-foot';

const ZONE_LABELS: Record<BodyZoneId, string> = {
  head: 'Tête',
  neck: 'Cou',
  chest: 'Thorax',
  abdomen: 'Abdomen',
  'left-arm': 'Bras gauche',
  'right-arm': 'Bras droit',
  'left-hand': 'Main gauche',
  'right-hand': 'Main droite',
  pelvis: 'Bassin',
  'left-thigh': 'Cuisse gauche',
  'right-thigh': 'Cuisse droite',
  'left-knee': 'Genou gauche',
  'right-knee': 'Genou droit',
  'left-leg': 'Jambe gauche',
  'right-leg': 'Jambe droite',
  'left-foot': 'Pied gauche',
  'right-foot': 'Pied droit',
};

interface ZoneDef {
  id: BodyZoneId;
  path: string;
}

// Pure SVG vector body silhouette paths — front view, viewBox 0 0 200 500
const FRONT_ZONES: ZoneDef[] = [
  // Head
  {
    id: 'head',
    path: 'M85,12 Q85,2 100,2 Q115,2 115,12 L115,38 Q115,52 100,52 Q85,52 85,38 Z',
  },
  // Neck
  {
    id: 'neck',
    path: 'M93,52 L107,52 L107,68 L93,68 Z',
  },
  // Chest
  {
    id: 'chest',
    path: 'M72,68 L128,68 Q132,68 132,72 L132,140 L68,140 L68,72 Q68,68 72,68 Z',
  },
  // Abdomen
  {
    id: 'abdomen',
    path: 'M68,140 L132,140 L132,200 Q132,210 128,210 L72,210 Q68,210 68,200 Z',
  },
  // Left arm (viewer's left = body's right)
  {
    id: 'left-arm',
    path: 'M56,72 L68,68 L68,140 L60,140 L48,180 L40,178 L52,138 L52,80 Z',
  },
  // Right arm
  {
    id: 'right-arm',
    path: 'M144,72 L132,68 L132,140 L140,140 L152,180 L160,178 L148,138 L148,80 Z',
  },
  // Left hand
  {
    id: 'left-hand',
    path: 'M40,178 L48,180 L44,210 L36,208 Z',
  },
  // Right hand
  {
    id: 'right-hand',
    path: 'M160,178 L152,180 L156,210 L164,208 Z',
  },
  // Pelvis
  {
    id: 'pelvis',
    path: 'M72,210 L128,210 L130,240 L70,240 Z',
  },
  // Left thigh
  {
    id: 'left-thigh',
    path: 'M70,240 L98,240 L94,330 L74,330 Z',
  },
  // Right thigh
  {
    id: 'right-thigh',
    path: 'M102,240 L130,240 L126,330 L106,330 Z',
  },
  // Left knee
  {
    id: 'left-knee',
    path: 'M74,330 L94,330 L92,360 L76,360 Z',
  },
  // Right knee
  {
    id: 'right-knee',
    path: 'M106,330 L126,330 L124,360 L108,360 Z',
  },
  // Left leg (shin)
  {
    id: 'left-leg',
    path: 'M76,360 L92,360 L90,440 L78,440 Z',
  },
  // Right leg (shin)
  {
    id: 'right-leg',
    path: 'M108,360 L124,360 L122,440 L110,440 Z',
  },
  // Left foot
  {
    id: 'left-foot',
    path: 'M78,440 L90,440 L92,465 Q92,472 84,472 Q76,472 76,465 Z',
  },
  // Right foot
  {
    id: 'right-foot',
    path: 'M110,440 L122,440 L124,465 Q124,472 116,472 Q108,472 108,465 Z',
  },
];

// Full body outline for the silhouette shape
const BODY_OUTLINE =
  'M100,2 Q118,2 118,14 L118,38 Q118,54 110,56 L110,64 Q140,66 144,72 L152,80 L160,178 L164,208 L156,212 L148,182 L140,142 L134,142 L134,200 Q134,212 130,242 L128,332 L126,362 L124,442 L126,465 Q126,476 116,476 Q106,476 106,465 L108,442 L108,362 L106,332 L102,242 L98,242 L94,332 L92,362 L90,442 L92,465 Q92,476 84,476 Q74,476 74,465 L76,442 L76,362 L74,332 L70,242 Q66,212 66,200 L66,142 L60,142 L52,182 L36,212 L36,208 L40,178 L48,80 L56,72 Q60,66 90,64 L90,56 Q82,54 82,38 L82,14 Q82,2 100,2 Z';

interface VectorBodyMapProps {
  selectedZones?: BodyZoneId[];
  onZoneSelect?: (zone: BodyZoneId) => void;
  className?: string;
}

export function VectorBodyMap({
  selectedZones: externalSelected,
  onZoneSelect,
  className,
}: VectorBodyMapProps) {
  const [view, setView] = useState<BodyView>('front');
  const [internalSelected, setInternalSelected] = useState<BodyZoneId[]>([]);
  const [hoveredZone, setHoveredZone] = useState<BodyZoneId | null>(null);

  const selectedZones = externalSelected ?? internalSelected;

  const handleZoneClick = (zone: BodyZoneId) => {
    if (onZoneSelect) {
      onZoneSelect(zone);
    } else {
      setInternalSelected((prev) =>
        prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
      );
    }
  };

  const displayedZone =
    hoveredZone ?? (selectedZones.length > 0 ? selectedZones[selectedZones.length - 1] : null);

  const views: { id: BodyView; label: string }[] = [
    { id: 'front', label: 'Avant' },
    { id: 'left', label: 'Gauche' },
    { id: 'right', label: 'Droite' },
  ];

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* View buttons */}
      <div className="flex bg-muted rounded-xl p-1 gap-0.5">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              view === v.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Body SVG */}
      <div className="w-full max-w-[260px] mx-auto">
        <svg
          viewBox="0 0 200 480"
          className="w-full h-auto select-none"
          style={{ touchAction: 'manipulation' }}
        >
          <defs>
            {/* Blue glow filter for selected zones */}
            <filter id="blueGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="hsl(210, 80%, 60%)" floodOpacity="0.5" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Hover glow */}
            <filter id="hoverGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor="hsl(210, 70%, 65%)" floodOpacity="0.3" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body silhouette outline */}
          <path
            d={BODY_OUTLINE}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="pointer-events-none"
          />

          {/* Interactive zones — only front view is functional */}
          {view === 'front' &&
            FRONT_ZONES.map(({ id, path }) => {
              const isSelected = selectedZones.includes(id);
              const isHovered = hoveredZone === id;

              return (
                <path
                  key={id}
                  d={path}
                  className="cursor-pointer transition-all duration-200"
                  fill={
                    isSelected
                      ? 'hsla(210, 80%, 60%, 0.45)'
                      : isHovered
                      ? 'hsla(210, 70%, 65%, 0.2)'
                      : 'transparent'
                  }
                  stroke={
                    isSelected
                      ? 'hsl(210, 80%, 55%)'
                      : isHovered
                      ? 'hsl(210, 60%, 70%)'
                      : 'transparent'
                  }
                  strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0}
                  filter={
                    isSelected
                      ? 'url(#blueGlow)'
                      : isHovered
                      ? 'url(#hoverGlow)'
                      : undefined
                  }
                  onClick={() => handleZoneClick(id)}
                  onMouseEnter={() => setHoveredZone(id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onTouchStart={() => setHoveredZone(id)}
                />
              );
            })}

          {/* Placeholder for side views */}
          {view !== 'front' && (
            <text
              x="100"
              y="240"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="12"
              fontFamily="system-ui, sans-serif"
            >
              Vue {view === 'left' ? 'gauche' : 'droite'} — bientôt
            </text>
          )}
        </svg>
      </div>

      {/* Selected zone display */}
      <div className="h-10 flex items-center justify-center">
        {displayedZone ? (
          <div
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
              'bg-[hsl(210,80%,60%)]/10 text-[hsl(210,80%,45%)] border border-[hsl(210,80%,60%)]/20',
              'animate-in fade-in-0 zoom-in-95'
            )}
          >
            📍 {ZONE_LABELS[displayedZone]}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Touchez une zone pour la sélectionner
          </p>
        )}
      </div>

      {/* Selected zones list */}
      {selectedZones.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {selectedZones.map((z) => (
            <span
              key={z}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[hsl(210,80%,60%)]/10 text-[hsl(210,80%,50%)] border border-[hsl(210,80%,60%)]/15"
            >
              {ZONE_LABELS[z]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
