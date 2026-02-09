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

// SVG viewBox: 300x600 — zones calibrated to body-front.png / body-back.png
interface ZonePath {
  id: PainLogZone;
  element: 'path' | 'rect';
  attrs: Record<string, string | number>;
  views: PainLogView[];
}

const ZONE_PATHS: ZonePath[] = [
  // Tête
  {
    id: 'head',
    element: 'path',
    attrs: { d: 'M135 40 C155 40 165 80 150 100 C135 120 115 100 120 80 C125 60 115 40 135 40' },
    views: ['face', 'dos'],
  },
  // Cou
  {
    id: 'neck',
    element: 'rect',
    attrs: { x: 125, y: 100, width: 50, height: 30 },
    views: ['face', 'dos'],
  },
  // Épaule gauche
  {
    id: 'left-shoulder',
    element: 'path',
    attrs: { d: 'M85 130 L105 130 L105 150 L85 145 Z' },
    views: ['face', 'dos'],
  },
  // Épaule droite
  {
    id: 'right-shoulder',
    element: 'path',
    attrs: { d: 'M195 130 L215 130 L215 145 L195 150 Z' },
    views: ['face', 'dos'],
  },
  // Thorax (face) / Haut du dos (dos)
  {
    id: 'chest',
    element: 'path',
    attrs: { d: 'M105 130 L195 130 L195 220 L105 220 Z' },
    views: ['face'],
  },
  {
    id: 'upper-back',
    element: 'path',
    attrs: { d: 'M105 130 L195 130 L195 220 L105 220 Z' },
    views: ['dos'],
  },
  // Bras gauche
  {
    id: 'left-arm',
    element: 'path',
    attrs: { d: 'M85 145 L105 150 L105 220 L85 220 Z' },
    views: ['face', 'dos'],
  },
  // Bras droit
  {
    id: 'right-arm',
    element: 'path',
    attrs: { d: 'M195 150 L215 145 L215 220 L195 220 Z' },
    views: ['face', 'dos'],
  },
  // Avant-bras gauche
  {
    id: 'left-forearm',
    element: 'path',
    attrs: { d: 'M80 220 L105 220 L100 310 L75 310 Z' },
    views: ['face', 'dos'],
  },
  // Avant-bras droit
  {
    id: 'right-forearm',
    element: 'path',
    attrs: { d: 'M195 220 L220 220 L225 310 L200 310 Z' },
    views: ['face', 'dos'],
  },
  // Main gauche
  {
    id: 'left-hand',
    element: 'path',
    attrs: { d: 'M70 310 L100 310 L98 350 L68 350 Z' },
    views: ['face', 'dos'],
  },
  // Main droite
  {
    id: 'right-hand',
    element: 'path',
    attrs: { d: 'M200 310 L230 310 L232 350 L202 350 Z' },
    views: ['face', 'dos'],
  },
  // Abdomen (face) / Bas du dos (dos)
  {
    id: 'abdomen',
    element: 'path',
    attrs: { d: 'M110 220 L190 220 L190 310 L110 310 Z' },
    views: ['face'],
  },
  {
    id: 'lower-back',
    element: 'path',
    attrs: { d: 'M110 220 L190 220 L190 310 L110 310 Z' },
    views: ['dos'],
  },
  // Bassin
  {
    id: 'pelvis',
    element: 'path',
    attrs: { d: 'M110 310 L190 310 L195 340 L105 340 Z' },
    views: ['face', 'dos'],
  },
  // Hanche gauche
  {
    id: 'left-hip',
    element: 'path',
    attrs: { d: 'M105 330 L140 330 L140 355 L110 355 Z' },
    views: ['face', 'dos'],
  },
  // Hanche droite
  {
    id: 'right-hip',
    element: 'path',
    attrs: { d: 'M160 330 L195 330 L190 355 L160 355 Z' },
    views: ['face', 'dos'],
  },
  // Cuisse gauche
  {
    id: 'left-thigh',
    element: 'path',
    attrs: { d: 'M115 340 L150 340 L148 430 L118 430 Z' },
    views: ['face', 'dos'],
  },
  // Cuisse droite
  {
    id: 'right-thigh',
    element: 'path',
    attrs: { d: 'M155 340 L190 340 L185 430 L155 430 Z' },
    views: ['face', 'dos'],
  },
  // Genou gauche
  {
    id: 'left-knee',
    element: 'path',
    attrs: { d: 'M118 430 L148 430 L146 460 L120 460 Z' },
    views: ['face', 'dos'],
  },
  // Genou droit
  {
    id: 'right-knee',
    element: 'path',
    attrs: { d: 'M155 430 L185 430 L183 460 L157 460 Z' },
    views: ['face', 'dos'],
  },
  // Jambe gauche
  {
    id: 'left-leg',
    element: 'path',
    attrs: { d: 'M120 460 L146 460 L144 540 L122 540 Z' },
    views: ['face', 'dos'],
  },
  // Jambe droite
  {
    id: 'right-leg',
    element: 'path',
    attrs: { d: 'M157 460 L183 460 L180 540 L158 540 Z' },
    views: ['face', 'dos'],
  },
  // Pied gauche
  {
    id: 'left-foot',
    element: 'path',
    attrs: { d: 'M118 540 L148 540 L148 575 L115 575 Z' },
    views: ['face', 'dos'],
  },
  // Pied droit
  {
    id: 'right-foot',
    element: 'path',
    attrs: { d: 'M155 540 L185 540 L188 575 L155 575 Z' },
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
  const [debugMode, setDebugMode] = useState(true); // DEBUG: set to true temporarily

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
          viewBox="0 0 300 600"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ id, element, attrs }) => {
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

            if (element === 'rect') {
              return <rect {...commonProps} {...(attrs as any)} />;
            }
            return <path {...commonProps} {...(attrs as any)} />;
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
