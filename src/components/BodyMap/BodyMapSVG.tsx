import React from 'react';
import { Gender, BodyView, BodyZone } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyMap from '@/assets/body-map-new.png';

interface BodyMapSVGProps {
  gender: Gender;
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
  return 'hsl(var(--primary) / 0.4)';
};

export function BodyMapSVG({ 
  gender, 
  view, 
  selectedZones, 
  onZoneClick,
  zoneIntensities = {}
}: BodyMapSVGProps) {
  const handleClick = (zone: BodyZone) => (e: React.MouseEvent) => {
    e.preventDefault();
    onZoneClick(zone);
  };

  const zoneClass = (zone: BodyZone) => cn(
    'body-zone cursor-pointer transition-all duration-200',
    'hover:fill-primary/40 hover:stroke-primary hover:stroke-2',
    'active:fill-primary/50',
    selectedZones.includes(zone) && 'selected'
  );

  // Full image dimensions: 1920x1080
  // 4 figures: Back | Front | Front | Back
  // Each figure ~480px wide

  const getViewBox = () => {
    if (gender === 'male') {
      if (view === 'front') {
        return '480 0 480 1080'; // Male front (2nd figure)
      } else {
        return '0 0 480 1080'; // Male back (1st figure)
      }
    } else {
      if (view === 'front') {
        return '960 0 480 1080'; // Female front (3rd figure)
      } else {
        return '1440 0 480 1080'; // Female back (4th figure)
      }
    }
  };

  // Get the center X position for each figure
  const getCenterX = () => {
    if (gender === 'male') {
      return view === 'front' ? 720 : 240; // Male front / Male back
    } else {
      return view === 'front' ? 1200 : 1680; // Female front / Female back
    }
  };

  // Zone positions - using absolute coordinates
  const getZones = (isFront: boolean) => {
    const cx = getCenterX();
    
    const commonZones = {
      head: { cx, cy: 95, rx: 52, ry: 65 },
      neck: { x: cx - 22, y: 160, width: 44, height: 55 },
      'left-shoulder': { cx: cx - 90, cy: 240, rx: 55, ry: 35 },
      'right-shoulder': { cx: cx + 90, cy: 240, rx: 55, ry: 35 },
      'left-arm': { cx: cx - 140, cy: 370, rx: 35, ry: 100 },
      'right-arm': { cx: cx + 140, cy: 370, rx: 35, ry: 100 },
      'left-forearm': { cx: cx - 155, cy: 550, rx: 28, ry: 95 },
      'right-forearm': { cx: cx + 155, cy: 550, rx: 28, ry: 95 },
      'left-hand': { cx: cx - 165, cy: 700, rx: 28, ry: 55 },
      'right-hand': { cx: cx + 165, cy: 700, rx: 28, ry: 55 },
      'left-hip': { cx: cx - 65, cy: 620, rx: 50, ry: 50 },
      'right-hip': { cx: cx + 65, cy: 620, rx: 50, ry: 50 },
      'left-thigh': { cx: cx - 58, cy: 760, rx: 48, ry: 110 },
      'right-thigh': { cx: cx + 58, cy: 760, rx: 48, ry: 110 },
      'left-knee': { cx: cx - 52, cy: 900, rx: 35, ry: 45 },
      'right-knee': { cx: cx + 52, cy: 900, rx: 35, ry: 45 },
      'left-leg': { cx: cx - 48, cy: 1000, rx: 30, ry: 70 },
      'right-leg': { cx: cx + 48, cy: 1000, rx: 30, ry: 70 },
      'left-foot': { cx: cx - 48, cy: 1060, rx: 38, ry: 18 },
      'right-foot': { cx: cx + 48, cy: 1060, rx: 38, ry: 18 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 300, rx: 85, ry: 70 },
        abdomen: { cx, cy: 440, rx: 70, ry: 75 },
        pelvis: { cx, cy: 570, rx: 80, ry: 65 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 300, rx: 85, ry: 70 },
        'lower-back': { cx, cy: 470, rx: 75, ry: 100 },
      };
    }
  };

  const isFront = view === 'front';
  const isMale = gender === 'male';
  const zones = getZones(isFront);
  const viewBox = getViewBox();

  const renderZone = (zone: BodyZone) => {
    const zoneData = zones[zone as keyof typeof zones];
    if (!zoneData) return null;

    if ('cx' in zoneData) {
      return (
        <ellipse
          key={zone}
          cx={zoneData.cx}
          cy={zoneData.cy}
          rx={zoneData.rx}
          ry={zoneData.ry}
          className={zoneClass(zone)}
          onClick={handleClick(zone)}
          style={{ fill: getZoneColor(zone, selectedZones, zoneIntensities[zone]) }}
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
          rx={4}
          className={zoneClass(zone)}
          onClick={handleClick(zone)}
          style={{ fill: getZoneColor(zone, selectedZones, zoneIntensities[zone]) }}
        />
      );
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

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Background image */}
      <image
        href={bodyMap}
        x="0"
        y="0"
        width="1920"
        height="1080"
        preserveAspectRatio="xMidYMid meet"
      />
      
      {/* Clickable zones overlay */}
      {allZones.map(renderZone)}
    </svg>
  );
}
