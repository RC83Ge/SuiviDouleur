import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyImage from '@/assets/body-front-back.png';

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

// SVG viewBox: 0 0 100 100 — percentage-based coordinates over one half of the image
interface ZonePath {
  id: PainLogZone;
  element: 'path';
  attrs: {d: string;};
  views: PainLogView[];
}

// cx differs per view: face body is right-of-center, dos body is left-of-center
const CX_FACE = 52;
const CX_DOS = 48;

function buildZonePaths(cx: number): ZonePath[] {
  return [
  { id: 'head', element: 'path', attrs: { d: `M${cx - 5},7 C${cx - 5},3.5 ${cx + 5},3.5 ${cx + 5},7 L${cx + 5},13 C${cx + 5},16 ${cx - 5},16 ${cx - 5},13 Z` }, views: ['face', 'dos'] },
  { id: 'neck', element: 'path', attrs: { d: `M${cx - 3},16 L${cx + 3},16 L${cx + 3},20 L${cx - 3},20 Z` }, views: ['face', 'dos'] },
  { id: 'left-shoulder', element: 'path', attrs: { d: `M${cx - 3},20 L${cx - 13},20 L${cx - 19},25 L${cx - 16},28 L${cx - 12},26 L${cx - 3},24 Z` }, views: ['face', 'dos'] },
  { id: 'right-shoulder', element: 'path', attrs: { d: `M${cx + 3},20 L${cx + 13},20 L${cx + 19},25 L${cx + 16},28 L${cx + 12},26 L${cx + 3},24 Z` }, views: ['face', 'dos'] },
  { id: 'chest', element: 'path', attrs: { d: `M${cx - 12},24 L${cx + 12},24 L${cx + 12},38 L${cx},39 L${cx - 12},38 Z` }, views: ['face'] },
  { id: 'upper-back', element: 'path', attrs: { d: `M${cx - 12},24 L${cx + 12},24 L${cx + 12},38 L${cx},39 L${cx - 12},38 Z` }, views: ['dos'] },
  { id: 'left-arm', element: 'path', attrs: { d: `M${cx - 16},25 L${cx - 14},28 L${cx - 15},40 L${cx - 20},40 L${cx - 21},28 Z` }, views: ['face', 'dos'] },
  { id: 'right-arm', element: 'path', attrs: { d: `M${cx + 16},25 L${cx + 21},28 L${cx + 20},40 L${cx + 15},40 L${cx + 14},28 Z` }, views: ['face', 'dos'] },
  { id: 'left-forearm', element: 'path', attrs: { d: `M${cx - 20},40 L${cx - 15},40 L${cx - 17},54 L${cx - 22},54 Z` }, views: ['face', 'dos'] },
  { id: 'right-forearm', element: 'path', attrs: { d: `M${cx + 15},40 L${cx + 20},40 L${cx + 22},54 L${cx + 17},54 Z` }, views: ['face', 'dos'] },
  { id: 'left-hand', element: 'path', attrs: { d: `M${cx - 22},54 L${cx - 17},54 L${cx - 16},60 L${cx - 19},62 L${cx - 24},61 Z` }, views: ['face', 'dos'] },
  { id: 'right-hand', element: 'path', attrs: { d: `M${cx + 17},54 L${cx + 22},54 L${cx + 24},61 L${cx + 19},62 L${cx + 16},60 Z` }, views: ['face', 'dos'] },
  { id: 'abdomen', element: 'path', attrs: { d: `M${cx - 12},38 L${cx + 12},38 L${cx + 11},50 L${cx},51 L${cx - 11},50 Z` }, views: ['face'] },
  { id: 'lower-back', element: 'path', attrs: { d: `M${cx - 12},38 L${cx + 12},38 L${cx + 11},50 L${cx},51 L${cx - 11},50 Z` }, views: ['dos'] },
  { id: 'pelvis', element: 'path', attrs: { d: `M${cx - 11},50 L${cx + 11},50 L${cx + 10},57 L${cx - 10},57 Z` }, views: ['face', 'dos'] },
  { id: 'left-hip', element: 'path', attrs: { d: `M${cx - 10},55 L${cx - 1},55 L${cx - 1},60 L${cx - 9},60 Z` }, views: ['face', 'dos'] },
  { id: 'right-hip', element: 'path', attrs: { d: `M${cx + 1},55 L${cx + 10},55 L${cx + 9},60 L${cx + 1},60 Z` }, views: ['face', 'dos'] },
  { id: 'left-thigh', element: 'path', attrs: { d: `M${cx - 9},58 L${cx - 1},58 L${cx - 3},74 L${cx - 8},74 Z` }, views: ['face', 'dos'] },
  { id: 'right-thigh', element: 'path', attrs: { d: `M${cx + 1},58 L${cx + 9},58 L${cx + 8},74 L${cx + 3},74 Z` }, views: ['face', 'dos'] },
  { id: 'left-knee', element: 'path', attrs: { d: `M${cx - 8},74 L${cx - 3},74 L${cx - 3},79 L${cx - 7},79 Z` }, views: ['face', 'dos'] },
  { id: 'right-knee', element: 'path', attrs: { d: `M${cx + 3},74 L${cx + 8},74 L${cx + 7},79 L${cx + 3},79 Z` }, views: ['face', 'dos'] },
  { id: 'left-leg', element: 'path', attrs: { d: `M${cx - 7},79 L${cx - 3},79 L${cx - 3},90 L${cx - 6},90 Z` }, views: ['face', 'dos'] },
  { id: 'right-leg', element: 'path', attrs: { d: `M${cx + 3},79 L${cx + 7},79 L${cx + 6},90 L${cx + 3},90 Z` }, views: ['face', 'dos'] },
  { id: 'left-foot', element: 'path', attrs: { d: `M${cx - 7},90 L${cx - 2},90 L${cx - 1},96 L${cx - 8},96 Z` }, views: ['face', 'dos'] },
  { id: 'right-foot', element: 'path', attrs: { d: `M${cx + 2},90 L${cx + 7},90 L${cx + 8},96 L${cx + 1},96 Z` }, views: ['face', 'dos'] }];

}


