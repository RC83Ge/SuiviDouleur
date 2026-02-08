import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

interface BodyMapSVGProps {
  view: BodyView;
  selectedZones: BodyZone[];
  onZoneClick: (zone: BodyZone) => void;
  zoneIntensities?: Partial<Record<BodyZone, number>>;
}

const getZoneColor = (zone: BodyZone, selectedZones: BodyZone[], intensity?: number) => {
  if (!selectedZones.includes(zone)) {
    return 'transparent';
  }
  if (intensity !== undefined) {
    return `hsl(var(--pain-${intensity}) / 0.5)`;
  }
  return 'hsl(var(--primary) / 0.5)';
};

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

  const zoneClass = (zone: BodyZone) => cn(
    'body-zone cursor-pointer transition-all duration-300 ease-out',
    'hover:stroke-primary hover:stroke-[3px]',
    selectedZones.includes(zone) && 'stroke-primary stroke-2'
  );

  const getZoneFill = (zone: BodyZone) => {
    const isSelected = selectedZones.includes(zone);
    const isHovered = hoveredZone === zone;
    const intensity = zoneIntensities[zone];
    
    if (isSelected) {
      if (intensity !== undefined) {
        return `hsl(var(--pain-${intensity}) / ${isHovered ? 0.7 : 0.5})`;
      }
      return `hsl(var(--primary) / ${isHovered ? 0.7 : 0.5})`;
    }
    
    if (isHovered) {
      return 'hsl(var(--primary) / 0.25)';
    }
    
    return 'transparent';
  };

  // Single image dimensions: 608x1080
  const viewBox = '0 0 608 1080';

  // Get the center X position (centered in single image)
  const cx = 304;

  // Zone positions - fine-tuned for 608x1080 single body images
  const getZones = (isFront: boolean) => {
    // Common zones shared between front and back views
    const commonZones = {
      head: { cx, cy: 70, rx: 42, ry: 50 },
      neck: { x: cx - 18, y: 120, width: 36, height: 30 },
      'left-shoulder': { cx: cx - 65, cy: 175, rx: 35, ry: 20 },
      'right-shoulder': { cx: cx + 65, cy: 175, rx: 35, ry: 20 },
      'left-arm': { cx: cx - 95, cy: 270, rx: 20, ry: 50 },
      'right-arm': { cx: cx + 95, cy: 270, rx: 20, ry: 50 },
      'left-forearm': { cx: cx - 108, cy: 380, rx: 16, ry: 45 },
      'right-forearm': { cx: cx + 108, cy: 380, rx: 16, ry: 45 },
      'left-hand': { cx: cx - 115, cy: 470, rx: 16, ry: 28 },
      'right-hand': { cx: cx + 115, cy: 470, rx: 16, ry: 28 },
      'left-hip': { cx: cx - 45, cy: 460, rx: 35, ry: 30 },
      'right-hip': { cx: cx + 45, cy: 460, rx: 35, ry: 30 },
      'left-thigh': { cx: cx - 40, cy: 560, rx: 28, ry: 60 },
      'right-thigh': { cx: cx + 40, cy: 560, rx: 28, ry: 60 },
      'left-knee': { cx: cx - 36, cy: 660, rx: 20, ry: 25 },
      'right-knee': { cx: cx + 36, cy: 660, rx: 20, ry: 25 },
      'left-leg': { cx: cx - 32, cy: 750, rx: 14, ry: 50 },
      'right-leg': { cx: cx + 32, cy: 750, rx: 14, ry: 50 },
      'left-foot': { cx: cx - 30, cy: 840, rx: 20, ry: 12 },
      'right-foot': { cx: cx + 30, cy: 840, rx: 20, ry: 12 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 230, rx: 60, ry: 45 },
        abdomen: { cx, cy: 320, rx: 50, ry: 45 },
        pelvis: { cx, cy: 420, rx: 55, ry: 40 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 230, rx: 60, ry: 50 },
        'lower-back': { cx, cy: 360, rx: 55, ry: 70 },
      };
    }
  };

  const isFront = view === 'front';
  const zones = getZones(isFront);
  const bodyImage = isFront ? bodyFront : bodyBack;

  const renderZone = (zone: BodyZone) => {
    const zoneData = zones[zone as keyof typeof zones];
    if (!zoneData) return null;

    const commonProps = {
      className: zoneClass(zone),
      onClick: handleClick(zone),
      onMouseEnter: handleMouseEnter(zone),
      onMouseLeave: handleMouseLeave,
      style: { 
        fill: getZoneFill(zone),
        filter: hoveredZone === zone ? 'drop-shadow(0 0 8px hsl(var(--primary) / 0.4))' : 'none'
      }
    };

    if ('cx' in zoneData) {
      return (
        <ellipse
          key={zone}
          cx={zoneData.cx}
          cy={zoneData.cy}
          rx={zoneData.rx}
          ry={zoneData.ry}
          {...commonProps}
        />
      );
    } else {
      return (
        <rect
          key={zone}
          x={zoneData.x}
          y={zoneData.y}
          width={zoneData.width}
          height={zoneData.height}
          rx={6}
          {...commonProps}
        />
      );
    }
  };

  // Get tooltip position for a zone
  const getTooltipPosition = (zone: BodyZone) => {
    const zoneData = zones[zone as keyof typeof zones];
    if (!zoneData) return { x: 0, y: 0 };
    
    if ('cx' in zoneData) {
      return { x: zoneData.cx, y: zoneData.cy - zoneData.ry - 15 };
    } else {
      return { x: zoneData.x + zoneData.width / 2, y: zoneData.y - 15 };
    }
  };

  const allZones: BodyZone[] = isFront 
    ? ['head', 'neck', 'left-shoulder', 'right-shoulder', 'chest', 'left-arm', 'right-arm', 
       'left-forearm', 'right-forearm', 'left-hand', 'right-hand', 'abdomen', 'pelvis',
       'left-hip', 'right-hip', 'left-thigh', 'right-thigh', 'left-knee', 'right-knee',
       'left-leg', 'right-leg', 'left-foot', 'right-foot']
    : ['head', 'neck', 'left-shoulder', 'right-shoulder', 'upper-back', 'left-arm', 'right-arm',
       'left-forearm', 'right-forearm', 'left-hand', 'right-hand', 'lower-back',
       'left-hip', 'right-hip', 'left-thigh', 'right-thigh', 'left-knee', 'right-knee',
       'left-leg', 'right-leg', 'left-foot', 'right-foot'];

  const tooltipPos = hoveredZone ? getTooltipPosition(hoveredZone) : null;

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto max-h-[500px] select-none"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Subtle gradient background */}
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
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
      
      {/* Clickable zones overlay */}
      {allZones.map(renderZone)}

      {/* Tooltip */}
      {hoveredZone && tooltipPos && (
        <g className="pointer-events-none">
          <rect
            x={tooltipPos.x - 60}
            y={tooltipPos.y - 24}
            width="120"
            height="28"
            rx="6"
            fill="hsl(var(--popover))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="drop-shadow-md"
          />
          <text
            x={tooltipPos.x}
            y={tooltipPos.y - 6}
            textAnchor="middle"
            fill="hsl(var(--popover-foreground))"
            fontSize="13"
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
