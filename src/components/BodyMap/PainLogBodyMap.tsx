import React, { useState } from 'react';
import { BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyCombined from '@/assets/body-combined.png';

export type PainLogZone = BodyZone;
export type PainLogView = 'face' | 'dos';

interface PainLogBodyMapProps {
  selectedZone: PainLogZone | null;
  onSelectZone: (zoneId: PainLogZone) => void;
  className?: string;
}

const HIGHLIGHT_FILL = '#4DA3FF55';
const HIGHLIGHT_STROKE = '#4DA3FF';

// viewBox="0 0 100 100"
// Image is 2:1 landscape — face occupies ~x:5-48, dos ~x:52-95
// Each silhouette center: CX_FACE≈26, CX_DOS≈74
const CX_F = 26; // face center x
const CX_D = 74; // dos center x
const S = 0.5;   // scale factor (half the width of a single-body map)

function zone(id: PainLogZone, cx: number, d: string): { id: PainLogZone; d: string } {
  return { id, d };
}

// Helper to mirror x relative to a center
const f = (base: number, offset: number) => base + offset * S;

const FACE_ZONES: { id: PainLogZone; d: string }[] = [
  zone('head',           CX_F, `M${f(CX_F,-5)},8 C${f(CX_F,-5)},5 ${f(CX_F,5)},5 ${f(CX_F,5)},8 L${f(CX_F,5)},15 C${f(CX_F,5)},18 ${f(CX_F,-5)},18 ${f(CX_F,-5)},15 Z`),
  zone('neck',           CX_F, `M${f(CX_F,-3)},18 L${f(CX_F,3)},18 L${f(CX_F,3)},22 L${f(CX_F,-3)},22 Z`),
  zone('left-shoulder',  CX_F, `M${f(CX_F,-3)},22 L${f(CX_F,-11)},23 L${f(CX_F,-14)},27 L${f(CX_F,-12)},30 L${f(CX_F,-9)},28 L${f(CX_F,-3)},25 Z`),
  zone('right-shoulder', CX_F, `M${f(CX_F,3)},22 L${f(CX_F,11)},23 L${f(CX_F,14)},27 L${f(CX_F,12)},30 L${f(CX_F,9)},28 L${f(CX_F,3)},25 Z`),
  zone('chest',          CX_F, `M${f(CX_F,-9)},25 L${f(CX_F,9)},25 L${f(CX_F,9)},39 L${f(CX_F,0)},40 L${f(CX_F,-9)},39 Z`),
  zone('left-arm',       CX_F, `M${f(CX_F,-14)},27 L${f(CX_F,-12)},30 L${f(CX_F,-12)},42 L${f(CX_F,-17)},42 L${f(CX_F,-18)},30 Z`),
  zone('right-arm',      CX_F, `M${f(CX_F,14)},27 L${f(CX_F,18)},30 L${f(CX_F,17)},42 L${f(CX_F,12)},42 L${f(CX_F,12)},30 Z`),
  zone('left-forearm',   CX_F, `M${f(CX_F,-17)},42 L${f(CX_F,-12)},42 L${f(CX_F,-13)},55 L${f(CX_F,-18)},55 Z`),
  zone('right-forearm',  CX_F, `M${f(CX_F,12)},42 L${f(CX_F,17)},42 L${f(CX_F,18)},55 L${f(CX_F,13)},55 Z`),
  zone('left-hand',      CX_F, `M${f(CX_F,-18)},55 L${f(CX_F,-13)},55 L${f(CX_F,-12)},62 L${f(CX_F,-15)},63 L${f(CX_F,-19)},61 Z`),
  zone('right-hand',     CX_F, `M${f(CX_F,13)},55 L${f(CX_F,18)},55 L${f(CX_F,19)},61 L${f(CX_F,15)},63 L${f(CX_F,12)},62 Z`),
  zone('abdomen',        CX_F, `M${f(CX_F,-9)},39 L${f(CX_F,9)},39 L${f(CX_F,8)},51 L${f(CX_F,0)},52 L${f(CX_F,-8)},51 Z`),
  zone('pelvis',         CX_F, `M${f(CX_F,-8)},51 L${f(CX_F,8)},51 L${f(CX_F,7)},57 L${f(CX_F,-7)},57 Z`),
  zone('left-hip',       CX_F, `M${f(CX_F,-8)},55 L${f(CX_F,-1)},55 L${f(CX_F,-1)},59 L${f(CX_F,-7)},59 Z`),
  zone('right-hip',      CX_F, `M${f(CX_F,1)},55 L${f(CX_F,8)},55 L${f(CX_F,7)},59 L${f(CX_F,1)},59 Z`),
  zone('left-thigh',     CX_F, `M${f(CX_F,-7)},57 L${f(CX_F,-1)},57 L${f(CX_F,-2)},73 L${f(CX_F,-7)},73 Z`),
  zone('right-thigh',    CX_F, `M${f(CX_F,1)},57 L${f(CX_F,7)},57 L${f(CX_F,7)},73 L${f(CX_F,2)},73 Z`),
  zone('left-knee',      CX_F, `M${f(CX_F,-7)},73 L${f(CX_F,-2)},73 L${f(CX_F,-2)},79 L${f(CX_F,-6)},79 Z`),
  zone('right-knee',     CX_F, `M${f(CX_F,2)},73 L${f(CX_F,7)},73 L${f(CX_F,6)},79 L${f(CX_F,2)},79 Z`),
  zone('left-leg',       CX_F, `M${f(CX_F,-6)},79 L${f(CX_F,-2)},79 L${f(CX_F,-2)},91 L${f(CX_F,-5)},91 Z`),
  zone('right-leg',      CX_F, `M${f(CX_F,2)},79 L${f(CX_F,6)},79 L${f(CX_F,5)},91 L${f(CX_F,2)},91 Z`),
  zone('left-foot',      CX_F, `M${f(CX_F,-6)},91 L${f(CX_F,-1)},91 L${f(CX_F,0)},97 L${f(CX_F,-7)},97 Z`),
  zone('right-foot',     CX_F, `M${f(CX_F,1)},91 L${f(CX_F,6)},91 L${f(CX_F,7)},97 L${f(CX_F,0)},97 Z`),
];

const DOS_ZONES: { id: PainLogZone; d: string }[] = [
  zone('head',           CX_D, `M${f(CX_D,-5)},8 C${f(CX_D,-5)},5 ${f(CX_D,5)},5 ${f(CX_D,5)},8 L${f(CX_D,5)},15 C${f(CX_D,5)},18 ${f(CX_D,-5)},18 ${f(CX_D,-5)},15 Z`),
  zone('neck',           CX_D, `M${f(CX_D,-3)},18 L${f(CX_D,3)},18 L${f(CX_D,3)},22 L${f(CX_D,-3)},22 Z`),
  zone('left-shoulder',  CX_D, `M${f(CX_D,-3)},22 L${f(CX_D,-11)},23 L${f(CX_D,-14)},27 L${f(CX_D,-12)},30 L${f(CX_D,-9)},28 L${f(CX_D,-3)},25 Z`),
  zone('right-shoulder', CX_D, `M${f(CX_D,3)},22 L${f(CX_D,11)},23 L${f(CX_D,14)},27 L${f(CX_D,12)},30 L${f(CX_D,9)},28 L${f(CX_D,3)},25 Z`),
  zone('upper-back',     CX_D, `M${f(CX_D,-9)},25 L${f(CX_D,9)},25 L${f(CX_D,9)},39 L${f(CX_D,0)},40 L${f(CX_D,-9)},39 Z`),
  zone('left-arm',       CX_D, `M${f(CX_D,-14)},27 L${f(CX_D,-12)},30 L${f(CX_D,-12)},42 L${f(CX_D,-17)},42 L${f(CX_D,-18)},30 Z`),
  zone('right-arm',      CX_D, `M${f(CX_D,14)},27 L${f(CX_D,18)},30 L${f(CX_D,17)},42 L${f(CX_D,12)},42 L${f(CX_D,12)},30 Z`),
  zone('left-forearm',   CX_D, `M${f(CX_D,-17)},42 L${f(CX_D,-12)},42 L${f(CX_D,-13)},55 L${f(CX_D,-18)},55 Z`),
  zone('right-forearm',  CX_D, `M${f(CX_D,12)},42 L${f(CX_D,17)},42 L${f(CX_D,18)},55 L${f(CX_D,13)},55 Z`),
  zone('left-hand',      CX_D, `M${f(CX_D,-18)},55 L${f(CX_D,-13)},55 L${f(CX_D,-12)},62 L${f(CX_D,-15)},63 L${f(CX_D,-19)},61 Z`),
  zone('right-hand',     CX_D, `M${f(CX_D,13)},55 L${f(CX_D,18)},55 L${f(CX_D,19)},61 L${f(CX_D,15)},63 L${f(CX_D,12)},62 Z`),
  zone('lower-back',     CX_D, `M${f(CX_D,-9)},39 L${f(CX_D,9)},39 L${f(CX_D,8)},51 L${f(CX_D,0)},52 L${f(CX_D,-8)},51 Z`),
  zone('pelvis',         CX_D, `M${f(CX_D,-8)},51 L${f(CX_D,8)},51 L${f(CX_D,7)},57 L${f(CX_D,-7)},57 Z`),
  zone('left-hip',       CX_D, `M${f(CX_D,-8)},55 L${f(CX_D,-1)},55 L${f(CX_D,-1)},59 L${f(CX_D,-7)},59 Z`),
  zone('right-hip',      CX_D, `M${f(CX_D,1)},55 L${f(CX_D,8)},55 L${f(CX_D,7)},59 L${f(CX_D,1)},59 Z`),
  zone('left-thigh',     CX_D, `M${f(CX_D,-7)},57 L${f(CX_D,-1)},57 L${f(CX_D,-2)},73 L${f(CX_D,-7)},73 Z`),
  zone('right-thigh',    CX_D, `M${f(CX_D,1)},57 L${f(CX_D,7)},57 L${f(CX_D,7)},73 L${f(CX_D,2)},73 Z`),
  zone('left-knee',      CX_D, `M${f(CX_D,-7)},73 L${f(CX_D,-2)},73 L${f(CX_D,-2)},79 L${f(CX_D,-6)},79 Z`),
  zone('right-knee',     CX_D, `M${f(CX_D,2)},73 L${f(CX_D,7)},73 L${f(CX_D,6)},79 L${f(CX_D,2)},79 Z`),
  zone('left-leg',       CX_D, `M${f(CX_D,-6)},79 L${f(CX_D,-2)},79 L${f(CX_D,-2)},91 L${f(CX_D,-5)},91 Z`),
  zone('right-leg',      CX_D, `M${f(CX_D,2)},79 L${f(CX_D,6)},79 L${f(CX_D,5)},91 L${f(CX_D,2)},91 Z`),
  zone('left-foot',      CX_D, `M${f(CX_D,-6)},91 L${f(CX_D,-1)},91 L${f(CX_D,0)},97 L${f(CX_D,-7)},97 Z`),
  zone('right-foot',     CX_D, `M${f(CX_D,1)},91 L${f(CX_D,6)},91 L${f(CX_D,7)},97 L${f(CX_D,0)},97 Z`),
];

export function PainLogBodyMap({
  selectedZone,
  onSelectZone,
  className,
}: PainLogBodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<PainLogZone | null>(null);

  const getFill = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_FILL : hoveredZone === id ? '#4DA3FF22' : 'transparent';

  const getStroke = (id: PainLogZone) =>
    selectedZone === id ? HIGHLIGHT_STROKE : hoveredZone === id ? '#4DA3FF88' : 'transparent';

  const getStrokeWidth = (id: PainLogZone) =>
    selectedZone === id ? 0.5 : hoveredZone === id ? 0.4 : 0;

  const renderZones = (zones: { id: PainLogZone; d: string }[]) =>
    zones.map(({ id, d }, i) => (
      <path
        key={`${id}-${i}`}
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
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {/* Labels */}
      <div className="flex w-full justify-around text-[11px] font-medium text-muted-foreground select-none px-2">
        <span>Face</span>
        <span>Dos</span>
      </div>

      {/* Single combined image with SVG overlay */}
      <div className="relative w-full">
        <img
          src={bodyCombined}
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
          {renderZones(FACE_ZONES)}
          {renderZones(DOS_ZONES)}
        </svg>
      </div>

      {/* Zone sélectionnée */}
      <div className="text-sm text-center min-h-[20px]">
        {selectedZone ? (
          <span className="font-medium text-primary animate-in fade-in-0">
            {BODY_ZONE_LABELS[selectedZone]}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">
            Touchez une zone pour la sélectionner
          </span>
        )}
      </div>
    </div>
  );
}
