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

  // Colors matching the reference - light gray-blue
  const fillColor = '#E8EEF2';
  const strokeColor = '#8BA4B5';
  const detailColor = '#B5C8D4';
  const strokeWidth = '1.5';

  // Front View - matching the reference image exactly
  const FrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head - oval shape */}
        <ellipse cx="100" cy="35" rx="22" ry="28" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 88 60 L 88 75 L 112 75 L 112 60"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Main body outline */}
        <path
          d="M 88 75
             C 70 75, 48 78, 35 90
             C 25 100, 22 115, 25 130
             L 32 130
             L 40 115
             L 40 180
             L 35 185
             L 30 200
             L 25 240
             L 25 270
             L 30 280
             L 40 290
             L 45 300
             L 55 295
             L 60 265
             C 62 250, 65 220, 68 195
             L 68 280
             C 68 295, 70 310, 73 330
             L 65 330
             C 60 335, 55 340, 52 350
             L 40 375
             L 35 410
             L 33 450
             L 32 490
             L 35 530
             L 40 555
             L 45 570
             L 58 575
             L 70 575
             L 78 570
             L 82 555
             L 85 520
             L 87 460
             L 88 400
             L 90 350
             L 100 330
             L 110 350
             L 112 400
             L 113 460
             L 115 520
             L 118 555
             L 122 570
             L 130 575
             L 142 575
             L 155 570
             L 160 555
             L 165 530
             L 168 490
             L 167 450
             L 165 410
             L 160 375
             L 148 350
             C 145 340, 140 335, 135 330
             L 127 330
             C 130 310, 132 295, 132 280
             L 132 195
             C 135 220, 138 250, 140 265
             L 145 295
             L 155 300
             L 160 290
             L 170 280
             L 175 270
             L 175 240
             L 170 200
             L 165 185
             L 160 180
             L 160 115
             L 168 130
             L 175 130
             C 178 115, 175 100, 165 90
             C 152 78, 130 75, 112 75 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Anatomical detail lines - chest */}
        <path
          d="M 70 100 C 85 120, 100 125, 100 125 C 100 125, 115 120, 130 100"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Anatomical detail - center line */}
        <path
          d="M 100 125 L 100 320"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Anatomical detail - abdomen */}
        <path
          d="M 80 180 C 90 185, 100 190, 100 190 C 100 190, 110 185, 120 180"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Navel */}
        <circle cx="100" cy="210" r="2" fill={detailColor} />
        
        {/* Anatomical detail - pelvic area */}
        <path
          d="M 75 270 C 85 285, 100 290, 100 290 C 100 290, 115 285, 125 270"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Left hand fingers */}
        <g>
          <path d="M 25 270 L 20 285 L 23 290 L 28 280" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 28 275 L 22 295 L 26 300 L 32 285" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 32 278 L 28 300 L 33 305 L 38 288" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 38 280 L 35 298 L 40 302 L 44 290" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 42 285 L 48 295 L 52 292 L 48 283" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Right hand fingers */}
        <g>
          <path d="M 175 270 L 180 285 L 177 290 L 172 280" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 172 275 L 178 295 L 174 300 L 168 285" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 168 278 L 172 300 L 167 305 L 162 288" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 162 280 L 165 298 L 160 302 L 156 290" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 158 285 L 152 295 L 148 292 L 152 283" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Left foot toes */}
        <g>
          <ellipse cx="48" cy="578" rx="4" ry="5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="55" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="61" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="67" cy="579" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="73" cy="577" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Right foot toes */}
        <g>
          <ellipse cx="152" cy="578" rx="4" ry="5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="145" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="139" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="133" cy="579" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="127" cy="577" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Knee lines */}
        <path d="M 78 430 C 82 435, 88 435, 92 430" fill="none" stroke={detailColor} strokeWidth="1" />
        <path d="M 108 430 C 112 435, 118 435, 122 430" fill="none" stroke={detailColor} strokeWidth="1" />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <ellipse cx="100" cy="35" rx="22" ry="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="60" width="24" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="50" cy="95" rx="20" ry="18"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="150" cy="95" rx="20" ry="18"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="120" rx="35" ry="30"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      <ellipse cx="40" cy="150" rx="10" ry="30"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="160" cy="150" rx="10" ry="30"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="35" cy="220" rx="10" ry="35"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="165" cy="220" rx="10" ry="35"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="35" cy="280" rx="15" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="165" cy="280" rx="15" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="195" rx="32" ry="35"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      <ellipse cx="100" cy="275" rx="30" ry="25"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      <ellipse cx="72" cy="280" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="128" cy="280" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="370" rx="14" ry="50"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="370" rx="14" ry="50"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="82" cy="435" rx="12" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="118" cy="435" rx="12" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="78" cy="505" rx="12" ry="55"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="122" cy="505" rx="12" ry="55"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="60" cy="575" rx="20" ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="140" cy="575" rx="20" ry="10"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Back View
  const BackView = () => (
    <>
      <g className="body-silhouette pointer-events-none">
        {/* Head - oval shape */}
        <ellipse cx="100" cy="35" rx="22" ry="28" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Neck */}
        <path
          d="M 88 60 L 88 75 L 112 75 L 112 60"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Main body outline - same as front */}
        <path
          d="M 88 75
             C 70 75, 48 78, 35 90
             C 25 100, 22 115, 25 130
             L 32 130
             L 40 115
             L 40 180
             L 35 185
             L 30 200
             L 25 240
             L 25 270
             L 30 280
             L 40 290
             L 45 300
             L 55 295
             L 60 265
             C 62 250, 65 220, 68 195
             L 68 280
             C 68 295, 70 310, 73 330
             L 65 330
             C 60 335, 55 340, 52 350
             L 40 375
             L 35 410
             L 33 450
             L 32 490
             L 35 530
             L 40 555
             L 45 570
             L 58 575
             L 70 575
             L 78 570
             L 82 555
             L 85 520
             L 87 460
             L 88 400
             L 90 350
             L 100 330
             L 110 350
             L 112 400
             L 113 460
             L 115 520
             L 118 555
             L 122 570
             L 130 575
             L 142 575
             L 155 570
             L 160 555
             L 165 530
             L 168 490
             L 167 450
             L 165 410
             L 160 375
             L 148 350
             C 145 340, 140 335, 135 330
             L 127 330
             C 130 310, 132 295, 132 280
             L 132 195
             C 135 220, 138 250, 140 265
             L 145 295
             L 155 300
             L 160 290
             L 170 280
             L 175 270
             L 175 240
             L 170 200
             L 165 185
             L 160 180
             L 160 115
             L 168 130
             L 175 130
             C 178 115, 175 100, 165 90
             C 152 78, 130 75, 112 75 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Back anatomical detail - spine */}
        <path
          d="M 100 75 L 100 320"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Shoulder blades */}
        <path
          d="M 70 100 C 75 120, 85 130, 95 125"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        <path
          d="M 130 100 C 125 120, 115 130, 105 125"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Lower back curves */}
        <path
          d="M 75 200 C 85 210, 95 215, 100 215"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        <path
          d="M 125 200 C 115 210, 105 215, 100 215"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Gluteal line */}
        <path
          d="M 75 290 C 85 295, 100 300, 100 300 C 100 300, 115 295, 125 290"
          fill="none"
          stroke={detailColor}
          strokeWidth="1"
        />
        
        {/* Left hand fingers */}
        <g>
          <path d="M 25 270 L 20 285 L 23 290 L 28 280" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 28 275 L 22 295 L 26 300 L 32 285" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 32 278 L 28 300 L 33 305 L 38 288" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 38 280 L 35 298 L 40 302 L 44 290" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 42 285 L 48 295 L 52 292 L 48 283" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Right hand fingers */}
        <g>
          <path d="M 175 270 L 180 285 L 177 290 L 172 280" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 172 275 L 178 295 L 174 300 L 168 285" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 168 278 L 172 300 L 167 305 L 162 288" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 162 280 L 165 298 L 160 302 L 156 290" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M 158 285 L 152 295 L 148 292 L 152 283" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Left foot toes */}
        <g>
          <ellipse cx="48" cy="578" rx="4" ry="5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="55" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="61" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="67" cy="579" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="73" cy="577" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Right foot toes */}
        <g>
          <ellipse cx="152" cy="578" rx="4" ry="5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="145" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="139" cy="580" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="133" cy="579" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="127" cy="577" rx="3" ry="4" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
        
        {/* Back knee lines */}
        <path d="M 78 430 C 82 435, 88 435, 92 430" fill="none" stroke={detailColor} strokeWidth="1" />
        <path d="M 108 430 C 112 435, 118 435, 122 430" fill="none" stroke={detailColor} strokeWidth="1" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="35" rx="22" ry="28"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      <rect x="88" y="60" width="24" height="18" rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      <ellipse cx="50" cy="95" rx="20" ry="18"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      <ellipse cx="150" cy="95" rx="20" ry="18"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      <ellipse cx="100" cy="130" rx="35" ry="35"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      <ellipse cx="40" cy="150" rx="10" ry="30"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      <ellipse cx="160" cy="150" rx="10" ry="30"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      <ellipse cx="35" cy="220" rx="10" ry="35"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      <ellipse cx="165" cy="220" rx="10" ry="35"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      <ellipse cx="35" cy="280" rx="15" ry="18"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      <ellipse cx="165" cy="280" rx="15" ry="18"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      <ellipse cx="100" cy="220" rx="32" ry="40"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      <ellipse cx="72" cy="280" rx="12" ry="18"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      <ellipse cx="128" cy="280" rx="12" ry="18"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      <ellipse cx="80" cy="370" rx="14" ry="50"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      <ellipse cx="120" cy="370" rx="14" ry="50"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      <ellipse cx="82" cy="435" rx="12" ry="18"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      <ellipse cx="118" cy="435" rx="12" ry="18"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      <ellipse cx="78" cy="505" rx="12" ry="55"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      <ellipse cx="122" cy="505" rx="12" ry="55"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      <ellipse cx="60" cy="575" rx="20" ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      <ellipse cx="140" cy="575" rx="20" ry="10"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  const renderBody = () => {
    // Same body for both genders with this medical style
    return view === 'front' ? <FrontView /> : <BackView />;
  };

  return (
    <svg
      viewBox="0 0 200 600"
      className="w-full h-auto"
      style={{ maxHeight: '450px' }}
    >
      {renderBody()}
    </svg>
  );
}
