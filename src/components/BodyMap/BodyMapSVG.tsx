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

  // Matching the reference: black outlines on light background
  const strokeColor = '#3a3a3a';
  const detailColor = '#6a6a6a';
  const strokeWidth = '1.2';
  const thinStroke = '0.6';

  // Male Front View - with anatomical details matching reference
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair */}
        <path d="M 85 18 C 82 12, 85 5, 100 4 C 115 5, 118 12, 115 18" stroke={strokeColor} strokeWidth={thinStroke} />
        
        {/* Head outline */}
        <ellipse cx="100" cy="30" rx="16" ry="20" />
        
        {/* Face details */}
        <path d="M 94 25 L 96 25 M 104 25 L 106 25" strokeWidth={thinStroke} /> {/* Eyes */}
        <path d="M 100 30 L 100 34 L 98 36" strokeWidth={thinStroke} /> {/* Nose */}
        <path d="M 95 40 C 97 42, 103 42, 105 40" strokeWidth={thinStroke} /> {/* Mouth */}
        
        {/* Ears */}
        <path d="M 84 28 C 82 26, 82 32, 84 34" strokeWidth={thinStroke} />
        <path d="M 116 28 C 118 26, 118 32, 116 34" strokeWidth={thinStroke} />
        
        {/* Neck */}
        <path d="M 92 50 L 92 62" />
        <path d="M 108 50 L 108 62" />
        <path d="M 95 52 C 100 54, 105 52, 105 52" strokeWidth={thinStroke} stroke={detailColor} /> {/* Adam's apple */}
        
        {/* Shoulders - broad and square for male */}
        <path d="M 92 62 C 85 62, 55 65, 40 75 C 28 85, 22 98, 20 115" />
        <path d="M 108 62 C 115 62, 145 65, 160 75 C 172 85, 178 98, 180 115" />
        
        {/* Trapezius */}
        <path d="M 92 62 C 80 68, 70 72, 65 75" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 108 62 C 120 68, 130 72, 135 75" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Torso outline */}
        <path d="M 65 75 L 62 95 C 60 120, 58 150, 60 180 C 62 210, 68 240, 72 270" />
        <path d="M 135 75 L 138 95 C 140 120, 142 150, 140 180 C 138 210, 132 240, 128 270" />
        
        {/* Chest muscles - pectorals */}
        <path d="M 68 90 C 78 100, 92 105, 98 100" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 132 90 C 122 100, 108 105, 102 100" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 85 95 C 90 98, 95 98, 98 95" strokeWidth={thinStroke} stroke={detailColor} /> {/* nipple area */}
        <path d="M 115 95 C 110 98, 105 98, 102 95" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Center line - sternum to navel */}
        <path d="M 100 62 L 100 100" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 100 105 L 100 265" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Abs definition */}
        <path d="M 88 120 L 88 200" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 112 120 L 112 200" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 88 135 C 94 138, 106 138, 112 135" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 88 160 C 94 163, 106 163, 112 160" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 88 185 C 94 188, 106 188, 112 185" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Navel */}
        <ellipse cx="100" cy="210" rx="3" ry="4" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* V-lines (iliac furrow) */}
        <path d="M 72 220 C 80 240, 88 255, 92 270" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 128 220 C 120 240, 112 255, 108 270" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Pelvis/hips outline */}
        <path d="M 72 270 C 70 285, 68 300, 70 320" />
        <path d="M 128 270 C 130 285, 132 300, 130 320" />
        
        {/* Groin area */}
        <path d="M 92 270 L 92 310 C 92 320, 94 330, 100 340" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 108 270 L 108 310 C 108 320, 106 330, 100 340" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Upper arms */}
        <path d="M 20 115 C 18 135, 16 160, 15 190" />
        <path d="M 180 115 C 182 135, 184 160, 185 190" />
        <path d="M 40 115 C 38 135, 36 160, 35 190" />
        <path d="M 160 115 C 162 135, 164 160, 165 190" />
        
        {/* Bicep definition */}
        <path d="M 25 130 C 30 145, 32 160, 30 175" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 175 130 C 170 145, 168 160, 170 175" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Elbows */}
        <path d="M 15 190 C 14 200, 14 210, 16 220" />
        <path d="M 35 190 C 36 200, 36 210, 34 220" />
        <path d="M 185 190 C 186 200, 186 210, 184 220" />
        <path d="M 165 190 C 164 200, 164 210, 166 220" />
        
        {/* Forearms */}
        <path d="M 16 220 C 14 250, 12 280, 10 310" />
        <path d="M 34 220 C 32 250, 30 280, 28 310" />
        <path d="M 184 220 C 186 250, 188 280, 190 310" />
        <path d="M 166 220 C 168 250, 170 280, 172 310" />
        
        {/* Wrists and hands */}
        <path d="M 10 310 C 8 320, 6 330, 5 340 L 8 355 C 12 362, 20 365, 28 360 L 28 340 C 28 330, 28 320, 28 310" />
        <path d="M 190 310 C 192 320, 194 330, 195 340 L 192 355 C 188 362, 180 365, 172 360 L 172 340 C 172 330, 172 320, 172 310" />
        
        {/* Fingers indication */}
        <path d="M 8 345 L 4 360 M 12 348 L 8 368 M 17 350 L 14 372 M 22 348 L 20 368" strokeWidth={thinStroke} />
        <path d="M 192 345 L 196 360 M 188 348 L 192 368 M 183 350 L 186 372 M 178 348 L 180 368" strokeWidth={thinStroke} />
        
        {/* Thighs */}
        <path d="M 70 320 C 68 360, 68 400, 72 440" />
        <path d="M 92 340 C 88 380, 86 420, 88 460" />
        <path d="M 130 320 C 132 360, 132 400, 128 440" />
        <path d="M 108 340 C 112 380, 114 420, 112 460" />
        
        {/* Thigh muscle definition */}
        <path d="M 78 340 C 82 380, 84 420, 85 450" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 122 340 C 118 380, 116 420, 115 450" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Knees */}
        <path d="M 72 440 C 70 450, 70 465, 72 480" />
        <path d="M 88 460 C 86 470, 86 480, 88 495" />
        <path d="M 128 440 C 130 450, 130 465, 128 480" />
        <path d="M 112 460 C 114 470, 114 480, 112 495" />
        <ellipse cx="80" cy="465" rx="8" ry="12" strokeWidth={thinStroke} stroke={detailColor} /> {/* Kneecap */}
        <ellipse cx="120" cy="465" rx="8" ry="12" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Lower legs */}
        <path d="M 72 480 C 70 520, 68 560, 68 600" />
        <path d="M 88 495 C 86 535, 84 575, 84 610" />
        <path d="M 128 480 C 130 520, 132 560, 132 600" />
        <path d="M 112 495 C 114 535, 116 575, 116 610" />
        
        {/* Shin/calf definition */}
        <path d="M 75 500 C 78 530, 80 560, 78 590" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 125 500 C 122 530, 120 560, 122 590" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Ankles */}
        <path d="M 68 600 C 66 610, 66 620, 70 625" />
        <path d="M 84 610 C 82 618, 82 622, 85 625" />
        <path d="M 132 600 C 134 610, 134 620, 130 625" />
        <path d="M 116 610 C 118 618, 118 622, 115 625" />
        
        {/* Feet */}
        <path d="M 70 625 C 60 628, 50 630, 48 632 C 45 635, 48 640, 55 642 L 80 642 C 85 640, 85 635, 85 625" />
        <path d="M 130 625 C 140 628, 150 630, 152 632 C 155 635, 152 640, 145 642 L 120 642 C 115 640, 115 635, 115 625" />
        
        {/* Toes */}
        <path d="M 52 640 L 50 648 M 58 641 L 56 650 M 64 642 L 63 651 M 70 642 L 70 650 M 76 641 L 77 648" strokeWidth={thinStroke} />
        <path d="M 148 640 L 150 648 M 142 641 L 144 650 M 136 642 L 137 651 M 130 642 L 130 650 M 124 641 L 123 648" strokeWidth={thinStroke} />
      </g>
      
      {/* Clickable zones - transparent overlays */}
      <ellipse cx="100" cy="30" rx="18" ry="22" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="50" width="20" height="14" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="52" cy="75" rx="22" ry="15" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="148" cy="75" rx="22" ry="15" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="105" rx="38" ry="32" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="30" cy="150" rx="14" ry="35" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="170" cy="150" rx="14" ry="35" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="25" cy="265" rx="12" ry="40" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="175" cy="265" rx="12" ry="40" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="16" cy="345" rx="14" ry="22" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="184" cy="345" rx="14" ry="22" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="180" rx="30" ry="40" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="260" rx="26" ry="25" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="75" cy="300" rx="14" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="300" rx="14" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="80" cy="390" rx="14" ry="50" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="120" cy="390" rx="14" ry="50" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="80" cy="465" rx="12" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="120" cy="465" rx="12" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="78" cy="550" rx="12" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="122" cy="550" rx="12" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="68" cy="638" rx="22" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="132" cy="638" rx="22" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Male Back View
  const MaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair */}
        <path d="M 85 18 C 82 12, 85 5, 100 4 C 115 5, 118 12, 115 18" stroke={strokeColor} strokeWidth={thinStroke} />
        
        {/* Head outline */}
        <ellipse cx="100" cy="30" rx="16" ry="20" />
        
        {/* Ears */}
        <path d="M 84 28 C 82 26, 82 32, 84 34" strokeWidth={thinStroke} />
        <path d="M 116 28 C 118 26, 118 32, 116 34" strokeWidth={thinStroke} />
        
        {/* Neck */}
        <path d="M 92 50 L 92 62" />
        <path d="M 108 50 L 108 62" />
        
        {/* Shoulders */}
        <path d="M 92 62 C 85 62, 55 65, 40 75 C 28 85, 22 98, 20 115" />
        <path d="M 108 62 C 115 62, 145 65, 160 75 C 172 85, 178 98, 180 115" />
        
        {/* Trapezius muscles */}
        <path d="M 92 62 C 85 70, 75 78, 65 82" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 108 62 C 115 70, 125 78, 135 82" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Spine */}
        <path d="M 100 62 L 100 280" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Torso outline */}
        <path d="M 65 75 L 62 95 C 60 120, 58 150, 60 180 C 62 210, 68 240, 72 270" />
        <path d="M 135 75 L 138 95 C 140 120, 142 150, 140 180 C 138 210, 132 240, 128 270" />
        
        {/* Shoulder blades */}
        <path d="M 70 90 C 75 105, 85 115, 95 112" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 130 90 C 125 105, 115 115, 105 112" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Back muscle definition - latissimus */}
        <path d="M 68 120 C 78 140, 88 160, 92 180" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 132 120 C 122 140, 112 160, 108 180" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Lower back curves */}
        <path d="M 75 200 C 85 215, 95 220, 100 220 C 105 220, 115 215, 125 200" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Pelvis/hips outline */}
        <path d="M 72 270 C 70 285, 68 300, 70 320" />
        <path d="M 128 270 C 130 285, 132 300, 130 320" />
        
        {/* Gluteal line */}
        <path d="M 75 280 C 85 295, 100 300, 100 300 C 100 300, 115 295, 125 280" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 100 300 L 100 330" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Inner thigh line */}
        <path d="M 92 320 L 92 340" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 108 320 L 108 340" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms - same as front */}
        <path d="M 20 115 C 18 135, 16 160, 15 190" />
        <path d="M 180 115 C 182 135, 184 160, 185 190" />
        <path d="M 40 115 C 38 135, 36 160, 35 190" />
        <path d="M 160 115 C 162 135, 164 160, 165 190" />
        
        {/* Tricep definition */}
        <path d="M 28 130 C 30 150, 30 170, 28 185" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 172 130 C 170 150, 170 170, 172 185" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Elbows */}
        <path d="M 15 190 C 14 200, 14 210, 16 220" />
        <path d="M 35 190 C 36 200, 36 210, 34 220" />
        <path d="M 185 190 C 186 200, 186 210, 184 220" />
        <path d="M 165 190 C 164 200, 164 210, 166 220" />
        
        {/* Forearms */}
        <path d="M 16 220 C 14 250, 12 280, 10 310" />
        <path d="M 34 220 C 32 250, 30 280, 28 310" />
        <path d="M 184 220 C 186 250, 188 280, 190 310" />
        <path d="M 166 220 C 168 250, 170 280, 172 310" />
        
        {/* Hands */}
        <path d="M 10 310 C 8 320, 6 330, 5 340 L 8 355 C 12 362, 20 365, 28 360 L 28 340 C 28 330, 28 320, 28 310" />
        <path d="M 190 310 C 192 320, 194 330, 195 340 L 192 355 C 188 362, 180 365, 172 360 L 172 340 C 172 330, 172 320, 172 310" />
        
        {/* Thighs */}
        <path d="M 70 320 C 68 360, 68 400, 72 440" />
        <path d="M 92 340 C 88 380, 86 420, 88 460" />
        <path d="M 130 320 C 132 360, 132 400, 128 440" />
        <path d="M 108 340 C 112 380, 114 420, 112 460" />
        
        {/* Hamstring definition */}
        <path d="M 78 350 C 82 390, 84 430, 85 455" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 122 350 C 118 390, 116 430, 115 455" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Knees */}
        <path d="M 72 440 C 70 450, 70 465, 72 480" />
        <path d="M 88 460 C 86 470, 86 480, 88 495" />
        <path d="M 128 440 C 130 450, 130 465, 128 480" />
        <path d="M 112 460 C 114 470, 114 480, 112 495" />
        
        {/* Lower legs */}
        <path d="M 72 480 C 70 520, 68 560, 68 600" />
        <path d="M 88 495 C 86 535, 84 575, 84 610" />
        <path d="M 128 480 C 130 520, 132 560, 132 600" />
        <path d="M 112 495 C 114 535, 116 575, 116 610" />
        
        {/* Calf muscles */}
        <path d="M 75 490 C 80 520, 82 550, 78 580" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 125 490 C 120 520, 118 550, 122 580" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Ankles and feet */}
        <path d="M 68 600 C 66 610, 66 620, 70 625" />
        <path d="M 84 610 C 82 618, 82 622, 85 625" />
        <path d="M 132 600 C 134 610, 134 620, 130 625" />
        <path d="M 116 610 C 118 618, 118 622, 115 625" />
        
        {/* Feet - heels visible from back */}
        <path d="M 70 625 C 65 630, 62 638, 65 642 L 85 642 C 88 638, 88 630, 85 625" />
        <path d="M 130 625 C 135 630, 138 638, 135 642 L 115 642 C 112 638, 112 630, 115 625" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="30" rx="18" ry="22" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="50" width="20" height="14" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="52" cy="75" rx="22" ry="15" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="148" cy="75" rx="22" ry="15" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="110" rx="38" ry="35" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="30" cy="150" rx="14" ry="35" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="170" cy="150" rx="14" ry="35" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="25" cy="265" rx="12" ry="40" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="175" cy="265" rx="12" ry="40" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="16" cy="345" rx="14" ry="22" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="184" cy="345" rx="14" ry="22" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="195" rx="32" ry="45" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="75" cy="300" rx="14" ry="18" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="300" rx="14" ry="18" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="80" cy="390" rx="14" ry="50" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="120" cy="390" rx="14" ry="50" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="80" cy="465" rx="12" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="120" cy="465" rx="12" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="78" cy="550" rx="12" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="122" cy="550" rx="12" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="75" cy="635" rx="15" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="125" cy="635" rx="15" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Front View - with anatomical details matching reference
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair - longer for female */}
        <path d="M 82 12 C 75 8, 72 15, 70 30 C 68 45, 70 60, 72 70" strokeWidth={thinStroke} />
        <path d="M 118 12 C 125 8, 128 15, 130 30 C 132 45, 130 60, 128 70" strokeWidth={thinStroke} />
        <path d="M 82 12 C 88 5, 100 3, 100 3 C 100 3, 112 5, 118 12" strokeWidth={thinStroke} />
        
        {/* Head outline */}
        <ellipse cx="100" cy="32" rx="15" ry="19" />
        
        {/* Face details */}
        <path d="M 94 27 L 96 27 M 104 27 L 106 27" strokeWidth={thinStroke} /> {/* Eyes */}
        <path d="M 100 32 L 100 35 L 99 37" strokeWidth={thinStroke} /> {/* Nose */}
        <path d="M 96 42 C 98 44, 102 44, 104 42" strokeWidth={thinStroke} /> {/* Mouth */}
        
        {/* Ears - partially hidden by hair */}
        <path d="M 85 30 C 83 28, 83 34, 85 36" strokeWidth={thinStroke} />
        <path d="M 115 30 C 117 28, 117 34, 115 36" strokeWidth={thinStroke} />
        
        {/* Neck - slimmer for female */}
        <path d="M 93 51 L 93 65" />
        <path d="M 107 51 L 107 65" />
        
        {/* Shoulders - narrower, more sloped for female */}
        <path d="M 93 65 C 88 65, 65 70, 52 80 C 42 88, 38 100, 38 118" />
        <path d="M 107 65 C 112 65, 135 70, 148 80 C 158 88, 162 100, 162 118" />
        
        {/* Torso outline - hourglass shape */}
        <path d="M 62 90 C 60 110, 62 130, 68 150 C 74 170, 76 190, 72 215 C 68 240, 65 260, 68 285" />
        <path d="M 138 90 C 140 110, 138 130, 132 150 C 126 170, 124 190, 128 215 C 132 240, 135 260, 132 285" />
        
        {/* Breasts */}
        <path d="M 72 95 C 78 105, 88 115, 95 110" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 128 95 C 122 105, 112 115, 105 110" strokeWidth={thinStroke} stroke={detailColor} />
        <ellipse cx="82" cy="105" rx="12" ry="14" strokeWidth={thinStroke} stroke={detailColor} />
        <ellipse cx="118" cy="105" rx="12" ry="14" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Center line */}
        <path d="M 100 65 L 100 280" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Waist curves */}
        <path d="M 75 145 C 85 148, 95 150, 100 150 C 105 150, 115 148, 125 145" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Navel */}
        <ellipse cx="100" cy="195" rx="3" ry="4" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Hips - wider for female */}
        <path d="M 68 285 C 62 300, 58 320, 62 345" />
        <path d="M 132 285 C 138 300, 142 320, 138 345" />
        
        {/* Pelvic area */}
        <path d="M 78 250 C 88 265, 100 270, 100 270 C 100 270, 112 265, 122 250" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms */}
        <path d="M 38 118 C 36 140, 34 165, 33 195" />
        <path d="M 162 118 C 164 140, 166 165, 167 195" />
        <path d="M 52 118 C 50 140, 48 165, 47 195" />
        <path d="M 148 118 C 150 140, 152 165, 153 195" />
        
        {/* Elbows */}
        <path d="M 33 195 C 32 208, 32 220, 34 235" />
        <path d="M 47 195 C 48 208, 48 220, 46 235" />
        <path d="M 167 195 C 168 208, 168 220, 166 235" />
        <path d="M 153 195 C 152 208, 152 220, 154 235" />
        
        {/* Forearms */}
        <path d="M 34 235 C 32 260, 30 290, 28 320" />
        <path d="M 46 235 C 44 260, 42 290, 40 320" />
        <path d="M 166 235 C 168 260, 170 290, 172 320" />
        <path d="M 154 235 C 156 260, 158 290, 160 320" />
        
        {/* Hands */}
        <path d="M 28 320 C 24 335, 22 350, 25 360 C 28 368, 36 370, 42 365 L 40 340 C 40 330, 40 325, 40 320" />
        <path d="M 172 320 C 176 335, 178 350, 175 360 C 172 368, 164 370, 158 365 L 160 340 C 160 330, 160 325, 160 320" />
        
        {/* Fingers */}
        <path d="M 26 355 L 22 370 M 30 358 L 26 375 M 35 358 L 32 375 M 40 356 L 38 370" strokeWidth={thinStroke} />
        <path d="M 174 355 L 178 370 M 170 358 L 174 375 M 165 358 L 168 375 M 160 356 L 162 370" strokeWidth={thinStroke} />
        
        {/* Thighs - fuller for female */}
        <path d="M 62 345 C 58 385, 58 425, 64 465" />
        <path d="M 88 340 C 84 380, 82 420, 85 460" />
        <path d="M 138 345 C 142 385, 142 425, 136 465" />
        <path d="M 112 340 C 116 380, 118 420, 115 460" />
        
        {/* Inner thigh gap */}
        <path d="M 88 340 C 94 360, 100 365, 100 365 C 100 365, 106 360, 112 340" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Knees */}
        <path d="M 64 465 C 62 480, 62 495, 66 510" />
        <path d="M 85 460 C 84 475, 84 490, 86 505" />
        <path d="M 136 465 C 138 480, 138 495, 134 510" />
        <path d="M 115 460 C 116 475, 116 490, 114 505" />
        
        {/* Lower legs */}
        <path d="M 66 510 C 64 550, 62 590, 62 630" />
        <path d="M 86 505 C 84 545, 82 585, 82 625" />
        <path d="M 134 510 C 136 550, 138 590, 138 630" />
        <path d="M 114 505 C 116 545, 118 585, 118 625" />
        
        {/* Ankles */}
        <path d="M 62 630 L 65 642" />
        <path d="M 82 625 L 80 640" />
        <path d="M 138 630 L 135 642" />
        <path d="M 118 625 L 120 640" />
        
        {/* Feet */}
        <path d="M 65 642 C 55 646, 48 650, 48 655 C 48 660, 55 662, 75 662 C 82 660, 82 655, 80 645" />
        <path d="M 135 642 C 145 646, 152 650, 152 655 C 152 660, 145 662, 125 662 C 118 660, 118 655, 120 645" />
        
        {/* Toes */}
        <path d="M 52 658 L 50 666 M 58 660 L 56 668 M 64 661 L 63 670 M 70 661 L 70 669 M 76 660 L 77 667" strokeWidth={thinStroke} />
        <path d="M 148 658 L 150 666 M 142 660 L 144 668 M 136 661 L 137 670 M 130 661 L 130 669 M 124 660 L 123 667" strokeWidth={thinStroke} />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="32" rx="17" ry="21" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="91" y="51" width="18" height="16" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="58" cy="80" rx="18" ry="14" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="142" cy="80" rx="18" ry="14" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="105" rx="35" ry="30" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="44" cy="155" rx="10" ry="35" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="156" cy="155" rx="10" ry="35" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="38" cy="275" rx="10" ry="40" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="162" cy="275" rx="10" ry="40" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="32" cy="355" rx="12" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="168" cy="355" rx="12" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="175" rx="28" ry="35" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="255" rx="26" ry="28" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="72" cy="310" rx="16" ry="22" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="128" cy="310" rx="16" ry="22" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="75" cy="400" rx="16" ry="55" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="125" cy="400" rx="16" ry="55" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="75" cy="480" rx="12" ry="20" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="125" cy="480" rx="12" ry="20" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="72" cy="570" rx="12" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="128" cy="570" rx="12" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="65" cy="655" rx="20" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="135" cy="655" rx="20" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Back View
  const FemaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Hair - longer for female */}
        <path d="M 82 12 C 75 8, 72 15, 70 30 C 68 45, 70 60, 72 70" strokeWidth={thinStroke} />
        <path d="M 118 12 C 125 8, 128 15, 130 30 C 132 45, 130 60, 128 70" strokeWidth={thinStroke} />
        <path d="M 82 12 C 88 5, 100 3, 100 3 C 100 3, 112 5, 118 12" strokeWidth={thinStroke} />
        
        {/* Head outline */}
        <ellipse cx="100" cy="32" rx="15" ry="19" />
        
        {/* Ears */}
        <path d="M 85 30 C 83 28, 83 34, 85 36" strokeWidth={thinStroke} />
        <path d="M 115 30 C 117 28, 117 34, 115 36" strokeWidth={thinStroke} />
        
        {/* Neck */}
        <path d="M 93 51 L 93 65" />
        <path d="M 107 51 L 107 65" />
        
        {/* Spine */}
        <path d="M 100 65 L 100 285" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Shoulders */}
        <path d="M 93 65 C 88 65, 65 70, 52 80 C 42 88, 38 100, 38 118" />
        <path d="M 107 65 C 112 65, 135 70, 148 80 C 158 88, 162 100, 162 118" />
        
        {/* Shoulder blades */}
        <path d="M 68 92 C 75 108, 88 118, 96 115" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 132 92 C 125 108, 112 118, 104 115" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Torso outline - hourglass shape */}
        <path d="M 62 90 C 60 110, 62 130, 68 150 C 74 170, 76 190, 72 215 C 68 240, 65 260, 68 285" />
        <path d="M 138 90 C 140 110, 138 130, 132 150 C 126 170, 124 190, 128 215 C 132 240, 135 260, 132 285" />
        
        {/* Lower back curves */}
        <path d="M 78 200 C 88 218, 100 222, 100 222 C 100 222, 112 218, 122 200" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Hips - wider for female */}
        <path d="M 68 285 C 62 300, 58 320, 62 345" />
        <path d="M 132 285 C 138 300, 142 320, 138 345" />
        
        {/* Gluteal curves */}
        <path d="M 72 285 C 82 305, 100 315, 100 315 C 100 315, 118 305, 128 285" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 100 315 L 100 345" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Arms */}
        <path d="M 38 118 C 36 140, 34 165, 33 195" />
        <path d="M 162 118 C 164 140, 166 165, 167 195" />
        <path d="M 52 118 C 50 140, 48 165, 47 195" />
        <path d="M 148 118 C 150 140, 152 165, 153 195" />
        
        {/* Elbows and forearms */}
        <path d="M 33 195 C 32 208, 32 220, 34 235" />
        <path d="M 47 195 C 48 208, 48 220, 46 235" />
        <path d="M 167 195 C 168 208, 168 220, 166 235" />
        <path d="M 153 195 C 152 208, 152 220, 154 235" />
        
        <path d="M 34 235 C 32 260, 30 290, 28 320" />
        <path d="M 46 235 C 44 260, 42 290, 40 320" />
        <path d="M 166 235 C 168 260, 170 290, 172 320" />
        <path d="M 154 235 C 156 260, 158 290, 160 320" />
        
        {/* Hands */}
        <path d="M 28 320 C 24 335, 22 350, 25 360 C 28 368, 36 370, 42 365 L 40 340 C 40 330, 40 325, 40 320" />
        <path d="M 172 320 C 176 335, 178 350, 175 360 C 172 368, 164 370, 158 365 L 160 340 C 160 330, 160 325, 160 320" />
        
        {/* Thighs */}
        <path d="M 62 345 C 58 385, 58 425, 64 465" />
        <path d="M 88 345 C 84 385, 82 425, 85 465" />
        <path d="M 138 345 C 142 385, 142 425, 136 465" />
        <path d="M 112 345 C 116 385, 118 425, 115 465" />
        
        {/* Knees */}
        <path d="M 64 465 C 62 480, 62 495, 66 510" />
        <path d="M 85 465 C 84 480, 84 495, 86 510" />
        <path d="M 136 465 C 138 480, 138 495, 134 510" />
        <path d="M 115 465 C 116 480, 116 495, 114 510" />
        
        {/* Lower legs with calf curves */}
        <path d="M 66 510 C 64 550, 62 590, 62 630" />
        <path d="M 86 510 C 84 550, 82 590, 82 625" />
        <path d="M 134 510 C 136 550, 138 590, 138 630" />
        <path d="M 114 510 C 116 550, 118 590, 118 625" />
        
        {/* Calf muscle definition */}
        <path d="M 70 520 C 76 550, 78 580, 74 610" strokeWidth={thinStroke} stroke={detailColor} />
        <path d="M 130 520 C 124 550, 122 580, 126 610" strokeWidth={thinStroke} stroke={detailColor} />
        
        {/* Ankles and heels */}
        <path d="M 62 630 C 60 640, 62 650, 68 655 L 82 655 C 85 648, 85 640, 82 630" />
        <path d="M 138 630 C 140 640, 138 650, 132 655 L 118 655 C 115 648, 115 640, 118 630" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="32" rx="17" ry="21" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="91" y="51" width="18" height="16" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="58" cy="80" rx="18" ry="14" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="142" cy="80" rx="18" ry="14" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="110" rx="35" ry="32" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="44" cy="155" rx="10" ry="35" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="156" cy="155" rx="10" ry="35" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="38" cy="275" rx="10" ry="40" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="162" cy="275" rx="10" ry="40" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="32" cy="355" rx="12" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="168" cy="355" rx="12" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="195" rx="30" ry="45" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="72" cy="310" rx="16" ry="22" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="128" cy="310" rx="16" ry="22" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="75" cy="405" rx="16" ry="55" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="125" cy="405" rx="16" ry="55" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="75" cy="485" rx="12" ry="20" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="125" cy="485" rx="12" ry="20" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="72" cy="570" rx="12" ry="60" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="128" cy="570" rx="12" ry="60" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="72" cy="645" rx="14" ry="12" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="128" cy="645" rx="14" ry="12" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
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
      viewBox="0 0 200 680"
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      {renderView()}
    </svg>
  );
}
