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
  // 4 figures evenly spaced: Male Back | Male Front | Female Front | Female Back
  // Each figure ~336px wide

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

  // Zone positions - relative to 336-wide cropped view
  const getZones = (isMale: boolean, isFront: boolean) => {
    const cx = 168; // Center of 336-wide view
    
    const commonZones = {
      head: { cx, cy: 55, rx: 38, ry: 45 },
      neck: { x: cx - 16, y: 100, width: 32, height: 40 },
      'left-shoulder': { cx: cx - 70, cy: 155, rx: 38, ry: 24 },
      'right-shoulder': { cx: cx + 70, cy: 155, rx: 38, ry: 24 },
      'left-arm': { cx: cx - 105, cy: 250, rx: 24, ry: 70 },
      'right-arm': { cx: cx + 105, cy: 250, rx: 24, ry: 70 },
      'left-forearm': { cx: cx - 115, cy: 380, rx: 20, ry: 65 },
      'right-forearm': { cx: cx + 115, cy: 380, rx: 20, ry: 65 },
      'left-hand': { cx: cx - 120, cy: 480, rx: 20, ry: 38 },
      'right-hand': { cx: cx + 120, cy: 480, rx: 20, ry: 38 },
      'left-hip': { cx: cx - 48, cy: 430, rx: 34, ry: 35 },
      'right-hip': { cx: cx + 48, cy: 430, rx: 34, ry: 35 },
      'left-thigh': { cx: cx - 42, cy: 530, rx: 34, ry: 80 },
      'right-thigh': { cx: cx + 42, cy: 530, rx: 34, ry: 80 },
      'left-knee': { cx: cx - 38, cy: 630, rx: 24, ry: 32 },
      'right-knee': { cx: cx + 38, cy: 630, rx: 24, ry: 32 },
      'left-leg': { cx: cx - 34, cy: 700, rx: 22, ry: 50 },
      'right-leg': { cx: cx + 34, cy: 700, rx: 22, ry: 50 },
      'left-foot': { cx: cx - 34, cy: 745, rx: 26, ry: 14 },
      'right-foot': { cx: cx + 34, cy: 745, rx: 26, ry: 14 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 200, rx: 65, ry: 50 },
        abdomen: { cx, cy: 300, rx: 55, ry: 55 },
        pelvis: { cx, cy: 390, rx: 60, ry: 50 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 200, rx: 65, ry: 50 },
        'lower-back': { cx, cy: 320, rx: 60, ry: 70 },
      };
    }
  };

  const isFront = view === 'front';
  const isMale = gender === 'male';
  const zones = getZones(isMale, isFront);
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
