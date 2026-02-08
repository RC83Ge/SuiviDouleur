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

  // Clean black outlines matching reference
  const strokeColor = '#2d2d2d';
  const detailColor = '#666666';
  const strokeWidth = '0.8';
  const thinStroke = '0.4';

  // Male Front View - tall, lean proportions like reference
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="50" cy="18" rx="8" ry="10" />
        
        {/* Hair - short */}
        <path d="M 42 14 C 42 8, 50 5, 50 5 C 50 5, 58 8, 58 14" strokeWidth={thinStroke} />
        
        {/* Face */}
        <path d="M 47 15 L 48 15 M 52 15 L 53 15" strokeWidth={thinStroke} /> {/* Eyes */}
        <path d="M 50 18 L 50 20" strokeWidth={thinStroke} /> {/* Nose */}
        <path d="M 48 23 C 49 24, 51 24, 52 23" strokeWidth={thinStroke} /> {/* Mouth */}
        
        {/* Neck */}
        <path d="M 46 28 L 46 35" />
        <path d="M 54 28 L 54 35" />
        
        {/* Shoulders - broad for male */}
        <path d="M 46 35 C 40 35, 25 38, 18 45" />
        <path d="M 54 35 C 60 35, 75 38, 82 45" />
        
        {/* Torso sides */}
        <path d="M 18 45 L 16 55 C 15 70, 15 90, 17 110 C 19 130, 22 145, 25 160" />
        <path d="M 82 45 L 84 55 C 85 70, 85 90, 83 110 C 81 130, 78 145, 75 160" />
        
        {/* Arms - hanging naturally alongside body */}
        <path d="M 18 45 C 14 50, 10 60, 8 75 C 6 90, 5 105, 5 120 C 5 135, 4 150, 3 165" />
        <path d="M 82 45 C 86 50, 90 60, 92 75 C 94 90, 95 105, 95 120 C 95 135, 96 150, 97 165" />
        
        {/* Inner arm lines */}
        <path d="M 16 55 C 14 65, 12 80, 11 95 C 10 110, 9 125, 8 140 C 7 155, 7 165, 7 175" />
        <path d="M 84 55 C 86 65, 88 80, 89 95 C 90 110, 91 125, 92 140 C 93 155, 93 165, 93 175" />
        
        {/* Hands */}
        <path d="M 3 165 C 1 175, 0 185, 2 192 L 7 192 C 9 188, 9 180, 8 170" />
        <path d="M 97 165 C 99 175, 100 185, 98 192 L 93 192 C 91 188, 91 180, 92 170" />
        
        {/* Fingers */}
        <path d="M 2 190 L 0 198 M 4 191 L 2 200 M 6 191 L 5 199" strokeWidth={thinStroke} />
        <path d="M 98 190 L 100 198 M 96 191 L 98 200 M 94 191 L 95 199" strokeWidth={thinStroke} />
        
        {/* Chest muscles */}
        <path d="M 30 50 C 38 58, 46 62, 49 58" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 70 50 C 62 58, 54 62, 51 58" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Center line */}
        <path d="M 50 35 L 50 160" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Abs */}
        <path d="M 42 65 L 42 110" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 58 65 L 58 110" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 42 75 C 46 77, 54 77, 58 75" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 42 90 C 46 92, 54 92, 58 90" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Navel */}
        <ellipse cx="50" cy="115" rx="1.5" ry="2" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* V-lines */}
        <path d="M 28 125 C 35 140, 42 150, 46 160" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 72 125 C 65 140, 58 150, 54 160" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Hips/pelvis */}
        <path d="M 25 160 C 24 170, 24 180, 27 195" />
        <path d="M 75 160 C 76 170, 76 180, 73 195" />
        
        {/* Inner thigh start */}
        <path d="M 46 160 L 44 180 C 43 190, 42 200, 42 210" />
        <path d="M 54 160 L 56 180 C 57 190, 58 200, 58 210" />
        
        {/* Thighs outer */}
        <path d="M 27 195 C 26 220, 27 245, 30 270" />
        <path d="M 73 195 C 74 220, 73 245, 70 270" />
        
        {/* Thighs inner */}
        <path d="M 42 210 C 40 235, 40 255, 42 280" />
        <path d="M 58 210 C 60 235, 60 255, 58 280" />
        
        {/* Knees */}
        <path d="M 30 270 C 28 280, 28 290, 30 300" />
        <path d="M 42 280 C 40 288, 40 295, 42 305" />
        <path d="M 70 270 C 72 280, 72 290, 70 300" />
        <path d="M 58 280 C 60 288, 60 295, 58 305" />
        <ellipse cx="36" cy="285" rx="5" ry="8" strokeWidth={thinStroke} stroke={detailColor} />
        <ellipse cx="64" cy="285" rx="5" ry="8" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Lower legs */}
        <path d="M 30 300 C 28 330, 27 360, 28 390" />
        <path d="M 42 305 C 40 335, 39 365, 40 390" />
        <path d="M 70 300 C 72 330, 73 360, 72 390" />
        <path d="M 58 305 C 60 335, 61 365, 60 390" />
        
        {/* Calf muscles */}
        <path d="M 33 310 C 36 330, 37 350, 35 375" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 67 310 C 64 330, 63 350, 65 375" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Ankles */}
        <path d="M 28 390 L 30 400" />
        <path d="M 40 390 L 38 398" />
        <path d="M 72 390 L 70 400" />
        <path d="M 60 390 L 62 398" />
        
        {/* Feet */}
        <path d="M 30 400 C 24 403, 20 406, 20 410 C 20 414, 28 416, 38 415 L 38 400" />
        <path d="M 70 400 C 76 403, 80 406, 80 410 C 80 414, 72 416, 62 415 L 62 400" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="50" cy="18" rx="9" ry="11" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="45" y="28" width="10" height="8" rx="2" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="28" cy="42" rx="12" ry="8" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="72" cy="42" rx="12" ry="8" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="50" cy="60" rx="20" ry="18" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="12" cy="85" rx="6" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="88" cy="85" rx="6" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="8" cy="145" rx="5" ry="22" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="92" cy="145" rx="5" ry="22" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="4" cy="185" rx="5" ry="12" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="96" cy="185" rx="5" ry="12" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="50" cy="105" rx="16" ry="22" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="50" cy="150" rx="14" ry="15" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="32" cy="175" rx="8" ry="12" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="68" cy="175" rx="8" ry="12" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="35" cy="235" rx="9" ry="32" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="65" cy="235" rx="9" ry="32" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="36" cy="285" rx="7" ry="12" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="64" cy="285" rx="7" ry="12" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="35" cy="350" rx="7" ry="40" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="65" cy="350" rx="7" ry="40" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="30" cy="410" rx="12" ry="6" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="70" cy="410" rx="12" ry="6" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Male Back View
  const MaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="50" cy="18" rx="8" ry="10" />
        
        {/* Hair */}
        <path d="M 42 14 C 42 8, 50 5, 50 5 C 50 5, 58 8, 58 14" strokeWidth={thinStroke} />
        
        {/* Neck */}
        <path d="M 46 28 L 46 35" />
        <path d="M 54 28 L 54 35" />
        
        {/* Spine */}
        <path d="M 50 35 L 50 160" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Shoulders */}
        <path d="M 46 35 C 40 35, 25 38, 18 45" />
        <path d="M 54 35 C 60 35, 75 38, 82 45" />
        
        {/* Shoulder blades */}
        <path d="M 28 52 C 34 62, 42 68, 48 65" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 72 52 C 66 62, 58 68, 52 65" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Torso */}
        <path d="M 18 45 L 16 55 C 15 70, 15 90, 17 110 C 19 130, 22 145, 25 160" />
        <path d="M 82 45 L 84 55 C 85 70, 85 90, 83 110 C 81 130, 78 145, 75 160" />
        
        {/* Lower back */}
        <path d="M 35 115 C 42 125, 50 128, 50 128 C 50 128, 58 125, 65 115" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms */}
        <path d="M 18 45 C 14 50, 10 60, 8 75 C 6 90, 5 105, 5 120 C 5 135, 4 150, 3 165" />
        <path d="M 82 45 C 86 50, 90 60, 92 75 C 94 90, 95 105, 95 120 C 95 135, 96 150, 97 165" />
        <path d="M 16 55 C 14 65, 12 80, 11 95 C 10 110, 9 125, 8 140 C 7 155, 7 165, 7 175" />
        <path d="M 84 55 C 86 65, 88 80, 89 95 C 90 110, 91 125, 92 140 C 93 155, 93 165, 93 175" />
        
        {/* Hands */}
        <path d="M 3 165 C 1 175, 0 185, 2 192 L 7 192 C 9 188, 9 180, 8 170" />
        <path d="M 97 165 C 99 175, 100 185, 98 192 L 93 192 C 91 188, 91 180, 92 170" />
        
        {/* Gluteal area */}
        <path d="M 25 160 C 24 170, 24 180, 27 195" />
        <path d="M 75 160 C 76 170, 76 180, 73 195" />
        <path d="M 32 162 C 40 175, 50 180, 50 180 C 50 180, 60 175, 68 162" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 50 180 L 50 195" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Legs - same as front */}
        <path d="M 46 160 L 44 180 C 43 190, 42 200, 42 210" />
        <path d="M 54 160 L 56 180 C 57 190, 58 200, 58 210" />
        <path d="M 27 195 C 26 220, 27 245, 30 270" />
        <path d="M 73 195 C 74 220, 73 245, 70 270" />
        <path d="M 42 210 C 40 235, 40 255, 42 280" />
        <path d="M 58 210 C 60 235, 60 255, 58 280" />
        
        {/* Knees */}
        <path d="M 30 270 C 28 280, 28 290, 30 300" />
        <path d="M 42 280 C 40 288, 40 295, 42 305" />
        <path d="M 70 270 C 72 280, 72 290, 70 300" />
        <path d="M 58 280 C 60 288, 60 295, 58 305" />
        
        {/* Lower legs */}
        <path d="M 30 300 C 28 330, 27 360, 28 390" />
        <path d="M 42 305 C 40 335, 39 365, 40 390" />
        <path d="M 70 300 C 72 330, 73 360, 72 390" />
        <path d="M 58 305 C 60 335, 61 365, 60 390" />
        
        {/* Calf muscles */}
        <path d="M 33 310 C 37 330, 38 350, 35 375" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 67 310 C 63 330, 62 350, 65 375" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Feet/heels */}
        <path d="M 28 390 C 28 400, 30 408, 35 410 L 40 410 C 42 405, 40 395, 40 390" />
        <path d="M 72 390 C 72 400, 70 408, 65 410 L 60 410 C 58 405, 60 395, 60 390" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="50" cy="18" rx="9" ry="11" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="45" y="28" width="10" height="8" rx="2" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="28" cy="42" rx="12" ry="8" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="72" cy="42" rx="12" ry="8" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="50" cy="65" rx="20" ry="22" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="12" cy="85" rx="6" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="88" cy="85" rx="6" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="8" cy="145" rx="5" ry="22" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="92" cy="145" rx="5" ry="22" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="4" cy="185" rx="5" ry="12" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="96" cy="185" rx="5" ry="12" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="50" cy="120" rx="18" ry="28" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="32" cy="175" rx="8" ry="12" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="68" cy="175" rx="8" ry="12" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="35" cy="235" rx="9" ry="32" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="65" cy="235" rx="9" ry="32" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="36" cy="285" rx="7" ry="12" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="64" cy="285" rx="7" ry="12" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="35" cy="350" rx="7" ry="40" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="65" cy="350" rx="7" ry="40" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="35" cy="405" rx="8" ry="6" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="65" cy="405" rx="8" ry="6" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Front View - slimmer, curvier proportions
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair - longer */}
        <path d="M 40 12 C 38 18, 37 30, 38 45" strokeWidth={thinStroke} />
        <path d="M 60 12 C 62 18, 63 30, 62 45" strokeWidth={thinStroke} />
        <path d="M 40 12 C 42 5, 50 3, 50 3 C 50 3, 58 5, 60 12" strokeWidth={thinStroke} />
        
        {/* Head */}
        <ellipse cx="50" cy="18" rx="7" ry="9" />
        
        {/* Face */}
        <path d="M 47 15 L 48 15 M 52 15 L 53 15" strokeWidth={thinStroke} />
        <path d="M 50 18 L 50 20" strokeWidth={thinStroke} />
        <path d="M 48 23 C 49 24, 51 24, 52 23" strokeWidth={thinStroke} />
        
        {/* Neck - slimmer */}
        <path d="M 47 27 L 47 35" />
        <path d="M 53 27 L 53 35" />
        
        {/* Shoulders - narrower, sloped */}
        <path d="M 47 35 C 42 35, 30 38, 24 45" />
        <path d="M 53 35 C 58 35, 70 38, 76 45" />
        
        {/* Torso - hourglass */}
        <path d="M 24 45 L 22 55 C 21 65, 24 80, 28 95 C 32 110, 30 125, 26 145 C 23 160, 21 175, 23 190" />
        <path d="M 76 45 L 78 55 C 79 65, 76 80, 72 95 C 68 110, 70 125, 74 145 C 77 160, 79 175, 77 190" />
        
        {/* Breasts */}
        <ellipse cx="38" cy="62" rx="8" ry="10" strokeWidth={thinStroke} stroke={detailColor} />
        <ellipse cx="62" cy="62" rx="8" ry="10" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Center line */}
        <path d="M 50 35 L 50 185" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Waist curve */}
        <path d="M 32 95 C 40 98, 50 100, 50 100 C 50 100, 60 98, 68 95" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Navel */}
        <ellipse cx="50" cy="115" rx="1.5" ry="2" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms */}
        <path d="M 24 45 C 20 52, 16 65, 14 80 C 12 95, 11 110, 11 125 C 11 140, 10 155, 9 170" />
        <path d="M 76 45 C 80 52, 84 65, 86 80 C 88 95, 89 110, 89 125 C 89 140, 90 155, 91 170" />
        <path d="M 22 55 C 19 65, 17 78, 16 92 C 15 106, 14 120, 13 135 C 12 150, 12 162, 12 175" />
        <path d="M 78 55 C 81 65, 83 78, 84 92 C 85 106, 86 120, 87 135 C 88 150, 88 162, 88 175" />
        
        {/* Hands */}
        <path d="M 9 170 C 7 180, 6 188, 8 195 L 12 195 C 14 190, 14 182, 13 172" />
        <path d="M 91 170 C 93 180, 94 188, 92 195 L 88 195 C 86 190, 86 182, 87 172" />
        
        {/* Fingers */}
        <path d="M 8 193 L 6 200 M 10 194 L 9 202 M 12 193 L 12 200" strokeWidth={thinStroke} />
        <path d="M 92 193 L 94 200 M 90 194 L 91 202 M 88 193 L 88 200" strokeWidth={thinStroke} />
        
        {/* Pelvic curves */}
        <path d="M 35 140 C 42 155, 50 160, 50 160 C 50 160, 58 155, 65 140" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Hips - wider */}
        <path d="M 23 190 C 20 210, 20 230, 25 250" />
        <path d="M 77 190 C 80 210, 80 230, 75 250" />
        
        {/* Inner thighs */}
        <path d="M 44 185 C 42 200, 40 220, 40 240" />
        <path d="M 56 185 C 58 200, 60 220, 60 240" />
        
        {/* Thighs */}
        <path d="M 25 250 C 24 275, 26 295, 30 320" />
        <path d="M 40 240 C 38 265, 38 290, 40 320" />
        <path d="M 75 250 C 76 275, 74 295, 70 320" />
        <path d="M 60 240 C 62 265, 62 290, 60 320" />
        
        {/* Knees */}
        <path d="M 30 320 C 28 332, 28 345, 30 355" />
        <path d="M 40 320 C 38 332, 38 345, 40 355" />
        <path d="M 70 320 C 72 332, 72 345, 70 355" />
        <path d="M 60 320 C 62 332, 62 345, 60 355" />
        
        {/* Lower legs */}
        <path d="M 30 355 C 28 380, 27 400, 28 420" />
        <path d="M 40 355 C 38 380, 38 400, 38 420" />
        <path d="M 70 355 C 72 380, 73 400, 72 420" />
        <path d="M 60 355 C 62 380, 62 400, 62 420" />
        
        {/* Feet */}
        <path d="M 28 420 C 24 424, 20 428, 20 432 C 20 436, 28 438, 38 436 L 38 422" />
        <path d="M 72 420 C 76 424, 80 428, 80 432 C 80 436, 72 438, 62 436 L 62 422" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="50" cy="18" rx="8" ry="10" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="46" y="27" width="8" height="9" rx="2" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="30" cy="42" rx="10" ry="7" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="70" cy="42" rx="10" ry="7" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="50" cy="62" rx="18" ry="18" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="17" cy="90" rx="5" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="83" cy="90" rx="5" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="12" cy="150" rx="4" ry="22" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="88" cy="150" rx="4" ry="22" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="10" cy="188" rx="5" ry="12" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="90" cy="188" rx="5" ry="12" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="50" cy="108" rx="15" ry="20" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="50" cy="155" rx="16" ry="18" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="30" cy="210" rx="10" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="70" cy="210" rx="10" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="34" cy="280" rx="10" ry="35" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="66" cy="280" rx="10" ry="35" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="35" cy="335" rx="6" ry="12" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="65" cy="335" rx="6" ry="12" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="34" cy="390" rx="6" ry="35" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="66" cy="390" rx="6" ry="35" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="30" cy="432" rx="12" ry="6" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="70" cy="432" rx="12" ry="6" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Back View
  const FemaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair */}
        <path d="M 40 12 C 38 18, 37 30, 38 45" strokeWidth={thinStroke} />
        <path d="M 60 12 C 62 18, 63 30, 62 45" strokeWidth={thinStroke} />
        <path d="M 40 12 C 42 5, 50 3, 50 3 C 50 3, 58 5, 60 12" strokeWidth={thinStroke} />
        
        {/* Head */}
        <ellipse cx="50" cy="18" rx="7" ry="9" />
        
        {/* Neck */}
        <path d="M 47 27 L 47 35" />
        <path d="M 53 27 L 53 35" />
        
        {/* Spine */}
        <path d="M 50 35 L 50 185" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Shoulders */}
        <path d="M 47 35 C 42 35, 30 38, 24 45" />
        <path d="M 53 35 C 58 35, 70 38, 76 45" />
        
        {/* Shoulder blades */}
        <path d="M 30 52 C 36 62, 44 68, 48 64" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 70 52 C 64 62, 56 68, 52 64" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Torso */}
        <path d="M 24 45 L 22 55 C 21 65, 24 80, 28 95 C 32 110, 30 125, 26 145 C 23 160, 21 175, 23 190" />
        <path d="M 76 45 L 78 55 C 79 65, 76 80, 72 95 C 68 110, 70 125, 74 145 C 77 160, 79 175, 77 190" />
        
        {/* Lower back curve */}
        <path d="M 32 115 C 40 128, 50 132, 50 132 C 50 132, 60 128, 68 115" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms */}
        <path d="M 24 45 C 20 52, 16 65, 14 80 C 12 95, 11 110, 11 125 C 11 140, 10 155, 9 170" />
        <path d="M 76 45 C 80 52, 84 65, 86 80 C 88 95, 89 110, 89 125 C 89 140, 90 155, 91 170" />
        <path d="M 22 55 C 19 65, 17 78, 16 92 C 15 106, 14 120, 13 135 C 12 150, 12 162, 12 175" />
        <path d="M 78 55 C 81 65, 83 78, 84 92 C 85 106, 86 120, 87 135 C 88 150, 88 162, 88 175" />
        
        {/* Hands */}
        <path d="M 9 170 C 7 180, 6 188, 8 195 L 12 195 C 14 190, 14 182, 13 172" />
        <path d="M 91 170 C 93 180, 94 188, 92 195 L 88 195 C 86 190, 86 182, 87 172" />
        
        {/* Gluteal curves */}
        <path d="M 28 175 C 38 195, 50 200, 50 200 C 50 200, 62 195, 72 175" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 50 200 L 50 215" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Hips */}
        <path d="M 23 190 C 20 210, 20 230, 25 250" />
        <path d="M 77 190 C 80 210, 80 230, 75 250" />
        <path d="M 44 185 C 42 200, 40 220, 40 240" />
        <path d="M 56 185 C 58 200, 60 220, 60 240" />
        
        {/* Legs */}
        <path d="M 25 250 C 24 275, 26 295, 30 320" />
        <path d="M 40 240 C 38 265, 38 290, 40 320" />
        <path d="M 75 250 C 76 275, 74 295, 70 320" />
        <path d="M 60 240 C 62 265, 62 290, 60 320" />
        
        {/* Knees */}
        <path d="M 30 320 C 28 332, 28 345, 30 355" />
        <path d="M 40 320 C 38 332, 38 345, 40 355" />
        <path d="M 70 320 C 72 332, 72 345, 70 355" />
        <path d="M 60 320 C 62 332, 62 345, 60 355" />
        
        {/* Lower legs */}
        <path d="M 30 355 C 28 380, 27 400, 28 420" />
        <path d="M 40 355 C 38 380, 38 400, 38 420" />
        <path d="M 70 355 C 72 380, 73 400, 72 420" />
        <path d="M 60 355 C 62 380, 62 400, 62 420" />
        
        {/* Calf muscles */}
        <path d="M 32 360 C 36 380, 37 400, 34 415" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 68 360 C 64 380, 63 400, 66 415" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Feet/heels */}
        <path d="M 28 420 C 28 428, 32 434, 36 435 L 38 435 C 40 430, 38 422, 38 420" />
        <path d="M 72 420 C 72 428, 68 434, 64 435 L 62 435 C 60 430, 62 422, 62 420" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="50" cy="18" rx="8" ry="10" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="46" y="27" width="8" height="9" rx="2" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="30" cy="42" rx="10" ry="7" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="70" cy="42" rx="10" ry="7" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="50" cy="68" rx="18" ry="22" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="17" cy="90" rx="5" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="83" cy="90" rx="5" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="12" cy="150" rx="4" ry="22" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="88" cy="150" rx="4" ry="22" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="10" cy="188" rx="5" ry="12" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="90" cy="188" rx="5" ry="12" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="50" cy="130" rx="18" ry="28" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="30" cy="210" rx="10" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="70" cy="210" rx="10" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="34" cy="280" rx="10" ry="35" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="66" cy="280" rx="10" ry="35" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="35" cy="335" rx="6" ry="12" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="65" cy="335" rx="6" ry="12" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="34" cy="390" rx="6" ry="35" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="66" cy="390" rx="6" ry="35" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="34" cy="430" rx="7" ry="6" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="66" cy="430" rx="7" ry="6" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  const renderView = () => {
    if (gender === 'female') {
      return view === 'front' ? <FemaleFrontView /> : <FemaleBackView />;
    }
    return view === 'front' ? <MaleFrontView /> : <MaleBackView />;
  };

  return (
    <svg
      viewBox="0 0 100 440"
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      {renderView()}
    </svg>
  );
}
