import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { getZonesForView, getPathCenter } from './bodyZonePaths';
import { Eye, EyeOff } from 'lucide-react';

interface BodyMapSVGProps {
  view: BodyView;
  selectedZones: BodyZone[];
  onZoneClick: (zone: BodyZone) => void;
  zoneIntensities?: Partial<Record<BodyZone, number>>;
  debugMode?: boolean;
  onDebugModeChange?: (debug: boolean) => void;
}

// Couleurs distinctes pour chaque zone en mode debug
const DEBUG_COLORS: Record<string, string> = {
  'head': 'rgba(255, 99, 132, 0.4)',
  'neck': 'rgba(255, 159, 64, 0.4)',
  'left-shoulder': 'rgba(255, 205, 86, 0.4)',
  'right-shoulder': 'rgba(75, 192, 192, 0.4)',
  'chest': 'rgba(54, 162, 235, 0.4)',
  'upper-back': 'rgba(54, 162, 235, 0.4)',
  'left-arm': 'rgba(153, 102, 255, 0.4)',
  'right-arm': 'rgba(201, 203, 207, 0.4)',
  'left-forearm': 'rgba(255, 99, 132, 0.4)',
  'right-forearm': 'rgba(255, 159, 64, 0.4)',
  'left-hand': 'rgba(255, 205, 86, 0.4)',
  'right-hand': 'rgba(75, 192, 192, 0.4)',
  'abdomen': 'rgba(54, 162, 235, 0.4)',
  'lower-back': 'rgba(54, 162, 235, 0.4)',
  'pelvis': 'rgba(153, 102, 255, 0.4)',
  'left-hip': 'rgba(201, 203, 207, 0.4)',
  'right-hip': 'rgba(255, 99, 132, 0.4)',
  'left-thigh': 'rgba(255, 159, 64, 0.4)',
  'right-thigh': 'rgba(255, 205, 86, 0.4)',
  'left-knee': 'rgba(75, 192, 192, 0.4)',
  'right-knee': 'rgba(54, 162, 235, 0.4)',
  'left-leg': 'rgba(153, 102, 255, 0.4)',
  'right-leg': 'rgba(201, 203, 207, 0.4)',
  'left-foot': 'rgba(255, 99, 132, 0.4)',
  'right-foot': 'rgba(255, 159, 64, 0.4)',
};

export function BodyMapSVG({ 
  view, 
  selectedZones, 
  onZoneClick,
  zoneIntensities = {},
  debugMode: externalDebugMode,
  onDebugModeChange,
}: BodyMapSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);
  const [internalDebugMode, setInternalDebugMode] = useState(false);
  
  const debugMode = externalDebugMode ?? internalDebugMode;
  const setDebugMode = onDebugModeChange ?? setInternalDebugMode;

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
    
    if (debugMode) {
      return DEBUG_COLORS[zone] || 'rgba(128, 128, 128, 0.4)';
    }
    
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
    
    if (debugMode) {
      return DEBUG_COLORS[zone]?.replace('0.4', '1') || 'rgba(128, 128, 128, 1)';
    }
    
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
    
    if (debugMode) return 2;
    if (isSelected) return 3;
    if (isHovered) return 2;
    return 0;
  };

  const viewBox = '0 0 608 1080';
  const isFront = view === 'front';
  const bodyImage = isFront ? bodyFront : bodyBack;
  
  const zones = getZonesForView(isFront ? 'front' : 'back');

  const getTooltipPosition = (zone: BodyZone) => {
    const zoneData = zones.find(z => z.zone === zone);
    if (!zoneData) return { x: 304, y: 540 };
    
    const center = getPathCenter(zoneData.path);
    return { x: center.x, y: center.y - 40 };
  };

  const tooltipPos = hoveredZone ? getTooltipPosition(hoveredZone) : null;

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Debug toggle */}
      <button
        type="button"
        onClick={() => setDebugMode(!debugMode)}
        className={cn(
          'absolute top-2 right-2 z-10 p-1.5 rounded-md transition-all',
          debugMode
            ? 'bg-amber-500/20 text-amber-600'
            : 'bg-muted/80 text-muted-foreground hover:text-foreground'
        )}
      >
        {debugMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>

      {/* Body image + SVG overlay */}
      <div className="relative" style={{ lineHeight: 0 }}>
        <img
          src={bodyImage}
          alt={`Corps humain - vue ${isFront ? 'de face' : 'de dos'}`}
          draggable={false}
          className="block w-full pointer-events-none select-none"
        />

        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'manipulation' }}
        >
          {zones.map(({ zone, path }) => (
            <path
              key={zone}
              d={path}
              fill={getZoneFill(zone)}
              stroke={getZoneStroke(zone)}
              strokeWidth={getZoneStrokeWidth(zone)}
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onClick={handleClick(zone)}
              onMouseEnter={handleMouseEnter(zone)}
              onMouseLeave={handleMouseLeave}
            />
          ))}

          {/* Debug labels */}
          {debugMode && zones.map(({ zone, path }) => {
            const center = getPathCenter(path);
            return (
              <text
                key={`label-${zone}`}
                x={center.x}
                y={center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(220, 40, 40, 0.9)"
                fontSize="14"
                fontWeight="700"
                fontFamily="monospace"
                className="pointer-events-none select-none"
                style={{ textShadow: '0 0 3px rgba(255,255,255,0.9)' }}
              >
                {zone}
              </text>
            );
          })}

          {/* Hover tooltip */}
          {hoveredZone && tooltipPos && !debugMode && (
            <g>
              <rect
                x={tooltipPos.x - 60}
                y={tooltipPos.y - 12}
                width="120"
                height="24"
                rx="6"
                fill="hsl(var(--popover))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.95"
              />
              <text
                x={tooltipPos.x}
                y={tooltipPos.y + 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(var(--foreground))"
                fontSize="11"
                fontWeight="500"
              >
                {BODY_ZONE_LABELS[hoveredZone]}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
