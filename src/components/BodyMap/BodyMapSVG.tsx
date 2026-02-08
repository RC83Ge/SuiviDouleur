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

  // Simple black outline on white - matching reference image exactly
  const strokeColor = '#1a1a1a';
  const strokeWidth = '1';

  // Female Front View
  const FemaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="100" cy="28" rx="16" ry="20" />
        
        {/* Neck */}
        <path d="M 92 48 L 92 58 M 108 48 L 108 58" />
        
        {/* Shoulders and arms - more curved for female */}
        <path d="M 92 58 C 85 58, 65 62, 55 70 C 48 75, 42 82, 38 95" />
        <path d="M 108 58 C 115 58, 135 62, 145 70 C 152 75, 158 82, 162 95" />
        
        {/* Left arm */}
        <path d="M 38 95 C 35 110, 32 130, 30 150 C 28 170, 26 190, 25 210 C 24 225, 22 240, 20 255" />
        
        {/* Right arm */}
        <path d="M 162 95 C 165 110, 168 130, 170 150 C 172 170, 174 190, 175 210 C 176 225, 178 240, 180 255" />
        
        {/* Left hand */}
        <path d="M 20 255 C 18 260, 16 268, 15 275 L 17 285 C 19 288, 22 290, 26 290 C 30 290, 34 288, 36 285 L 38 275 C 38 270, 36 265, 34 260" />
        
        {/* Right hand */}
        <path d="M 180 255 C 182 260, 184 268, 185 275 L 183 285 C 181 288, 178 290, 174 290 C 170 290, 166 288, 164 285 L 162 275 C 162 270, 164 265, 166 260" />
        
        {/* Torso - female shape with waist curve */}
        <path d="M 92 58 L 92 65 C 92 70, 75 75, 70 85 L 70 115 C 70 130, 68 145, 72 160 C 76 175, 80 190, 78 210 C 76 230, 72 250, 75 275" />
        <path d="M 108 58 L 108 65 C 108 70, 125 75, 130 85 L 130 115 C 130 130, 132 145, 128 160 C 124 175, 120 190, 122 210 C 124 230, 128 250, 125 275" />
        
        {/* Hips - wider for female */}
        <path d="M 75 275 C 72 285, 68 295, 65 310" />
        <path d="M 125 275 C 128 285, 132 295, 135 310" />
        
        {/* Legs */}
        <path d="M 65 310 C 63 330, 62 350, 65 380 C 68 410, 70 440, 72 470 C 73 490, 74 510, 75 530 C 76 545, 76 560, 75 575" />
        <path d="M 135 310 C 137 330, 138 350, 135 380 C 132 410, 130 440, 128 470 C 127 490, 126 510, 125 530 C 124 545, 124 560, 125 575" />
        
        {/* Inner legs */}
        <path d="M 90 310 L 88 340 C 87 360, 86 380, 85 400 C 84 430, 84 460, 85 490 C 86 520, 86 550, 85 575" />
        <path d="M 110 310 L 112 340 C 113 360, 114 380, 115 400 C 116 430, 116 460, 115 490 C 114 520, 114 550, 115 575" />
        
        {/* Feet */}
        <path d="M 75 575 C 70 578, 65 580, 60 580 L 55 578 C 52 576, 52 572, 55 570 L 70 570 C 78 570, 85 572, 85 575" />
        <path d="M 125 575 C 130 578, 135 580, 140 580 L 145 578 C 148 576, 148 572, 145 570 L 130 570 C 122 570, 115 572, 115 575" />
        
        {/* Center line */}
        <path d="M 100 58 L 100 310" strokeWidth="0.5" opacity="0.3" />
        
        {/* Chest detail */}
        <path d="M 80 90 C 85 100, 95 105, 100 105 C 105 105, 115 100, 120 90" strokeWidth="0.5" opacity="0.3" />
        
        {/* Navel */}
        <circle cx="100" cy="180" r="2" fill={strokeColor} opacity="0.3" />
        
        {/* Pelvic line */}
        <path d="M 78 260 C 88 270, 100 275, 100 275 C 100 275, 112 270, 122 260" strokeWidth="0.5" opacity="0.3" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="28" rx="18" ry="22" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="48" width="20" height="12" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="60" cy="68" rx="18" ry="12" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="140" cy="68" rx="18" ry="12" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="100" rx="28" ry="25" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="38" cy="130" rx="10" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="162" cy="130" rx="10" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="28" cy="195" rx="8" ry="30" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="172" cy="195" rx="8" ry="30" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="22" cy="270" rx="12" ry="18" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="178" cy="270" rx="12" ry="18" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="165" rx="25" ry="30" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="240" rx="22" ry="20" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="75" cy="285" rx="12" ry="15" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="285" rx="12" ry="15" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="78" cy="360" rx="14" ry="40" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="122" cy="360" rx="14" ry="40" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="80" cy="420" rx="10" ry="15" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="120" cy="420" rx="10" ry="15" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="80" cy="500" rx="10" ry="50" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="120" cy="500" rx="10" ry="50" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="70" cy="575" rx="18" ry="8" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="130" cy="575" rx="18" ry="8" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Female Back View
  const FemaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="100" cy="28" rx="16" ry="20" />
        
        {/* Neck */}
        <path d="M 92 48 L 92 58 M 108 48 L 108 58" />
        
        {/* Shoulders and arms */}
        <path d="M 92 58 C 85 58, 65 62, 55 70 C 48 75, 42 82, 38 95" />
        <path d="M 108 58 C 115 58, 135 62, 145 70 C 152 75, 158 82, 162 95" />
        
        {/* Arms */}
        <path d="M 38 95 C 35 110, 32 130, 30 150 C 28 170, 26 190, 25 210 C 24 225, 22 240, 20 255" />
        <path d="M 162 95 C 165 110, 168 130, 170 150 C 172 170, 174 190, 175 210 C 176 225, 178 240, 180 255" />
        
        {/* Hands */}
        <path d="M 20 255 C 18 260, 16 268, 15 275 L 17 285 C 19 288, 22 290, 26 290 C 30 290, 34 288, 36 285 L 38 275 C 38 270, 36 265, 34 260" />
        <path d="M 180 255 C 182 260, 184 268, 185 275 L 183 285 C 181 288, 178 290, 174 290 C 170 290, 166 288, 164 285 L 162 275 C 162 270, 164 265, 166 260" />
        
        {/* Torso */}
        <path d="M 92 58 L 92 65 C 92 70, 75 75, 70 85 L 70 115 C 70 130, 68 145, 72 160 C 76 175, 80 190, 78 210 C 76 230, 72 250, 75 275" />
        <path d="M 108 58 L 108 65 C 108 70, 125 75, 130 85 L 130 115 C 130 130, 132 145, 128 160 C 124 175, 120 190, 122 210 C 124 230, 128 250, 125 275" />
        
        {/* Hips */}
        <path d="M 75 275 C 72 285, 68 295, 65 310" />
        <path d="M 125 275 C 128 285, 132 295, 135 310" />
        
        {/* Legs */}
        <path d="M 65 310 C 63 330, 62 350, 65 380 C 68 410, 70 440, 72 470 C 73 490, 74 510, 75 530 C 76 545, 76 560, 75 575" />
        <path d="M 135 310 C 137 330, 138 350, 135 380 C 132 410, 130 440, 128 470 C 127 490, 126 510, 125 530 C 124 545, 124 560, 125 575" />
        
        {/* Inner legs */}
        <path d="M 90 310 L 88 340 C 87 360, 86 380, 85 400 C 84 430, 84 460, 85 490 C 86 520, 86 550, 85 575" />
        <path d="M 110 310 L 112 340 C 113 360, 114 380, 115 400 C 116 430, 116 460, 115 490 C 114 520, 114 550, 115 575" />
        
        {/* Feet */}
        <path d="M 75 575 C 70 578, 65 580, 60 580 L 55 578 C 52 576, 52 572, 55 570 L 70 570 C 78 570, 85 572, 85 575" />
        <path d="M 125 575 C 130 578, 135 580, 140 580 L 145 578 C 148 576, 148 572, 145 570 L 130 570 C 122 570, 115 572, 115 575" />
        
        {/* Spine */}
        <path d="M 100 58 L 100 275" strokeWidth="0.5" opacity="0.4" />
        
        {/* Shoulder blades */}
        <path d="M 80 85 C 82 100, 88 115, 96 115" strokeWidth="0.5" opacity="0.3" />
        <path d="M 120 85 C 118 100, 112 115, 104 115" strokeWidth="0.5" opacity="0.3" />
        
        {/* Lower back curve */}
        <path d="M 82 200 C 90 210, 100 215, 100 215 C 100 215, 110 210, 118 200" strokeWidth="0.5" opacity="0.3" />
        
        {/* Gluteal line */}
        <path d="M 78 285 C 88 295, 100 300, 100 300 C 100 300, 112 295, 122 285" strokeWidth="0.5" opacity="0.3" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="28" rx="18" ry="22" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="90" y="48" width="20" height="12" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="60" cy="68" rx="18" ry="12" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="140" cy="68" rx="18" ry="12" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="100" rx="28" ry="25" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="38" cy="130" rx="10" ry="25" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="162" cy="130" rx="10" ry="25" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="28" cy="195" rx="8" ry="30" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="172" cy="195" rx="8" ry="30" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="22" cy="270" rx="12" ry="18" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="178" cy="270" rx="12" ry="18" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="175" rx="25" ry="35" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="75" cy="285" rx="12" ry="15" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="285" rx="12" ry="15" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="78" cy="360" rx="14" ry="40" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="122" cy="360" rx="14" ry="40" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="80" cy="420" rx="10" ry="15" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="120" cy="420" rx="10" ry="15" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="80" cy="500" rx="10" ry="50" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="120" cy="500" rx="10" ry="50" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="70" cy="575" rx="18" ry="8" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="130" cy="575" rx="18" ry="8" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Male Front View - broader shoulders, narrower hips
  const MaleFrontView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="100" cy="28" rx="15" ry="19" />
        
        {/* Neck - slightly thicker */}
        <path d="M 90 47 L 90 58 M 110 47 L 110 58" />
        
        {/* Shoulders - broader for male */}
        <path d="M 90 58 C 80 58, 55 62, 42 72 C 32 80, 26 90, 25 105" />
        <path d="M 110 58 C 120 58, 145 62, 158 72 C 168 80, 174 90, 175 105" />
        
        {/* Left arm */}
        <path d="M 25 105 C 22 125, 20 145, 18 170 C 16 195, 14 220, 12 250" />
        
        {/* Right arm */}
        <path d="M 175 105 C 178 125, 180 145, 182 170 C 184 195, 186 220, 188 250" />
        
        {/* Left hand */}
        <path d="M 12 250 C 10 258, 8 268, 7 278 L 9 290 C 11 294, 15 297, 20 297 C 25 297, 29 294, 31 290 L 33 278 C 33 272, 31 265, 28 258" />
        
        {/* Right hand */}
        <path d="M 188 250 C 190 258, 192 268, 193 278 L 191 290 C 189 294, 185 297, 180 297 C 175 297, 171 294, 169 290 L 167 278 C 167 272, 169 265, 172 258" />
        
        {/* Torso - straighter for male, less waist curve */}
        <path d="M 90 58 L 90 65 C 90 70, 68 75, 62 90 L 62 130 C 62 160, 64 190, 68 220 C 70 245, 72 265, 75 280" />
        <path d="M 110 58 L 110 65 C 110 70, 132 75, 138 90 L 138 130 C 138 160, 136 190, 132 220 C 130 245, 128 265, 125 280" />
        
        {/* Hips - narrower for male */}
        <path d="M 75 280 C 72 290, 70 300, 68 315" />
        <path d="M 125 280 C 128 290, 130 300, 132 315" />
        
        {/* Legs */}
        <path d="M 68 315 C 66 340, 66 365, 70 400 C 74 435, 76 470, 78 505 C 79 530, 79 555, 78 575" />
        <path d="M 132 315 C 134 340, 134 365, 130 400 C 126 435, 124 470, 122 505 C 121 530, 121 555, 122 575" />
        
        {/* Inner legs */}
        <path d="M 92 315 L 90 350 C 89 380, 88 410, 88 445 C 88 480, 88 520, 88 575" />
        <path d="M 108 315 L 110 350 C 111 380, 112 410, 112 445 C 112 480, 112 520, 112 575" />
        
        {/* Feet */}
        <path d="M 78 575 C 72 580, 65 583, 58 583 L 52 580 C 48 577, 48 572, 52 570 L 72 570 C 82 570, 88 572, 88 575" />
        <path d="M 122 575 C 128 580, 135 583, 142 583 L 148 580 C 152 577, 152 572, 148 570 L 128 570 C 118 570, 112 572, 112 575" />
        
        {/* Center line */}
        <path d="M 100 58 L 100 315" strokeWidth="0.5" opacity="0.3" />
        
        {/* Chest muscles */}
        <path d="M 72 95 C 80 105, 92 110, 98 108" strokeWidth="0.5" opacity="0.3" />
        <path d="M 128 95 C 120 105, 108 110, 102 108" strokeWidth="0.5" opacity="0.3" />
        
        {/* Abs lines */}
        <path d="M 88 130 L 88 200" strokeWidth="0.5" opacity="0.3" />
        <path d="M 112 130 L 112 200" strokeWidth="0.5" opacity="0.3" />
        
        {/* Navel */}
        <circle cx="100" cy="185" r="2" fill={strokeColor} opacity="0.3" />
        
        {/* Pelvic line */}
        <path d="M 78 265 C 88 275, 100 280, 100 280 C 100 280, 112 275, 122 265" strokeWidth="0.5" opacity="0.3" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="28" rx="17" ry="21" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="88" y="47" width="24" height="13" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="52" cy="72" rx="22" ry="14" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="148" cy="72" rx="22" ry="14" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="105" rx="35" ry="28" className={zoneClass('chest')} onClick={handleClick('chest')} style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }} />
      <ellipse cx="28" cy="140" rx="12" ry="30" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="172" cy="140" rx="12" ry="30" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="18" cy="210" rx="10" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="182" cy="210" rx="10" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="15" cy="275" rx="14" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="185" cy="275" rx="14" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="175" rx="28" ry="35" className={zoneClass('abdomen')} onClick={handleClick('abdomen')} style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }} />
      <ellipse cx="100" cy="250" rx="24" ry="22" className={zoneClass('pelvis')} onClick={handleClick('pelvis')} style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }} />
      <ellipse cx="75" cy="290" rx="12" ry="15" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="290" rx="12" ry="15" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="80" cy="370" rx="14" ry="45" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="120" cy="370" rx="14" ry="45" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="82" cy="435" rx="12" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="118" cy="435" rx="12" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="83" cy="515" rx="10" ry="55" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="117" cy="515" rx="10" ry="55" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="70" cy="578" rx="20" ry="10" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="130" cy="578" rx="20" ry="10" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
    </>
  );

  // Male Back View
  const MaleBackView = () => (
    <>
      <g className="body-silhouette pointer-events-none" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="100" cy="28" rx="15" ry="19" />
        
        {/* Neck */}
        <path d="M 90 47 L 90 58 M 110 47 L 110 58" />
        
        {/* Shoulders - broader for male */}
        <path d="M 90 58 C 80 58, 55 62, 42 72 C 32 80, 26 90, 25 105" />
        <path d="M 110 58 C 120 58, 145 62, 158 72 C 168 80, 174 90, 175 105" />
        
        {/* Arms */}
        <path d="M 25 105 C 22 125, 20 145, 18 170 C 16 195, 14 220, 12 250" />
        <path d="M 175 105 C 178 125, 180 145, 182 170 C 184 195, 186 220, 188 250" />
        
        {/* Hands */}
        <path d="M 12 250 C 10 258, 8 268, 7 278 L 9 290 C 11 294, 15 297, 20 297 C 25 297, 29 294, 31 290 L 33 278 C 33 272, 31 265, 28 258" />
        <path d="M 188 250 C 190 258, 192 268, 193 278 L 191 290 C 189 294, 185 297, 180 297 C 175 297, 171 294, 169 290 L 167 278 C 167 272, 169 265, 172 258" />
        
        {/* Torso */}
        <path d="M 90 58 L 90 65 C 90 70, 68 75, 62 90 L 62 130 C 62 160, 64 190, 68 220 C 70 245, 72 265, 75 280" />
        <path d="M 110 58 L 110 65 C 110 70, 132 75, 138 90 L 138 130 C 138 160, 136 190, 132 220 C 130 245, 128 265, 125 280" />
        
        {/* Hips */}
        <path d="M 75 280 C 72 290, 70 300, 68 315" />
        <path d="M 125 280 C 128 290, 130 300, 132 315" />
        
        {/* Legs */}
        <path d="M 68 315 C 66 340, 66 365, 70 400 C 74 435, 76 470, 78 505 C 79 530, 79 555, 78 575" />
        <path d="M 132 315 C 134 340, 134 365, 130 400 C 126 435, 124 470, 122 505 C 121 530, 121 555, 122 575" />
        
        {/* Inner legs */}
        <path d="M 92 315 L 90 350 C 89 380, 88 410, 88 445 C 88 480, 88 520, 88 575" />
        <path d="M 108 315 L 110 350 C 111 380, 112 410, 112 445 C 112 480, 112 520, 112 575" />
        
        {/* Feet */}
        <path d="M 78 575 C 72 580, 65 583, 58 583 L 52 580 C 48 577, 48 572, 52 570 L 72 570 C 82 570, 88 572, 88 575" />
        <path d="M 122 575 C 128 580, 135 583, 142 583 L 148 580 C 152 577, 152 572, 148 570 L 128 570 C 118 570, 112 572, 112 575" />
        
        {/* Spine */}
        <path d="M 100 58 L 100 280" strokeWidth="0.5" opacity="0.4" />
        
        {/* Shoulder blades */}
        <path d="M 72 90 C 76 108, 85 120, 96 118" strokeWidth="0.5" opacity="0.3" />
        <path d="M 128 90 C 124 108, 115 120, 104 118" strokeWidth="0.5" opacity="0.3" />
        
        {/* Lower back */}
        <path d="M 78 210 C 88 225, 100 230, 100 230 C 100 230, 112 225, 122 210" strokeWidth="0.5" opacity="0.3" />
        
        {/* Gluteal line */}
        <path d="M 78 290 C 88 300, 100 305, 100 305 C 100 305, 112 300, 122 290" strokeWidth="0.5" opacity="0.3" />
      </g>
      
      {/* Clickable zones */}
      <ellipse cx="100" cy="28" rx="17" ry="21" className={zoneClass('head')} onClick={handleClick('head')} style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }} />
      <rect x="88" y="47" width="24" height="13" rx="3" className={zoneClass('neck')} onClick={handleClick('neck')} style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }} />
      <ellipse cx="52" cy="72" rx="22" ry="14" className={zoneClass('left-shoulder')} onClick={handleClick('left-shoulder')} style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }} />
      <ellipse cx="148" cy="72" rx="22" ry="14" className={zoneClass('right-shoulder')} onClick={handleClick('right-shoulder')} style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }} />
      <ellipse cx="100" cy="105" rx="35" ry="28" className={zoneClass('upper-back')} onClick={handleClick('upper-back')} style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }} />
      <ellipse cx="28" cy="140" rx="12" ry="30" className={zoneClass('left-arm')} onClick={handleClick('left-arm')} style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }} />
      <ellipse cx="172" cy="140" rx="12" ry="30" className={zoneClass('right-arm')} onClick={handleClick('right-arm')} style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }} />
      <ellipse cx="18" cy="210" rx="10" ry="35" className={zoneClass('left-forearm')} onClick={handleClick('left-forearm')} style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }} />
      <ellipse cx="182" cy="210" rx="10" ry="35" className={zoneClass('right-forearm')} onClick={handleClick('right-forearm')} style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }} />
      <ellipse cx="15" cy="275" rx="14" ry="20" className={zoneClass('left-hand')} onClick={handleClick('left-hand')} style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }} />
      <ellipse cx="185" cy="275" rx="14" ry="20" className={zoneClass('right-hand')} onClick={handleClick('right-hand')} style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }} />
      <ellipse cx="100" cy="185" rx="30" ry="40" className={zoneClass('lower-back')} onClick={handleClick('lower-back')} style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }} />
      <ellipse cx="75" cy="290" rx="12" ry="15" className={zoneClass('left-hip')} onClick={handleClick('left-hip')} style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }} />
      <ellipse cx="125" cy="290" rx="12" ry="15" className={zoneClass('right-hip')} onClick={handleClick('right-hip')} style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }} />
      <ellipse cx="80" cy="370" rx="14" ry="45" className={zoneClass('left-thigh')} onClick={handleClick('left-thigh')} style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }} />
      <ellipse cx="120" cy="370" rx="14" ry="45" className={zoneClass('right-thigh')} onClick={handleClick('right-thigh')} style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }} />
      <ellipse cx="82" cy="435" rx="12" ry="18" className={zoneClass('left-knee')} onClick={handleClick('left-knee')} style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }} />
      <ellipse cx="118" cy="435" rx="12" ry="18" className={zoneClass('right-knee')} onClick={handleClick('right-knee')} style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }} />
      <ellipse cx="83" cy="515" rx="10" ry="55" className={zoneClass('left-leg')} onClick={handleClick('left-leg')} style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }} />
      <ellipse cx="117" cy="515" rx="10" ry="55" className={zoneClass('right-leg')} onClick={handleClick('right-leg')} style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }} />
      <ellipse cx="70" cy="578" rx="20" ry="10" className={zoneClass('left-foot')} onClick={handleClick('left-foot')} style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }} />
      <ellipse cx="130" cy="578" rx="20" ry="10" className={zoneClass('right-foot')} onClick={handleClick('right-foot')} style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }} />
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
      viewBox="0 0 200 600"
      className="w-full h-auto max-h-[500px]"
      style={{ touchAction: 'manipulation' }}
    >
      {renderView()}
    </svg>
  );
}
