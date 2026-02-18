import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyImage from '@/assets/body-front-back.png';

export type PainLogZone = BodyZone;

interface PainLogBodyMapProps {
  selectedZone: PainLogZone | null;
  onSelectZone: (zoneId: PainLogZone) => void;
  className?: string;
}

const HIGHLIGHT_FILL = '#4DA3FF55';
const HIGHLIGHT_STROKE = '#4DA3FF';

// viewBox="0 0 100 100" — left half = face (cx=25), right half = dos (cx=75)
const CX_FACE = 25;
const CX_DOS = 75;

interface ZonePath {
  id: PainLogZone;
  d: string;
}

const buildPaths = (cx: number): ZonePath[] => [
  // Tête
  { id: cx < 50 ? 'head' : 'head', d: `M${cx-2.5},7 C${cx-2.5},4 ${cx+2.5},4 ${cx+2.5},7 L${cx+2.5},13 C${cx+2.5},16 ${cx-2.5},16 ${cx-2.5},13 Z` },
  // Cou
  { id: 'neck', d: `M${cx-1.5},16 L${cx+1.5},16 L${cx+1.5},20 L${cx-1.5},20 Z` },
  // Épaule gauche (miroir de "left" pour face, "right" pour dos)
  { id: cx < 50 ? 'left-shoulder' : 'right-shoulder', d: `M${cx-1.5},20 L${cx-5},21 L${cx-7},24 L${cx-6},27 L${cx-4.5},25 L${cx-1.5},23 Z` },
  // Épaule droite
  { id: cx < 50 ? 'right-shoulder' : 'left-shoulder', d: `M${cx+1.5},20 L${cx+5},21 L${cx+7},24 L${cx+6},27 L${cx+4.5},25 L${cx+1.5},23 Z` },
  // Thorax
  { id: cx < 50 ? 'chest' : 'upper-back', d: `M${cx-4.5},23 L${cx+4.5},23 L${cx+4.5},37 L${cx},38 L${cx-4.5},37 Z` },
  // Bras gauche
  { id: cx < 50 ? 'left-arm' : 'right-arm', d: `M${cx-7},24 L${cx-6},27 L${cx-6},39 L${cx-8.5},39 L${cx-9},27 Z` },
  // Bras droit
  { id: cx < 50 ? 'right-arm' : 'left-arm', d: `M${cx+7},24 L${cx+9},27 L${cx+8.5},39 L${cx+6},39 L${cx+6},27 Z` },
  // Avant-bras gauche
  { id: cx < 50 ? 'left-forearm' : 'right-forearm', d: `M${cx-8.5},39 L${cx-6},39 L${cx-6.5},53 L${cx-9},53 Z` },
  // Avant-bras droit
  { id: cx < 50 ? 'right-forearm' : 'left-forearm', d: `M${cx+6},39 L${cx+8.5},39 L${cx+9},53 L${cx+6.5},53 Z` },
  // Main gauche
  { id: cx < 50 ? 'left-hand' : 'right-hand', d: `M${cx-9},53 L${cx-6.5},53 L${cx-6},60 L${cx-7.5},61 L${cx-9.5},59 Z` },
  // Main droite
  { id: cx < 50 ? 'right-hand' : 'left-hand', d: `M${cx+6.5},53 L${cx+9},53 L${cx+9.5},59 L${cx+7.5},61 L${cx+6},60 Z` },
  // Abdomen / Bas du dos
  { id: cx < 50 ? 'abdomen' : 'lower-back', d: `M${cx-4.5},37 L${cx+4.5},37 L${cx+4},49 L${cx},50 L${cx-4},49 Z` },
  // Bassin
  { id: 'pelvis', d: `M${cx-4},49 L${cx+4},49 L${cx+3.5},55 L${cx-3.5},55 Z` },
  // Hanche gauche
  { id: cx < 50 ? 'left-hip' : 'right-hip', d: `M${cx-4},53 L${cx-0.5},53 L${cx-0.5},57 L${cx-3.5},57 Z` },
  // Hanche droite
  { id: cx < 50 ? 'right-hip' : 'left-hip', d: `M${cx+0.5},53 L${cx+4},53 L${cx+3.5},57 L${cx+0.5},57 Z` },
  // Cuisse gauche
  { id: cx < 50 ? 'left-thigh' : 'right-thigh', d: `M${cx-3.5},55 L${cx-0.5},55 L${cx-1},71 L${cx-3.5},71 Z` },
  // Cuisse droite
  { id: cx < 50 ? 'right-thigh' : 'left-thigh', d: `M${cx+0.5},55 L${cx+3.5},55 L${cx+3.5},71 L${cx+1},71 Z` },
  // Genou gauche
  { id: cx < 50 ? 'left-knee' : 'right-knee', d: `M${cx-3.5},71 L${cx-1},71 L${cx-1},76 L${cx-3},76 Z` },
  // Genou droit
  { id: cx < 50 ? 'right-knee' : 'left-knee', d: `M${cx+1},71 L${cx+3.5},71 L${cx+3},76 L${cx+1},76 Z` },
  // Jambe gauche
  { id: cx < 50 ? 'left-leg' : 'right-leg', d: `M${cx-3},76 L${cx-1},76 L${cx-1},88 L${cx-2.5},88 Z` },
  // Jambe droite
  { id: cx < 50 ? 'right-leg' : 'left-leg', d: `M${cx+1},76 L${cx+3},76 L${cx+2.5},88 L${cx+1},88 Z` },
  // Pied gauche
  { id: cx < 50 ? 'left-foot' : 'right-foot', d: `M${cx-3},88 L${cx-0.5},88 L${cx},94 L${cx-3.5},94 Z` },
  // Pied droit
  { id: cx < 50 ? 'right-foot' : 'left-foot', d: `M${cx+0.5},88 L${cx+3},88 L${cx+3.5},94 L${cx},94 Z` },
];

