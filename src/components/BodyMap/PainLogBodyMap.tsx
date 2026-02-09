import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { BodyZone } from '@/types/pain';

export type PainLogZone = BodyZone;

export type PainLogView = 'face' | 'dos';

interface PainLogBodyMapProps {
  selectedZone: PainLogZone | null;
  onSelectZone: (zoneId: PainLogZone) => void;
  view: PainLogView;
  onViewChange?: (view: PainLogView) => void;
  className?: string;
}

const ZONE_LABELS: Record<PainLogZone, string> = {
  head: 'Tête',
  neck: 'Cou',
  chest: 'Thorax',
  abdomen: 'Abdomen',
  'left-shoulder': 'Épaule G',
  'right-shoulder': 'Épaule D',
  'left-arm': 'Bras G',
  'right-arm': 'Bras D',
  'left-forearm': 'Avant-bras G',
  'right-forearm': 'Avant-bras D',
  'left-hand': 'Main G',
  'right-hand': 'Main D',
  'left-hip': 'Hanche G',
  'right-hip': 'Hanche D',
  pelvis: 'Bassin',
  'left-thigh': 'Cuisse G',
  'right-thigh': 'Cuisse D',
  'left-knee': 'Genou G',
  'right-knee': 'Genou D',
  'left-leg': 'Jambe G',
  'right-leg': 'Jambe D',
  'left-foot': 'Pied G',
  'right-foot': 'Pied D',
  'upper-back': 'Haut du dos',
  'lower-back': 'Bas du dos',
};

const HIGHLIGHT_COLOR = '#4DA3FF';
const HIGHLIGHT_FILL = 'rgba(77, 163, 255, 0.35)';
const HOVER_FILL = 'rgba(77, 163, 255, 0.15)';
const BODY_FILL = '#5B8FAF';
const BODY_STROKE = '#3A6B8C';

// ─── Front view zones (SVG paths matching a medical silhouette) ───
// viewBox: 0 0 200 500
const FRONT_ZONES: { id: PainLogZone; path: string }[] = [
  // Head - oval
  {
    id: 'head',
    path: 'M100,18 C116,18 128,30 128,52 C128,74 116,86 100,86 C84,86 72,74 72,52 C72,30 84,18 100,18 Z',
  },
  // Neck
  {
    id: 'neck',
    path: 'M91,86 L109,86 L109,105 L91,105 Z',
  },
  // Left shoulder
  {
    id: 'left-shoulder',
    path: 'M60,105 L91,105 L91,125 L75,130 L55,125 Z',
  },
  // Right shoulder
  {
    id: 'right-shoulder',
    path: 'M109,105 L140,105 L145,125 L125,130 L109,125 Z',
  },
  // Chest
  {
    id: 'chest',
    path: 'M75,125 L125,125 L125,190 L100,195 L75,190 Z',
  },
  // Left arm (upper)
  {
    id: 'left-arm',
    path: 'M55,125 L75,130 L75,190 L68,210 L52,210 L45,170 Z',
  },
  // Right arm (upper)
  {
    id: 'right-arm',
    path: 'M125,130 L145,125 L155,170 L148,210 L132,210 L125,190 Z',
  },
  // Abdomen
  {
    id: 'abdomen',
    path: 'M75,190 L125,190 L128,255 L100,265 L72,255 Z',
  },
  // Left forearm
  {
    id: 'left-forearm',
    path: 'M45,210 L68,210 L65,285 L40,285 Z',
  },
  // Right forearm
  {
    id: 'right-forearm',
    path: 'M132,210 L155,210 L160,285 L135,285 Z',
  },
  // Left hand
  {
    id: 'left-hand',
    path: 'M37,285 L65,285 L64,320 L52,330 L38,320 Z',
  },
  // Right hand
  {
    id: 'right-hand',
    path: 'M135,285 L163,285 L162,320 L148,330 L136,320 Z',
  },
  // Pelvis / hips
  {
    id: 'pelvis',
    path: 'M72,255 L128,255 L132,290 L68,290 Z',
  },
  // Left thigh
  {
    id: 'left-thigh',
    path: 'M68,290 L98,290 L93,370 L72,370 Z',
  },
  // Right thigh
  {
    id: 'right-thigh',
    path: 'M102,290 L132,290 L128,370 L107,370 Z',
  },
  // Left knee
  {
    id: 'left-knee',
    path: 'M72,370 L93,370 L92,400 L73,400 Z',
  },
  // Right knee
  {
    id: 'right-knee',
    path: 'M107,370 L128,370 L127,400 L108,400 Z',
  },
  // Left leg (calf)
  {
    id: 'left-leg',
    path: 'M73,400 L92,400 L90,460 L75,460 Z',
  },
  // Right leg (calf)
  {
    id: 'right-leg',
    path: 'M108,400 L127,400 L125,460 L110,460 Z',
  },
  // Left foot
  {
    id: 'left-foot',
    path: 'M70,460 L92,460 L92,485 L68,485 Z',
  },
  // Right foot
  {
    id: 'right-foot',
    path: 'M108,460 L130,460 L132,485 L108,485 Z',
  },
];

