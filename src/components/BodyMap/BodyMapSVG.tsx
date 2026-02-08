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

  const stroke = '#333';
  const detail = '#666';

  // Male Front View - Adult proportions (8 heads tall)
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Head - oval */}
        <ellipse cx="100" cy="30" rx="18" ry="24" />
        
        {/* Ears */}
        <path d="M 82 28 C 79 24, 79 34, 82 32" />
        <path d="M 118 28 C 121 24, 121 34, 118 32" />
        
        {/* Face simplified */}
        <path d="M 93 24 L 95 24 M 105 24 L 107 24" strokeWidth="0.8" />
        <path d="M 100 30 L 100 36" strokeWidth="0.6" />
        <path d="M 95 42 Q 100 46 105 42" strokeWidth="0.6" />
        
        {/* Neck */}
        <line x1="92" y1="54" x2="92" y2="72" />
        <line x1="108" y1="54" x2="108" y2="72" />
        
        {/* Trapezius to shoulders */}
        <path d="M 92 72 Q 70 74 50 88" />
        <path d="M 108 72 Q 130 74 150 88" />
        
        {/* Deltoids */}
        <path d="M 50 88 Q 42 95 38 115" />
        <path d="M 150 88 Q 158 95 162 115" />
        
        {/* Outer torso - chest to waist to hips */}
        <path d="M 50 88 L 55 100 Q 58 130 62 155 Q 64 175 60 195 Q 56 220 58 245" />
        <path d="M 150 88 L 145 100 Q 142 130 138 155 Q 136 175 140 195 Q 144 220 142 245" />
        
        {/* Pectorals */}
        <path d="M 60 100 Q 75 115 98 112" strokeWidth="0.6" stroke={detail} />
        <path d="M 140 100 Q 125 115 102 112" strokeWidth="0.6" stroke={detail} />
        
        {/* Sternum and abs */}
        <line x1="100" y1="72" x2="100" y2="230" strokeWidth="0.5" stroke={detail} />
        <path d="M 78 115 L 78 195" strokeWidth="0.5" stroke={detail} />
        <path d="M 122 115 L 122 195" strokeWidth="0.5" stroke={detail} />
        <path d="M 78 130 Q 100 135 122 130" strokeWidth="0.4" stroke={detail} />
        <path d="M 78 155 Q 100 160 122 155" strokeWidth="0.4" stroke={detail} />
        <path d="M 78 180 Q 100 185 122 180" strokeWidth="0.4" stroke={detail} />
        
        {/* Navel */}
        <ellipse cx="100" cy="200" rx="3" ry="4" strokeWidth="0.5" stroke={detail} />
        
        {/* Iliac crest (V-lines) */}
        <path d="M 62 195 Q 78 220 88 245" strokeWidth="0.5" stroke={detail} />
        <path d="M 138 195 Q 122 220 112 245" strokeWidth="0.5" stroke={detail} />
        
        {/* Groin area */}
        <path d="M 88 245 Q 100 265 112 245" strokeWidth="0.5" stroke={detail} />
        
        {/* Upper arms - biceps/triceps */}
        <path d="M 38 115 Q 34 145 32 175 Q 30 200 28 225" />
        <path d="M 55 100 Q 48 130 45 160 Q 42 190 40 220" />
        <path d="M 162 115 Q 166 145 168 175 Q 170 200 172 225" />
        <path d="M 145 100 Q 152 130 155 160 Q 158 190 160 220" />
        
        {/* Elbow area */}
        <path d="M 28 225 Q 26 240 28 255" />
        <path d="M 40 220 Q 38 235 40 250" />
        <path d="M 172 225 Q 174 240 172 255" />
        <path d="M 160 220 Q 162 235 160 250" />
        
        {/* Forearms */}
        <path d="M 28 255 Q 24 290 20 325" />
        <path d="M 40 250 Q 36 285 32 320" />
        <path d="M 172 255 Q 176 290 180 325" />
        <path d="M 160 250 Q 164 285 168 320" />
        
        {/* Wrists and hands */}
        <path d="M 20 325 Q 16 340 14 355 Q 14 370 20 378 Q 28 382 36 375 Q 38 365 36 350 Q 34 335 32 320" />
        <path d="M 180 325 Q 184 340 186 355 Q 186 370 180 378 Q 172 382 164 375 Q 162 365 164 350 Q 166 335 168 320" />
        
        {/* Fingers */}
        <path d="M 16 368 L 12 385 M 22 372 L 18 392 M 28 374 L 26 394 M 34 372 L 34 390" strokeWidth="0.6" />
        <path d="M 184 368 L 188 385 M 178 372 L 182 392 M 172 374 L 174 394 M 166 372 L 166 390" strokeWidth="0.6" />
        
        {/* Hips to thighs */}
        <path d="M 58 245 Q 54 270 52 300 Q 50 340 54 380" />
        <path d="M 142 245 Q 146 270 148 300 Q 150 340 146 380" />
        
        {/* Inner thighs */}
        <path d="M 88 260 Q 82 300 80 340 Q 78 370 80 400" />
        <path d="M 112 260 Q 118 300 120 340 Q 122 370 120 400" />
        
        {/* Thigh muscles */}
        <path d="M 62 280 Q 70 320 72 360" strokeWidth="0.5" stroke={detail} />
        <path d="M 138 280 Q 130 320 128 360" strokeWidth="0.5" stroke={detail} />
        
        {/* Knees */}
        <path d="M 54 380 Q 50 400 54 420" />
        <path d="M 80 400 Q 76 415 80 430" />
        <path d="M 146 380 Q 150 400 146 420" />
        <path d="M 120 400 Q 124 415 120 430" />
        <ellipse cx="67" cy="400" rx="10" ry="15" strokeWidth="0.5" stroke={detail} />
        <ellipse cx="133" cy="400" rx="10" ry="15" strokeWidth="0.5" stroke={detail} />
        
        {/* Calves */}
        <path d="M 54 420 Q 50 470 52 520 Q 54 550 58 575" />
        <path d="M 80 430 Q 76 475 78 520 Q 80 550 78 575" />
        <path d="M 146 420 Q 150 470 148 520 Q 146 550 142 575" />
        <path d="M 120 430 Q 124 475 122 520 Q 120 550 122 575" />
        
        {/* Calf muscle definition */}
        <path d="M 60 440 Q 68 480 65 530" strokeWidth="0.5" stroke={detail} />
        <path d="M 140 440 Q 132 480 135 530" strokeWidth="0.5" stroke={detail} />
        
        {/* Ankles */}
        <path d="M 58 575 Q 56 590 60 600" />
        <path d="M 78 575 Q 76 588 74 598" />
        <path d="M 142 575 Q 144 590 140 600" />
        <path d="M 122 575 Q 124 588 126 598" />
        
        {/* Feet */}
        <path d="M 60 600 Q 48 608 42 614 Q 38 620 45 625 Q 60 630 78 625 Q 80 618 74 605" />
        <path d="M 140 600 Q 152 608 158 614 Q 162 620 155 625 Q 140 630 122 625 Q 120 618 126 605" />
        
        {/* Toes */}
        <path d="M 44 622 L 42 632 M 52 624 L 50 635 M 60 625 L 59 636 M 68 625 L 68 634 M 74 624 L 76 632" strokeWidth="0.5" />
        <path d="M 156 622 L 158 632 M 148 624 L 150 635 M 140 625 L 141 636 M 132 625 L 132 634 M 126 624 L 124 632" strokeWidth="0.5" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="30" rx="20" ry="26" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="54" width="20" height="20" rx="4" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="60" cy="85" rx="18" ry="12" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="140" cy="85" rx="18" ry="12" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="115" rx="40" ry="30" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="42" cy="165" rx="12" ry="45" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="158" cy="165" rx="12" ry="45" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="32" cy="285" rx="10" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="168" cy="285" rx="10" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="24" cy="365" rx="14" ry="22" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="176" cy="365" rx="14" ry="22" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="180" rx="32" ry="35" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="240" rx="28" ry="25" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="68" cy="270" rx="14" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="132" cy="270" rx="14" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="67" cy="340" rx="16" ry="50" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="133" cy="340" rx="16" ry="50" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="67" cy="405" rx="14" ry="20" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="133" cy="405" rx="14" ry="20" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="66" cy="500" rx="14" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="134" cy="500" rx="14" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="60" cy="620" rx="20" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="140" cy="620" rx="20" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Male Back View
  const MaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="100" cy="30" rx="18" ry="24" />
        <path d="M 82 28 C 79 24, 79 34, 82 32" />
        <path d="M 118 28 C 121 24, 121 34, 118 32" />
        
        {/* Neck */}
        <line x1="92" y1="54" x2="92" y2="72" />
        <line x1="108" y1="54" x2="108" y2="72" />
        
        {/* Spine */}
        <line x1="100" y1="72" x2="100" y2="245" strokeWidth="0.6" stroke={detail} />
        
        {/* Trapezius */}
        <path d="M 92 72 Q 70 74 50 88" />
        <path d="M 108 72 Q 130 74 150 88" />
        
        {/* Deltoids */}
        <path d="M 50 88 Q 42 95 38 115" />
        <path d="M 150 88 Q 158 95 162 115" />
        
        {/* Torso */}
        <path d="M 50 88 L 55 100 Q 58 130 62 155 Q 64 175 60 195 Q 56 220 58 245" />
        <path d="M 150 88 L 145 100 Q 142 130 138 155 Q 136 175 140 195 Q 144 220 142 245" />
        
        {/* Shoulder blades */}
        <path d="M 62 100 Q 75 120 95 118" strokeWidth="0.5" stroke={detail} />
        <path d="M 138 100 Q 125 120 105 118" strokeWidth="0.5" stroke={detail} />
        
        {/* Latissimus */}
        <path d="M 60 120 Q 72 150 80 180" strokeWidth="0.5" stroke={detail} />
        <path d="M 140 120 Q 128 150 120 180" strokeWidth="0.5" stroke={detail} />
        
        {/* Lower back */}
        <path d="M 70 190 Q 85 210 100 212 Q 115 210 130 190" strokeWidth="0.5" stroke={detail} />
        
        {/* Gluteal */}
        <path d="M 65 230 Q 85 255 100 258 Q 115 255 135 230" strokeWidth="0.5" stroke={detail} />
        <line x1="100" y1="245" x2="100" y2="270" strokeWidth="0.5" stroke={detail} />
        
        {/* Arms */}
        <path d="M 38 115 Q 34 145 32 175 Q 30 200 28 225" />
        <path d="M 55 100 Q 48 130 45 160 Q 42 190 40 220" />
        <path d="M 162 115 Q 166 145 168 175 Q 170 200 172 225" />
        <path d="M 145 100 Q 152 130 155 160 Q 158 190 160 220" />
        
        {/* Elbows and forearms */}
        <path d="M 28 225 Q 26 240 28 255 Q 24 290 20 325" />
        <path d="M 40 220 Q 38 235 40 250 Q 36 285 32 320" />
        <path d="M 172 225 Q 174 240 172 255 Q 176 290 180 325" />
        <path d="M 160 220 Q 162 235 160 250 Q 164 285 168 320" />
        
        {/* Hands */}
        <path d="M 20 325 Q 16 340 14 355 Q 14 370 20 378 Q 28 382 36 375 Q 38 365 36 350 Q 34 335 32 320" />
        <path d="M 180 325 Q 184 340 186 355 Q 186 370 180 378 Q 172 382 164 375 Q 162 365 164 350 Q 166 335 168 320" />
        
        {/* Legs */}
        <path d="M 58 245 Q 54 270 52 300 Q 50 340 54 380 Q 50 400 54 420 Q 50 470 52 520 Q 54 550 58 575" />
        <path d="M 88 260 Q 82 300 80 340 Q 78 370 80 400 Q 76 415 80 430 Q 76 475 78 520 Q 80 550 78 575" />
        <path d="M 142 245 Q 146 270 148 300 Q 150 340 146 380 Q 150 400 146 420 Q 150 470 148 520 Q 146 550 142 575" />
        <path d="M 112 260 Q 118 300 120 340 Q 122 370 120 400 Q 124 415 120 430 Q 124 475 122 520 Q 120 550 122 575" />
        
        {/* Calf muscles */}
        <path d="M 60 440 Q 70 480 66 530" strokeWidth="0.5" stroke={detail} />
        <path d="M 140 440 Q 130 480 134 530" strokeWidth="0.5" stroke={detail} />
        
        {/* Feet/heels */}
        <path d="M 58 575 Q 54 590 58 605 Q 65 612 78 608 Q 82 595 78 580" />
        <path d="M 142 575 Q 146 590 142 605 Q 135 612 122 608 Q 118 595 122 580" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="30" rx="20" ry="26" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="54" width="20" height="20" rx="4" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="60" cy="85" rx="18" ry="12" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="140" cy="85" rx="18" ry="12" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="120" rx="40" ry="35" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="42" cy="165" rx="12" ry="45" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="158" cy="165" rx="12" ry="45" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="32" cy="285" rx="10" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="168" cy="285" rx="10" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="24" cy="365" rx="14" ry="22" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="176" cy="365" rx="14" ry="22" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="200" rx="35" ry="45" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="68" cy="270" rx="14" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="132" cy="270" rx="14" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="67" cy="340" rx="16" ry="50" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="133" cy="340" rx="16" ry="50" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="67" cy="405" rx="14" ry="20" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="133" cy="405" rx="14" ry="20" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="66" cy="500" rx="14" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="134" cy="500" rx="14" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="68" cy="598" rx="14" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="132" cy="598" rx="14" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Front View - Adult proportions with feminine curves
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Hair */}
        <path d="M 80 18 Q 75 30 76 50" strokeWidth="0.7" />
        <path d="M 120 18 Q 125 30 124 50" strokeWidth="0.7" />
        <path d="M 80 18 Q 90 8 100 6 Q 110 8 120 18" strokeWidth="0.7" />
        
        {/* Head */}
        <ellipse cx="100" cy="30" rx="17" ry="22" />
        
        {/* Face */}
        <path d="M 94 25 L 96 25 M 104 25 L 106 25" strokeWidth="0.7" />
        <path d="M 100 30 L 100 35" strokeWidth="0.5" />
        <path d="M 96 40 Q 100 44 104 40" strokeWidth="0.5" />
        
        {/* Neck - slender */}
        <line x1="94" y1="52" x2="94" y2="70" />
        <line x1="106" y1="52" x2="106" y2="70" />
        
        {/* Shoulders - narrower, sloped */}
        <path d="M 94 70 Q 75 72 58 84" />
        <path d="M 106 70 Q 125 72 142 84" />
        
        {/* Deltoids */}
        <path d="M 58 84 Q 52 90 50 108" />
        <path d="M 142 84 Q 148 90 150 108" />
        
        {/* Torso - hourglass shape */}
        <path d="M 58 84 L 62 95 Q 66 115 70 135 Q 72 155 66 180 Q 60 210 55 240 Q 50 270 52 300" />
        <path d="M 142 84 L 138 95 Q 134 115 130 135 Q 128 155 134 180 Q 140 210 145 240 Q 150 270 148 300" />
        
        {/* Breasts */}
        <ellipse cx="78" cy="105" rx="14" ry="16" strokeWidth="0.6" stroke={detail} />
        <ellipse cx="122" cy="105" rx="14" ry="16" strokeWidth="0.6" stroke={detail} />
        
        {/* Center line */}
        <line x1="100" y1="70" x2="100" y2="280" strokeWidth="0.4" stroke={detail} />
        
        {/* Waist definition */}
        <path d="M 72 155 Q 86 160 100 162 Q 114 160 128 155" strokeWidth="0.4" stroke={detail} />
        
        {/* Navel */}
        <ellipse cx="100" cy="200" rx="2.5" ry="3.5" strokeWidth="0.5" stroke={detail} />
        
        {/* Pelvic curves */}
        <path d="M 66 240 Q 82 260 100 265 Q 118 260 134 240" strokeWidth="0.4" stroke={detail} />
        
        {/* Arms */}
        <path d="M 50 108 Q 46 135 44 165 Q 42 195 40 225" />
        <path d="M 62 95 Q 56 125 54 155 Q 52 185 50 215" />
        <path d="M 150 108 Q 154 135 156 165 Q 158 195 160 225" />
        <path d="M 138 95 Q 144 125 146 155 Q 148 185 150 215" />
        
        {/* Elbows and forearms */}
        <path d="M 40 225 Q 38 240 40 255 Q 36 290 32 325" />
        <path d="M 50 215 Q 48 230 50 245 Q 46 280 42 315" />
        <path d="M 160 225 Q 162 240 160 255 Q 164 290 168 325" />
        <path d="M 150 215 Q 152 230 150 245 Q 154 280 158 315" />
        
        {/* Hands */}
        <path d="M 32 325 Q 28 340 26 352 Q 26 365 32 372 Q 40 376 48 370 Q 50 360 48 348 Q 46 335 42 320" />
        <path d="M 168 325 Q 172 340 174 352 Q 174 365 168 372 Q 160 376 152 370 Q 150 360 152 348 Q 154 335 158 320" />
        
        {/* Fingers */}
        <path d="M 28 365 L 24 380 M 34 368 L 30 385 M 40 368 L 38 384 M 46 366 L 46 380" strokeWidth="0.5" />
        <path d="M 172 365 L 176 380 M 166 368 L 170 385 M 160 368 L 162 384 M 154 366 L 154 380" strokeWidth="0.5" />
        
        {/* Hips - wider */}
        <path d="M 52 300 Q 48 340 52 380" />
        <path d="M 148 300 Q 152 340 148 380" />
        
        {/* Inner thighs */}
        <path d="M 82 285 Q 78 330 80 375 Q 78 395 82 415" />
        <path d="M 118 285 Q 122 330 120 375 Q 122 395 118 415" />
        
        {/* Thigh gap */}
        <path d="M 82 285 Q 92 300 100 305 Q 108 300 118 285" strokeWidth="0.4" stroke={detail} />
        
        {/* Knees */}
        <path d="M 52 380 Q 48 400 52 420" />
        <path d="M 82 415 Q 78 428 82 440" />
        <path d="M 148 380 Q 152 400 148 420" />
        <path d="M 118 415 Q 122 428 118 440" />
        
        {/* Lower legs */}
        <path d="M 52 420 Q 48 470 52 520 Q 56 555 62 580" />
        <path d="M 82 440 Q 78 485 80 530 Q 82 555 80 580" />
        <path d="M 148 420 Q 152 470 148 520 Q 144 555 138 580" />
        <path d="M 118 440 Q 122 485 120 530 Q 118 555 120 580" />
        
        {/* Ankles and feet */}
        <path d="M 62 580 Q 58 595 62 605 Q 52 612 46 618 Q 42 624 50 628 Q 68 632 82 626 Q 86 618 80 585" />
        <path d="M 138 580 Q 142 595 138 605 Q 148 612 154 618 Q 158 624 150 628 Q 132 632 118 626 Q 114 618 120 585" />
        
        {/* Toes */}
        <path d="M 48 625 L 46 634 M 56 627 L 54 636 M 64 628 L 63 637 M 72 627 L 72 635 M 78 626 L 80 633" strokeWidth="0.5" />
        <path d="M 152 625 L 154 634 M 144 627 L 146 636 M 136 628 L 137 637 M 128 627 L 128 635 M 122 626 L 120 633" strokeWidth="0.5" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="30" rx="19" ry="24" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="92" y="52" width="16" height="20" rx="4" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="65" cy="82" rx="15" ry="10" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="135" cy="82" rx="15" ry="10" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="110" rx="35" ry="28" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="50" cy="160" rx="10" ry="40" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="150" cy="160" rx="10" ry="40" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="42" cy="285" rx="9" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="158" cy="285" rx="9" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="36" cy="360" rx="12" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="164" cy="360" rx="12" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="180" rx="30" ry="35" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="250" rx="32" ry="30" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="62" cy="310" rx="16" ry="25" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="138" cy="310" rx="16" ry="25" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="66" cy="365" rx="18" ry="45" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="134" cy="365" rx="18" ry="45" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="67" cy="420" rx="14" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="133" cy="420" rx="14" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="66" cy="510" rx="14" ry="55" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="134" cy="510" rx="14" ry="55" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="64" cy="622" rx="20" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="136" cy="622" rx="20" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Back View
  const FemaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Hair */}
        <path d="M 80 18 Q 75 30 76 50" strokeWidth="0.7" />
        <path d="M 120 18 Q 125 30 124 50" strokeWidth="0.7" />
        <path d="M 80 18 Q 90 8 100 6 Q 110 8 120 18" strokeWidth="0.7" />
        
        {/* Head */}
        <ellipse cx="100" cy="30" rx="17" ry="22" />
        
        {/* Neck */}
        <line x1="94" y1="52" x2="94" y2="70" />
        <line x1="106" y1="52" x2="106" y2="70" />
        
        {/* Spine */}
        <line x1="100" y1="70" x2="100" y2="280" strokeWidth="0.5" stroke={detail} />
        
        {/* Shoulders */}
        <path d="M 94 70 Q 75 72 58 84" />
        <path d="M 106 70 Q 125 72 142 84" />
        <path d="M 58 84 Q 52 90 50 108" />
        <path d="M 142 84 Q 148 90 150 108" />
        
        {/* Shoulder blades */}
        <path d="M 66 95 Q 78 115 96 112" strokeWidth="0.5" stroke={detail} />
        <path d="M 134 95 Q 122 115 104 112" strokeWidth="0.5" stroke={detail} />
        
        {/* Torso */}
        <path d="M 58 84 L 62 95 Q 66 115 70 135 Q 72 155 66 180 Q 60 210 55 240 Q 50 270 52 300" />
        <path d="M 142 84 L 138 95 Q 134 115 130 135 Q 128 155 134 180 Q 140 210 145 240 Q 150 270 148 300" />
        
        {/* Lower back */}
        <path d="M 72 180 Q 86 200 100 202 Q 114 200 128 180" strokeWidth="0.5" stroke={detail} />
        
        {/* Gluteal */}
        <path d="M 58 270 Q 78 300 100 305 Q 122 300 142 270" strokeWidth="0.5" stroke={detail} />
        <line x1="100" y1="280" x2="100" y2="310" strokeWidth="0.4" stroke={detail} />
        
        {/* Arms */}
        <path d="M 50 108 Q 46 135 44 165 Q 42 195 40 225 Q 38 240 40 255 Q 36 290 32 325" />
        <path d="M 62 95 Q 56 125 54 155 Q 52 185 50 215 Q 48 230 50 245 Q 46 280 42 315" />
        <path d="M 150 108 Q 154 135 156 165 Q 158 195 160 225 Q 162 240 160 255 Q 164 290 168 325" />
        <path d="M 138 95 Q 144 125 146 155 Q 148 185 150 215 Q 152 230 150 245 Q 154 280 158 315" />
        
        {/* Hands */}
        <path d="M 32 325 Q 28 340 26 352 Q 26 365 32 372 Q 40 376 48 370 Q 50 360 48 348 Q 46 335 42 320" />
        <path d="M 168 325 Q 172 340 174 352 Q 174 365 168 372 Q 160 376 152 370 Q 150 360 152 348 Q 154 335 158 320" />
        
        {/* Legs */}
        <path d="M 52 300 Q 48 340 52 380 Q 48 400 52 420 Q 48 470 52 520 Q 56 555 62 580" />
        <path d="M 82 285 Q 78 330 80 375 Q 78 395 82 415 Q 78 428 82 440 Q 78 485 80 530 Q 82 555 80 580" />
        <path d="M 148 300 Q 152 340 148 380 Q 152 400 148 420 Q 152 470 148 520 Q 144 555 138 580" />
        <path d="M 118 285 Q 122 330 120 375 Q 122 395 118 415 Q 122 428 118 440 Q 122 485 120 530 Q 118 555 120 580" />
        
        {/* Calf muscles */}
        <path d="M 58 450 Q 68 490 64 540" strokeWidth="0.5" stroke={detail} />
        <path d="M 142 450 Q 132 490 136 540" strokeWidth="0.5" stroke={detail} />
        
        {/* Feet/heels */}
        <path d="M 62 580 Q 58 595 64 608 Q 72 615 82 608 Q 86 595 80 582" />
        <path d="M 138 580 Q 142 595 136 608 Q 128 615 118 608 Q 114 595 120 582" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="30" rx="19" ry="24" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="92" y="52" width="16" height="20" rx="4" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="65" cy="82" rx="15" ry="10" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="135" cy="82" rx="15" ry="10" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="115" rx="35" ry="32" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="50" cy="160" rx="10" ry="40" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="150" cy="160" rx="10" ry="40" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="42" cy="285" rx="9" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="158" cy="285" rx="9" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="36" cy="360" rx="12" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="164" cy="360" rx="12" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="200" rx="35" ry="50" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="62" cy="310" rx="16" ry="25" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="138" cy="310" rx="16" ry="25" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="66" cy="365" rx="18" ry="45" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="134" cy="365" rx="18" ry="45" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="67" cy="420" rx="14" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="133" cy="420" rx="14" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="66" cy="510" rx="14" ry="55" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="134" cy="510" rx="14" ry="55" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="70" cy="600" rx="14" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="130" cy="600" rx="14" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
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
      viewBox="0 0 200 650"
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      {renderView()}
    </svg>
  );
}
