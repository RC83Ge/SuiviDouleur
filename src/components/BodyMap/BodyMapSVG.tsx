import React from 'react';
import { Gender, BodyView, BodyZone } from '@/types/pain';
import { cn } from '@/lib/utils';

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
    return `hsl(var(--pain-${intensity}) / 0.4)`;
  }
  return 'hsl(var(--zone-selected) / 0.4)';
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

  const strokeColor = 'hsl(var(--foreground) / 0.7)';
  const strokeWidth = '1.2';
  const detailStrokeWidth = '0.6';

  // Front view - clean line art style
  const FrontView = () => (
    <>
      {/* Body outline - single continuous path for realistic silhouette */}
      <g className="body-outline pointer-events-none">
        {/* Hair */}
        <path
          d="M 100 5 
             C 75 5 62 15 60 35 
             C 58 25 65 10 100 8 
             C 135 10 142 25 140 35 
             C 138 15 125 5 100 5 Z"
          fill="hsl(var(--foreground) / 0.85)"
          stroke={strokeColor}
          strokeWidth="0.5"
        />
        
        {/* Head outline */}
        <ellipse
          cx="100" cy="42"
          rx="32" ry="38"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Ears */}
        <ellipse cx="67" cy="45" rx="4" ry="8" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <ellipse cx="133" cy="45" rx="4" ry="8" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Face details */}
        <g opacity="0.6">
          {/* Eyebrows */}
          <path d="M 82 32 Q 88 30 94 32" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
          <path d="M 106 32 Q 112 30 118 32" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
          {/* Eyes */}
          <ellipse cx="88" cy="38" rx="4" ry="2.5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
          <ellipse cx="112" cy="38" rx="4" ry="2.5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
          <circle cx="88" cy="38" r="1.5" fill="hsl(var(--foreground) / 0.6)" />
          <circle cx="112" cy="38" r="1.5" fill="hsl(var(--foreground) / 0.6)" />
          {/* Nose */}
          <path d="M 100 42 L 100 52 M 95 52 Q 100 55 105 52" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
          {/* Mouth */}
          <path d="M 92 60 Q 100 63 108 60" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        </g>
        
        {/* Neck */}
        <path
          d="M 90 78 L 90 95 M 110 78 L 110 95"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Shoulders and arms outline */}
        <path
          d="M 90 95 
             Q 75 95 58 102 
             Q 42 110 38 125 
             L 35 160 
             Q 32 180 28 200 
             L 22 260 
             Q 20 272 18 280 
             L 12 305 
             Q 10 318 25 320 
             Q 35 322 40 315 
             L 42 280 
             Q 44 260 48 240"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 110 95 
             Q 125 95 142 102 
             Q 158 110 162 125 
             L 165 160 
             Q 168 180 172 200 
             L 178 260 
             Q 180 272 182 280 
             L 188 305 
             Q 190 318 175 320 
             Q 165 322 160 315 
             L 158 280 
             Q 156 260 152 240"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso outline */}
        <path
          d="M 58 102 
             Q 55 110 54 120 
             L 52 160 
             Q 52 180 55 200 
             L 58 230 
             Q 60 250 62 265 
             L 50 290"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 142 102 
             Q 145 110 146 120 
             L 148 160 
             Q 148 180 145 200 
             L 142 230 
             Q 140 250 138 265 
             L 150 290"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis/groin area */}
        <path
          d="M 62 265 
             Q 75 270 88 275 
             L 88 290 
             Q 88 300 82 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 138 265 
             Q 125 270 112 275 
             L 112 290 
             Q 112 300 118 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 88 275 Q 100 280 112 275"
          fill="none"
          stroke={strokeColor}
          strokeWidth={detailStrokeWidth}
        />
        
        {/* Legs outline */}
        <path
          d="M 50 290 
             L 48 340 
             Q 46 380 48 420 
             Q 48 460 50 500 
             L 52 540 
             Q 52 555 48 565 
             L 40 580 
             Q 35 588 45 590 
             L 80 590 
             Q 85 588 82 580 
             L 78 570 
             Q 76 560 78 545 
             L 82 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 150 290 
             L 152 340 
             Q 154 380 152 420 
             Q 152 460 150 500 
             L 148 540 
             Q 148 555 152 565 
             L 160 580 
             Q 165 588 155 590 
             L 120 590 
             Q 115 588 118 580 
             L 122 570 
             Q 124 560 122 545 
             L 118 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Anatomical details */}
      <g className="anatomical-details pointer-events-none" opacity="0.35">
        {/* Clavicle */}
        <path d="M 58 102 Q 80 98 100 100 Q 120 98 142 102" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Pectoral muscles */}
        <path d="M 60 115 Q 75 125 85 120" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 140 115 Q 125 125 115 120" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Nipples */}
        <circle cx="72" cy="130" r="2" fill="none" stroke={strokeColor} strokeWidth="0.5" />
        <circle cx="128" cy="130" r="2" fill="none" stroke={strokeColor} strokeWidth="0.5" />
        
        {/* Sternum */}
        <path d="M 100 105 L 100 155" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ribcage hints */}
        <path d="M 62 145 Q 80 150 100 148" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        <path d="M 138 145 Q 120 150 100 148" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        
        {/* Navel */}
        <ellipse cx="100" cy="200" rx="3" ry="4" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Abs definition */}
        <path d="M 100 165 L 100 230" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 85 175 L 115 175" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        <path d="M 83 192 L 117 192" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        <path d="M 82 210 L 118 210" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        
        {/* Hip crease */}
        <path d="M 62 250 Q 75 270 85 280" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 138 250 Q 125 270 115 280" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow crease */}
        <path d="M 30 195 Q 35 200 40 195" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 160 195 Q 165 200 170 195" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Wrist lines */}
        <path d="M 20 268 L 38 268" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 162 268 L 180 268" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Knee caps */}
        <ellipse cx="65" cy="410" rx="10" ry="12" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <ellipse cx="135" cy="410" rx="10" ry="12" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Shin muscle */}
        <path d="M 58 430 L 55 520" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 142 430 L 145 520" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle bones */}
        <circle cx="52" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="78" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="122" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="148" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <path
        d="M 68 5 C 130 5 135 80 68 80 C 65 80 68 5 68 5 Z"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="85" y="78" width="30" height="20" rx="5"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 58 98 Q 70 95 85 98 L 65 125 L 48 118 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 142 98 Q 130 95 115 98 L 135 125 L 152 118 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 55 115 L 145 115 L 145 165 L 55 165 Z"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <path d="M 38 120 L 55 120 L 50 195 L 28 195 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 162 120 L 145 120 L 150 195 L 172 195 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 28 195 L 50 195 L 42 270 L 18 270 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 172 195 L 150 195 L 158 270 L 182 270 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 18 270 L 42 270 L 35 320 L 10 320 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 182 270 L 158 270 L 165 320 L 190 320 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 55 165 L 145 165 L 142 235 L 58 235 Z"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <path d="M 58 235 L 142 235 L 138 275 L 62 275 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 50 240 L 62 240 L 58 295 L 45 295 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 150 240 L 138 240 L 142 295 L 155 295 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 45 290 L 85 290 L 82 395 L 48 395 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 155 290 L 115 290 L 118 395 L 152 395 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 48 395 L 82 395 L 80 430 L 50 430 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 152 395 L 118 395 L 120 430 L 150 430 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 50 430 L 80 430 L 78 555 L 52 555 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 150 430 L 120 430 L 122 555 L 148 555 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 40 555 L 85 555 L 85 595 L 40 595 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 160 555 L 115 555 L 115 595 L 160 595 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Back view - clean line art style
  const BackView = () => (
    <>
      {/* Body outline */}
      <g className="body-outline pointer-events-none">
        {/* Hair (back) */}
        <path
          d="M 100 5 
             C 70 5 58 20 58 40 
             L 60 50 
             Q 65 45 70 48 
             L 70 35 
             Q 75 12 100 10 
             Q 125 12 130 35 
             L 130 48 
             Q 135 45 140 50 
             L 142 40 
             C 142 20 130 5 100 5 Z"
          fill="hsl(var(--foreground) / 0.85)"
          stroke={strokeColor}
          strokeWidth="0.5"
        />
        
        {/* Head outline */}
        <ellipse
          cx="100" cy="42"
          rx="32" ry="38"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Ears */}
        <ellipse cx="67" cy="45" rx="4" ry="8" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <ellipse cx="133" cy="45" rx="4" ry="8" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Neck */}
        <path
          d="M 90 78 L 90 95 M 110 78 L 110 95"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Shoulders and arms outline */}
        <path
          d="M 90 95 
             Q 75 95 58 102 
             Q 42 110 38 125 
             L 35 160 
             Q 32 180 28 200 
             L 22 260 
             Q 20 272 18 280 
             L 12 305 
             Q 10 318 25 320 
             Q 35 322 40 315 
             L 42 280 
             Q 44 260 48 240"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 110 95 
             Q 125 95 142 102 
             Q 158 110 162 125 
             L 165 160 
             Q 168 180 172 200 
             L 178 260 
             Q 180 272 182 280 
             L 188 305 
             Q 190 318 175 320 
             Q 165 322 160 315 
             L 158 280 
             Q 156 260 152 240"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso outline */}
        <path
          d="M 58 102 
             Q 55 110 54 120 
             L 52 160 
             Q 52 180 55 200 
             L 58 230 
             Q 60 250 62 265 
             L 50 290"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 142 102 
             Q 145 110 146 120 
             L 148 160 
             Q 148 180 145 200 
             L 142 230 
             Q 140 250 138 265 
             L 150 290"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Buttocks */}
        <path
          d="M 62 265 
             Q 75 268 88 272 
             L 88 295 
             Q 75 298 70 302 
             L 65 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 138 265 
             Q 125 268 112 272 
             L 112 295 
             Q 125 298 130 302 
             L 135 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 88 272 Q 100 275 112 272"
          fill="none"
          stroke={strokeColor}
          strokeWidth={detailStrokeWidth}
        />
        <path
          d="M 88 295 Q 100 300 112 295"
          fill="none"
          stroke={strokeColor}
          strokeWidth={detailStrokeWidth}
        />
        
        {/* Legs outline */}
        <path
          d="M 50 290 
             L 48 340 
             Q 46 380 48 420 
             Q 48 460 50 500 
             L 52 540 
             Q 52 555 48 565 
             L 40 580 
             Q 35 588 45 590 
             L 80 590 
             Q 85 588 82 580 
             L 78 570 
             Q 76 560 78 545 
             L 82 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 150 290 
             L 152 340 
             Q 154 380 152 420 
             Q 152 460 150 500 
             L 148 540 
             Q 148 555 152 565 
             L 160 580 
             Q 165 588 155 590 
             L 120 590 
             Q 115 588 118 580 
             L 122 570 
             Q 124 560 122 545 
             L 118 310"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Anatomical details */}
      <g className="anatomical-details pointer-events-none" opacity="0.35">
        {/* Spine */}
        <path d="M 100 80 L 100 240" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Trapezius */}
        <path d="M 90 95 Q 85 100 75 105" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 110 95 Q 115 100 125 105" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Scapula (shoulder blades) */}
        <path d="M 70 110 Q 75 130 80 145 L 85 140 Q 82 125 78 110 Z" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 130 110 Q 125 130 120 145 L 115 140 Q 118 125 122 110 Z" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Lower back muscles */}
        <path d="M 92 180 L 92 235" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 108 180 L 108 235" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Latissimus dorsi hints */}
        <path d="M 60 130 Q 68 160 72 195" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        <path d="M 140 130 Q 132 160 128 195" fill="none" stroke={strokeColor} strokeWidth="0.4" />
        
        {/* Gluteal crease */}
        <path d="M 70 300 Q 85 308 100 310 Q 115 308 130 300" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow */}
        <circle cx="35" cy="195" r="6" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="165" cy="195" r="6" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Wrist lines */}
        <path d="M 20 268 L 38 268" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 162 268 L 180 268" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Back of knee */}
        <path d="M 55 405 Q 65 415 78 405" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 122 405 Q 135 415 145 405" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Calf muscles */}
        <path d="M 58 430 Q 55 470 55 510" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 75 430 Q 78 470 78 510" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 125 430 Q 122 470 122 510" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 142 430 Q 145 470 145 510" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Achilles tendon */}
        <path d="M 65 530 L 65 565" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 135 530 L 135 565" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle bones */}
        <circle cx="52" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="78" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="122" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <circle cx="148" cy="555" r="5" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        
        {/* Heel */}
        <path d="M 58 575 Q 65 582 72 575" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
        <path d="M 128 575 Q 135 582 142 575" fill="none" stroke={strokeColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <path
        d="M 68 5 C 130 5 135 80 68 80 C 65 80 68 5 68 5 Z"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="85" y="78" width="30" height="20" rx="5"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 58 98 Q 70 95 85 98 L 65 125 L 48 118 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 142 98 Q 130 95 115 98 L 135 125 L 152 118 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 55 98 L 145 98 L 145 165 L 55 165 Z"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <path d="M 55 165 L 145 165 L 142 235 L 58 235 Z"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <path d="M 38 120 L 55 120 L 50 195 L 28 195 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 162 120 L 145 120 L 150 195 L 172 195 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 28 195 L 50 195 L 42 270 L 18 270 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 172 195 L 150 195 L 158 270 L 182 270 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 18 270 L 42 270 L 35 320 L 10 320 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 182 270 L 158 270 L 165 320 L 190 320 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 58 235 L 142 235 L 138 280 L 62 280 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 50 240 L 62 240 L 58 295 L 45 295 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 150 240 L 138 240 L 142 295 L 155 295 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 45 290 L 85 290 L 82 395 L 48 395 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 155 290 L 115 290 L 118 395 L 152 395 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 48 395 L 82 395 L 80 430 L 50 430 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 152 395 L 118 395 L 120 430 L 150 430 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 50 430 L 80 430 L 78 555 L 52 555 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 150 430 L 120 430 L 122 555 L 148 555 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 40 555 L 85 555 L 85 595 L 40 595 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 160 555 L 115 555 L 115 595 L 160 595 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 200 600"
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      <defs>
        <style>
          {`
            .body-zone {
              stroke: transparent;
              stroke-width: 1;
            }
            .body-zone:hover {
              stroke: hsl(var(--primary));
              stroke-width: 2;
            }
            .body-zone.selected {
              stroke: hsl(var(--primary));
              stroke-width: 2;
            }
          `}
        </style>
      </defs>
      {view === 'front' ? <FrontView /> : <BackView />}
    </svg>
  );
}
