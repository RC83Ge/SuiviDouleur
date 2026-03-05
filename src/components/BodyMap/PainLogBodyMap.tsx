import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { Eye, EyeOff } from 'lucide-react';
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
  const [debugMode, setDebugMode] = useState(false);

  const zones: EllipseZone[] = [
  ...COMMON_ELLIPSES,
  ...(view === 'face' ? FACE_ELLIPSES : DOS_ELLIPSES)];


  const DEBUG_COLORS = [
  '#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB',
  '#9966FF', '#C9CBCF', '#FF6384', '#FF9F40', '#FFCD56',
  '#4BC0C0', '#36A2EB', '#9966FF', '#C9CBCF', '#FF6384',
  '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#9966FF',
  '#C9CBCF', '#FF6384', '#FF9F40'];


  const getFill = (id: PainLogZone, idx: number) => {
    if (debugMode) return `${DEBUG_COLORS[idx % DEBUG_COLORS.length]}55`;
    return selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';
  };

  const getStroke = (id: PainLogZone, idx: number) => {
    if (debugMode) return DEBUG_COLORS[idx % DEBUG_COLORS.length];
    return selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF88' : 'transparent';
  };

  const getStrokeWidth = (id: PainLogZone) => {
    if (debugMode) return 0.4;
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
        <button
          type="button"
          onClick={() => setDebugMode(!debugMode)}
          className={cn(
            'p-1.5 rounded-lg transition-all duration-200 text-xs',
            debugMode ?
            'bg-amber-500/20 text-amber-600 border border-amber-500/30' :
            'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
          title={debugMode ? 'Désactiver debug' : 'Activer debug'}>

          {debugMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
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

          {zones.map(({ id, d }, i) => {
            const center = getPathCenter(d);
            const bounds = getPathBounds(d);
            return (
              <path
                key={`${id}-${i}`}
                d={d}
                fill={getFill(id, i)}
                stroke={getStroke(id, i)}
                strokeWidth={getStrokeWidth(id)}
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onClick={() => {
                  onSelectZone(id);
                  if (debugMode) {
                    console.log(`[Zone] ${BODY_ZONE_LABELS[id]} (${id})`, {
                      center: { x: center.x.toFixed(1), y: center.y.toFixed(1) },
                      bounds: { x: bounds.minX.toFixed(1), y: bounds.minY.toFixed(1), w: (bounds.maxX - bounds.minX).toFixed(1), h: (bounds.maxY - bounds.minY).toFixed(1) },
                    });
                  }
                }}
                onMouseEnter={() => setHoveredZone(id)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {debugMode && (
                  <title>{`${BODY_ZONE_LABELS[id]}\nX:${center.x.toFixed(1)} Y:${center.y.toFixed(1)}\nW:${(bounds.maxX - bounds.minX).toFixed(1)} H:${(bounds.maxY - bounds.minY).toFixed(1)}`}</title>
                )}
              </path>
            );
          })}
          {/* Debug labels */}
          {debugMode && zones.map(({ id, d }) => {
            const center = getPathCenter(d);
            return (
              <text
                key={`label-${id}`}
                x={center.x}
                y={center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="2.2"
                fontWeight="600"
                className="pointer-events-none">
                {BODY_ZONE_LABELS[id]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Debug legend */}
      {debugMode &&
      <div className="p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg w-full">
          <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
            🔍 Mode debug — Contours des zones visibles
          </p>
        </div>
      }

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