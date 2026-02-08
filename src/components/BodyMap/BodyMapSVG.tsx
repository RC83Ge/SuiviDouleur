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
  
  // Use external or internal debug mode
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
    
    // En mode debug, afficher les couleurs de debug
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
    
    // En mode debug, toujours afficher les contours
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
    
    // En mode debug, contours plus visibles
    if (debugMode) return 2;
    
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
    <div className="relative">
      {/* Debug mode toggle button */}
      <button
        type="button"
        onClick={() => setDebugMode(!debugMode)}
        className={cn(
          "absolute top-2 right-2 z-10 p-2 rounded-lg transition-all duration-200",
          "flex items-center gap-1.5 text-xs font-medium",
          debugMode 
            ? "bg-amber-500/20 text-amber-600 border border-amber-500/30" 
            : "bg-muted/80 text-muted-foreground hover:bg-muted border border-transparent"
        )}
        title={debugMode ? "Désactiver le mode debug" : "Activer le mode debug"}
      >
        {debugMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        <span className="hidden sm:inline">{debugMode ? "Debug ON" : "Debug"}</span>
      </button>

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
                filter: (!debugMode && (isSelected || isHovered)) ? 'url(#zoneGlow)' : 'none',
              }}
              onClick={handleClick(zone)}
              onMouseEnter={handleMouseEnter(zone)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}

        {/* Zone labels in debug mode */}
        {debugMode && zones.map(({ zone, path }) => {
          const center = getPathCenter(path);
          return (
            <text
              key={`label-${zone}`}
              x={center.x}
              y={center.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              className="pointer-events-none"
              style={{ 
                textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 -1px 2px rgba(255,255,255,0.8)',
              }}
            >
              {BODY_ZONE_LABELS[zone]}
            </text>
          );
        })}

        {/* Tooltip (only when not in debug mode) */}
        {!debugMode && hoveredZone && tooltipPos && (
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

      {/* Debug mode legend */}
      {debugMode && (
        <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
            🔍 Mode debug actif — Les contours des zones sont visibles pour vérifier l'alignement
          </p>
        </div>
      )}
    </div>
  );
}
