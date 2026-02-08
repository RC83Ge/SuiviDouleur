import React from 'react';
import { Gender, BodyView, BodyZone } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyMap from '@/assets/body-map-cropped.png';

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

  // Full image dimensions: 1344x756
  // 4 figures: Male Back | Male Front | Female Front | Female Back
  // Adjusted centers based on actual figure positions in the image

  const getViewBox = () => {
    if (gender === 'male') {
      if (view === 'front') {
        return '336 0 336 756'; // Male front (2nd figure)
      } else {
        return '0 0 336 756'; // Male back (1st figure)
      }
    } else {
      if (view === 'front') {
        return '672 0 336 756'; // Female front (3rd figure)
      } else {
        return '1008 0 336 756'; // Female back (4th figure)
      }
    }
  };

  // Get the center X position - adjusted for each figure's actual position
  const getCenterX = () => {
    if (gender === 'male') {
      return view === 'front' ? 500 : 165; // Male front / Male back
    } else {
      return view === 'front' ? 835 : 1175; // Female front / Female back
    }
  };

  // Zone positions - using absolute coordinates
  const getZones = (isFront: boolean) => {
    const cx = getCenterX();
    
    const commonZones = {
      head: { cx, cy: 60, rx: 35, ry: 42 },
      neck: { x: cx - 15, y: 102, width: 30, height: 35 },
      'left-shoulder': { cx: cx - 58, cy: 150, rx: 35, ry: 22 },
      'right-shoulder': { cx: cx + 58, cy: 150, rx: 35, ry: 22 },
      'left-arm': { cx: cx - 90, cy: 240, rx: 22, ry: 65 },
      'right-arm': { cx: cx + 90, cy: 240, rx: 22, ry: 65 },
      'left-forearm': { cx: cx - 100, cy: 365, rx: 18, ry: 60 },
      'right-forearm': { cx: cx + 100, cy: 365, rx: 18, ry: 60 },
      'left-hand': { cx: cx - 108, cy: 465, rx: 18, ry: 35 },
      'right-hand': { cx: cx + 108, cy: 465, rx: 18, ry: 35 },
      'left-hip': { cx: cx - 42, cy: 420, rx: 32, ry: 32 },
      'right-hip': { cx: cx + 42, cy: 420, rx: 32, ry: 32 },
      'left-thigh': { cx: cx - 38, cy: 520, rx: 32, ry: 75 },
      'right-thigh': { cx: cx + 38, cy: 520, rx: 32, ry: 75 },
      'left-knee': { cx: cx - 35, cy: 620, rx: 22, ry: 30 },
      'right-knee': { cx: cx + 35, cy: 620, rx: 22, ry: 30 },
      'left-leg': { cx: cx - 32, cy: 695, rx: 20, ry: 50 },
      'right-leg': { cx: cx + 32, cy: 695, rx: 20, ry: 50 },
      'left-foot': { cx: cx - 32, cy: 742, rx: 24, ry: 12 },
      'right-foot': { cx: cx + 32, cy: 742, rx: 24, ry: 12 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 195, rx: 55, ry: 45 },
        abdomen: { cx, cy: 290, rx: 48, ry: 50 },
        pelvis: { cx, cy: 380, rx: 55, ry: 45 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 195, rx: 55, ry: 45 },
        'lower-back': { cx, cy: 310, rx: 52, ry: 65 },
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
        width="1344"
        height="756"
        preserveAspectRatio="xMidYMid meet"
      />
      
      {/* Clickable zones overlay */}
      {allZones.map(renderZone)}
    </svg>
  );
}
