import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { getZonesForView, getPathCenter } from './bodyPaths';

interface BodyMapSVGProps {
  view: BodyView;
  selectedZones: BodyZone[];
  onZoneClick: (zone: BodyZone) => void;
  zoneIntensities?: Partial<Record<BodyZone, number>>;
}

// Mannequin color
const BODY_COLOR = '#93C5FD';
const BODY_COLOR_DARK = '#60A5FA';
const SELECTED_COLOR = '#F97316';
const SELECTED_STROKE = '#EA580C';
const HOVER_COLOR = '#BFDBFE';

export function BodyMapSVG({
  view,
  selectedZones,
  onZoneClick,
  zoneIntensities = {},
}: BodyMapSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);

  const zones = getZonesForView(view === 'front' ? 'front' : 'back');

  const getZoneStyle = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    const intensity = zoneIntensities[zone];

    if (isSelected) {
      return {
        fill: intensity !== undefined
          ? `hsl(${Math.max(0, 30 - intensity * 3)}, ${60 + intensity * 4}%, ${55 - intensity * 2}%)`
          : SELECTED_COLOR,
        stroke: SELECTED_STROKE,
        strokeWidth: 2,
        fillOpacity: 0.7,
      };
    }

    if (isHovered) {
      return {
        fill: HOVER_COLOR,
        stroke: BODY_COLOR_DARK,
        strokeWidth: 1.5,
        fillOpacity: 0.6,
      };
    }

    return {
      fill: BODY_COLOR,
      stroke: BODY_COLOR_DARK,
      strokeWidth: 0.8,
      fillOpacity: 0.35,
    };
  };

  const tooltipZone = hoveredZone;
  const tooltipPos = tooltipZone
    ? (() => {
        const zoneData = zones.find(z => z.zone === tooltipZone);
        if (!zoneData) return null;
        const center = getPathCenter(zoneData.path);
        return { x: center.x, y: center.y - 18 };
      })()
    : null;

  return (
    <svg
      viewBox="0 0 200 450"
      className="w-full h-auto select-none"
      style={{ touchAction: 'manipulation', maxHeight: '420px' }}
    >
      {/* Subtle center line */}
      <line
        x1="100" y1="56" x2="100" y2="440"
        stroke="hsl(var(--border))"
        strokeWidth="0.3"
        strokeDasharray="4,4"
        opacity="0.4"
      />

      {/* Body zones */}
      {zones.map(({ zone, path }) => {
        const style = getZoneStyle(zone);
        return (
          <path
            key={zone}
            id={zone}
            d={path}
            fill={style.fill}
            fillOpacity={style.fillOpacity}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeLinejoin="round"
            className="cursor-pointer transition-all duration-150 ease-out"
            onClick={(e) => {
              e.preventDefault();
              onZoneClick(zone);
            }}
            onMouseEnter={() => setHoveredZone(zone)}
            onMouseLeave={() => setHoveredZone(null)}
          />
        );
      })}

      {/* Tooltip */}
      {tooltipZone && tooltipPos && (
        <g className="pointer-events-none">
          <rect
            x={tooltipPos.x - 45}
            y={tooltipPos.y - 12}
            width="90"
            height="18"
            rx="4"
            fill="hsl(var(--popover))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
          <text
            x={tooltipPos.x}
            y={tooltipPos.y + 1}
            textAnchor="middle"
            fill="hsl(var(--popover-foreground))"
            fontSize="8"
            fontWeight="500"
            fontFamily="system-ui, sans-serif"
          >
            {BODY_ZONE_LABELS[tooltipZone]}
          </text>
        </g>
      )}
    </svg>
  );
}
