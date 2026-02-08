import React from 'react';
import { Gender, BodyView, BodyZone } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyReference from '@/assets/body-reference.png';

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

  // Image layout from left to right:
  // 1. Male side (profile) - ~0-85
  // 2. Male back - ~85-170  
  // 3. Male front - ~170-255
  // 4. Female front - ~280-365
  // 5. Female back - ~365-450
  // 6. Female side (profile) - ~450-530

  const getViewBox = () => {
    if (gender === 'male') {
      if (view === 'front') {
        return '170 0 85 210'; // Male front
      } else {
        return '85 0 85 210'; // Male back
      }
    } else {
      if (view === 'front') {
        return '280 0 85 210'; // Female front
      } else {
        return '365 0 85 210'; // Female back
      }
    }
  };

  // Zone positions - centered at ~42 (middle of 85-wide crop)
  const getMaleZones = (isFront: boolean) => {
    const cx = 42; // Center X for the figure
    
    if (isFront) {
      return {
        head: { cx, cy: 20, rx: 10, ry: 12 },
        neck: { x: cx - 5, y: 32, width: 10, height: 10 },
        'left-shoulder': { cx: cx - 20, cy: 47, rx: 10, ry: 6 },
        'right-shoulder': { cx: cx + 20, cy: 47, rx: 10, ry: 6 },
        chest: { cx, cy: 58, rx: 18, ry: 14 },
        'left-arm': { cx: cx - 28, cy: 72, rx: 6, ry: 18 },
        'right-arm': { cx: cx + 28, cy: 72, rx: 6, ry: 18 },
        'left-forearm': { cx: cx - 30, cy: 108, rx: 5, ry: 16 },
        'right-forearm': { cx: cx + 30, cy: 108, rx: 5, ry: 16 },
        'left-hand': { cx: cx - 32, cy: 135, rx: 5, ry: 10 },
        'right-hand': { cx: cx + 32, cy: 135, rx: 5, ry: 10 },
        abdomen: { cx, cy: 82, rx: 14, ry: 14 },
        pelvis: { cx, cy: 105, rx: 14, ry: 12 },
        'left-hip': { cx: cx - 12, cy: 115, rx: 8, ry: 8 },
        'right-hip': { cx: cx + 12, cy: 115, rx: 8, ry: 8 },
        'left-thigh': { cx: cx - 10, cy: 140, rx: 8, ry: 22 },
        'right-thigh': { cx: cx + 10, cy: 140, rx: 8, ry: 22 },
        'left-knee': { cx: cx - 9, cy: 168, rx: 6, ry: 8 },
        'right-knee': { cx: cx + 9, cy: 168, rx: 6, ry: 8 },
        'left-leg': { cx: cx - 8, cy: 188, rx: 5, ry: 16 },
        'right-leg': { cx: cx + 8, cy: 188, rx: 5, ry: 16 },
        'left-foot': { cx: cx - 8, cy: 206, rx: 6, ry: 4 },
        'right-foot': { cx: cx + 8, cy: 206, rx: 6, ry: 4 },
      };
    } else {
      return {
        head: { cx, cy: 20, rx: 10, ry: 12 },
        neck: { x: cx - 5, y: 32, width: 10, height: 10 },
        'left-shoulder': { cx: cx - 20, cy: 47, rx: 10, ry: 6 },
        'right-shoulder': { cx: cx + 20, cy: 47, rx: 10, ry: 6 },
        'upper-back': { cx, cy: 58, rx: 18, ry: 14 },
        'left-arm': { cx: cx - 28, cy: 72, rx: 6, ry: 18 },
        'right-arm': { cx: cx + 28, cy: 72, rx: 6, ry: 18 },
        'left-forearm': { cx: cx - 30, cy: 108, rx: 5, ry: 16 },
        'right-forearm': { cx: cx + 30, cy: 108, rx: 5, ry: 16 },
        'left-hand': { cx: cx - 32, cy: 135, rx: 5, ry: 10 },
        'right-hand': { cx: cx + 32, cy: 135, rx: 5, ry: 10 },
        'lower-back': { cx, cy: 88, rx: 16, ry: 18 },
        'left-hip': { cx: cx - 12, cy: 115, rx: 10, ry: 10 },
        'right-hip': { cx: cx + 12, cy: 115, rx: 10, ry: 10 },
        'left-thigh': { cx: cx - 10, cy: 142, rx: 8, ry: 22 },
        'right-thigh': { cx: cx + 10, cy: 142, rx: 8, ry: 22 },
        'left-knee': { cx: cx - 9, cy: 168, rx: 6, ry: 8 },
        'right-knee': { cx: cx + 9, cy: 168, rx: 6, ry: 8 },
        'left-leg': { cx: cx - 8, cy: 188, rx: 5, ry: 16 },
        'right-leg': { cx: cx + 8, cy: 188, rx: 5, ry: 16 },
        'left-foot': { cx: cx - 8, cy: 206, rx: 6, ry: 4 },
        'right-foot': { cx: cx + 8, cy: 206, rx: 6, ry: 4 },
      };
    }
  };

  const getFemaleZones = (isFront: boolean) => {
    const cx = 42;
    
    if (isFront) {
      return {
        head: { cx, cy: 18, rx: 9, ry: 11 },
        neck: { x: cx - 4, y: 29, width: 8, height: 9 },
        'left-shoulder': { cx: cx - 16, cy: 42, rx: 9, ry: 5 },
        'right-shoulder': { cx: cx + 16, cy: 42, rx: 9, ry: 5 },
        chest: { cx, cy: 55, rx: 16, ry: 12 },
        'left-arm': { cx: cx - 24, cy: 65, rx: 5, ry: 16 },
        'right-arm': { cx: cx + 24, cy: 65, rx: 5, ry: 16 },
        'left-forearm': { cx: cx - 26, cy: 100, rx: 4, ry: 14 },
        'right-forearm': { cx: cx + 26, cy: 100, rx: 4, ry: 14 },
        'left-hand': { cx: cx - 27, cy: 125, rx: 4, ry: 9 },
        'right-hand': { cx: cx + 27, cy: 125, rx: 4, ry: 9 },
        abdomen: { cx, cy: 75, rx: 12, ry: 12 },
        pelvis: { cx, cy: 98, rx: 14, ry: 12 },
        'left-hip': { cx: cx - 12, cy: 108, rx: 9, ry: 9 },
        'right-hip': { cx: cx + 12, cy: 108, rx: 9, ry: 9 },
        'left-thigh': { cx: cx - 9, cy: 138, rx: 8, ry: 24 },
        'right-thigh': { cx: cx + 9, cy: 138, rx: 8, ry: 24 },
        'left-knee': { cx: cx - 8, cy: 168, rx: 5, ry: 7 },
        'right-knee': { cx: cx + 8, cy: 168, rx: 5, ry: 7 },
        'left-leg': { cx: cx - 7, cy: 188, rx: 4, ry: 16 },
        'right-leg': { cx: cx + 7, cy: 188, rx: 4, ry: 16 },
        'left-foot': { cx: cx - 7, cy: 206, rx: 5, ry: 4 },
        'right-foot': { cx: cx + 7, cy: 206, rx: 5, ry: 4 },
      };
    } else {
      return {
        head: { cx, cy: 18, rx: 9, ry: 11 },
        neck: { x: cx - 4, y: 29, width: 8, height: 9 },
        'left-shoulder': { cx: cx - 16, cy: 42, rx: 9, ry: 5 },
        'right-shoulder': { cx: cx + 16, cy: 42, rx: 9, ry: 5 },
        'upper-back': { cx, cy: 55, rx: 16, ry: 12 },
        'left-arm': { cx: cx - 24, cy: 65, rx: 5, ry: 16 },
        'right-arm': { cx: cx + 24, cy: 65, rx: 5, ry: 16 },
        'left-forearm': { cx: cx - 26, cy: 100, rx: 4, ry: 14 },
        'right-forearm': { cx: cx + 26, cy: 100, rx: 4, ry: 14 },
        'left-hand': { cx: cx - 27, cy: 125, rx: 4, ry: 9 },
        'right-hand': { cx: cx + 27, cy: 125, rx: 4, ry: 9 },
        'lower-back': { cx, cy: 82, rx: 14, ry: 16 },
        'left-hip': { cx: cx - 12, cy: 108, rx: 10, ry: 10 },
        'right-hip': { cx: cx + 12, cy: 108, rx: 10, ry: 10 },
        'left-thigh': { cx: cx - 9, cy: 140, rx: 8, ry: 24 },
        'right-thigh': { cx: cx + 9, cy: 140, rx: 8, ry: 24 },
        'left-knee': { cx: cx - 8, cy: 168, rx: 5, ry: 7 },
        'right-knee': { cx: cx + 8, cy: 168, rx: 5, ry: 7 },
        'left-leg': { cx: cx - 7, cy: 188, rx: 4, ry: 16 },
        'right-leg': { cx: cx + 7, cy: 188, rx: 4, ry: 16 },
        'left-foot': { cx: cx - 7, cy: 206, rx: 5, ry: 4 },
        'right-foot': { cx: cx + 7, cy: 206, rx: 5, ry: 4 },
      };
    }
  };

  const isFront = view === 'front';
  const zones = gender === 'male' ? getMaleZones(isFront) : getFemaleZones(isFront);
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
          rx={2}
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
      {/* Background image - full image, viewBox crops it */}
      <image
        href={bodyReference}
        x="0"
        y="0"
        width="550"
        height="210"
        preserveAspectRatio="xMinYMin slice"
      />
      
      {/* Clickable zones overlay */}
      {allZones.map(renderZone)}
    </svg>
  );
}
