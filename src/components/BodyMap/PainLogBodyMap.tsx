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
  className?: string;
}

const HIGHLIGHT_FILL = '#4DA3FF55';
const HIGHLIGHT_STROKE = '#4DA3FF';

const CX = 50;

function zone(id: PainLogZone, d: string): { id: PainLogZone; d: string } {
  return { id, d };
}

const COMMON_ZONES: { id: PainLogZone; d: string }[] = [
  zone('head',           `M${CX-10},8 C${CX-10},2 ${CX+10},2 ${CX+10},8 L${CX+10},16 C${CX+10},20 ${CX-10},20 ${CX-10},16 Z`),
  zone('neck',           `M${CX-5},20 L${CX+5},20 L${CX+5},25 L${CX-5},25 Z`),
  zone('left-shoulder',  `M${CX-5},25 L${CX-18},26 L${CX-22},30 L${CX-20},34 L${CX-16},32 L${CX-5},28 Z`),
  zone('right-shoulder', `M${CX+5},25 L${CX+18},26 L${CX+22},30 L${CX+20},34 L${CX+16},32 L${CX+5},28 Z`),
  zone('left-arm',       `M${CX-22},30 L${CX-20},34 L${CX-20},46 L${CX-26},46 L${CX-28},34 Z`),
  zone('right-arm',      `M${CX+22},30 L${CX+28},34 L${CX+26},46 L${CX+20},46 L${CX+20},34 Z`),
  zone('left-forearm',   `M${CX-26},46 L${CX-20},46 L${CX-21},58 L${CX-28},58 Z`),
  zone('right-forearm',  `M${CX+20},46 L${CX+26},46 L${CX+28},58 L${CX+21},58 Z`),
  zone('left-hand',      `M${CX-28},58 L${CX-21},58 L${CX-20},65 L${CX-24},66 L${CX-30},64 Z`),
  zone('right-hand',     `M${CX+21},58 L${CX+28},58 L${CX+30},64 L${CX+24},66 L${CX+20},65 Z`),
  zone('pelvis',         `M${CX-14},53 L${CX+14},53 L${CX+12},60 L${CX-12},60 Z`),
  zone('left-hip',       `M${CX-14},58 L${CX-2},58 L${CX-2},63 L${CX-12},63 Z`),
  zone('right-hip',      `M${CX+2},58 L${CX+14},58 L${CX+12},63 L${CX+2},63 Z`),
  zone('left-thigh',     `M${CX-12},60 L${CX-2},60 L${CX-3},76 L${CX-11},76 Z`),
  zone('right-thigh',    `M${CX+2},60 L${CX+12},60 L${CX+11},76 L${CX+3},76 Z`),
  zone('left-knee',      `M${CX-11},76 L${CX-3},76 L${CX-3},81 L${CX-10},81 Z`),
  zone('right-knee',     `M${CX+3},76 L${CX+11},76 L${CX+10},81 L${CX+3},81 Z`),
  zone('left-leg',       `M${CX-10},81 L${CX-3},81 L${CX-3},92 L${CX-9},92 Z`),
  zone('right-leg',      `M${CX+3},81 L${CX+10},81 L${CX+9},92 L${CX+3},92 Z`),
  zone('left-foot',      `M${CX-9},92 L${CX-2},92 L${CX-1},98 L${CX-11},98 Z`),
  zone('right-foot',     `M${CX+2},92 L${CX+9},92 L${CX+11},98 L${CX+1},98 Z`),
];

const FACE_ONLY_ZONES: { id: PainLogZone; d: string }[] = [
  zone('chest',   `M${CX-16},28 L${CX+16},28 L${CX+16},42 L${CX},43 L${CX-16},42 Z`),
  zone('abdomen', `M${CX-16},42 L${CX+16},42 L${CX+14},53 L${CX},54 L${CX-14},53 Z`),
];

const DOS_ONLY_ZONES: { id: PainLogZone; d: string }[] = [
  zone('upper-back', `M${CX-16},28 L${CX+16},28 L${CX+16},42 L${CX},43 L${CX-16},42 Z`),
  zone('lower-back', `M${CX-16},42 L${CX+16},42 L${CX+14},53 L${CX},54 L${CX-14},53 Z`),
];

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);
  const [view, setView] = useState<PainLogView>('face');

  const zones = [
    ...COMMON_ZONES,
    ...(view === 'face' ? FACE_ONLY_ZONES : DOS_ONLY_ZONES),
  ];

  const getFill = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';

  const getStroke = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF88' : 'transparent';

  const getStrokeWidth = (id: PainLogZone) =>
    selectedZone === id ? 0.5 : hoveredZone === id ? 0.4 : 0;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {/* Toggle Face / Dos */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 select-none">
        <button
          type="button"
          onClick={() => setView('face')}
          className={cn(
            'px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
            view === 'face'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Face
        </button>
        <button
          type="button"
          onClick={() => setView('dos')}
          className={cn(
            'px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
            view === 'dos'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Dos
        </button>
      </div>

      {/* Single silhouette with SVG overlay */}
      <div className="relative w-full max-w-[260px]">
        <img
          src={view === 'face' ? bodyFront : bodyBack}
          alt={view === 'face' ? 'Corps humain face' : 'Corps humain dos'}
          draggable={false}
          className="block w-full pointer-events-none select-none"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ id, d }, i) => (
            <path
              key={`${id}-${i}`}
              d={d}
              fill={getFill(id)}
              stroke={getStroke(id)}
              strokeWidth={getStrokeWidth(id)}
              style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
              onClick={() => onSelectZone(id)}
              onMouseEnter={() => setHoveredZone(id)}
              onMouseLeave={() => setHoveredZone(null)}
            />
          ))}
        </svg>
      </div>

      {/* Zone sélectionnée */}
      <div className="text-sm text-center min-h-[20px]">
        {selectedZone ? (
          <span className="font-medium text-primary animate-in fade-in-0">
            {BODY_ZONE_LABELS[selectedZone]}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">
            Touchez une zone pour la sélectionner
          </span>
        )}
      </div>
    </div>
  );
}
