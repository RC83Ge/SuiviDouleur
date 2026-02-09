import React from 'react';

export interface BodyZoneDef {
  id: string;
  label: string;
  path: string;
}

export const FRONT_ZONES: BodyZoneDef[] = [
  {
    id: 'head',
    label: 'Tête',
    path: 'M88,8 Q88,0 100,0 Q112,0 112,8 L112,32 Q112,44 100,44 Q88,44 88,32 Z',
  },
  {
    id: 'neck',
    label: 'Cou',
    path: 'M94,44 L106,44 L108,58 L92,58 Z',
  },
  {
    id: 'chest',
    label: 'Thorax',
    path: 'M70,58 L130,58 Q134,58 134,62 L134,130 L66,130 L66,62 Q66,58 70,58 Z',
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    path: 'M66,130 L134,130 L132,195 Q132,205 126,205 L74,205 Q68,205 68,195 Z',
  },
  {
    id: 'left-arm',
    label: 'Bras gauche',
    path: 'M134,58 L148,62 Q154,64 156,70 L160,120 L164,170 L168,195 L158,198 L152,170 L148,130 L142,130 L134,130 Z',
  },
  {
    id: 'right-arm',
    label: 'Bras droit',
    path: 'M66,58 L52,62 Q46,64 44,70 L40,120 L36,170 L32,195 L42,198 L48,170 L52,130 L58,130 L66,130 Z',
  },
  {
    id: 'left-leg',
    label: 'Jambe gauche',
    path: 'M100,205 L132,205 L130,260 L128,320 L126,370 L124,430 L126,455 Q126,466 118,466 Q110,466 110,455 L110,430 L108,370 L106,320 L104,260 L100,205 Z',
  },
  {
    id: 'right-leg',
    label: 'Jambe droite',
    path: 'M68,205 L100,205 L96,260 L94,320 L92,370 L90,430 L90,455 Q90,466 82,466 Q74,466 74,455 L76,430 L74,370 L72,320 L70,260 L68,205 Z',
  },
];

interface FrontViewSVGProps {
  selectedZones: string[];
  hoveredZone: string | null;
  onZoneClick: (id: string) => void;
  onZoneHover: (id: string | null) => void;
}

export function FrontViewSVG({ selectedZones, hoveredZone, onZoneClick, onZoneHover }: FrontViewSVGProps) {
  return (
    <>
      {FRONT_ZONES.map(({ id, path }) => {
        const isSelected = selectedZones.includes(id);
        const isHovered = hoveredZone === id;

        return (
          <path
            key={id}
            id={`front-${id}`}
            d={path}
            className="cursor-pointer transition-all duration-200"
            fill={
              isSelected
                ? 'hsla(210, 80%, 60%, 0.45)'
                : isHovered
                ? 'hsla(210, 70%, 65%, 0.2)'
                : 'transparent'
            }
            stroke={
              isSelected
                ? 'hsl(210, 80%, 55%)'
                : isHovered
                ? 'hsl(210, 60%, 70%)'
                : 'transparent'
            }
            strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0}
            filter={
              isSelected
                ? 'url(#selectedGlow)'
                : isHovered
                ? 'url(#hoverGlow)'
                : undefined
            }
            onClick={() => onZoneClick(id)}
            onMouseEnter={() => onZoneHover(id)}
            onMouseLeave={() => onZoneHover(null)}
            onTouchStart={() => onZoneHover(id)}
          />
        );
      })}
    </>
  );
}
