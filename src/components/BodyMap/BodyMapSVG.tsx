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

  // Colors matching the reference image
  const skinColor = '#D4A574';
  const strokeColor = '#8B6914';
  const strokeWidth = '2';

  // Exact copy of reference body - Male Front
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head - round circle */}
        <circle cx="100" cy="45" r="30" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck - short wide */}
        <rect x="85" y="73" width="30" height="18" rx="8" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Body - main rounded torso shape */}
        <path
          d="M 55 90
             C 35 95, 28 115, 32 140
             L 38 140
             C 42 125, 50 115, 55 110
             L 55 220
             C 52 250, 55 275, 65 295
             L 135 295
             C 145 275, 148 250, 145 220
             L 145 110
             C 150 115, 158 125, 162 140
             L 168 140
             C 172 115, 165 95, 145 90
             C 135 88, 115 88, 100 88
             C 85 88, 65 88, 55 90 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 32 140
             C 28 160, 24 190, 22 220
             C 20 250, 18 280, 18 305
             C 18 320, 25 330, 35 330
             C 45 330, 50 320, 48 305
             C 46 280, 46 250, 48 220
             C 50 190, 50 160, 48 140
             L 38 140 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 168 140
             C 172 160, 176 190, 178 220
             C 180 250, 182 280, 182 305
             C 182 320, 175 330, 165 330
             C 155 330, 150 320, 152 305
             C 154 280, 154 250, 152 220
             C 150 190, 150 160, 152 140
             L 162 140 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Left hand - rounded */}
        <ellipse cx="33" cy="340" rx="16" ry="20" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right hand - rounded */}
        <ellipse cx="167" cy="340" rx="16" ry="20" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 65 295
             L 68 295
             C 65 330, 62 370, 60 410
             C 58 450, 56 490, 55 530
             C 54 560, 58 580, 65 590
             L 95 590
             C 98 580, 100 560, 98 530
             C 96 490, 94 450, 94 410
             C 94 370, 96 330, 100 295
             L 100 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 295
             L 132 295
             C 135 330, 138 370, 140 410
             C 142 450, 144 490, 145 530
             C 146 560, 142 580, 135 590
             L 105 590
             C 102 580, 100 560, 102 530
             C 104 490, 106 450, 106 410
             C 106 370, 104 330, 100 295
             L 100 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <ellipse cx="77" cy="605" rx="25" ry="15" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <ellipse cx="123" cy="605" rx="25" ry="15" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <circle cx="100" cy="45" r="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="85" y="73" width="30" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="42" cy="115" rx="18" ry="20"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="158" cy="115" rx="18" ry="20"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="140" rx="45" ry="35"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <ellipse cx="38" cy="180" rx="12" ry="35"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="162" cy="180" rx="12" ry="35"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="32" cy="260" rx="12" ry="45"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="168" cy="260" rx="12" ry="45"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="33" cy="340" rx="16" ry="20"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="167" cy="340" rx="16" ry="20"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="220" rx="42" ry="35"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <ellipse cx="100" cy="280" rx="35" ry="22"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="70" cy="275" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="130" cy="275" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="78" cy="360" rx="16" ry="55"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="122" cy="360" rx="16" ry="55"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="76" cy="435" rx="14" ry="20"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="124" cy="435" rx="14" ry="20"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="74" cy="520" rx="14" ry="60"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="126" cy="520" rx="14" ry="60"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="77" cy="605" rx="25" ry="15"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="123" cy="605" rx="25" ry="15"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Female Front View - slightly narrower shoulders, wider hips
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head - round circle */}
        <circle cx="100" cy="45" r="28" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck - short, slimmer */}
        <rect x="87" y="71" width="26" height="18" rx="8" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Body - narrower shoulders, wider hips */}
        <path
          d="M 60 88
             C 42 93, 35 112, 38 135
             L 44 135
             C 48 122, 55 114, 60 108
             L 58 175
             C 52 195, 48 220, 50 250
             C 52 275, 60 290, 70 300
             L 130 300
             C 140 290, 148 275, 150 250
             C 152 220, 148 195, 142 175
             L 140 108
             C 145 114, 152 122, 156 135
             L 162 135
             C 165 112, 158 93, 140 88
             C 130 86, 115 86, 100 86
             C 85 86, 70 86, 60 88 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 38 135
             C 34 155, 30 185, 28 215
             C 26 245, 24 275, 24 300
             C 24 315, 30 325, 40 325
             C 50 325, 54 315, 52 300
             C 50 275, 50 245, 52 215
             C 54 185, 54 155, 52 135
             L 44 135 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 162 135
             C 166 155, 170 185, 172 215
             C 174 245, 176 275, 176 300
             C 176 315, 170 325, 160 325
             C 150 325, 146 315, 148 300
             C 150 275, 150 245, 148 215
             C 146 185, 146 155, 148 135
             L 156 135 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Left hand */}
        <ellipse cx="38" cy="335" rx="15" ry="18" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right hand */}
        <ellipse cx="162" cy="335" rx="15" ry="18" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 70 300
             C 68 335, 65 375, 63 415
             C 61 455, 59 495, 58 535
             C 57 560, 60 578, 68 588
             L 96 588
             C 98 578, 100 560, 98 535
             C 96 495, 95 455, 95 415
             C 95 375, 96 335, 100 300
             L 100 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 130 300
             C 132 335, 135 375, 137 415
             C 139 455, 141 495, 142 535
             C 143 560, 140 578, 132 588
             L 104 588
             C 102 578, 100 560, 102 535
             C 104 495, 105 455, 105 415
             C 105 375, 104 335, 100 300
             L 100 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <ellipse cx="79" cy="603" rx="24" ry="14" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <ellipse cx="121" cy="603" rx="24" ry="14" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <circle cx="100" cy="45" r="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="87" y="71" width="26" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="48" cy="112" rx="16" ry="18"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="152" cy="112" rx="16" ry="18"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="140" rx="40" ry="32"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <ellipse cx="44" cy="175" rx="11" ry="32"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="156" cy="175" rx="11" ry="32"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="38" cy="255" rx="11" ry="42"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="162" cy="255" rx="11" ry="42"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="38" cy="335" rx="15" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="162" cy="335" rx="15" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="210" rx="40" ry="32"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <ellipse cx="100" cy="275" rx="38" ry="24"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="72" cy="280" rx="14" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="128" cy="280" rx="14" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="360" rx="16" ry="52"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="360" rx="16" ry="52"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="78" cy="430" rx="13" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="122" cy="430" rx="13" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="76" cy="515" rx="13" ry="58"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="124" cy="515" rx="13" ry="58"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="79" cy="603" rx="24" ry="14"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="121" cy="603" rx="24" ry="14"
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
        <circle cx="100" cy="45" r="30" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <rect x="85" y="73" width="30" height="18" rx="8" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Back torso */}
        <path
          d="M 55 90
             C 35 95, 28 115, 32 140
             L 38 140
             C 42 125, 50 115, 55 110
             L 55 220
             C 52 250, 55 275, 65 295
             L 135 295
             C 145 275, 148 250, 145 220
             L 145 110
             C 150 115, 158 125, 162 140
             L 168 140
             C 172 115, 165 95, 145 90
             C 135 88, 115 88, 100 88
             C 85 88, 65 88, 55 90 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 32 140
             C 28 160, 24 190, 22 220
             C 20 250, 18 280, 18 305
             C 18 320, 25 330, 35 330
             C 45 330, 50 320, 48 305
             C 46 280, 46 250, 48 220
             C 50 190, 50 160, 48 140
             L 38 140 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 168 140
             C 172 160, 176 190, 178 220
             C 180 250, 182 280, 182 305
             C 182 320, 175 330, 165 330
             C 155 330, 150 320, 152 305
             C 154 280, 154 250, 152 220
             C 150 190, 150 160, 152 140
             L 162 140 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Left hand */}
        <ellipse cx="33" cy="340" rx="16" ry="20" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right hand */}
        <ellipse cx="167" cy="340" rx="16" ry="20" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 65 295
             L 68 295
             C 65 330, 62 370, 60 410
             C 58 450, 56 490, 55 530
             C 54 560, 58 580, 65 590
             L 95 590
             C 98 580, 100 560, 98 530
             C 96 490, 94 450, 94 410
             C 94 370, 96 330, 100 295
             L 100 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 295
             L 132 295
             C 135 330, 138 370, 140 410
             C 142 450, 144 490, 145 530
             C 146 560, 142 580, 135 590
             L 105 590
             C 102 580, 100 560, 102 530
             C 104 490, 106 450, 106 410
             C 106 370, 104 330, 100 295
             L 100 295 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <ellipse cx="77" cy="605" rx="25" ry="15" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <ellipse cx="123" cy="605" rx="25" ry="15" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <circle cx="100" cy="45" r="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="85" y="73" width="30" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="42" cy="115" rx="18" ry="20"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="158" cy="115" rx="18" ry="20"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="150" rx="42" ry="40"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <ellipse cx="38" cy="180" rx="12" ry="35"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="162" cy="180" rx="12" ry="35"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="32" cy="260" rx="12" ry="45"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="168" cy="260" rx="12" ry="45"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="33" cy="340" rx="16" ry="20"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="167" cy="340" rx="16" ry="20"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="235" rx="40" ry="40"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <ellipse cx="70" cy="275" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="130" cy="275" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="78" cy="360" rx="16" ry="55"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="122" cy="360" rx="16" ry="55"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="76" cy="435" rx="14" ry="20"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="124" cy="435" rx="14" ry="20"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="74" cy="520" rx="14" ry="60"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="126" cy="520" rx="14" ry="60"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="77" cy="605" rx="25" ry="15"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="123" cy="605" rx="25" ry="15"
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
        <circle cx="100" cy="45" r="28" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <rect x="87" y="71" width="26" height="18" rx="8" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Back torso */}
        <path
          d="M 60 88
             C 42 93, 35 112, 38 135
             L 44 135
             C 48 122, 55 114, 60 108
             L 58 175
             C 52 195, 48 220, 50 250
             C 52 275, 60 290, 70 300
             L 130 300
             C 140 290, 148 275, 150 250
             C 152 220, 148 195, 142 175
             L 140 108
             C 145 114, 152 122, 156 135
             L 162 135
             C 165 112, 158 93, 140 88
             C 130 86, 115 86, 100 86
             C 85 86, 70 86, 60 88 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 38 135
             C 34 155, 30 185, 28 215
             C 26 245, 24 275, 24 300
             C 24 315, 30 325, 40 325
             C 50 325, 54 315, 52 300
             C 50 275, 50 245, 52 215
             C 54 185, 54 155, 52 135
             L 44 135 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 162 135
             C 166 155, 170 185, 172 215
             C 174 245, 176 275, 176 300
             C 176 315, 170 325, 160 325
             C 150 325, 146 315, 148 300
             C 150 275, 150 245, 148 215
             C 146 185, 146 155, 148 135
             L 156 135 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Left hand */}
        <ellipse cx="38" cy="335" rx="15" ry="18" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right hand */}
        <ellipse cx="162" cy="335" rx="15" ry="18" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Left leg */}
        <path
          d="M 70 300
             C 68 335, 65 375, 63 415
             C 61 455, 59 495, 58 535
             C 57 560, 60 578, 68 588
             L 96 588
             C 98 578, 100 560, 98 535
             C 96 495, 95 455, 95 415
             C 95 375, 96 335, 100 300
             L 100 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 130 300
             C 132 335, 135 375, 137 415
             C 139 455, 141 495, 142 535
             C 143 560, 140 578, 132 588
             L 104 588
             C 102 578, 100 560, 102 535
             C 104 495, 105 455, 105 415
             C 105 375, 104 335, 100 300
             L 100 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <ellipse cx="79" cy="603" rx="24" ry="14" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Right foot */}
        <ellipse cx="121" cy="603" rx="24" ry="14" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
      
      {/* Clickable zones */}
      <circle cx="100" cy="45" r="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="87" y="71" width="26" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="48" cy="112" rx="16" ry="18"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="152" cy="112" rx="16" ry="18"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="148" rx="38" ry="38"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <ellipse cx="44" cy="175" rx="11" ry="32"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="156" cy="175" rx="11" ry="32"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="38" cy="255" rx="11" ry="42"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="162" cy="255" rx="11" ry="42"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="38" cy="335" rx="15" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="162" cy="335" rx="15" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="230" rx="40" ry="38"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <ellipse cx="72" cy="280" rx="14" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="128" cy="280" rx="14" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="360" rx="16" ry="52"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="360" rx="16" ry="52"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="78" cy="430" rx="13" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="122" cy="430" rx="13" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="76" cy="515" rx="13" ry="58"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="124" cy="515" rx="13" ry="58"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="79" cy="603" rx="24" ry="14"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="121" cy="603" rx="24" ry="14"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  const renderBody = () => {
    if (gender === 'male') {
      return view === 'front' ? <MaleFrontView /> : <MaleBackView />;
    } else {
      return view === 'front' ? <FemaleFrontView /> : <FemaleBackView />;
    }
  };

  return (
    <svg
      viewBox="0 0 200 630"
      className="w-full h-auto"
      style={{ maxHeight: '450px' }}
    >
      {renderBody()}
    </svg>
  );
}
