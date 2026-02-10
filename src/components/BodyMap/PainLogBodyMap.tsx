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

// SVG viewBox: 304x608 — matches one half of the body-front-back.png
interface ZonePath {
  id: PainLogZone;
  element: 'path';
  attrs: { d: string };
  views: PainLogView[];
}

// cx=152 is the center of each silhouette half
const cx = 152;

const ZONE_PATHS: ZonePath[] = [
  // Tête
  {
    id: 'head',
    element: 'path',
    attrs: { d: `M${cx},18 C${cx+22},18 ${cx+28},32 ${cx+28},48 C${cx+28},62 ${cx+20},72 ${cx},72 C${cx-20},72 ${cx-28},62 ${cx-28},48 C${cx-28},32 ${cx-22},18 ${cx},18 Z` },
    views: ['face', 'dos'],
  },
  // Cou
  {
    id: 'neck',
    element: 'path',
    attrs: { d: `M${cx-11},72 L${cx+11},72 L${cx+12},92 L${cx-12},92 Z` },
    views: ['face', 'dos'],
  },
  // Épaule gauche
  {
    id: 'left-shoulder',
    element: 'path',
    attrs: { d: `M${cx-12},92 L${cx-38},92 L${cx-55},102 L${cx-52},118 L${cx-35},112 L${cx-12},108 Z` },
    views: ['face', 'dos'],
  },
  // Épaule droite
  {
    id: 'right-shoulder',
    element: 'path',
    attrs: { d: `M${cx+12},92 L${cx+38},92 L${cx+55},102 L${cx+52},118 L${cx+35},112 L${cx+12},108 Z` },
    views: ['face', 'dos'],
  },
  // Thorax (face)
  {
    id: 'chest',
    element: 'path',
    attrs: { d: `M${cx-35},108 L${cx+35},108 L${cx+35},182 L${cx},188 L${cx-35},182 Z` },
    views: ['face'],
  },
  // Haut du dos (dos)
  {
    id: 'upper-back',
    element: 'path',
    attrs: { d: `M${cx-35},108 L${cx+35},108 L${cx+35},182 L${cx},188 L${cx-35},182 Z` },
    views: ['dos'],
  },
  // Bras gauche
  {
    id: 'left-arm',
    element: 'path',
    attrs: { d: `M${cx-55},102 L${cx-52},118 L${cx-50},182 L${cx-65},182 L${cx-68},118 Z` },
    views: ['face', 'dos'],
  },
  // Bras droit
  {
    id: 'right-arm',
    element: 'path',
    attrs: { d: `M${cx+55},102 L${cx+68},118 L${cx+65},182 L${cx+50},182 L${cx+52},118 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras gauche
  {
    id: 'left-forearm',
    element: 'path',
    attrs: { d: `M${cx-65},182 L${cx-50},182 L${cx-52},262 L${cx-68},262 Z` },
    views: ['face', 'dos'],
  },
  // Avant-bras droit
  {
    id: 'right-forearm',
    element: 'path',
    attrs: { d: `M${cx+50},182 L${cx+65},182 L${cx+68},262 L${cx+52},262 Z` },
    views: ['face', 'dos'],
  },
  // Main gauche
  {
    id: 'left-hand',
    element: 'path',
    attrs: { d: `M${cx-68},262 L${cx-52},262 L${cx-50},298 L${cx-58},302 L${cx-70},296 Z` },
    views: ['face', 'dos'],
  },
  // Main droite
  {
    id: 'right-hand',
    element: 'path',
    attrs: { d: `M${cx+52},262 L${cx+68},262 L${cx+70},296 L${cx+58},302 L${cx+50},298 Z` },
    views: ['face', 'dos'],
  },
  // Abdomen (face)
  {
    id: 'abdomen',
    element: 'path',
    attrs: { d: `M${cx-35},182 L${cx+35},182 L${cx+32},248 L${cx},254 L${cx-32},248 Z` },
    views: ['face'],
  },
  // Bas du dos (dos)
  {
    id: 'lower-back',
    element: 'path',
    attrs: { d: `M${cx-35},182 L${cx+35},182 L${cx+32},248 L${cx},254 L${cx-32},248 Z` },
    views: ['dos'],
  },
  // Bassin
  {
    id: 'pelvis',
    element: 'path',
    attrs: { d: `M${cx-32},248 L${cx+32},248 L${cx+30},272 L${cx-30},272 Z` },
    views: ['face', 'dos'],
  },
  // Hanche gauche
  {
    id: 'left-hip',
    element: 'path',
    attrs: { d: `M${cx-32},262 L${cx-8},262 L${cx-8},282 L${cx-30},282 Z` },
    views: ['face', 'dos'],
  },
  // Hanche droite
  {
    id: 'right-hip',
    element: 'path',
    attrs: { d: `M${cx+8},262 L${cx+32},262 L${cx+30},282 L${cx+8},282 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse gauche
  {
    id: 'left-thigh',
    element: 'path',
    attrs: { d: `M${cx-30},272 L${cx-4},272 L${cx-8},378 L${cx-28},378 Z` },
    views: ['face', 'dos'],
  },
  // Cuisse droite
  {
    id: 'right-thigh',
    element: 'path',
    attrs: { d: `M${cx+4},272 L${cx+30},272 L${cx+28},378 L${cx+8},378 Z` },
    views: ['face', 'dos'],
  },
  // Genou gauche
  {
    id: 'left-knee',
    element: 'path',
    attrs: { d: `M${cx-28},378 L${cx-8},378 L${cx-9},412 L${cx-26},412 Z` },
    views: ['face', 'dos'],
  },
  // Genou droit
  {
    id: 'right-knee',
    element: 'path',
    attrs: { d: `M${cx+8},378 L${cx+28},378 L${cx+26},412 L${cx+9},412 Z` },
    views: ['face', 'dos'],
  },
  // Jambe gauche (mollet)
  {
    id: 'left-leg',
    element: 'path',
    attrs: { d: `M${cx-26},412 L${cx-9},412 L${cx-10},502 L${cx-24},502 Z` },
    views: ['face', 'dos'],
  },
  // Jambe droite (mollet)
  {
    id: 'right-leg',
    element: 'path',
    attrs: { d: `M${cx+9},412 L${cx+26},412 L${cx+24},502 L${cx+10},502 Z` },
    views: ['face', 'dos'],
  },
  // Pied gauche
  {
    id: 'left-foot',
    element: 'path',
    attrs: { d: `M${cx-26},502 L${cx-8},502 L${cx-6},542 L${cx-28},542 Z` },
    views: ['face', 'dos'],
  },
  // Pied droit
  {
    id: 'right-foot',
    element: 'path',
    attrs: { d: `M${cx+8},502 L${cx+26},502 L${cx+28},542 L${cx+6},542 Z` },
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
      <div className="relative w-full max-w-[260px] overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: '1/2' }}>
          <img
            src={bodyImage}
            alt={`Corps humain - vue ${view === 'face' ? 'de face' : 'de dos'}`}
            draggable={false}
            className="absolute inset-0 h-full pointer-events-none select-none"
            style={{
              width: '200%',
              maxWidth: 'none',
              objectFit: 'cover',
              left: view === 'face' ? '0%' : '-100%',
            }}
          />
          <svg
            viewBox="0 0 304 608"
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
