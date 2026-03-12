import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { getZonesForView, getPathCenter } from './bodyPaths';

interface BodyMapSVGProps {
  view: BodyView;
  selectedZones: BodyZone[];
  onZoneClick: (zone: BodyZone) => void;
  zoneIntensities?: Partial<Record<BodyZone, number>>;
}

// Skin-tone palette matching reference
const BODY_FILL = '#F9DCC4';
const BODY_STROKE = '#D4A574';
const SELECTED_FILL = '#F97316';
const SELECTED_STROKE = '#EA580C';
const HOVER_FILL = '#FBBF7A';
const HOVER_STROKE = '#E8A44E';

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
          ? `hsl(${Math.max(0, 30 - intensity * 3)}, ${70 + intensity * 3}%, ${55 - intensity * 2}%)`
          : SELECTED_FILL,
        stroke: SELECTED_STROKE,
        strokeWidth: 2,
        fillOpacity: 0.75,
      };
    }

    if (isHovered) {
      return {
        fill: HOVER_FILL,
        stroke: HOVER_STROKE,
        strokeWidth: 1,
        fillOpacity: 0.7,
      };
    }

    return {
      fill: BODY_FILL,
      stroke: BODY_STROKE,
      strokeWidth: 0.5,
      fillOpacity: 0.85,
    };
  };

  const tooltipZone = hoveredZone;
  const tooltipPos = tooltipZone
    ? (() => {
        const zoneData = zones.find(z => z.zone === tooltipZone);
        if (!zoneData) return null;
        const center = getPathCenter(zoneData.path);
        return { x: center.x, y: center.y - 20 };
      })()
    : null;

  return (
    <svg
      viewBox="0 0 220 510"
      className="w-full h-auto select-none"
      style={{ touchAction: 'manipulation', maxHeight: '480px' }}
    >
      {/* Body zones — seamless anatomical silhouette */}
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
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200 ease-out"
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
            x={tooltipPos.x - 48}
            y={tooltipPos.y - 12}
            width="96"
            height="18"
            rx="4"
            fill="hsl(var(--popover))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
          />
          <text
            x={tooltipPos.x}
            y={tooltipPos.y + 2}
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
