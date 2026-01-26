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
    return 'hsl(var(--zone-default))';
  }
  if (intensity !== undefined) {
    return `hsl(var(--pain-${intensity}))`;
  }
  return 'hsl(var(--zone-selected))';
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

  // Front view zones with more human-like paths
  const frontZones = (
    <>
      {/* Head - more oval with chin */}
      <path
        d="M 100 8 
           C 125 8 138 25 138 45 
           C 138 58 130 68 120 72 
           C 115 74 105 76 100 76 
           C 95 76 85 74 80 72 
           C 70 68 62 58 62 45 
           C 62 25 75 8 100 8 Z"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      
      {/* Neck */}
      <path
        d="M 88 74 
           C 88 74 85 80 85 85 
           L 85 95 
           C 90 97 95 98 100 98 
           C 105 98 110 97 115 95 
           L 115 85 
           C 115 80 112 74 112 74 Z"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      
      {/* Left Shoulder */}
      <path
        d="M 85 95 
           C 75 95 60 98 50 105 
           C 45 108 42 115 42 120 
           L 55 120 
           C 60 115 70 108 85 105 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      
      {/* Right Shoulder */}
      <path
        d="M 115 95 
           C 125 95 140 98 150 105 
           C 155 108 158 115 158 120 
           L 145 120 
           C 140 115 130 108 115 105 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      
      {/* Chest */}
      <path
        d="M 70 100 
           C 70 100 65 105 65 115 
           L 65 150 
           C 65 155 70 160 75 160 
           L 125 160 
           C 130 160 135 155 135 150 
           L 135 115 
           C 135 105 130 100 130 100 
           C 120 98 110 97 100 97 
           C 90 97 80 98 70 100 Z"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      
      {/* Left Arm */}
      <path
        d="M 42 120 
           C 38 125 35 135 33 145 
           C 30 160 28 175 28 185 
           L 50 185 
           C 50 175 52 160 54 145 
           C 55 138 56 130 55 120 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      
      {/* Right Arm */}
      <path
        d="M 158 120 
           C 162 125 165 135 167 145 
           C 170 160 172 175 172 185 
           L 150 185 
           C 150 175 148 160 146 145 
           C 145 138 144 130 145 120 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      
      {/* Left Forearm */}
      <path
        d="M 28 185 
           C 26 200 24 220 22 235 
           C 20 250 18 260 18 270 
           L 40 270 
           C 42 260 44 248 46 235 
           C 48 220 50 200 50 185 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      
      {/* Right Forearm */}
      <path
        d="M 172 185 
           C 174 200 176 220 178 235 
           C 180 250 182 260 182 270 
           L 160 270 
           C 158 260 156 248 154 235 
           C 152 220 150 200 150 185 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      
      {/* Left Hand */}
      <path
        d="M 18 270 
           C 15 275 12 282 10 290 
           C 8 300 8 310 12 318 
           C 16 326 24 330 32 328 
           C 38 326 42 320 44 312 
           C 46 302 44 290 42 280 
           C 41 275 40 272 40 270 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      
      {/* Right Hand */}
      <path
        d="M 182 270 
           C 185 275 188 282 190 290 
           C 192 300 192 310 188 318 
           C 184 326 176 330 168 328 
           C 162 326 158 320 156 312 
           C 154 302 156 290 158 280 
           C 159 275 160 272 160 270 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      
      {/* Abdomen */}
      <path
        d="M 65 160 
           L 65 210 
           C 65 218 70 225 78 228 
           C 85 230 92 230 100 230 
           C 108 230 115 230 122 228 
           C 130 225 135 218 135 210 
           L 135 160 
           C 130 162 120 163 100 163 
           C 80 163 70 162 65 160 Z"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      
      {/* Pelvis */}
      <path
        d="M 68 228 
           C 68 240 72 252 80 258 
           C 88 264 95 265 100 265 
           C 105 265 112 264 120 258 
           C 128 252 132 240 132 228 
           C 125 232 112 235 100 235 
           C 88 235 75 232 68 228 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      
      {/* Left Hip */}
      <path
        d="M 65 215 
           C 58 220 52 230 50 242 
           C 48 255 50 265 55 275 
           L 72 275 
           C 70 265 68 255 70 245 
           C 72 235 75 225 78 220 
           C 73 218 68 216 65 215 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      
      {/* Right Hip */}
      <path
        d="M 135 215 
           C 142 220 148 230 150 242 
           C 152 255 150 265 145 275 
           L 128 275 
           C 130 265 132 255 130 245 
           C 128 235 125 225 122 220 
           C 127 218 132 216 135 215 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      
      {/* Left Thigh */}
      <path
        d="M 55 275 
           C 52 290 50 310 50 330 
           C 50 350 52 370 55 385 
           L 85 385 
           C 82 370 80 350 80 330 
           C 80 310 82 290 85 275 
           L 72 275 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      
      {/* Right Thigh */}
      <path
        d="M 145 275 
           C 148 290 150 310 150 330 
           C 150 350 148 370 145 385 
           L 115 385 
           C 118 370 120 350 120 330 
           C 120 310 118 290 115 275 
           L 128 275 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      
      {/* Left Knee */}
      <path
        d="M 55 385 
           C 53 395 52 405 52 415 
           C 52 425 53 432 55 440 
           L 85 440 
           C 83 432 82 425 82 415 
           C 82 405 83 395 85 385 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      
      {/* Right Knee */}
      <path
        d="M 145 385 
           C 147 395 148 405 148 415 
           C 148 425 147 432 145 440 
           L 115 440 
           C 117 432 118 425 118 415 
           C 118 405 117 395 115 385 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      
      {/* Left Leg */}
      <path
        d="M 55 440 
           C 54 460 53 485 52 510 
           C 51 530 50 545 50 555 
           L 78 555 
           C 79 545 80 530 81 510 
           C 82 485 83 460 85 440 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      
      {/* Right Leg */}
      <path
        d="M 145 440 
           C 146 460 147 485 148 510 
           C 149 530 150 545 150 555 
           L 122 555 
           C 121 545 120 530 119 510 
           C 118 485 117 460 115 440 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      
      {/* Left Foot */}
      <path
        d="M 50 555 
           C 45 558 38 562 32 568 
           C 26 575 25 582 28 588 
           C 32 595 42 598 55 598 
           C 68 598 78 595 80 588 
           C 82 580 80 570 78 560 
           C 77 557 78 555 78 555 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      
      {/* Right Foot */}
      <path
        d="M 150 555 
           C 155 558 162 562 168 568 
           C 174 575 175 582 172 588 
           C 168 595 158 598 145 598 
           C 132 598 122 595 120 588 
           C 118 580 120 570 122 560 
           C 123 557 122 555 122 555 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Back view zones with more human-like paths
  const backZones = (
    <>
      {/* Head */}
      <path
        d="M 100 8 
           C 125 8 138 25 138 45 
           C 138 58 130 68 120 72 
           C 115 74 105 76 100 76 
           C 95 76 85 74 80 72 
           C 70 68 62 58 62 45 
           C 62 25 75 8 100 8 Z"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      
      {/* Neck */}
      <path
        d="M 88 74 
           C 88 74 85 80 85 85 
           L 85 95 
           C 90 97 95 98 100 98 
           C 105 98 110 97 115 95 
           L 115 85 
           C 115 80 112 74 112 74 Z"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      
      {/* Left Shoulder */}
      <path
        d="M 85 95 
           C 75 95 60 98 50 105 
           C 45 108 42 115 42 120 
           L 55 120 
           C 60 115 70 108 85 105 Z"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      
      {/* Right Shoulder */}
      <path
        d="M 115 95 
           C 125 95 140 98 150 105 
           C 155 108 158 115 158 120 
           L 145 120 
           C 140 115 130 108 115 105 Z"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      
      {/* Upper Back */}
      <path
        d="M 70 100 
           C 70 100 65 105 65 115 
           L 65 150 
           C 65 155 70 160 75 160 
           L 125 160 
           C 130 160 135 155 135 150 
           L 135 115 
           C 135 105 130 100 130 100 
           C 120 98 110 97 100 97 
           C 90 97 80 98 70 100 Z"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      
      {/* Left Arm */}
      <path
        d="M 42 120 
           C 38 125 35 135 33 145 
           C 30 160 28 175 28 185 
           L 50 185 
           C 50 175 52 160 54 145 
           C 55 138 56 130 55 120 Z"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      
      {/* Right Arm */}
      <path
        d="M 158 120 
           C 162 125 165 135 167 145 
           C 170 160 172 175 172 185 
           L 150 185 
           C 150 175 148 160 146 145 
           C 145 138 144 130 145 120 Z"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      
      {/* Left Forearm */}
      <path
        d="M 28 185 
           C 26 200 24 220 22 235 
           C 20 250 18 260 18 270 
           L 40 270 
           C 42 260 44 248 46 235 
           C 48 220 50 200 50 185 Z"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      
      {/* Right Forearm */}
      <path
        d="M 172 185 
           C 174 200 176 220 178 235 
           C 180 250 182 260 182 270 
           L 160 270 
           C 158 260 156 248 154 235 
           C 152 220 150 200 150 185 Z"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      
      {/* Left Hand */}
      <path
        d="M 18 270 
           C 15 275 12 282 10 290 
           C 8 300 8 310 12 318 
           C 16 326 24 330 32 328 
           C 38 326 42 320 44 312 
           C 46 302 44 290 42 280 
           C 41 275 40 272 40 270 Z"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      
      {/* Right Hand */}
      <path
        d="M 182 270 
           C 185 275 188 282 190 290 
           C 192 300 192 310 188 318 
           C 184 326 176 330 168 328 
           C 162 326 158 320 156 312 
           C 154 302 156 290 158 280 
           C 159 275 160 272 160 270 Z"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      
      {/* Lower Back */}
      <path
        d="M 65 160 
           L 65 220 
           C 65 228 70 235 78 238 
           C 85 240 92 240 100 240 
           C 108 240 115 240 122 238 
           C 130 235 135 228 135 220 
           L 135 160 
           C 130 162 120 163 100 163 
           C 80 163 70 162 65 160 Z"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      
      {/* Pelvis */}
      <path
        d="M 68 238 
           C 68 250 72 262 80 268 
           C 88 274 95 275 100 275 
           C 105 275 112 274 120 268 
           C 128 262 132 250 132 238 
           C 125 242 112 245 100 245 
           C 88 245 75 242 68 238 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      
      {/* Left Hip */}
      <path
        d="M 65 225 
           C 58 230 52 240 50 252 
           C 48 265 50 275 55 285 
           L 72 285 
           C 70 275 68 265 70 255 
           C 72 245 75 235 78 230 
           C 73 228 68 226 65 225 Z"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      
      {/* Right Hip */}
      <path
        d="M 135 225 
           C 142 230 148 240 150 252 
           C 152 265 150 275 145 285 
           L 128 285 
           C 130 275 132 265 130 255 
           C 128 245 125 235 122 230 
           C 127 228 132 226 135 225 Z"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      
      {/* Left Thigh */}
      <path
        d="M 55 285 
           C 52 300 50 320 50 340 
           C 50 360 52 380 55 395 
           L 85 395 
           C 82 380 80 360 80 340 
           C 80 320 82 300 85 285 
           L 72 285 Z"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      
      {/* Right Thigh */}
      <path
        d="M 145 285 
           C 148 300 150 320 150 340 
           C 150 360 148 380 145 395 
           L 115 395 
           C 118 380 120 360 120 340 
           C 120 320 118 300 115 285 
           L 128 285 Z"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      
      {/* Left Knee */}
      <path
        d="M 55 395 
           C 53 405 52 415 52 425 
           C 52 435 53 442 55 450 
           L 85 450 
           C 83 442 82 435 82 425 
           C 82 415 83 405 85 395 Z"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      
      {/* Right Knee */}
      <path
        d="M 145 395 
           C 147 405 148 415 148 425 
           C 148 435 147 442 145 450 
           L 115 450 
           C 117 442 118 435 118 425 
           C 118 415 117 405 115 395 Z"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      
      {/* Left Leg */}
      <path
        d="M 55 450 
           C 54 470 53 495 52 520 
           C 51 540 50 555 50 565 
           L 78 565 
           C 79 555 80 540 81 520 
           C 82 495 83 470 85 450 Z"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      
      {/* Right Leg */}
      <path
        d="M 145 450 
           C 146 470 147 495 148 520 
           C 149 540 150 555 150 565 
           L 122 565 
           C 121 555 120 540 119 520 
           C 118 495 117 470 115 450 Z"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      
      {/* Left Foot */}
      <path
        d="M 50 565 
           C 48 572 46 580 48 588 
           C 50 596 56 602 65 604 
           C 74 606 80 602 82 594 
           C 84 586 82 576 80 568 
           C 79 566 78 565 78 565 Z"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      
      {/* Right Foot */}
      <path
        d="M 150 565 
           C 152 572 154 580 152 588 
           C 150 596 144 602 135 604 
           C 126 606 120 602 118 594 
           C 116 586 118 576 120 568 
           C 121 566 122 565 122 565 Z"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 200 610"
      className="w-full h-auto max-h-[450px]"
      aria-label={`Corps humain vue ${view === 'front' ? 'de face' : 'de dos'}`}
    >
      {view === 'front' ? frontZones : backZones}
    </svg>
  );
}
