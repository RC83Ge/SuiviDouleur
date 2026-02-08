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

  // Get the center X position for each figure - adjusted to actual positions
  const getCenterX = () => {
    if (gender === 'male') {
      return view === 'front' ? 718 : 238; // Male front / Male back
    } else {
      return view === 'front' ? 1198 : 1678; // Female front / Female back
    }
  };

  // Zone positions - using absolute coordinates aligned to silhouettes
  const getZones = (isFront: boolean) => {
    const cx = getCenterX();
    
    const commonZones = {
      head: { cx, cy: 85, rx: 42, ry: 55 },
      neck: { x: cx - 18, y: 140, width: 36, height: 45 },
      'left-shoulder': { cx: cx - 72, cy: 210, rx: 45, ry: 28 },
      'right-shoulder': { cx: cx + 72, cy: 210, rx: 45, ry: 28 },
      'left-arm': { cx: cx - 115, cy: 330, rx: 28, ry: 85 },
      'right-arm': { cx: cx + 115, cy: 330, rx: 28, ry: 85 },
      'left-forearm': { cx: cx - 130, cy: 500, rx: 22, ry: 80 },
      'right-forearm': { cx: cx + 130, cy: 500, rx: 22, ry: 80 },
      'left-hand': { cx: cx - 138, cy: 630, rx: 22, ry: 45 },
      'right-hand': { cx: cx + 138, cy: 630, rx: 22, ry: 45 },
      'left-hip': { cx: cx - 52, cy: 570, rx: 42, ry: 42 },
      'right-hip': { cx: cx + 52, cy: 570, rx: 42, ry: 42 },
      'left-thigh': { cx: cx - 48, cy: 710, rx: 40, ry: 100 },
      'right-thigh': { cx: cx + 48, cy: 710, rx: 40, ry: 100 },
      'left-knee': { cx: cx - 45, cy: 845, rx: 30, ry: 38 },
      'right-knee': { cx: cx + 45, cy: 845, rx: 30, ry: 38 },
      'left-leg': { cx: cx - 42, cy: 945, rx: 25, ry: 65 },
      'right-leg': { cx: cx + 42, cy: 945, rx: 25, ry: 65 },
      'left-foot': { cx: cx - 42, cy: 1025, rx: 32, ry: 16 },
      'right-foot': { cx: cx + 42, cy: 1025, rx: 32, ry: 16 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 270, rx: 70, ry: 55 },
        abdomen: { cx, cy: 390, rx: 58, ry: 60 },
        pelvis: { cx, cy: 510, rx: 65, ry: 55 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 270, rx: 70, ry: 55 },
        'lower-back': { cx, cy: 420, rx: 62, ry: 85 },
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
