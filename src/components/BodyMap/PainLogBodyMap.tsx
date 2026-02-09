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

// SVG viewBox: 608x1080 — matches body-front.png / body-back.png exactly
interface ZonePath {
  id: PainLogZone;
  element: 'path';
  attrs: { d: string };
  views: PainLogView[];
}

// cx=304 is the center of the silhouette in 608x1080
const cx = 304;

const ZONE_PATHS: ZonePath[] = [
  // Tête — ellipse ovale
  {
    id: 'head',
    element: 'path',
    attrs: { d: `M${cx},25 C${cx+45},25 ${cx+55},55 ${cx+55},80 C${cx+55},110 ${cx+40},130 ${cx},130 C${cx-40},130 ${cx-55},110 ${cx-55},80 C${cx-55},55 ${cx-45},25 ${cx},25 Z` },
    views: ['face', 'dos'],
  },
  // Cou
  {
    id: 'neck',
    element: 'path',
    attrs: { d: `M${cx-22},130 L${cx+22},130 L${cx+25},175 L${cx-25},175 Z` },
    views: ['face', 'dos'],
  },
  // Épaule gauche
  {
    id: 'left-shoulder',
    element: 'path',
    attrs: { d: `M${cx-25},175 L${cx-75},175 L${cx-110},195 L${cx-105},225 L${cx-70},215 L${cx-25},205 Z` },
    views: ['face', 'dos'],
  },
  // Épaule droite
  {
    id: 'right-shoulder',
    element: 'path',
    attrs: { d: `M${cx+25},175 L${cx+75},175 L${cx+110},195 L${cx+105},225 L${cx+70},215 L${cx+25},205 Z` },
    views: ['face', 'dos'],
  },
  // Thorax (face)
  {
    id: 'chest',
    element: 'path',
    attrs: { d: `M${cx-70},205 L${cx+70},205 L${cx+70},340 L${cx},350 L${cx-70},340 Z` },
    views: ['face'],
  },
  // Haut du dos (dos)
  {
    id: 'upper-back',
    element: 'path',
    attrs: { d: `M${cx-70},205 L${cx+70},205 L${cx+70},340 L${cx},350 L${cx-70},340 Z` },
    views: ['dos'],
  },
  // Bras gauche (haut)
  {
    id: 'left-arm',
    element: 'path',
    attrs: { d: `M${cx-110},195 L${cx-105},225 L${cx-100},340 L${cx-130},340 L${cx-135},230 Z` },
    views: ['face', 'dos'],
  },
  // Bras droit (haut)
  {
    id: 'right-arm',
    element: 'path',
    attrs: { d: `M${cx+110},195 L${cx+135},230 L${cx+130},340 L${cx+100},340 L${cx+105},225 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras gauche
  {
    id: 'left-forearm',
    element: 'path',
    attrs: { d: `M${cx-130},340 L${cx-100},340 L${cx-105},490 L${cx-135},490 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras droit
  {
    id: 'right-forearm',
    element: 'path',
    attrs: { d: `M${cx+100},340 L${cx+130},340 L${cx+135},490 L${cx+105},490 Z` },
    views: ['face', 'dos'],
  },
  // Main gauche
  {
    id: 'left-hand',
    element: 'path',
    attrs: { d: `M${cx-135},490 L${cx-105},490 L${cx-100},555 L${cx-115},565 L${cx-140},555 Z` },
    views: ['face', 'dos'],
  },
  // Main droite
  {
    id: 'right-hand',
    element: 'path',
    attrs: { d: `M${cx+105},490 L${cx+135},490 L${cx+140},555 L${cx+115},565 L${cx+100},555 Z` },
    views: ['face', 'dos'],
  },
  // Abdomen (face)
  {
    id: 'abdomen',
    element: 'path',
    attrs: { d: `M${cx-70},340 L${cx+70},340 L${cx+65},460 L${cx},470 L${cx-65},460 Z` },
    views: ['face'],
  },
  // Bas du dos (dos)
  {
    id: 'lower-back',
    element: 'path',
    attrs: { d: `M${cx-70},340 L${cx+70},340 L${cx+65},460 L${cx},470 L${cx-65},460 Z` },
    views: ['dos'],
  },
  // Bassin
  {
    id: 'pelvis',
    element: 'path',
    attrs: { d: `M${cx-65},460 L${cx+65},460 L${cx+60},510 L${cx-60},510 Z` },
    views: ['face', 'dos'],
  },
  // Hanche gauche
  {
    id: 'left-hip',
    element: 'path',
    attrs: { d: `M${cx-65},490 L${cx-15},490 L${cx-15},530 L${cx-60},530 Z` },
    views: ['face', 'dos'],
  },
  // Hanche droite
  {
    id: 'right-hip',
    element: 'path',
    attrs: { d: `M${cx+15},490 L${cx+65},490 L${cx+60},530 L${cx+15},530 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse gauche
  {
    id: 'left-thigh',
    element: 'path',
    attrs: { d: `M${cx-60},510 L${cx-8},510 L${cx-15},700 L${cx-55},700 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse droite
  {
    id: 'right-thigh',
    element: 'path',
    attrs: { d: `M${cx+8},510 L${cx+60},510 L${cx+55},700 L${cx+15},700 Z` },
    views: ['face', 'dos'],
  },
  // Genou gauche
  {
    id: 'left-knee',
    element: 'path',
    attrs: { d: `M${cx-55},700 L${cx-15},700 L${cx-18},770 L${cx-52},770 Z` },
    views: ['face', 'dos'],
  },
  // Genou droit
  {
    id: 'right-knee',
    element: 'path',
    attrs: { d: `M${cx+15},700 L${cx+55},700 L${cx+52},770 L${cx+18},770 Z` },
    views: ['face', 'dos'],
  },
  // Jambe gauche (mollet)
  {
    id: 'left-leg',
    element: 'path',
    attrs: { d: `M${cx-52},770 L${cx-18},770 L${cx-20},940 L${cx-48},940 Z` },
    views: ['face', 'dos'],
  },
  // Jambe droite (mollet)
  {
    id: 'right-leg',
    element: 'path',
    attrs: { d: `M${cx+18},770 L${cx+52},770 L${cx+48},940 L${cx+20},940 Z` },
    views: ['face', 'dos'],
  },
  // Pied gauche
  {
    id: 'left-foot',
    element: 'path',
    attrs: { d: `M${cx-52},940 L${cx-15},940 L${cx-12},1010 L${cx-55},1010 Z` },
    views: ['face', 'dos'],
  },
  // Pied droit
  {
    id: 'right-foot',
    element: 'path',
    attrs: { d: `M${cx+15},940 L${cx+52},940 L${cx+55},1010 L${cx+12},1010 Z` },
    views: ['face', 'dos'],
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
  const [debugMode, setDebugMode] = useState(false);

  const bodyImage = view === 'face' ? bodyFront : bodyBack;
  const zones = ZONE_PATHS.filter(z => z.views.includes(view));

  const DEBUG_COLORS: Record<string, string> = {
    head: 'rgba(255,99,132,0.3)', neck: 'rgba(255,159,64,0.3)',
    'left-shoulder': 'rgba(255,205,86,0.3)', 'right-shoulder': 'rgba(75,192,192,0.3)',
    chest: 'rgba(54,162,235,0.3)', 'upper-back': 'rgba(54,162,235,0.3)',
    'left-arm': 'rgba(153,102,255,0.3)', 'right-arm': 'rgba(201,203,207,0.3)',
    'left-forearm': 'rgba(255,99,132,0.3)', 'right-forearm': 'rgba(255,159,64,0.3)',
    'left-hand': 'rgba(255,205,86,0.3)', 'right-hand': 'rgba(75,192,192,0.3)',
    abdomen: 'rgba(54,162,235,0.3)', 'lower-back': 'rgba(54,162,235,0.3)',
    pelvis: 'rgba(153,102,255,0.3)',
    'left-hip': 'rgba(201,203,207,0.3)', 'right-hip': 'rgba(255,99,132,0.3)',
    'left-thigh': 'rgba(255,159,64,0.3)', 'right-thigh': 'rgba(255,205,86,0.3)',
    'left-knee': 'rgba(75,192,192,0.3)', 'right-knee': 'rgba(54,162,235,0.3)',
    'left-leg': 'rgba(153,102,255,0.3)', 'right-leg': 'rgba(201,203,207,0.3)',
    'left-foot': 'rgba(255,99,132,0.3)', 'right-foot': 'rgba(255,159,64,0.3)',
  };

  const getFill = (id: PainLogZone) => {
    if (debugMode) return DEBUG_COLORS[id] || 'rgba(128,128,128,0.3)';
    return selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';
  };

  const getStroke = (id: PainLogZone) => {
    if (debugMode) return (DEBUG_COLORS[id] || 'rgba(128,128,128,0.5)').replace('0.3', '0.8');
    return selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF66' : 'transparent';
  };

  const getStrokeWidth = (id: PainLogZone) => {
    if (debugMode) return 1.5;
    return selectedZone === id ? 2 : hoveredZone === id ? 1.5 : 0;
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
      {/* Debug toggle */}
      <button
        type="button"
        onClick={() => setDebugMode(!debugMode)}
        className={cn(
          'px-3 py-1 text-xs rounded-md border transition-all',
          debugMode
            ? 'bg-amber-500/20 text-amber-600 border-amber-500/30'
            : 'bg-muted text-muted-foreground border-transparent'
        )}
      >
        {debugMode ? '🔍 Debug ON' : 'Debug'}
      </button>

      {/* Image + SVG overlay */}
      <div className="relative w-full max-w-[260px]">
        <img
          src={bodyImage}
          alt={`Corps humain - vue ${view === 'face' ? 'de face' : 'de dos'}`}
          draggable={false}
          className="w-full h-auto block pointer-events-none select-none"
        />
        <svg
          viewBox="0 0 608 1080"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ id, attrs }) => {
            const commonProps = {
              key: id,
              fill: getFill(id),
              stroke: getStroke(id),
              strokeWidth: getStrokeWidth(id),
              style: { cursor: 'pointer' as const, transition: 'all 0.2s ease' },
              onClick: () => onSelectZone(id),
              onMouseEnter: () => setHoveredZone(id),
              onMouseLeave: () => setHoveredZone(null),
            };

            return <path {...commonProps} d={attrs.d} />;
          })}
        </svg>
      </div>

      {/* Selected zone label */}
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
