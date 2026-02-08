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

  // Zone positions - recalibrées précisément pour les images 608x1080
  // Basées sur les proportions anatomiques réelles de l'image PNG
  const getZones = (isFront: boolean) => {
    // Zones communes partagées entre vue de face et de dos
    const commonZones = {
      // Tête - centrée en haut
      head: { cx, cy: 65, rx: 48, ry: 55 },
      // Cou - rectangle étroit sous la tête
      neck: { x: cx - 22, y: 115, width: 44, height: 35 },
      // Épaules - ellipses horizontales de chaque côté du cou
      'left-shoulder': { cx: cx - 72, cy: 170, rx: 40, ry: 22 },
      'right-shoulder': { cx: cx + 72, cy: 170, rx: 40, ry: 22 },
      // Bras (partie supérieure) - ellipses verticales
      'left-arm': { cx: cx - 100, cy: 260, rx: 22, ry: 55 },
      'right-arm': { cx: cx + 100, cy: 260, rx: 22, ry: 55 },
      // Avant-bras - ellipses plus fines et basses
      'left-forearm': { cx: cx - 115, cy: 370, rx: 18, ry: 50 },
      'right-forearm': { cx: cx + 115, cy: 370, rx: 18, ry: 50 },
      // Mains - petites ellipses aux extrémités
      'left-hand': { cx: cx - 125, cy: 460, rx: 20, ry: 32 },
      'right-hand': { cx: cx + 125, cy: 460, rx: 20, ry: 32 },
      // Hanches - ellipses sur les côtés du bassin
      'left-hip': { cx: cx - 55, cy: 445, rx: 38, ry: 35 },
      'right-hip': { cx: cx + 55, cy: 445, rx: 38, ry: 35 },
      // Cuisses - grandes ellipses verticales
      'left-thigh': { cx: cx - 48, cy: 550, rx: 32, ry: 70 },
      'right-thigh': { cx: cx + 48, cy: 550, rx: 32, ry: 70 },
      // Genoux - ellipses plus petites
      'left-knee': { cx: cx - 42, cy: 660, rx: 24, ry: 30 },
      'right-knee': { cx: cx + 42, cy: 660, rx: 24, ry: 30 },
      // Jambes (mollets/tibias) - ellipses fines
      'left-leg': { cx: cx - 38, cy: 770, rx: 18, ry: 65 },
      'right-leg': { cx: cx + 38, cy: 770, rx: 18, ry: 65 },
      // Pieds - ellipses horizontales en bas
      'left-foot': { cx: cx - 38, cy: 880, rx: 28, ry: 35 },
      'right-foot': { cx: cx + 38, cy: 880, rx: 28, ry: 35 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        // Thorax/Poitrine - grande ellipse centrale
        chest: { cx, cy: 220, rx: 65, ry: 50 },
        // Abdomen - ellipse centrale sous le thorax
        abdomen: { cx, cy: 320, rx: 55, ry: 50 },
        // Bassin/Pelvis - ellipse basse
        pelvis: { cx, cy: 410, rx: 60, ry: 45 },
      };
    } else {
      return {
        ...commonZones,
        // Haut du dos - grande ellipse centrale
        'upper-back': { cx, cy: 220, rx: 65, ry: 55 },
        // Bas du dos (lombaires) - ellipse plus grande
        'lower-back': { cx, cy: 355, rx: 60, ry: 75 },
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
