import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { COMMON_ELLIPSES, FACE_ELLIPSES, DOS_ELLIPSES, EllipseZone } from './bodyZoneEllipses';

export type PainLogZone = BodyZone;
export type PainLogView = 'face' | 'dos';

interface PainLogBodyMapProps {
  selectedZone: PainLogZone | null;
  onSelectZone: (zoneId: PainLogZone) => void;
  className?: string;
}

const HIGHLIGHT_FILL = '#4DA3FF55';
const HIGHLIGHT_STROKE = '#4DA3FF';


export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  className
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);
  const [view, setView] = useState<PainLogView>('face');

  const zones: EllipseZone[] = [
    ...COMMON_ELLIPSES,
    ...(view === 'face' ? FACE_ELLIPSES : DOS_ELLIPSES)
  ];

  const getFill = (id: PainLogZone) => {
    return selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';
  };

  const getStroke = (id: PainLogZone) => {
    return selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF88' : 'transparent';
  };

  const getStrokeWidth = (id: PainLogZone) => {
    return selectedZone === id ? 0.5 : hoveredZone === id ? 0.4 : 0;
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {/* Toggle Face / Dos + Debug */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 select-none">
          <button
            type="button"
            onClick={() => setView('face')}
            className={cn(
              'px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
              view === 'face' ?
              'bg-background text-foreground shadow-sm' :
              'text-muted-foreground hover:text-foreground'
            )}>

            Face
          </button>
          <button
            type="button"
            onClick={() => setView('dos')}
            className={cn(
              'px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
              view === 'dos' ?
              'bg-background text-foreground shadow-sm' :
              'text-muted-foreground hover:text-foreground'
            )}>

            Dos
          </button>
        </div>
      </div>

      {/* Single silhouette with SVG overlay */}
      <div className="relative w-full max-w-[260px]">
        <img
          src={view === 'face' ? bodyFront : bodyBack}
          alt={view === 'face' ? 'Corps humain face' : 'Corps humain dos'}
          draggable={false}
          className="block w-full pointer-events-none select-none" />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full mx-px px-0 pr-px pt-0 mt-0 mb-[6px] rounded-3xl opacity-100 shadow-2xl"
          style={{ touchAction: 'manipulation' }}>

          {zones.map(({ id, cx, cy, rx, ry }, i) => (
              <ellipse
                key={`${id}-${i}`}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
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
        {selectedZone ?
        <span className="font-medium text-primary animate-in fade-in-0">
            {BODY_ZONE_LABELS[selectedZone]}
          </span> :

        <span className="text-muted-foreground text-xs">
            Touchez une zone pour la sélectionner
          </span>
        }
      </div>
    </div>);

}