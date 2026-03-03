import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { Eye, EyeOff } from 'lucide-react';

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

function zone(id: PainLogZone, d: string): {id: PainLogZone;d: string;} {
  return { id, d };
}

const COMMON_ZONES: {id: PainLogZone;d: string;}[] = [
// Head: oval at top
zone('head', `M${CX - 7},5 C${CX - 7},1 ${CX + 7},1 ${CX + 7},5 L${CX + 7},10 C${CX + 7},13 ${CX - 7},13 ${CX - 7},10 Z`),
// Neck: narrow strip
zone('neck', `M${CX - 3},13 L${CX + 3},13 L${CX + 3},17 L${CX - 3},17 Z`),
// Shoulders: connect neck to arms — wider to reach arm start
zone('left-shoulder', `M${CX - 3},17 L${CX - 15},17 L${CX - 16},20 L${CX - 15},22 L${CX - 3},20 Z`),
zone('right-shoulder', `M${CX + 3},17 L${CX + 15},17 L${CX + 16},20 L${CX + 15},22 L${CX + 3},20 Z`),
// Arms: pushed outward to hug the silhouette arms
zone('left-arm', `M${CX - 23},20 L${CX - 20},22 L${CX - 19},35 L${CX - 22},35 Z`),
zone('right-arm', `M${CX + 20},22 L${CX + 23},20 L${CX + 22},35 L${CX + 19},35 Z`),
// Forearms: continue outward, slight taper
zone('left-forearm', `M${CX - 24},35 L${CX - 21},35 L${CX - 20},48 L${CX - 23},48 Z`),
zone('right-forearm', `M${CX + 19},35 L${CX + 22},35 L${CX + 21},48 L${CX + 18},48 Z`),
// Hands: centered on palms, below forearms, not overlapping pelvis
zone('left-hand', `M${CX - 16},48 L${CX - 13},48 L${CX - 12},54 L${CX - 17},54 Z`),
zone('right-hand', `M${CX + 13},48 L${CX + 16},48 L${CX + 17},54 L${CX + 12},54 Z`),
// Pelvis: below abdomen — narrower to avoid hands
zone('pelvis', `M${CX - 11},50 L${CX + 11},50 L${CX + 10},56 L${CX - 10},56 Z`),
// Hips
zone('left-hip', `M${CX - 11},54 L${CX - 1},54 L${CX - 1},59 L${CX - 10},59 Z`),
zone('right-hip', `M${CX + 1},54 L${CX + 11},54 L${CX + 10},59 L${CX + 1},59 Z`),
// Thighs
zone('left-thigh', `M${CX - 10},59 L${CX - 2},59 L${CX - 3},74 L${CX - 9},74 Z`),
zone('right-thigh', `M${CX + 2},59 L${CX + 10},59 L${CX + 9},74 L${CX + 3},74 Z`),
// Knees
zone('left-knee', `M${CX - 9},74 L${CX - 3},74 L${CX - 3},79 L${CX - 8},79 Z`),
zone('right-knee', `M${CX + 3},74 L${CX + 9},74 L${CX + 8},79 L${CX + 3},79 Z`),
// Lower legs
zone('left-leg', `M${CX - 8},79 L${CX - 3},79 L${CX - 3},90 L${CX - 7},90 Z`),
zone('right-leg', `M${CX + 3},79 L${CX + 8},79 L${CX + 7},90 L${CX + 3},90 Z`),
// Feet
zone('left-foot', `M${CX - 8},90 L${CX - 2},90 L${CX - 1},97 L${CX - 9},97 Z`),
zone('right-foot', `M${CX + 2},90 L${CX + 8},90 L${CX + 9},97 L${CX + 1},97 Z`)];


const FACE_ONLY_ZONES: {id: PainLogZone;d: string;}[] = [
zone('chest', `M${CX - 14},20 L${CX + 14},20 L${CX + 13},36 L${CX},37 L${CX - 13},36 Z`),
zone('abdomen', `M${CX - 13},36 L${CX + 13},36 L${CX + 12},50 L${CX},51 L${CX - 12},50 Z`)];


const DOS_ONLY_ZONES: {id: PainLogZone;d: string;}[] = [
zone('upper-back', `M${CX - 14},20 L${CX + 14},20 L${CX + 13},36 L${CX},37 L${CX - 13},36 Z`),
zone('lower-back', `M${CX - 13},36 L${CX + 13},36 L${CX + 12},50 L${CX},51 L${CX - 12},50 Z`)];


export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  className
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);
  const [view, setView] = useState<PainLogView>('face');
  const [debugMode, setDebugMode] = useState(false);

  const zones = [
  ...COMMON_ZONES,
  ...(view === 'face' ? FACE_ONLY_ZONES : DOS_ONLY_ZONES)];


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

  // Get center of a path for label positioning
  const getPathCenter = (d: string) => {
    const nums = d.match(/[\d.]+/g)?.map(Number) || [];
    let sumX = 0,sumY = 0,count = 0;
    for (let i = 0; i < nums.length - 1; i += 2) {
      sumX += nums[i];sumY += nums[i + 1];count++;
    }
    return { x: count ? sumX / count : 50, y: count ? sumY / count : 50 };
  };

  // Get bounding box of a path
  const getPathBounds = (d: string) => {
    const nums = d.match(/[\d.]+/g)?.map(Number) || [];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < nums.length - 1; i += 2) {
      minX = Math.min(minX, nums[i]); maxX = Math.max(maxX, nums[i]);
      minY = Math.min(minY, nums[i + 1]); maxY = Math.max(maxY, nums[i + 1]);
    }
    return { minX, minY, maxX, maxY };
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