export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  view,
  onViewChange,
  className
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);
  const [debugMode, setDebugMode] = useState(false);


  const currentCx = view === 'face' ? CX_FACE : CX_DOS;
  const zones = buildZonePaths(currentCx).filter((z) => z.views.includes(view));

  // Compute center of a path's bounding box from d attribute
  const getPathCenter = (d: string): {x: number;y: number;} => {
    const nums = d.match(/[\d.]+/g)?.map(Number) || [];
    let minX = Infinity,minY = Infinity,maxX = -Infinity,maxY = -Infinity;
    for (let i = 0; i < nums.length - 1; i += 2) {
      if (nums[i] < minX) minX = nums[i];
      if (nums[i] > maxX) maxX = nums[i];
      if (nums[i + 1] < minY) minY = nums[i + 1];
      if (nums[i + 1] > maxY) maxY = nums[i + 1];
    }
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  };

  const getFill = (id: PainLogZone) => {
    if (debugMode) return 'rgba(255,60,60,0.08)';
    return selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';
  };

  const getStroke = (id: PainLogZone) => {
    if (debugMode) return 'rgba(220,40,40,0.7)';
    return selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF66' : 'transparent';
  };

  const getStrokeWidth = (_id: PainLogZone) => {
    if (debugMode) return 1.2;
    return selectedZone === _id ? 2 : hoveredZone === _id ? 1.5 : 0;
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* View toggle */}
      {onViewChange &&
      <div className="flex bg-muted rounded-lg p-1 w-fit">
          <button
          type="button"
          onClick={() => onViewChange('face')}
          className={cn(
            'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
            view === 'face' ?
            'bg-background text-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground'
          )}>

            Face
          </button>
          <button
          type="button"
          onClick={() => onViewChange('dos')}
          className={cn(
            'px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
            view === 'dos' ?
            'bg-background text-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground'
          )}>

            Dos
          </button>
        </div>
      }
      {/* Debug toggle */}
      <button
        type="button"
        onClick={() => setDebugMode(!debugMode)}
        className={cn("px-3 py-1 rounded-md border transition-all text-base bg-secondary",

        debugMode ?
        'bg-amber-500/20 text-amber-600 border-amber-500/30' :
        'bg-muted text-muted-foreground border-transparent'
        )}>

        {debugMode ? '🔍 Debug ON' : 'Debug'}
      </button>

      {/* Image + SVG overlay */}
      <div className="relative w-full max-w-[300px]">
        {/* Container clips to show only left or right half of the image */}
        <div
          className="relative w-full overflow-hidden">

          <img
            src={bodyImage}
            alt={`Corps humain - vue ${view === 'face' ? 'de face' : 'de dos'}`}
            draggable={false}
            className="block pointer-events-none select-none"
            style={{
              width: '200%',
              maxWidth: 'none',
              marginLeft: view === 'face' ? '0' : '-100%'
            }} />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full mr-[3px]"
            style={{ touchAction: 'manipulation' }}>

            {zones.map(({ id, attrs }) => {
              const commonProps = {
                key: id,
                fill: getFill(id),
                stroke: getStroke(id),
                strokeWidth: getStrokeWidth(id) * 0.3,
                style: { cursor: 'pointer' as const, transition: 'all 0.2s ease' },
                onClick: () => onSelectZone(id),
                onMouseEnter: () => setHoveredZone(id),
                onMouseLeave: () => setHoveredZone(null)
              };

              return <path {...commonProps} d={attrs.d} />;
            })}
            {/* Debug ID labels */}
            {debugMode && zones.map(({ id, attrs }) => {
              const center = getPathCenter(attrs.d);
              return (
                <text
                  key={`label-${id}`}
                  x={center.x}
                  y={center.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(220,40,40,0.9)"
                  fontSize="2.2"
                  fontWeight="700"
                  fontFamily="monospace"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 0 2px rgba(255,255,255,0.9)' }}>

                  {id}
                </text>);

            })}
          </svg>
        </div>
      </div>

      {/* Selected zone label */}
      <div className="text-sm text-center min-h-[20px]">
        {selectedZone ?
        <span className="font-medium text-primary animate-in fade-in-0">
            Zone sélectionnée : {BODY_ZONE_LABELS[selectedZone]}
          </span> :

        <span className="text-muted-foreground">
            Sélectionnez une zone du corps
          </span>
        }
      </div>
    </div>);

}