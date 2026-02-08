import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';

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
  zoneIntensities = {}
}: BodyMapSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);

  const handleClick = (zone: BodyZone) => (e: React.MouseEvent) => {
    e.preventDefault();
    onZoneClick(zone);
  };

  const handleMouseEnter = (zone: BodyZone) => () => {
    setHoveredZone(zone);
  };

  const handleMouseLeave = () => {
    setHoveredZone(null);
  };

  const getZoneFill = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    const intensity = zoneIntensities[zone];
    
    if (isSelected) {
      if (intensity !== undefined) {
        return `hsl(var(--pain-${intensity}))`;
      }
      return 'hsl(var(--primary))';
    }
    
    if (isHovered) {
      return 'hsl(var(--primary) / 0.3)';
    }
    
    return 'hsl(var(--muted))';
  };

  const getZoneStroke = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    
    if (isSelected || isHovered) {
      return 'hsl(var(--primary))';
    }
    return 'hsl(var(--border))';
  };

  const zoneProps = (zone: BodyZone) => ({
    className: cn(
      'cursor-pointer transition-all duration-200 ease-out',
      selectedZones.includes(zone) && 'drop-shadow-md'
    ),
    onClick: handleClick(zone),
    onMouseEnter: handleMouseEnter(zone),
    onMouseLeave: handleMouseLeave,
    style: { 
      fill: getZoneFill(zone),
      stroke: getZoneStroke(zone),
      strokeWidth: hoveredZone === zone || selectedZones.includes(zone) ? 2 : 1,
    }
  });

  const isFront = view === 'front';

  // Tooltip position calculation
  const getTooltipPosition = (zone: BodyZone): { x: number; y: number } => {
    const positions: Record<string, { x: number; y: number }> = {
      head: { x: 100, y: 25 },
      neck: { x: 100, y: 70 },
      'left-shoulder': { x: 55, y: 95 },
      'right-shoulder': { x: 145, y: 95 },
      chest: { x: 100, y: 130 },
      'upper-back': { x: 100, y: 130 },
      'left-arm': { x: 35, y: 150 },
      'right-arm': { x: 165, y: 150 },
      'left-forearm': { x: 25, y: 210 },
      'right-forearm': { x: 175, y: 210 },
      'left-hand': { x: 15, y: 270 },
      'right-hand': { x: 185, y: 270 },
      abdomen: { x: 100, y: 190 },
      'lower-back': { x: 100, y: 200 },
      pelvis: { x: 100, y: 240 },
      'left-hip': { x: 70, y: 260 },
      'right-hip': { x: 130, y: 260 },
      'left-thigh': { x: 70, y: 310 },
      'right-thigh': { x: 130, y: 310 },
      'left-knee': { x: 70, y: 370 },
      'right-knee': { x: 130, y: 370 },
      'left-leg': { x: 70, y: 420 },
      'right-leg': { x: 130, y: 420 },
      'left-foot': { x: 65, y: 480 },
      'right-foot': { x: 135, y: 480 },
    };
    return positions[zone] || { x: 100, y: 250 };
  };

  const tooltipPos = hoveredZone ? getTooltipPosition(hoveredZone) : null;

  return (
    <svg
      viewBox="0 0 200 500"
      className="w-full h-auto max-h-[500px] select-none"
      style={{ touchAction: 'manipulation' }}
    >
      <defs>
        <filter id="zoneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Body silhouette with separate paths for each zone */}
      <g>
        {/* Head */}
        <ellipse cx="100" cy="45" rx="28" ry="32" {...zoneProps('head')} />
        
        {/* Neck */}
        <rect x="88" y="75" width="24" height="25" rx="4" {...zoneProps('neck')} />

        {/* Shoulders */}
        <path 
          d="M 60 100 Q 50 105, 48 120 L 60 120 Q 65 108, 75 105 Z" 
          {...zoneProps('left-shoulder')} 
        />
        <path 
          d="M 140 100 Q 150 105, 152 120 L 140 120 Q 135 108, 125 105 Z" 
          {...zoneProps('right-shoulder')} 
        />

        {/* Chest / Upper Back */}
        {isFront ? (
          <path 
            d="M 75 105 Q 100 100, 125 105 L 125 165 Q 100 170, 75 165 Z" 
            {...zoneProps('chest')} 
          />
        ) : (
          <path 
            d="M 75 105 Q 100 100, 125 105 L 125 165 Q 100 170, 75 165 Z" 
            {...zoneProps('upper-back')} 
          />
        )}

        {/* Arms */}
        <path 
          d="M 48 120 L 38 180 Q 35 185, 40 190 L 52 190 Q 57 185, 55 180 L 60 120 Z" 
          {...zoneProps('left-arm')} 
        />
        <path 
          d="M 152 120 L 162 180 Q 165 185, 160 190 L 148 190 Q 143 185, 145 180 L 140 120 Z" 
          {...zoneProps('right-arm')} 
        />

        {/* Forearms */}
        <path 
          d="M 40 190 L 30 250 Q 28 255, 32 258 L 45 258 Q 50 255, 48 250 L 52 190 Z" 
          {...zoneProps('left-forearm')} 
        />
        <path 
          d="M 160 190 L 170 250 Q 172 255, 168 258 L 155 258 Q 150 255, 152 250 L 148 190 Z" 
          {...zoneProps('right-forearm')} 
        />

        {/* Hands */}
        <path 
          d="M 32 258 Q 25 262, 22 275 Q 20 290, 28 295 Q 35 298, 42 292 Q 48 285, 45 270 Q 48 262, 45 258 Z" 
          {...zoneProps('left-hand')} 
        />
        <path 
          d="M 168 258 Q 175 262, 178 275 Q 180 290, 172 295 Q 165 298, 158 292 Q 152 285, 155 270 Q 152 262, 155 258 Z" 
          {...zoneProps('right-hand')} 
        />

        {/* Abdomen / Lower Back */}
        {isFront ? (
          <path 
            d="M 75 165 Q 100 170, 125 165 L 125 220 Q 100 225, 75 220 Z" 
            {...zoneProps('abdomen')} 
          />
        ) : (
          <path 
            d="M 75 165 Q 100 170, 125 165 L 125 235 Q 100 240, 75 235 Z" 
            {...zoneProps('lower-back')} 
          />
        )}

        {/* Pelvis (front only) */}
        {isFront && (
          <path 
            d="M 75 220 Q 100 225, 125 220 L 130 255 Q 100 265, 70 255 Z" 
            {...zoneProps('pelvis')} 
          />
        )}

        {/* Hips */}
        <ellipse cx="78" cy="268" rx="18" ry="15" {...zoneProps('left-hip')} />
        <ellipse cx="122" cy="268" rx="18" ry="15" {...zoneProps('right-hip')} />

        {/* Thighs */}
        <path 
          d="M 65 280 Q 60 320, 65 360 L 85 360 Q 90 320, 90 280 Z" 
          {...zoneProps('left-thigh')} 
        />
        <path 
          d="M 135 280 Q 140 320, 135 360 L 115 360 Q 110 320, 110 280 Z" 
          {...zoneProps('right-thigh')} 
        />

        {/* Knees */}
        <ellipse cx="75" cy="375" rx="14" ry="18" {...zoneProps('left-knee')} />
        <ellipse cx="125" cy="375" rx="14" ry="18" {...zoneProps('right-knee')} />

        {/* Legs (calves) */}
        <path 
          d="M 63 392 Q 60 420, 65 455 L 82 455 Q 88 420, 87 392 Z" 
          {...zoneProps('left-leg')} 
        />
        <path 
          d="M 137 392 Q 140 420, 135 455 L 118 455 Q 112 420, 113 392 Z" 
          {...zoneProps('right-leg')} 
        />

        {/* Feet */}
        <path 
          d="M 65 455 Q 55 460, 52 470 Q 50 480, 58 485 Q 72 490, 82 485 Q 88 480, 82 465 L 82 455 Z" 
          {...zoneProps('left-foot')} 
        />
        <path 
          d="M 135 455 Q 145 460, 148 470 Q 150 480, 142 485 Q 128 490, 118 485 Q 112 480, 118 465 L 118 455 Z" 
          {...zoneProps('right-foot')} 
        />
      </g>

      {/* Tooltip */}
      {hoveredZone && tooltipPos && (
        <g className="pointer-events-none">
          <rect
            x={tooltipPos.x - 50}
            y={tooltipPos.y - 22}
            width="100"
            height="24"
            rx="6"
            fill="hsl(var(--popover))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            filter="url(#zoneShadow)"
          />
          <text
            x={tooltipPos.x}
            y={tooltipPos.y - 6}
            textAnchor="middle"
            fill="hsl(var(--popover-foreground))"
            fontSize="11"
            fontWeight="500"
            fontFamily="system-ui, sans-serif"
          >
            {BODY_ZONE_LABELS[hoveredZone]}
          </text>
        </g>
      )}
    </svg>
  );
}
