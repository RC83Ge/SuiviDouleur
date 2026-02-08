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
    'body-zone cursor-pointer transition-all duration-200 hover:fill-primary/20',
    selectedZones.includes(zone) && 'selected'
  );

  // Full image dimensions: 1344x756 (16:9)
  // 4 figures evenly spaced
  // Each figure ~250px wide, centered in quarters

  const getViewBox = () => {
    if (gender === 'male') {
      if (view === 'front') {
        return '270 0 280 756'; // Male front (2nd figure)
      } else {
        return '10 0 280 756'; // Male back (1st figure)
      }
    } else {
      if (view === 'front') {
        return '520 0 280 756'; // Female front (3rd figure)
      } else {
        return '780 0 280 756'; // Female back (4th figure)
      }
    }
  };

  // Zone positions - relative to 280-wide cropped view
  const getZones = (isMale: boolean, isFront: boolean) => {
    const cx = 140; // Center of 280-wide view
    
    const commonZones = {
      head: { cx, cy: 58, rx: 32, ry: 40 },
      neck: { x: cx - 14, y: 98, width: 28, height: 35 },
      'left-shoulder': { cx: cx - 60, cy: 148, rx: 32, ry: 20 },
      'right-shoulder': { cx: cx + 60, cy: 148, rx: 32, ry: 20 },
      'left-arm': { cx: cx - 88, cy: 235, rx: 20, ry: 60 },
      'right-arm': { cx: cx + 88, cy: 235, rx: 20, ry: 60 },
      'left-forearm': { cx: cx - 95, cy: 355, rx: 16, ry: 55 },
      'right-forearm': { cx: cx + 95, cy: 355, rx: 16, ry: 55 },
      'left-hand': { cx: cx - 100, cy: 450, rx: 16, ry: 32 },
      'right-hand': { cx: cx + 100, cy: 450, rx: 16, ry: 32 },
      'left-hip': { cx: cx - 40, cy: 400, rx: 28, ry: 30 },
      'right-hip': { cx: cx + 40, cy: 400, rx: 28, ry: 30 },
      'left-thigh': { cx: cx - 35, cy: 490, rx: 28, ry: 70 },
      'right-thigh': { cx: cx + 35, cy: 490, rx: 28, ry: 70 },
      'left-knee': { cx: cx - 32, cy: 580, rx: 20, ry: 28 },
      'right-knee': { cx: cx + 32, cy: 580, rx: 20, ry: 28 },
      'left-leg': { cx: cx - 28, cy: 660, rx: 18, ry: 55 },
      'right-leg': { cx: cx + 28, cy: 660, rx: 18, ry: 55 },
      'left-foot': { cx: cx - 28, cy: 730, rx: 22, ry: 16 },
      'right-foot': { cx: cx + 28, cy: 730, rx: 22, ry: 16 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 190, rx: 55, ry: 45 },
        abdomen: { cx, cy: 280, rx: 45, ry: 50 },
        pelvis: { cx, cy: 365, rx: 50, ry: 45 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 190, rx: 55, ry: 45 },
        'lower-back': { cx, cy: 300, rx: 50, ry: 60 },
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
