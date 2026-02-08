import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { getZonesForView, getPathCenter } from './bodyZonePaths';

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
        return `hsl(var(--pain-${intensity}) / ${isHovered ? 0.75 : 0.55})`;
      }
      return `hsl(var(--primary) / ${isHovered ? 0.75 : 0.55})`;
    }
    
    if (isHovered) {
      return 'hsl(var(--primary) / 0.25)';
    }
    
    return 'transparent';
  };

  const getZoneStroke = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    
    if (isSelected) {
      return 'hsl(var(--primary))';
    }
    if (isHovered) {
      return 'hsl(var(--primary) / 0.6)';
    }
    return 'transparent';
  };

  const getZoneStrokeWidth = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    
    if (isSelected) return 3;
    if (isHovered) return 2;
    return 0;
  };

  // Single image dimensions: 608x1080
  const viewBox = '0 0 608 1080';
  const isFront = view === 'front';
  const bodyImage = isFront ? bodyFront : bodyBack;
  
  // Get zones for current view
  const zones = getZonesForView(isFront ? 'front' : 'back');

  // Get tooltip position for a zone
  const getTooltipPosition = (zone: BodyZone) => {
    const zoneData = zones.find(z => z.zone === zone);
    if (!zoneData) return { x: 304, y: 540 };
    
    const center = getPathCenter(zoneData.path);
    // Position tooltip above the zone center
    return { x: center.x, y: center.y - 40 };
  };

  const tooltipPos = hoveredZone ? getTooltipPosition(hoveredZone) : null;

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto max-h-[500px] select-none"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Definitions */}
      <defs>
        {/* Gradient for background */}
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
        </linearGradient>
        
        {/* Glow filter for selected/hovered zones */}
        <filter id="zoneGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Subtle inner shadow for depth */}
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2"/>
          <feOffset dx="0" dy="1" result="offsetblur"/>
          <feFlood floodColor="rgb(0,0,0)" floodOpacity="0.15"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feComposite in2="SourceAlpha" operator="in"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
            <feMergeNode/>
          </feMerge>
        </filter>
      </defs>

      {/* Background image */}
      <image
        href={bodyImage}
        x="0"
        y="0"
        width="608"
        height="1080"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none"
      />
      
      {/* Clickable anatomical zones with polygon paths */}
      {zones.map(({ zone, path }) => {
        const isSelected = selectedZones.includes(zone);
        const isHovered = hoveredZone === zone;
        
        return (
          <path
            key={zone}
            d={path}
            className={cn(
              'cursor-pointer transition-all duration-200 ease-out',
            )}
            style={{
              fill: getZoneFill(zone),
              stroke: getZoneStroke(zone),
              strokeWidth: getZoneStrokeWidth(zone),
              filter: (isSelected || isHovered) ? 'url(#zoneGlow)' : 'none',
            }}
            onClick={handleClick(zone)}
            onMouseEnter={handleMouseEnter(zone)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}

      {/* Tooltip */}
      {hoveredZone && tooltipPos && (
        <g className="pointer-events-none">
          {/* Tooltip background */}
          <rect
            x={tooltipPos.x - 70}
            y={tooltipPos.y - 28}
            width="140"
            height="32"
            rx="8"
            fill="hsl(var(--popover))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
          />
          {/* Tooltip text */}
          <text
            x={tooltipPos.x}
            y={tooltipPos.y - 7}
            textAnchor="middle"
            fill="hsl(var(--popover-foreground))"
            fontSize="14"
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