// Tête séparée car buildPaths génère un doublon pour head — on la crée manuellement
const FACE_PATHS: ZonePath[] = buildPaths(CX_FACE);
const DOS_PATHS: ZonePath[] = buildPaths(CX_DOS);

// Corriger le head du côté dos (même id 'head' mais cx différent)
DOS_PATHS[0] = { id: 'head', d: `M${CX_DOS-2.5},7 C${CX_DOS-2.5},4 ${CX_DOS+2.5},4 ${CX_DOS+2.5},7 L${CX_DOS+2.5},13 C${CX_DOS+2.5},16 ${CX_DOS-2.5},16 ${CX_DOS-2.5},13 Z` };
DOS_PATHS[1] = { id: 'neck', d: `M${CX_DOS-1.5},16 L${CX_DOS+1.5},16 L${CX_DOS+1.5},20 L${CX_DOS-1.5},20 Z` };

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);

  const getFill = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';

  const getStroke = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF66' : 'transparent';

  const getStrokeWidth = (id: PainLogZone) =>
    selectedZone === id ? 0.6 : hoveredZone === id ? 0.45 : 0;

  const renderZones = (paths: ZonePath[]) =>
    paths.map(({ id, d }) => (
      <path
        key={`${id}-${d.slice(0, 8)}`}
        d={d}
        fill={getFill(id)}
        stroke={getStroke(id)}
        strokeWidth={getStrokeWidth(id)}
        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
        onClick={() => onSelectZone(id)}
        onMouseEnter={() => setHoveredZone(id)}
        onMouseLeave={() => setHoveredZone(null)}
      />
    ));

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* Labels Face / Dos */}
      <div className="flex w-full max-w-xs justify-around text-xs font-medium text-muted-foreground select-none">
        <span>Face</span>
        <span>Dos</span>
      </div>

      {/* Image + SVG overlay — full composite side by side */}
      <div className="relative w-full max-w-xs">
        <img
          src={bodyImage}
          alt="Corps humain face et dos"
          draggable={false}
          className="block w-full pointer-events-none select-none"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Zones face (gauche) */}
          {renderZones(FACE_PATHS)}
          {/* Zones dos (droite) */}
          {renderZones(DOS_PATHS)}
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
