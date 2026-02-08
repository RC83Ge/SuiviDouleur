import React from 'react';
import { BodyView, BodyZone } from '@/types/pain';
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
  return 'hsl(var(--primary) / 0.4)';
};

export function BodyMapSVG({ 
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

  // Single image dimensions: 608x1080
  const viewBox = '0 0 608 1080';

  // Get the center X position (centered in single image)
  const cx = 304;

  // Zone positions - using absolute coordinates aligned to silhouettes
  const getZones = (isFront: boolean) => {
    const commonZones = {
      head: { cx, cy: 95, rx: 55, ry: 70 },
      neck: { x: cx - 25, y: 165, width: 50, height: 50 },
      'left-shoulder': { cx: cx - 95, cy: 245, rx: 55, ry: 35 },
      'right-shoulder': { cx: cx + 95, cy: 245, rx: 55, ry: 35 },
      'left-arm': { cx: cx - 145, cy: 380, rx: 35, ry: 100 },
      'right-arm': { cx: cx + 145, cy: 380, rx: 35, ry: 100 },
      'left-forearm': { cx: cx - 165, cy: 560, rx: 28, ry: 90 },
      'right-forearm': { cx: cx + 165, cy: 560, rx: 28, ry: 90 },
      'left-hand': { cx: cx - 175, cy: 700, rx: 28, ry: 50 },
      'right-hand': { cx: cx + 175, cy: 700, rx: 28, ry: 50 },
      'left-hip': { cx: cx - 65, cy: 620, rx: 55, ry: 50 },
      'right-hip': { cx: cx + 65, cy: 620, rx: 55, ry: 50 },
      'left-thigh': { cx: cx - 60, cy: 780, rx: 50, ry: 120 },
      'right-thigh': { cx: cx + 60, cy: 780, rx: 50, ry: 120 },
      'left-knee': { cx: cx - 55, cy: 920, rx: 38, ry: 45 },
      'right-knee': { cx: cx + 55, cy: 920, rx: 38, ry: 45 },
      'left-leg': { cx: cx - 50, cy: 1000, rx: 30, ry: 55 },
      'right-leg': { cx: cx + 50, cy: 1000, rx: 30, ry: 55 },
      'left-foot': { cx: cx - 50, cy: 1055, rx: 38, ry: 18 },
      'right-foot': { cx: cx + 50, cy: 1055, rx: 38, ry: 18 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 320, rx: 85, ry: 70 },
        abdomen: { cx, cy: 450, rx: 70, ry: 70 },
        pelvis: { cx, cy: 560, rx: 75, ry: 60 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 320, rx: 85, ry: 70 },
        'lower-back': { cx, cy: 480, rx: 75, ry: 100 },
      };
    }
  };

  const isFront = view === 'front';
  const zones = getZones(isFront);
  const bodyImage = isFront ? bodyFront : bodyBack;

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
        href={bodyImage}
        x="0"
        y="0"
        width="608"
        height="1080"
        preserveAspectRatio="xMidYMid meet"
      />
      
      {/* Clickable zones overlay */}
      {allZones.map(renderZone)}
    </svg>
  );
}
