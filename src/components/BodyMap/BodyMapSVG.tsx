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

  // Zone positions - adjusted for 608x1080 single body images
  const getZones = (isFront: boolean) => {
    const commonZones = {
      head: { cx, cy: 75, rx: 45, ry: 55 },
      neck: { x: cx - 20, y: 130, width: 40, height: 35 },
      'left-shoulder': { cx: cx - 70, cy: 185, rx: 40, ry: 22 },
      'right-shoulder': { cx: cx + 70, cy: 185, rx: 40, ry: 22 },
      'left-arm': { cx: cx - 105, cy: 290, rx: 22, ry: 60 },
      'right-arm': { cx: cx + 105, cy: 290, rx: 22, ry: 60 },
      'left-forearm': { cx: cx - 118, cy: 420, rx: 18, ry: 55 },
      'right-forearm': { cx: cx + 118, cy: 420, rx: 18, ry: 55 },
      'left-hand': { cx: cx - 125, cy: 520, rx: 18, ry: 32 },
      'right-hand': { cx: cx + 125, cy: 520, rx: 18, ry: 32 },
      'left-hip': { cx: cx - 50, cy: 490, rx: 40, ry: 35 },
      'right-hip': { cx: cx + 50, cy: 490, rx: 40, ry: 35 },
      'left-thigh': { cx: cx - 45, cy: 610, rx: 35, ry: 80 },
      'right-thigh': { cx: cx + 45, cy: 610, rx: 35, ry: 80 },
      'left-knee': { cx: cx - 42, cy: 720, rx: 25, ry: 30 },
      'right-knee': { cx: cx + 42, cy: 720, rx: 25, ry: 30 },
      'left-leg': { cx: cx - 38, cy: 820, rx: 18, ry: 60 },
      'right-leg': { cx: cx + 38, cy: 820, rx: 18, ry: 60 },
      'left-foot': { cx: cx - 38, cy: 920, rx: 25, ry: 15 },
      'right-foot': { cx: cx + 38, cy: 920, rx: 25, ry: 15 },
    };
    
    if (isFront) {
      return {
        ...commonZones,
        chest: { cx, cy: 260, rx: 70, ry: 55 },
        abdomen: { cx, cy: 360, rx: 55, ry: 55 },
        pelvis: { cx, cy: 450, rx: 60, ry: 45 },
      };
    } else {
      return {
        ...commonZones,
        'upper-back': { cx, cy: 260, rx: 70, ry: 55 },
        'lower-back': { cx, cy: 390, rx: 60, ry: 80 },
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
