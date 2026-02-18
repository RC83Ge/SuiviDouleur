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

const HIGHLIGHT_FILL = '#4DA3FF55';
const HIGHLIGHT_STROKE = '#4DA3FF';

const CX = 50;

interface ZonePath {
  id: PainLogZone;
  d: string;
  views: PainLogView[];
}

const ZONE_PATHS: ZonePath[] = [
  { id: 'head',          d: `M${CX-5},7 C${CX-5},4 ${CX+5},4 ${CX+5},7 L${CX+5},14 C${CX+5},17 ${CX-5},17 ${CX-5},14 Z`, views: ['face','dos'] },
  { id: 'neck',          d: `M${CX-3},17 L${CX+3},17 L${CX+3},21 L${CX-3},21 Z`, views: ['face','dos'] },
  { id: 'left-shoulder', d: `M${CX-3},21 L${CX-11},22 L${CX-15},26 L${CX-13},29 L${CX-10},27 L${CX-3},24 Z`, views: ['face','dos'] },
  { id: 'right-shoulder',d: `M${CX+3},21 L${CX+11},22 L${CX+15},26 L${CX+13},29 L${CX+10},27 L${CX+3},24 Z`, views: ['face','dos'] },
  { id: 'chest',         d: `M${CX-10},24 L${CX+10},24 L${CX+10},38 L${CX},39 L${CX-10},38 Z`, views: ['face'] },
  { id: 'upper-back',    d: `M${CX-10},24 L${CX+10},24 L${CX+10},38 L${CX},39 L${CX-10},38 Z`, views: ['dos'] },
  { id: 'left-arm',      d: `M${CX-15},26 L${CX-13},29 L${CX-13},41 L${CX-18},41 L${CX-19},29 Z`, views: ['face','dos'] },
  { id: 'right-arm',     d: `M${CX+15},26 L${CX+19},29 L${CX+18},41 L${CX+13},41 L${CX+13},29 Z`, views: ['face','dos'] },
  { id: 'left-forearm',  d: `M${CX-18},41 L${CX-13},41 L${CX-14},55 L${CX-19},55 Z`, views: ['face','dos'] },
  { id: 'right-forearm', d: `M${CX+13},41 L${CX+18},41 L${CX+19},55 L${CX+14},55 Z`, views: ['face','dos'] },
  { id: 'left-hand',     d: `M${CX-19},55 L${CX-14},55 L${CX-13},62 L${CX-16},63 L${CX-20},61 Z`, views: ['face','dos'] },
  { id: 'right-hand',    d: `M${CX+14},55 L${CX+19},55 L${CX+20},61 L${CX+16},63 L${CX+13},62 Z`, views: ['face','dos'] },
  { id: 'abdomen',       d: `M${CX-10},38 L${CX+10},38 L${CX+9},50 L${CX},51 L${CX-9},50 Z`, views: ['face'] },
  { id: 'lower-back',    d: `M${CX-10},38 L${CX+10},38 L${CX+9},50 L${CX},51 L${CX-9},50 Z`, views: ['dos'] },
  { id: 'pelvis',        d: `M${CX-9},50 L${CX+9},50 L${CX+8},57 L${CX-8},57 Z`, views: ['face','dos'] },
  { id: 'left-hip',      d: `M${CX-9},54 L${CX-1},54 L${CX-1},58 L${CX-8},58 Z`, views: ['face','dos'] },
  { id: 'right-hip',     d: `M${CX+1},54 L${CX+9},54 L${CX+8},58 L${CX+1},58 Z`, views: ['face','dos'] },
  { id: 'left-thigh',    d: `M${CX-8},57 L${CX-1},57 L${CX-2},73 L${CX-8},73 Z`, views: ['face','dos'] },
  { id: 'right-thigh',   d: `M${CX+1},57 L${CX+8},57 L${CX+8},73 L${CX+2},73 Z`, views: ['face','dos'] },
  { id: 'left-knee',     d: `M${CX-8},73 L${CX-2},73 L${CX-2},79 L${CX-7},79 Z`, views: ['face','dos'] },
  { id: 'right-knee',    d: `M${CX+2},73 L${CX+8},73 L${CX+7},79 L${CX+2},79 Z`, views: ['face','dos'] },
  { id: 'left-leg',      d: `M${CX-7},79 L${CX-2},79 L${CX-2},91 L${CX-6},91 Z`, views: ['face','dos'] },
  { id: 'right-leg',     d: `M${CX+2},79 L${CX+7},79 L${CX+6},91 L${CX+2},91 Z`, views: ['face','dos'] },
  { id: 'left-foot',     d: `M${CX-7},91 L${CX-1},91 L${CX},97 L${CX-8},97 Z`, views: ['face','dos'] },
  { id: 'right-foot',    d: `M${CX+1},91 L${CX+7},91 L${CX+8},97 L${CX},97 Z`, views: ['face','dos'] },
];

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  view,
  onViewChange,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);

  const zones = ZONE_PATHS.filter(z => z.views.includes(view));
  const bodyImage = view === 'face' ? bodyFront : bodyBack;

  const getFill = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';

  const getStroke = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF66' : 'transparent';

  const getStrokeWidth = (id: PainLogZone) =>
    selectedZone === id ? 2 : hoveredZone === id ? 1.5 : 0;

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* Toggle Face / Dos */}
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

      {/* Image + SVG overlay */}
      <div className="relative w-full max-w-[220px] mx-auto">
        <img
          src={bodyImage}
          alt={`Corps humain vue ${view === 'face' ? 'de face' : 'de dos'}`}
          draggable={false}
          className="block w-full pointer-events-none select-none"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ id, d }) => (
            <path
              key={id}
              d={d}
              fill={getFill(id)}
              stroke={getStroke(id)}
              strokeWidth={getStrokeWidth(id) * 0.3}
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
            Zone sélectionnée : {BODY_ZONE_LABELS[selectedZone]}
          </span>
        ) : (
          <span className="text-muted-foreground">
            Sélectionnez une zone du corps
          </span>
        )}
      </div>
    </div>
  );
}
