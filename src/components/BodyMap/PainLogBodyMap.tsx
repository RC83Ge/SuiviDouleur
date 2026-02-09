import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

export type PainLogZone = BodyZone;
export type PainLogView = 'face' | 'dos';

interface PainLogBodyMapProps {
  selectedZone: PainLogZone | null;
  onSelectZone: (zoneId: PainLogZone) => void;
  view: PainLogView;
  onViewChange?: (view: PainLogView) => void;
  className?: string;
}

const HIGHLIGHT_COLOR = '#4DA3FF';
const HIGHLIGHT_FILL = 'rgba(77, 163, 255, 0.35)';
const HOVER_FILL = 'rgba(77, 163, 255, 0.15)';

// Zones defined as percentages of image dimensions for precise overlay alignment
// Each zone: { id, points: "x1,y1 x2,y2 ..." as % of width/height }
interface ZoneDef {
  id: PainLogZone;
  // polygon points as percentage pairs [x%, y%]
  points: [number, number][];
  views: PainLogView[];
}

const OVERLAY_ZONES: ZoneDef[] = [
  // Head
  {
    id: 'head',
    points: [[42,2],[58,2],[62,6],[62,12],[58,16],[42,16],[38,12],[38,6]],
    views: ['face','dos'],
  },
  // Neck
  {
    id: 'neck',
    points: [[45,16],[55,16],[55,20],[45,20]],
    views: ['face','dos'],
  },
  // Left shoulder
  {
    id: 'left-shoulder',
    points: [[30,20],[45,20],[45,25],[35,27],[28,24]],
    views: ['face','dos'],
  },
  // Right shoulder
  {
    id: 'right-shoulder',
    points: [[55,20],[70,20],[72,24],[65,27],[55,25]],
    views: ['face','dos'],
  },
  // Chest (front only)
  {
    id: 'chest',
    points: [[35,25],[65,25],[65,40],[50,42],[35,40]],
    views: ['face'],
  },
  // Upper back (back only)
  {
    id: 'upper-back',
    points: [[35,25],[65,25],[65,40],[50,42],[35,40]],
    views: ['dos'],
  },
  // Left arm (upper)
  {
    id: 'left-arm',
    points: [[25,24],[35,27],[35,42],[30,44],[22,44],[20,35]],
    views: ['face','dos'],
  },
  // Right arm (upper)
  {
    id: 'right-arm',
    points: [[65,27],[75,24],[80,35],[78,44],[70,44],[65,42]],
    views: ['face','dos'],
  },
  // Left forearm
  {
    id: 'left-forearm',
    points: [[20,44],[30,44],[28,58],[18,58]],
    views: ['face','dos'],
  },
  // Right forearm
  {
    id: 'right-forearm',
    points: [[70,44],[80,44],[82,58],[72,58]],
    views: ['face','dos'],
  },
  // Left hand
  {
    id: 'left-hand',
    points: [[16,58],[28,58],[28,66],[22,68],[15,65]],
    views: ['face','dos'],
  },
  // Right hand
  {
    id: 'right-hand',
    points: [[72,58],[84,58],[85,65],[78,68],[72,66]],
    views: ['face','dos'],
  },
  // Abdomen (front only)
  {
    id: 'abdomen',
    points: [[35,40],[65,40],[66,54],[50,56],[34,54]],
    views: ['face'],
  },
  // Lower back (back only)
  {
    id: 'lower-back',
    points: [[35,40],[65,40],[66,54],[50,56],[34,54]],
    views: ['dos'],
  },
  // Pelvis
  {
    id: 'pelvis',
    points: [[34,54],[66,54],[68,62],[32,62]],
    views: ['face','dos'],
  },
  // Left hip
  {
    id: 'left-hip',
    points: [[32,58],[44,58],[44,64],[32,64]],
    views: ['face','dos'],
  },
  // Right hip
  {
    id: 'right-hip',
    points: [[56,58],[68,58],[68,64],[56,64]],
    views: ['face','dos'],
  },
  // Left thigh
  {
    id: 'left-thigh',
    points: [[34,62],[48,62],[46,76],[36,76]],
    views: ['face','dos'],
  },
  // Right thigh
  {
    id: 'right-thigh',
    points: [[52,62],[66,62],[64,76],[54,76]],
    views: ['face','dos'],
  },
  // Left knee
  {
    id: 'left-knee',
    points: [[36,76],[46,76],[45,82],[37,82]],
    views: ['face','dos'],
  },
  // Right knee
  {
    id: 'right-knee',
    points: [[54,76],[64,76],[63,82],[55,82]],
    views: ['face','dos'],
  },
  // Left leg (calf)
  {
    id: 'left-leg',
    points: [[37,82],[45,82],[44,93],[38,93]],
    views: ['face','dos'],
  },
  // Right leg (calf)
  {
    id: 'right-leg',
    points: [[55,82],[63,82],[62,93],[56,93]],
    views: ['face','dos'],
  },
  // Left foot
  {
    id: 'left-foot',
    points: [[35,93],[45,93],[45,99],[34,99]],
    views: ['face','dos'],
  },
  // Right foot
  {
    id: 'right-foot',
    points: [[55,93],[65,93],[66,99],[55,99]],
    views: ['face','dos'],
  },
];

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  view,
  onViewChange,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);

  const bodyImage = view === 'face' ? bodyFront : bodyBack;
  const zones = OVERLAY_ZONES.filter(z => z.views.includes(view));

  // Convert percentage points to SVG polygon points string (viewBox 100x100)
  const toSvgPoints = (points: [number, number][]) =>
    points.map(([x, y]) => `${x},${y}`).join(' ');

  const getZoneCenter = (points: [number, number][]) => {
    const cx = points.reduce((s, [x]) => s + x, 0) / points.length;
    const cy = points.reduce((s, [, y]) => s + y, 0) / points.length;
    return { cx, cy };
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* View toggle */}
      {onViewChange && (
        <div className="flex bg-muted rounded-lg p-1 w-fit">
          <button
            type="button"
            onClick={() => onViewChange('face')}
            className={cn(
              'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
              view === 'face'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Face
          </button>
          <button
            type="button"
            onClick={() => onViewChange('dos')}
            className={cn(
              'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
              view === 'dos'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Dos
          </button>
        </div>
      )}

      {/* Body image + SVG overlay container */}
      <div className="relative w-full max-w-[220px]">
        {/* Original image – untouched */}
        <img
          src={bodyImage}
          alt={`Corps humain - vue ${view === 'face' ? 'de face' : 'de dos'}`}
          draggable={false}
          className="w-full h-auto block pointer-events-none select-none"
        />

        {/* Transparent SVG overlay – positioned exactly on top */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ id, points }) => {
            const isSelected = selectedZone === id;
            const isHovered = hoveredZone === id;

            return (
              <polygon
                key={id}
                points={toSvgPoints(points)}
                fill={
                  isSelected
                    ? HIGHLIGHT_FILL
                    : isHovered
                    ? HOVER_FILL
                    : 'transparent'
                }
                stroke={
                  isSelected
                    ? HIGHLIGHT_COLOR
                    : isHovered
                    ? 'rgba(77,163,255,0.4)'
                    : 'transparent'
                }
                strokeWidth={isSelected ? 0.5 : isHovered ? 0.3 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => onSelectZone(id)}
                onMouseEnter={() => setHoveredZone(id)}
                onMouseLeave={() => setHoveredZone(null)}
              />
            );
          })}

          {/* Tooltip */}
          {hoveredZone && (() => {
            const zone = zones.find(z => z.id === hoveredZone);
            if (!zone) return null;
            const { cx, cy } = getZoneCenter(zone.points);
            const label = BODY_ZONE_LABELS[hoveredZone];

            return (
              <g className="pointer-events-none">
                <rect
                  x={cx - 12}
                  y={cy - 5}
                  width="24"
                  height="5"
                  rx="1.5"
                  fill="hsl(var(--popover))"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.15"
                />
                <text
                  x={cx}
                  y={cy - 1.8}
                  textAnchor="middle"
                  fill="hsl(var(--popover-foreground))"
                  fontSize="2.2"
                  fontWeight="500"
                  fontFamily="system-ui, sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Selected zone label */}
      {selectedZone && (
        <div className="text-sm font-medium text-primary animate-in fade-in-0">
          {BODY_ZONE_LABELS[selectedZone]}
        </div>
      )}
    </div>
  );
}