// ─── Back view zones ───
const BACK_ZONES: { id: PainLogZone; path: string }[] = [
  {
    id: 'head',
    path: 'M100,18 C116,18 128,30 128,52 C128,74 116,86 100,86 C84,86 72,74 72,52 C72,30 84,18 100,18 Z',
  },
  {
    id: 'neck',
    path: 'M91,86 L109,86 L109,105 L91,105 Z',
  },
  {
    id: 'left-shoulder',
    path: 'M60,105 L91,105 L91,125 L75,130 L55,125 Z',
  },
  {
    id: 'right-shoulder',
    path: 'M109,105 L140,105 L145,125 L125,130 L109,125 Z',
  },
  // Upper back (replaces chest)
  {
    id: 'upper-back',
    path: 'M75,125 L125,125 L125,190 L100,195 L75,190 Z',
  },
  {
    id: 'left-arm',
    path: 'M55,125 L75,130 L75,190 L68,210 L52,210 L45,170 Z',
  },
  {
    id: 'right-arm',
    path: 'M125,130 L145,125 L155,170 L148,210 L132,210 L125,190 Z',
  },
  // Lower back (replaces abdomen)
  {
    id: 'lower-back',
    path: 'M75,190 L125,190 L128,255 L100,265 L72,255 Z',
  },
  {
    id: 'left-forearm',
    path: 'M45,210 L68,210 L65,285 L40,285 Z',
  },
  {
    id: 'right-forearm',
    path: 'M132,210 L155,210 L160,285 L135,285 Z',
  },
  {
    id: 'left-hand',
    path: 'M37,285 L65,285 L64,320 L52,330 L38,320 Z',
  },
  {
    id: 'right-hand',
    path: 'M135,285 L163,285 L162,320 L148,330 L136,320 Z',
  },
  {
    id: 'pelvis',
    path: 'M72,255 L128,255 L132,290 L68,290 Z',
  },
  {
    id: 'left-thigh',
    path: 'M68,290 L98,290 L93,370 L72,370 Z',
  },
  {
    id: 'right-thigh',
    path: 'M102,290 L132,290 L128,370 L107,370 Z',
  },
  {
    id: 'left-knee',
    path: 'M72,370 L93,370 L92,400 L73,400 Z',
  },
  {
    id: 'right-knee',
    path: 'M107,370 L128,370 L127,400 L108,400 Z',
  },
  {
    id: 'left-leg',
    path: 'M73,400 L92,400 L90,460 L75,460 Z',
  },
  {
    id: 'right-leg',
    path: 'M108,400 L127,400 L125,460 L110,460 Z',
  },
  {
    id: 'left-foot',
    path: 'M70,460 L92,460 L92,485 L68,485 Z',
  },
  {
    id: 'right-foot',
    path: 'M108,460 L130,460 L132,485 L108,485 Z',
  },
];

