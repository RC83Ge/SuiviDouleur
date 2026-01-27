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
    return `hsl(var(--pain-${intensity}) / 0.5)`;
  }
  return 'hsl(var(--zone-selected) / 0.5)';
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
    selectedZones.includes(zone) && 'selected'
  );

  // Colors
  const skinColor = '#E8C4A0';
  const strokeColor = '#A0785A';
  const muscleLineColor = '#C9A07A';
  const strokeWidth = '1.5';
  const detailStrokeWidth = '0.8';

  // Male Front View
  const MaleFrontView = () => (
    <>
      {/* Body silhouette with skin fill */}
      <g className="body-silhouette pointer-events-none">
        {/* Head - simple oval, no face */}
        <ellipse cx="100" cy="40" rx="28" ry="32" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 88 68 L 88 90 L 112 90 L 112 68"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso - broader shoulders for male */}
        <path
          d="M 88 90 
             Q 70 90 50 100 
             Q 38 108 35 125 
             L 35 130 
             L 45 130 
             Q 50 115 55 110 
             L 55 160 
             Q 52 180 52 200 
             L 55 230 
             Q 58 250 62 265 
             L 100 265 
             L 138 265 
             Q 142 250 145 230 
             L 148 200 
             Q 148 180 145 160 
             L 145 110 
             Q 150 115 155 130 
             L 165 130 
             L 165 125 
             Q 162 108 150 100 
             Q 130 90 112 90 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 35 130 
             Q 30 145 28 165 
             L 25 200 
             Q 22 230 20 260 
             L 18 285 
             Q 16 300 18 310 
             Q 22 325 32 325 
             Q 42 325 45 310 
             L 48 285 
             Q 50 260 52 235 
             L 55 200 
             Q 52 165 50 140 
             L 45 130 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 165 130 
             Q 170 145 172 165 
             L 175 200 
             Q 178 230 180 260 
             L 182 285 
             Q 184 300 182 310 
             Q 178 325 168 325 
             Q 158 325 155 310 
             L 152 285 
             Q 150 260 148 235 
             L 145 200 
             Q 148 165 150 140 
             L 155 130 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis and groin area */}
        <path
          d="M 62 265 
             Q 70 270 80 275 
             L 80 290 
             L 65 290 
             L 62 265 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 138 265 
             Q 130 270 120 275 
             L 120 290 
             L 135 290 
             L 138 265 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 80 275 Q 100 280 120 275 L 120 290 L 80 290 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg */}
        <path
          d="M 65 290 
             L 80 290 
             L 82 350 
             Q 84 400 82 420 
             Q 80 460 78 500 
             L 76 540 
             Q 74 555 72 565 
             L 45 565 
             Q 48 555 50 540 
             L 52 500 
             Q 54 460 56 420 
             Q 58 380 60 340 
             L 65 290 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 290 
             L 120 290 
             L 118 350 
             Q 116 400 118 420 
             Q 120 460 122 500 
             L 124 540 
             Q 126 555 128 565 
             L 155 565 
             Q 152 555 150 540 
             L 148 500 
             Q 146 460 144 420 
             Q 142 380 140 340 
             L 135 290 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 45 565 L 72 565 L 75 575 Q 78 590 70 595 L 42 595 Q 35 590 38 575 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 155 565 L 128 565 L 125 575 Q 122 590 130 595 L 158 595 Q 165 590 162 575 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Anatomical muscle lines */}
      <g className="muscle-lines pointer-events-none" opacity="0.6">
        {/* Neck muscles */}
        <path d="M 92 75 L 90 88" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 108 75 L 110 88" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Clavicle */}
        <path d="M 55 105 Q 78 100 100 102 Q 122 100 145 105" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Pectoral muscles */}
        <path d="M 60 115 Q 75 128 88 122" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 140 115 Q 125 128 112 122" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 62 130 Q 78 142 92 135" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 138 130 Q 122 142 108 135" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Sternum */}
        <path d="M 100 105 L 100 155" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Abs - 6 pack */}
        <path d="M 100 160 L 100 250" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 85 168 L 115 168" fill="none" stroke={muscleLineColor} strokeWidth="0.6" />
        <path d="M 83 188 L 117 188" fill="none" stroke={muscleLineColor} strokeWidth="0.6" />
        <path d="M 82 208 L 118 208" fill="none" stroke={muscleLineColor} strokeWidth="0.6" />
        <path d="M 80 228 L 120 228" fill="none" stroke={muscleLineColor} strokeWidth="0.6" />
        
        {/* Navel */}
        <ellipse cx="100" cy="200" rx="3" ry="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Obliques */}
        <path d="M 58 150 Q 65 180 68 220" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        <path d="M 142 150 Q 135 180 132 220" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        
        {/* Hip crease */}
        <path d="M 62 250 Q 75 268 85 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 138 250 Q 125 268 115 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Arm muscles - deltoid */}
        <path d="M 42 125 Q 38 135 36 150" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 158 125 Q 162 135 164 150" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Bicep/tricep separation */}
        <path d="M 38 150 L 32 195" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 162 150 L 168 195" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow */}
        <path d="M 26 195 Q 32 200 38 195" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 174 195 Q 168 200 162 195" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Forearm muscles */}
        <path d="M 30 200 L 25 255" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        <path d="M 170 200 L 175 255" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        
        {/* Wrist */}
        <path d="M 20 275 L 42 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 180 275 L 158 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Thigh muscles - quadriceps */}
        <path d="M 68 295 L 70 380" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 78 295 L 80 380" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 132 295 L 130 380" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 122 295 L 120 380" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Knee */}
        <ellipse cx="72" cy="410" rx="10" ry="12" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <ellipse cx="128" cy="410" rx="10" ry="12" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Shin */}
        <path d="M 65 430 L 62 530" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 135 430 L 138 530" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle */}
        <circle cx="55" cy="555" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="145" cy="555" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <ellipse cx="100" cy="40" rx="28" ry="32"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="68" width="24" height="22" rx="3"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 50 95 Q 70 90 88 90 L 55 120 L 40 115 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 150 95 Q 130 90 112 90 L 145 120 L 160 115 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 55 110 L 145 110 L 145 160 L 55 160 Z"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <path d="M 35 125 L 52 125 L 50 200 L 25 200 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 165 125 L 148 125 L 150 200 L 175 200 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 25 200 L 50 200 L 45 280 L 18 280 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 175 200 L 150 200 L 155 280 L 182 280 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 18 280 L 45 280 L 40 325 L 15 325 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 182 280 L 155 280 L 160 325 L 185 325 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 55 160 L 145 160 L 145 240 L 55 240 Z"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <path d="M 55 240 L 145 240 L 138 270 L 62 270 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 52 230 L 62 230 L 65 295 L 52 295 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 148 230 L 138 230 L 135 295 L 148 295 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 55 290 L 85 290 L 84 395 L 56 395 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 145 290 L 115 290 L 116 395 L 144 395 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 56 395 L 84 395 L 82 430 L 58 430 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 144 395 L 116 395 L 118 430 L 142 430 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 58 430 L 82 430 L 78 560 L 50 560 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 142 430 L 118 430 L 122 560 L 150 560 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 42 560 L 78 560 L 78 598 L 42 598 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 158 560 L 122 560 L 122 598 L 158 598 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Female Front View - narrower shoulders, wider hips
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head */}
        <ellipse cx="100" cy="40" rx="26" ry="30" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck - slightly thinner */}
        <path
          d="M 90 66 L 90 88 L 110 88 L 110 66"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso - narrower shoulders, defined waist, wider hips */}
        <path
          d="M 90 88 
             Q 75 88 58 98 
             Q 48 105 45 118 
             L 45 125 
             L 52 125 
             Q 55 115 60 110 
             L 58 145 
             Q 55 165 58 185 
             Q 60 210 62 230 
             Q 58 250 55 265 
             L 100 270 
             L 145 265 
             Q 142 250 138 230 
             Q 140 210 142 185 
             Q 145 165 142 145 
             L 140 110 
             Q 145 115 148 125 
             L 155 125 
             L 155 118 
             Q 152 105 142 98 
             Q 125 88 110 88 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm - slimmer */}
        <path
          d="M 45 125 
             Q 40 140 38 160 
             L 35 195 
             Q 32 225 30 255 
             L 28 280 
             Q 26 295 28 305 
             Q 32 318 40 318 
             Q 48 318 50 305 
             L 52 280 
             Q 54 255 55 230 
             L 58 195 
             Q 55 160 54 140 
             L 52 125 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 155 125 
             Q 160 140 162 160 
             L 165 195 
             Q 168 225 170 255 
             L 172 280 
             Q 174 295 172 305 
             Q 168 318 160 318 
             Q 152 318 150 305 
             L 148 280 
             Q 146 255 145 230 
             L 142 195 
             Q 145 160 146 140 
             L 148 125 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis - wider for female */}
        <path
          d="M 55 265 
             Q 65 272 78 278 
             L 78 295 
             L 58 295 
             L 55 265 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 145 265 
             Q 135 272 122 278 
             L 122 295 
             L 142 295 
             L 145 265 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 78 278 Q 100 282 122 278 L 122 295 L 78 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg - longer, slimmer */}
        <path
          d="M 58 295 
             L 78 295 
             L 80 355 
             Q 82 405 80 425 
             Q 78 465 76 505 
             L 74 545 
             Q 72 558 70 568 
             L 48 568 
             Q 50 558 52 545 
             L 54 505 
             Q 56 465 58 425 
             Q 60 385 62 345 
             L 58 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 142 295 
             L 122 295 
             L 120 355 
             Q 118 405 120 425 
             Q 122 465 124 505 
             L 126 545 
             Q 128 558 130 568 
             L 152 568 
             Q 150 558 148 545 
             L 146 505 
             Q 144 465 142 425 
             Q 140 385 138 345 
             L 142 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 48 568 L 70 568 L 72 578 Q 75 592 68 597 L 45 597 Q 38 592 40 578 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 152 568 L 130 568 L 128 578 Q 125 592 132 597 L 155 597 Q 162 592 160 578 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Anatomical lines - female */}
      <g className="muscle-lines pointer-events-none" opacity="0.5">
        {/* Neck */}
        <path d="M 94 72 L 92 86" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 106 72 L 108 86" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Clavicle */}
        <path d="M 58 102 Q 80 98 100 100 Q 120 98 142 102" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Chest curves */}
        <path d="M 65 120 Q 78 135 88 125" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 135 120 Q 122 135 112 125" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Sternum hint */}
        <path d="M 100 105 L 100 145" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        
        {/* Waist curves */}
        <path d="M 58 160 Q 68 185 62 220" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 142 160 Q 132 185 138 220" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Navel */}
        <ellipse cx="100" cy="195" rx="2.5" ry="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Hip curves */}
        <path d="M 58 250 Q 72 270 82 280" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 142 250 Q 128 270 118 280" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Arm lines */}
        <path d="M 48 120 Q 44 130 42 145" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 152 120 Q 156 130 158 145" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow */}
        <path d="M 36 190 Q 42 195 48 190" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 164 190 Q 158 195 152 190" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Wrist */}
        <path d="M 30 270 L 48 270" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 170 270 L 152 270" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Thigh */}
        <path d="M 68 300 L 72 390" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 132 300 L 128 390" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Knee */}
        <ellipse cx="70" cy="415" rx="8" ry="10" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <ellipse cx="130" cy="415" rx="8" ry="10" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Shin */}
        <path d="M 64 435 L 60 535" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 136 435 L 140 535" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle */}
        <circle cx="55" cy="558" r="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="145" cy="558" r="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="40" rx="26" ry="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="90" y="66" width="20" height="22" rx="3"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 58 95 Q 75 88 90 88 L 62 115 L 48 110 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 142 95 Q 125 88 110 88 L 138 115 L 152 110 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 60 105 L 140 105 L 142 155 L 58 155 Z"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <path d="M 45 120 L 56 120 L 56 195 L 35 195 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 155 120 L 144 120 L 144 195 L 165 195 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 35 195 L 56 195 L 52 275 L 28 275 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 165 195 L 144 195 L 148 275 L 172 275 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 28 275 L 52 275 L 48 320 L 25 320 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 172 275 L 148 275 L 152 320 L 175 320 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 58 155 L 142 155 L 140 235 L 60 235 Z"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <path d="M 60 235 L 140 235 L 145 270 L 55 270 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 52 230 L 60 230 L 58 300 L 52 300 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 148 230 L 140 230 L 142 300 L 148 300 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 55 295 L 82 295 L 82 400 L 58 400 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 145 295 L 118 295 L 118 400 L 142 400 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 58 400 L 82 400 L 80 435 L 60 435 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 142 400 L 118 400 L 120 435 L 140 435 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 60 435 L 80 435 L 76 565 L 52 565 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 140 435 L 120 435 L 124 565 L 148 565 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 45 565 L 75 565 L 75 600 L 45 600 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 155 565 L 125 565 L 125 600 L 155 600 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Male Back View
  const MaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head */}
        <ellipse cx="100" cy="40" rx="28" ry="32" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path d="M 88 68 L 88 90 L 112 90 L 112 68" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Torso */}
        <path
          d="M 88 90 
             Q 70 90 50 100 
             Q 38 108 35 125 
             L 35 130 L 45 130 
             Q 50 115 55 110 
             L 55 160 Q 52 180 52 200 
             L 55 230 Q 58 250 62 265 
             L 100 265 L 138 265 
             Q 142 250 145 230 
             L 148 200 Q 148 180 145 160 
             L 145 110 Q 150 115 155 130 
             L 165 130 L 165 125 
             Q 162 108 150 100 
             Q 130 90 112 90 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 35 130 Q 30 145 28 165 L 25 200 Q 22 230 20 260 L 18 285 Q 16 300 18 310 Q 22 325 32 325 Q 42 325 45 310 L 48 285 Q 50 260 52 235 L 55 200 Q 52 165 50 140 L 45 130 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 165 130 Q 170 145 172 165 L 175 200 Q 178 230 180 260 L 182 285 Q 184 300 182 310 Q 178 325 168 325 Q 158 325 155 310 L 152 285 Q 150 260 148 235 L 145 200 Q 148 165 150 140 L 155 130 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Buttocks */}
        <path d="M 62 265 Q 70 270 80 275 L 80 305 Q 75 310 70 308 L 62 295 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M 138 265 Q 130 270 120 275 L 120 305 Q 125 310 130 308 L 138 295 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M 80 275 Q 100 280 120 275 L 120 305 Q 100 315 80 305 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 65 295 L 80 305 L 82 350 Q 84 400 82 420 Q 80 460 78 500 L 76 540 Q 74 555 72 565 L 45 565 Q 48 555 50 540 L 52 500 Q 54 460 56 420 Q 58 380 60 340 L 65 295 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 295 L 120 305 L 118 350 Q 116 400 118 420 Q 120 460 122 500 L 124 540 Q 126 555 128 565 L 155 565 Q 152 555 150 540 L 148 500 Q 146 460 144 420 Q 142 380 140 340 L 135 295 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path d="M 45 565 L 72 565 L 75 575 Q 78 590 70 595 L 42 595 Q 35 590 38 575 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <path d="M 155 565 L 128 565 L 125 575 Q 122 590 130 595 L 158 595 Q 165 590 162 575 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Back anatomical lines */}
      <g className="muscle-lines pointer-events-none" opacity="0.6">
        {/* Spine */}
        <path d="M 100 75 L 100 250" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Trapezius */}
        <path d="M 90 90 Q 80 95 70 105" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 110 90 Q 120 95 130 105" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Scapula */}
        <path d="M 65 115 Q 72 135 78 150 L 85 145 Q 80 130 75 115 Z" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 135 115 Q 128 135 122 150 L 115 145 Q 120 130 125 115 Z" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Latissimus */}
        <path d="M 58 140 Q 65 175 68 210" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        <path d="M 142 140 Q 135 175 132 210" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        
        {/* Lower back muscles */}
        <path d="M 92 185 L 92 245" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 108 185 L 108 245" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Gluteal line */}
        <path d="M 70 300 Q 85 312 100 315 Q 115 312 130 300" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow */}
        <circle cx="38" cy="195" r="6" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="162" cy="195" r="6" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Wrist */}
        <path d="M 20 275 L 42 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 180 275 L 158 275" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Hamstring */}
        <path d="M 68 320 L 70 395" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 78 320 L 80 395" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 132 320 L 130 395" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 122 320 L 120 395" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Back of knee */}
        <path d="M 62 408 Q 72 418 82 408" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 118 408 Q 128 418 138 408" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Calf */}
        <path d="M 60 435 Q 55 475 55 520" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 76 435 Q 80 475 78 520" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 140 435 Q 145 475 145 520" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 124 435 Q 120 475 122 520" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Achilles */}
        <path d="M 65 530 L 65 560" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 135 530 L 135 560" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle */}
        <circle cx="55" cy="555" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="145" cy="555" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="40" rx="28" ry="32"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="68" width="24" height="22" rx="3"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 50 95 Q 70 90 88 90 L 55 120 L 40 115 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 150 95 Q 130 90 112 90 L 145 120 L 160 115 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 55 100 L 145 100 L 145 165 L 55 165 Z"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <path d="M 55 165 L 145 165 L 142 240 L 58 240 Z"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <path d="M 35 125 L 52 125 L 50 200 L 25 200 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 165 125 L 148 125 L 150 200 L 175 200 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 25 200 L 50 200 L 45 280 L 18 280 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 175 200 L 150 200 L 155 280 L 182 280 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 18 280 L 45 280 L 40 325 L 15 325 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 182 280 L 155 280 L 160 325 L 185 325 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 58 240 L 142 240 L 138 280 L 62 280 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 52 230 L 62 230 L 65 300 L 52 300 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 148 230 L 138 230 L 135 300 L 148 300 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 55 295 L 85 295 L 84 400 L 56 400 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 145 295 L 115 295 L 116 400 L 144 400 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 56 400 L 84 400 L 82 435 L 58 435 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 144 400 L 116 400 L 118 435 L 142 435 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 58 435 L 82 435 L 78 565 L 50 565 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 142 435 L 118 435 L 122 565 L 150 565 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 42 565 L 78 565 L 78 598 L 42 598 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 158 565 L 122 565 L 122 598 L 158 598 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Female Back View
  const FemaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head */}
        <ellipse cx="100" cy="40" rx="26" ry="30" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path d="M 90 66 L 90 88 L 110 88 L 110 66" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Torso */}
        <path
          d="M 90 88 
             Q 75 88 58 98 Q 48 105 45 118 
             L 45 125 L 52 125 Q 55 115 60 110 
             L 58 145 Q 55 165 58 185 Q 60 210 62 230 Q 58 250 55 265 
             L 100 270 L 145 265 
             Q 142 250 138 230 Q 140 210 142 185 Q 145 165 142 145 
             L 140 110 Q 145 115 148 125 L 155 125 L 155 118 
             Q 152 105 142 98 Q 125 88 110 88 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 45 125 Q 40 140 38 160 L 35 195 Q 32 225 30 255 L 28 280 Q 26 295 28 305 Q 32 318 40 318 Q 48 318 50 305 L 52 280 Q 54 255 55 230 L 58 195 Q 55 160 54 140 L 52 125 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 155 125 Q 160 140 162 160 L 165 195 Q 168 225 170 255 L 172 280 Q 174 295 172 305 Q 168 318 160 318 Q 152 318 150 305 L 148 280 Q 146 255 145 230 L 142 195 Q 145 160 146 140 L 148 125 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Buttocks - wider for female */}
        <path d="M 55 265 Q 68 272 78 280 L 78 310 Q 70 318 62 312 L 55 295 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M 145 265 Q 132 272 122 280 L 122 310 Q 130 318 138 312 L 145 295 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M 78 280 Q 100 285 122 280 L 122 310 Q 100 320 78 310 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 58 300 L 78 310 L 80 355 Q 82 405 80 425 Q 78 465 76 505 L 74 545 Q 72 558 70 568 L 48 568 Q 50 558 52 545 L 54 505 Q 56 465 58 425 Q 60 385 62 345 L 58 300 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 142 300 L 122 310 L 120 355 Q 118 405 120 425 Q 122 465 124 505 L 126 545 Q 128 558 130 568 L 152 568 Q 150 558 148 545 L 146 505 Q 144 465 142 425 Q 140 385 138 345 L 142 300 Z"
          fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path d="M 48 568 L 70 568 L 72 578 Q 75 592 68 597 L 45 597 Q 38 592 40 578 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <path d="M 152 568 L 130 568 L 128 578 Q 125 592 132 597 L 155 597 Q 162 592 160 578 Z" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Back anatomical lines - female */}
      <g className="muscle-lines pointer-events-none" opacity="0.5">
        {/* Spine */}
        <path d="M 100 72 L 100 250" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Trapezius */}
        <path d="M 92 88 Q 82 95 72 102" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 108 88 Q 118 95 128 102" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Scapula - smaller */}
        <path d="M 68 112 Q 74 130 78 142 L 82 138 Q 78 125 74 112 Z" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 132 112 Q 126 130 122 142 L 118 138 Q 122 125 126 112 Z" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Waist curves */}
        <path d="M 58 155 Q 65 180 62 215" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 142 155 Q 135 180 138 215" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Lower back */}
        <path d="M 94 185 L 94 240" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        <path d="M 106 185 L 106 240" fill="none" stroke={muscleLineColor} strokeWidth="0.5" />
        
        {/* Gluteal line */}
        <path d="M 65 305 Q 82 318 100 320 Q 118 318 135 305" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Elbow */}
        <circle cx="42" cy="190" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="158" cy="190" r="5" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Wrist */}
        <path d="M 30 268 L 48 268" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 170 268 L 152 268" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Hamstring */}
        <path d="M 68 325 L 70 400" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 132 325 L 130 400" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Back of knee */}
        <path d="M 62 412 Q 72 420 80 412" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 120 412 Q 128 420 138 412" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Calf */}
        <path d="M 60 438 Q 56 478 56 525" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 140 438 Q 144 478 144 525" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Achilles */}
        <path d="M 64 532 L 64 562" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <path d="M 136 532 L 136 562" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        
        {/* Ankle */}
        <circle cx="55" cy="558" r="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
        <circle cx="145" cy="558" r="4" fill="none" stroke={muscleLineColor} strokeWidth={detailStrokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="40" rx="26" ry="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="90" y="66" width="20" height="22" rx="3"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <path d="M 58 95 Q 75 88 90 88 L 62 115 L 48 110 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <path d="M 142 95 Q 125 88 110 88 L 138 115 L 152 110 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <path d="M 58 98 L 142 98 L 142 160 L 58 160 Z"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <path d="M 58 160 L 142 160 L 140 235 L 60 235 Z"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <path d="M 45 118 L 56 118 L 56 195 L 38 195 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <path d="M 155 118 L 144 118 L 144 195 L 162 195 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <path d="M 38 195 L 56 195 L 52 272 L 30 272 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <path d="M 162 195 L 144 195 L 148 272 L 170 272 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <path d="M 30 272 L 52 272 L 48 320 L 28 320 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <path d="M 170 272 L 148 272 L 152 320 L 172 320 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <path d="M 60 235 L 140 235 L 145 275 L 55 275 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <path d="M 52 230 L 60 230 L 58 305 L 52 305 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <path d="M 148 230 L 140 230 L 142 305 L 148 305 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <path d="M 55 300 L 82 300 L 82 405 L 58 405 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <path d="M 145 300 L 118 300 L 118 405 L 142 405 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <path d="M 58 405 L 82 405 L 80 438 L 60 438 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <path d="M 142 405 L 118 405 L 120 438 L 140 438 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <path d="M 60 438 L 80 438 L 76 568 L 52 568 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <path d="M 140 438 L 120 438 L 124 568 L 148 568 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <path d="M 45 568 L 75 568 L 75 600 L 45 600 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <path d="M 155 568 L 125 568 L 125 600 L 155 600 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Choose the right view based on gender and view
  const renderBody = () => {
    if (gender === 'male') {
      return view === 'front' ? <MaleFrontView /> : <MaleBackView />;
    } else {
      return view === 'front' ? <FemaleFrontView /> : <FemaleBackView />;
    }
  };

  return (
    <svg
      viewBox="0 0 200 610"
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
      {renderBody()}
    </svg>
  );
}
