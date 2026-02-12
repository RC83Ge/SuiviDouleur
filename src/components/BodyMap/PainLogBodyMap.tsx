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
  attrs: { d: string };
  views: PainLogView[];
}

// cx=50 is the horizontal center of each silhouette half
const cx = 50;

const ZONE_PATHS: ZonePath[] = [
  // Tête — rounder, starts below "ARTERIOR" text
  {
    id: 'head',
    element: 'path',
    attrs: { d: `M${cx-6},9 C${cx-6},5 ${cx+6},5 ${cx+6},9 L${cx+6},16 C${cx+6},19 ${cx-6},19 ${cx-6},16 Z` },
    views: ['face', 'dos'],
  },
  // Cou
  {
    id: 'neck',
    element: 'path',
    attrs: { d: `M${cx-3},19 L${cx+3},19 L${cx+3},23 L${cx-3},23 Z` },
    views: ['face', 'dos'],
  },
  // Épaule gauche — broader shoulders on new image
  {
    id: 'left-shoulder',
    element: 'path',
    attrs: { d: `M${cx-3},23 L${cx-12},23 L${cx-18},27 L${cx-15},30 L${cx-11},28 L${cx-3},26 Z` },
    views: ['face', 'dos'],
  },
  // Épaule droite
  {
    id: 'right-shoulder',
    element: 'path',
    attrs: { d: `M${cx+3},23 L${cx+12},23 L${cx+18},27 L${cx+15},30 L${cx+11},28 L${cx+3},26 Z` },
    views: ['face', 'dos'],
  },
  // Thorax (face) — wider torso
  {
    id: 'chest',
    element: 'path',
    attrs: { d: `M${cx-11},26 L${cx+11},26 L${cx+11},40 L${cx},41 L${cx-11},40 Z` },
    views: ['face'],
  },
  // Haut du dos
  {
    id: 'upper-back',
    element: 'path',
    attrs: { d: `M${cx-11},26 L${cx+11},26 L${cx+11},40 L${cx},41 L${cx-11},40 Z` },
    views: ['dos'],
  },
  // Bras gauche — arms spread wider on new image
  {
    id: 'left-arm',
    element: 'path',
    attrs: { d: `M${cx-18},27 L${cx-15},30 L${cx-16},42 L${cx-21},42 L${cx-22},30 Z` },
    views: ['face', 'dos'],
  },
  // Bras droit
  {
    id: 'right-arm',
    element: 'path',
    attrs: { d: `M${cx+18},27 L${cx+22},30 L${cx+21},42 L${cx+16},42 L${cx+15},30 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras gauche
  {
    id: 'left-forearm',
    element: 'path',
    attrs: { d: `M${cx-21},42 L${cx-16},42 L${cx-17},57 L${cx-22},57 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras droit
  {
    id: 'right-forearm',
    element: 'path',
    attrs: { d: `M${cx+16},42 L${cx+21},42 L${cx+22},57 L${cx+17},57 Z` },
    views: ['face', 'dos'],
  },
  // Main gauche
  {
    id: 'left-hand',
    element: 'path',
    attrs: { d: `M${cx-22},57 L${cx-17},57 L${cx-16},65 L${cx-19},66 L${cx-23},64 Z` },
    views: ['face', 'dos'],
  },
  // Main droite
  {
    id: 'right-hand',
    element: 'path',
    attrs: { d: `M${cx+17},57 L${cx+22},57 L${cx+23},64 L${cx+19},66 L${cx+16},65 Z` },
    views: ['face', 'dos'],
  },
  // Abdomen (face)
  {
    id: 'abdomen',
    element: 'path',
    attrs: { d: `M${cx-11},40 L${cx+11},40 L${cx+10},52 L${cx},53 L${cx-10},52 Z` },
    views: ['face'],
  },
  // Bas du dos
  {
    id: 'lower-back',
    element: 'path',
    attrs: { d: `M${cx-11},40 L${cx+11},40 L${cx+10},52 L${cx},53 L${cx-10},52 Z` },
    views: ['dos'],
  },
  // Bassin
  {
    id: 'pelvis',
    element: 'path',
    attrs: { d: `M${cx-10},52 L${cx+10},52 L${cx+9},58 L${cx-9},58 Z` },
    views: ['face', 'dos'],
  },
  // Hanche gauche
  {
    id: 'left-hip',
    element: 'path',
    attrs: { d: `M${cx-10},56 L${cx-1},56 L${cx-1},60 L${cx-9},60 Z` },
    views: ['face', 'dos'],
  },
  // Hanche droite
  {
    id: 'right-hip',
    element: 'path',
    attrs: { d: `M${cx+1},56 L${cx+10},56 L${cx+9},60 L${cx+1},60 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse gauche
  {
    id: 'left-thigh',
    element: 'path',
    attrs: { d: `M${cx-9},58 L${cx-1},58 L${cx-3},74 L${cx-8},74 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse droite
  {
    id: 'right-thigh',
    element: 'path',
    attrs: { d: `M${cx+1},58 L${cx+9},58 L${cx+8},74 L${cx+3},74 Z` },
    views: ['face', 'dos'],
  },
  // Genou gauche
  {
    id: 'left-knee',
    element: 'path',
    attrs: { d: `M${cx-8},74 L${cx-3},74 L${cx-3},79 L${cx-7},79 Z` },
    views: ['face', 'dos'],
  },
  // Genou droit
  {
    id: 'right-knee',
    element: 'path',
    attrs: { d: `M${cx+3},74 L${cx+8},74 L${cx+7},79 L${cx+3},79 Z` },
    views: ['face', 'dos'],
  },
  // Jambe gauche (mollet)
  {
    id: 'left-leg',
    element: 'path',
    attrs: { d: `M${cx-7},79 L${cx-3},79 L${cx-3},90 L${cx-6},90 Z` },
    views: ['face', 'dos'],
  },
  // Jambe droite (mollet)
  {
    id: 'right-leg',
    element: 'path',
    attrs: { d: `M${cx+3},79 L${cx+7},79 L${cx+6},90 L${cx+3},90 Z` },
    views: ['face', 'dos'],
  },
  // Pied gauche
  {
    id: 'left-foot',
    element: 'path',
    attrs: { d: `M${cx-7},90 L${cx-2},90 L${cx-1},96 L${cx-8},96 Z` },
    views: ['face', 'dos'],
  },
  // Pied droit
  {
    id: 'right-foot',
    element: 'path',
    attrs: { d: `M${cx+2},90 L${cx+7},90 L${cx+8},96 L${cx+1},96 Z` },
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
      <div className="relative w-full max-w-[300px]">
        {/* Container clips to show only left or right half of the image */}
        <div 
          className="relative w-full overflow-hidden"
        >
          <img
            src={bodyImage}
            alt={`Corps humain - vue ${view === 'face' ? 'de face' : 'de dos'}`}
            draggable={false}
            className="block pointer-events-none select-none"
            style={{
              width: '200%',
              maxWidth: 'none',
              marginLeft: view === 'face' ? '0' : '-100%',
            }}
          />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ touchAction: 'manipulation' }}
          >
            {zones.map(({ id, attrs }) => {
              const commonProps = {
                key: id,
                fill: getFill(id),
                stroke: getStroke(id),
                strokeWidth: getStrokeWidth(id) * 0.3,
                style: { cursor: 'pointer' as const, transition: 'all 0.2s ease' },
                onClick: () => onSelectZone(id),
                onMouseEnter: () => setHoveredZone(id),
                onMouseLeave: () => setHoveredZone(null),
              };

              return <path {...commonProps} d={attrs.d} />;
            })}
          </svg>
        </div>
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