// Full body silhouette outline (front view) – single decorative path
const BODY_SILHOUETTE_FRONT = `
  M100,15
  C120,15 130,30 130,55
  C130,78 118,88 110,90
  L112,105
  L142,105
  C150,108 155,118 148,128
  L158,175
  L152,215
  L160,290
  L165,325
  L150,335
  L138,290
  L130,260
  L134,295
  L130,375
  L130,405
  L128,465
  L134,488
  L106,488
  L108,465
  L110,405
  L108,375
  L105,295
  L100,270
  L95,295
  L92,375
  L90,405
  L92,465
  L94,488
  L66,488
  L70,465
  L72,405
  L70,375
  L66,295
  L62,290
  L50,335
  L35,325
  L40,290
  L48,215
  L42,175
  L52,128
  C45,118 50,108 58,105
  L88,105
  L90,90
  C82,88 70,78 70,55
  C70,30 80,15 100,15 Z
`;

const BODY_SILHOUETTE_BACK = BODY_SILHOUETTE_FRONT; // symmetrical

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  view,
  onViewChange,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);

  const zones = view === 'face' ? FRONT_ZONES : BACK_ZONES;
  const silhouette = view === 'face' ? BODY_SILHOUETTE_FRONT : BODY_SILHOUETTE_BACK;

  const getZoneStyle = (zoneId: PainLogZone) => {
    const isSelected = selectedZone === zoneId;
    const isHovered = hoveredZone === zoneId;

    return {
      fill: isSelected ? HIGHLIGHT_FILL : isHovered ? HOVER_FILL : 'transparent',
      stroke: isSelected ? HIGHLIGHT_COLOR : isHovered ? 'rgba(77,163,255,0.4)' : 'transparent',
      strokeWidth: isSelected ? 2 : isHovered ? 1.5 : 0,
      cursor: 'pointer' as const,
      transition: 'all 0.2s ease',
    };
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

      {/* SVG Body */}
      <svg
        viewBox="0 0 200 500"
        className="w-full max-w-[220px] h-auto select-none"
        style={{ touchAction: 'manipulation' }}
      >
        <defs>
          <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6BA3C2" />
            <stop offset="100%" stopColor="#4A7F9E" />
          </linearGradient>
          <filter id="selectedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor={HIGHLIGHT_COLOR} floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body silhouette fill */}
        <path
          d={silhouette}
          fill="url(#bodyGrad)"
          stroke={BODY_STROKE}
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="pointer-events-none"
        />

        {/* Clickable zones */}
        {zones.map(({ id, path }) => (
          <path
            key={id}
            d={path}
            style={getZoneStyle(id)}
            filter={selectedZone === id ? 'url(#selectedGlow)' : undefined}
            onClick={() => onSelectZone(id)}
            onMouseEnter={() => setHoveredZone(id)}
            onMouseLeave={() => setHoveredZone(null)}
          />
        ))}

        {/* Tooltip */}
        {hoveredZone && (() => {
          const zone = zones.find(z => z.id === hoveredZone);
          if (!zone) return null;
          // Estimate center from path
          const coords = zone.path.match(/(\d+\.?\d*),(\d+\.?\d*)/g) || [];
          const points = coords.map(c => {
            const [x, y] = c.split(',').map(Number);
            return { x, y };
          });
          if (points.length === 0) return null;
          const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
          const cy = points.reduce((s, p) => s + p.y, 0) / points.length;

          return (
            <g className="pointer-events-none">
              <rect
                x={cx - 30}
                y={cy - 22}
                width="60"
                height="16"
                rx="4"
                fill="hsl(var(--popover))"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))' }}
              />
              <text
                x={cx}
                y={cy - 11}
                textAnchor="middle"
                fill="hsl(var(--popover-foreground))"
                fontSize="6"
                fontWeight="500"
                fontFamily="system-ui, sans-serif"
              >
                {ZONE_LABELS[hoveredZone]}
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Selected zone label */}
      {selectedZone && (
        <div className="text-sm font-medium text-primary animate-in fade-in-0">
          {ZONE_LABELS[selectedZone]}
        </div>
      )}
    </div>
  );
}
