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

  // Colors - skin tone with soft outline
  const skinColor = '#E8C4A0';
  const strokeColor = '#A0785A';
  const strokeWidth = '1.5';

  // Smooth rounded body silhouette - Male Front
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head - smooth oval */}
        <ellipse cx="100" cy="42" rx="24" ry="28" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 88 68 Q 88 80 88 88 L 112 88 Q 112 80 112 68"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso - smooth rounded shape */}
        <path
          d="M 88 88 
             C 70 88, 52 95, 42 110
             C 38 118, 40 125, 45 130
             L 48 130
             C 52 120, 55 115, 58 112
             L 58 165
             C 55 190, 55 215, 58 240
             C 60 255, 65 268, 70 275
             L 100 280
             L 130 275
             C 135 268, 140 255, 142 240
             C 145 215, 145 190, 142 165
             L 142 112
             C 145 115, 148 120, 152 130
             L 155 130
             C 160 125, 162 118, 158 110
             C 148 95, 130 88, 112 88 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm - smooth rounded */}
        <path
          d="M 42 110
             C 35 115, 32 130, 30 150
             C 28 175, 26 200, 25 225
             C 24 250, 22 275, 22 295
             C 22 310, 28 320, 35 320
             C 42 320, 48 310, 48 295
             C 48 275, 50 250, 52 225
             C 54 200, 54 175, 52 150
             C 50 130, 48 118, 45 130"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm - smooth rounded */}
        <path
          d="M 158 110
             C 165 115, 168 130, 170 150
             C 172 175, 174 200, 175 225
             C 176 250, 178 275, 178 295
             C 178 310, 172 320, 165 320
             C 158 320, 152 310, 152 295
             C 152 275, 150 250, 148 225
             C 146 200, 146 175, 148 150
             C 150 130, 152 118, 155 130"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis connection */}
        <path
          d="M 70 275 
             C 75 280, 85 285, 100 288
             C 115 285, 125 280, 130 275
             L 130 300
             L 70 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg - smooth rounded */}
        <path
          d="M 70 300
             C 68 330, 68 360, 70 390
             C 72 420, 72 450, 70 480
             C 68 510, 66 540, 65 560
             C 64 575, 68 585, 75 585
             L 90 585
             C 92 575, 90 565, 88 555
             C 86 535, 86 505, 88 475
             C 90 445, 92 415, 92 385
             C 92 355, 92 325, 92 300
             L 70 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg - smooth rounded */}
        <path
          d="M 130 300
             C 132 330, 132 360, 130 390
             C 128 420, 128 450, 130 480
             C 132 510, 134 540, 135 560
             C 136 575, 132 585, 125 585
             L 110 585
             C 108 575, 110 565, 112 555
             C 114 535, 114 505, 112 475
             C 110 445, 108 415, 108 385
             C 108 355, 108 325, 108 300
             L 130 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 65 560 C 60 565, 55 575, 55 585 C 55 595, 65 600, 80 600 L 90 600 C 92 595, 92 590, 90 585 L 75 585 C 72 580, 68 570, 65 560 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 135 560 C 140 565, 145 575, 145 585 C 145 595, 135 600, 120 600 L 110 600 C 108 595, 108 590, 110 585 L 125 585 C 128 580, 132 570, 135 560 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <ellipse cx="100" cy="42" rx="24" ry="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="68" width="24" height="20" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="55" cy="105" rx="20" ry="15"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="145" cy="105" rx="20" ry="15"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="140" rx="40" ry="30"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <ellipse cx="40" cy="160" rx="12" ry="35"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="160" cy="160" rx="12" ry="35"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="35" cy="245" rx="10" ry="40"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="165" cy="245" rx="10" ry="40"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="35" cy="305" rx="10" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="165" cy="305" rx="10" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="210" rx="38" ry="35"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <ellipse cx="100" cy="270" rx="32" ry="20"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="68" cy="265" rx="10" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="132" cy="265" rx="10" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="350" rx="14" ry="50"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="350" rx="14" ry="50"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="78" cy="420" rx="12" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="122" cy="420" rx="12" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="76" cy="505" rx="12" ry="60"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="124" cy="505" rx="12" ry="60"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="72" cy="590" rx="18" ry="12"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="128" cy="590" rx="18" ry="12"
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
        {/* Head */}
        <ellipse cx="100" cy="42" rx="22" ry="26" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck - slimmer */}
        <path
          d="M 90 66 Q 90 78 90 86 L 110 86 Q 110 78 110 66"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso - narrower shoulders, defined waist, wider hips */}
        <path
          d="M 90 86 
             C 75 86, 58 92, 50 105
             C 46 112, 48 120, 52 125
             L 55 125
             C 58 118, 60 114, 62 112
             L 60 145
             C 55 165, 54 185, 56 205
             C 58 225, 62 245, 65 260
             C 68 275, 75 285, 85 290
             L 100 292
             L 115 290
             C 125 285, 132 275, 135 260
             C 138 245, 142 225, 144 205
             C 146 185, 145 165, 140 145
             L 138 112
             C 140 114, 142 118, 145 125
             L 148 125
             C 152 120, 154 112, 150 105
             C 142 92, 125 86, 110 86 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm - slimmer */}
        <path
          d="M 50 105
             C 44 110, 40 125, 38 145
             C 36 170, 34 195, 33 220
             C 32 245, 30 270, 30 290
             C 30 305, 35 312, 42 312
             C 49 312, 54 305, 54 290
             C 54 270, 55 245, 56 220
             C 57 195, 56 170, 55 145
             C 54 125, 54 115, 52 125"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 150 105
             C 156 110, 160 125, 162 145
             C 164 170, 166 195, 167 220
             C 168 245, 170 270, 170 290
             C 170 305, 165 312, 158 312
             C 151 312, 146 305, 146 290
             C 146 270, 145 245, 144 220
             C 143 195, 144 170, 145 145
             C 146 125, 146 115, 148 125"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis - wider */}
        <path
          d="M 65 260 
             C 70 275, 82 290, 100 295
             C 118 290, 130 275, 135 260
             L 135 310
             L 65 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg */}
        <path
          d="M 65 310
             C 63 340, 64 370, 66 400
             C 68 430, 68 460, 66 490
             C 64 520, 62 550, 62 570
             C 62 582, 66 590, 74 590
             L 88 590
             C 90 582, 88 572, 86 562
             C 84 540, 84 510, 86 480
             C 88 450, 90 420, 90 390
             C 90 360, 90 330, 90 310
             L 65 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 310
             C 137 340, 136 370, 134 400
             C 132 430, 132 460, 134 490
             C 136 520, 138 550, 138 570
             C 138 582, 134 590, 126 590
             L 112 590
             C 110 582, 112 572, 114 562
             C 116 540, 116 510, 114 480
             C 112 450, 110 420, 110 390
             C 110 360, 110 330, 110 310
             L 135 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 62 570 C 58 575, 54 582, 54 590 C 54 598, 62 603, 78 603 L 88 603 C 90 598, 90 593, 88 590 L 74 590 C 70 585, 66 578, 62 570 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 138 570 C 142 575, 146 582, 146 590 C 146 598, 138 603, 122 603 L 112 603 C 110 598, 110 593, 112 590 L 126 590 C 130 585, 134 578, 138 570 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="42" rx="22" ry="26"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="90" y="66" width="20" height="20" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="58" cy="102" rx="16" ry="14"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="142" cy="102" rx="16" ry="14"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="135" rx="36" ry="28"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <ellipse cx="45" cy="155" rx="10" ry="32"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="155" cy="155" rx="10" ry="32"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="40" cy="240" rx="9" ry="38"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="160" cy="240" rx="9" ry="38"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="42" cy="300" rx="9" ry="16"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="158" cy="300" rx="9" ry="16"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="200" rx="35" ry="32"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <ellipse cx="100" cy="270" rx="35" ry="22"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="68" cy="268" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="132" cy="268" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="78" cy="360" rx="13" ry="48"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="122" cy="360" rx="13" ry="48"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="76" cy="425" rx="11" ry="16"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="124" cy="425" rx="11" ry="16"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="74" cy="510" rx="11" ry="58"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="126" cy="510" rx="11" ry="58"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="72" cy="595" rx="16" ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="128" cy="595" rx="16" ry="10"
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
        <ellipse cx="100" cy="42" rx="24" ry="28" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 88 68 Q 88 80 88 88 L 112 88 Q 112 80 112 68"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso */}
        <path
          d="M 88 88 
             C 70 88, 52 95, 42 110
             C 38 118, 40 125, 45 130
             L 48 130
             C 52 120, 55 115, 58 112
             L 58 165
             C 55 190, 55 215, 58 240
             C 60 255, 65 268, 70 275
             L 100 280
             L 130 275
             C 135 268, 140 255, 142 240
             C 145 215, 145 190, 142 165
             L 142 112
             C 145 115, 148 120, 152 130
             L 155 130
             C 160 125, 162 118, 158 110
             C 148 95, 130 88, 112 88 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 42 110
             C 35 115, 32 130, 30 150
             C 28 175, 26 200, 25 225
             C 24 250, 22 275, 22 295
             C 22 310, 28 320, 35 320
             C 42 320, 48 310, 48 295
             C 48 275, 50 250, 52 225
             C 54 200, 54 175, 52 150
             C 50 130, 48 118, 45 130"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 158 110
             C 165 115, 168 130, 170 150
             C 172 175, 174 200, 175 225
             C 176 250, 178 275, 178 295
             C 178 310, 172 320, 165 320
             C 158 320, 152 310, 152 295
             C 152 275, 150 250, 148 225
             C 146 200, 146 175, 148 150
             C 150 130, 152 118, 155 130"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis/buttocks */}
        <path
          d="M 70 275 
             C 75 280, 85 285, 100 288
             C 115 285, 125 280, 130 275
             L 130 300
             L 70 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg */}
        <path
          d="M 70 300
             C 68 330, 68 360, 70 390
             C 72 420, 72 450, 70 480
             C 68 510, 66 540, 65 560
             C 64 575, 68 585, 75 585
             L 90 585
             C 92 575, 90 565, 88 555
             C 86 535, 86 505, 88 475
             C 90 445, 92 415, 92 385
             C 92 355, 92 325, 92 300
             L 70 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 130 300
             C 132 330, 132 360, 130 390
             C 128 420, 128 450, 130 480
             C 132 510, 134 540, 135 560
             C 136 575, 132 585, 125 585
             L 110 585
             C 108 575, 110 565, 112 555
             C 114 535, 114 505, 112 475
             C 110 445, 108 415, 108 385
             C 108 355, 108 325, 108 300
             L 130 300 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 65 560 C 60 565, 55 575, 55 585 C 55 595, 65 600, 80 600 L 90 600 C 92 595, 92 590, 90 585 L 75 585 C 72 580, 68 570, 65 560 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 135 560 C 140 565, 145 575, 145 585 C 145 595, 135 600, 120 600 L 110 600 C 108 595, 108 590, 110 585 L 125 585 C 128 580, 132 570, 135 560 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="42" rx="24" ry="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="68" width="24" height="20" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="55" cy="105" rx="20" ry="15"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="145" cy="105" rx="20" ry="15"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="125" rx="40" ry="25"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <ellipse cx="100" cy="190" rx="38" ry="40"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <ellipse cx="40" cy="160" rx="12" ry="35"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="160" cy="160" rx="12" ry="35"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="35" cy="245" rx="10" ry="40"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="165" cy="245" rx="10" ry="40"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="35" cy="305" rx="10" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="165" cy="305" rx="10" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="270" rx="32" ry="20"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="68" cy="265" rx="10" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="132" cy="265" rx="10" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="350" rx="14" ry="50"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="350" rx="14" ry="50"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="78" cy="420" rx="12" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="122" cy="420" rx="12" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="76" cy="505" rx="12" ry="60"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="124" cy="505" rx="12" ry="60"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="72" cy="590" rx="18" ry="12"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="128" cy="590" rx="18" ry="12"
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
        <ellipse cx="100" cy="42" rx="22" ry="26" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 90 66 Q 90 78 90 86 L 110 86 Q 110 78 110 66"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Torso */}
        <path
          d="M 90 86 
             C 75 86, 58 92, 50 105
             C 46 112, 48 120, 52 125
             L 55 125
             C 58 118, 60 114, 62 112
             L 60 145
             C 55 165, 54 185, 56 205
             C 58 225, 62 245, 65 260
             C 68 275, 75 285, 85 290
             L 100 292
             L 115 290
             C 125 285, 132 275, 135 260
             C 138 245, 142 225, 144 205
             C 146 185, 145 165, 140 145
             L 138 112
             C 140 114, 142 118, 145 125
             L 148 125
             C 152 120, 154 112, 150 105
             C 142 92, 125 86, 110 86 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left arm */}
        <path
          d="M 50 105
             C 44 110, 40 125, 38 145
             C 36 170, 34 195, 33 220
             C 32 245, 30 270, 30 290
             C 30 305, 35 312, 42 312
             C 49 312, 54 305, 54 290
             C 54 270, 55 245, 56 220
             C 57 195, 56 170, 55 145
             C 54 125, 54 115, 52 125"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right arm */}
        <path
          d="M 150 105
             C 156 110, 160 125, 162 145
             C 164 170, 166 195, 167 220
             C 168 245, 170 270, 170 290
             C 170 305, 165 312, 158 312
             C 151 312, 146 305, 146 290
             C 146 270, 145 245, 144 220
             C 143 195, 144 170, 145 145
             C 146 125, 146 115, 148 125"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Pelvis/buttocks - wider */}
        <path
          d="M 65 260 
             C 70 275, 82 290, 100 295
             C 118 290, 130 275, 135 260
             L 135 310
             L 65 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left leg */}
        <path
          d="M 65 310
             C 63 340, 64 370, 66 400
             C 68 430, 68 460, 66 490
             C 64 520, 62 550, 62 570
             C 62 582, 66 590, 74 590
             L 88 590
             C 90 582, 88 572, 86 562
             C 84 540, 84 510, 86 480
             C 88 450, 90 420, 90 390
             C 90 360, 90 330, 90 310
             L 65 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right leg */}
        <path
          d="M 135 310
             C 137 340, 136 370, 134 400
             C 132 430, 132 460, 134 490
             C 136 520, 138 550, 138 570
             C 138 582, 134 590, 126 590
             L 112 590
             C 110 582, 112 572, 114 562
             C 116 540, 116 510, 114 480
             C 112 450, 110 420, 110 390
             C 110 360, 110 330, 110 310
             L 135 310 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Left foot */}
        <path
          d="M 62 570 C 58 575, 54 582, 54 590 C 54 598, 62 603, 78 603 L 88 603 C 90 598, 90 593, 88 590 L 74 590 C 70 585, 66 578, 62 570 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Right foot */}
        <path
          d="M 138 570 C 142 575, 146 582, 146 590 C 146 598, 138 603, 122 603 L 112 603 C 110 598, 110 593, 112 590 L 126 590 C 130 585, 134 578, 138 570 Z"
          fill={skinColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="42" rx="22" ry="26"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="90" y="66" width="20" height="20" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="58" cy="102" rx="16" ry="14"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="142" cy="102" rx="16" ry="14"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="120" rx="36" ry="22"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <ellipse cx="100" cy="185" rx="35" ry="38"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <ellipse cx="45" cy="155" rx="10" ry="32"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="155" cy="155" rx="10" ry="32"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="40" cy="240" rx="9" ry="38"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="160" cy="240" rx="9" ry="38"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="42" cy="300" rx="9" ry="16"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="158" cy="300" rx="9" ry="16"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="275" rx="35" ry="22"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="68" cy="268" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="132" cy="268" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="78" cy="360" rx="13" ry="48"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="122" cy="360" rx="13" ry="48"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="76" cy="425" rx="11" ry="16"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="124" cy="425" rx="11" ry="16"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="74" cy="510" rx="11" ry="58"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="126" cy="510" rx="11" ry="58"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="72" cy="595" rx="16" ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="128" cy="595" rx="16" ry="10"
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
