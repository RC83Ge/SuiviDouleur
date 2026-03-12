import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { getZonesForView, getPathCenter } from './bodyPaths';

interface BodyMapSVGProps {
  view: BodyView;
  selectedZones: BodyZone[];
  onZoneClick: (zone: BodyZone) => void;
  zoneIntensities?: Partial<Record<BodyZone, number>>;
}

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
          : '#4DA3FF',
        stroke: '#2563EB',
        strokeWidth: 1.8,
        fillOpacity: 0.65,
      };
    }

    if (isHovered) {
      return {
        fill: '#BFDBFE',
        stroke: '#60A5FA',
        strokeWidth: 1.2,
        fillOpacity: 0.5,
      };
    }

    return {
      fill: '#93C5FD',
      stroke: '#64748B',
      strokeWidth: 0.6,
      fillOpacity: 0.3,
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
      viewBox="0 0 200 470"
      className="w-full h-auto select-none"
      style={{ touchAction: 'manipulation', maxHeight: '440px' }}
    >
      {/* Subtle center guide */}
      <line
        x1="100" y1="60" x2="100" y2="465"
        stroke="hsl(var(--border))"
        strokeWidth="0.25"
        strokeDasharray="3,5"
        opacity="0.25"
      />

      {/* Body zones — each is a fluid bezier path */}
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

      {/* Tooltip on hover */}
      {tooltipZone && tooltipPos && (
        <g className="pointer-events-none">
          <rect
            x={tooltipPos.x - 46}
            y={tooltipPos.y - 11}
            width="92"
            height="17"
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
            fontSize="7.5"
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
