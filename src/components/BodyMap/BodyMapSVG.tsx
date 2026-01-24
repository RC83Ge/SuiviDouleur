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

  // Front view zones
  const frontZones = (
    <>
      {/* Head */}
      <ellipse
        cx="100"
        cy="35"
        rx="25"
        ry="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      
      {/* Neck */}
      <rect
        x="90"
        y="62"
        width="20"
        height="18"
        rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      
      {/* Left Shoulder */}
      <ellipse
        cx="60"
        cy="90"
        rx="18"
        ry="12"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      
      {/* Right Shoulder */}
      <ellipse
        cx="140"
        cy="90"
        rx="18"
        ry="12"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      
      {/* Chest */}
      <rect
        x="68"
        y="80"
        width="64"
        height="50"
        rx="8"
        className={zoneClass('chest')}
        onClick={handleClick('chest')}
        style={{ fill: getZoneColor('chest', selectedZones, zoneIntensities['chest']) }}
      />
      
      {/* Left Arm */}
      <rect
        x="38"
        y="100"
        width="22"
        height="50"
        rx="8"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      
      {/* Right Arm */}
      <rect
        x="140"
        y="100"
        width="22"
        height="50"
        rx="8"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      
      {/* Left Forearm */}
      <rect
        x="32"
        y="152"
        width="20"
        height="45"
        rx="6"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      
      {/* Right Forearm */}
      <rect
        x="148"
        y="152"
        width="20"
        height="45"
        rx="6"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      
      {/* Left Hand */}
      <ellipse
        cx="42"
        cy="210"
        rx="12"
        ry="16"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      
      {/* Right Hand */}
      <ellipse
        cx="158"
        cy="210"
        rx="12"
        ry="16"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      
      {/* Abdomen */}
      <rect
        x="70"
        y="132"
        width="60"
        height="45"
        rx="6"
        className={zoneClass('abdomen')}
        onClick={handleClick('abdomen')}
        style={{ fill: getZoneColor('abdomen', selectedZones, zoneIntensities['abdomen']) }}
      />
      
      {/* Pelvis */}
      <path
        d="M 70 178 Q 100 200 130 178 L 130 195 Q 100 210 70 195 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      
      {/* Left Hip */}
      <ellipse
        cx="72"
        cy="195"
        rx="12"
        ry="15"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      
      {/* Right Hip */}
      <ellipse
        cx="128"
        cy="195"
        rx="12"
        ry="15"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      
      {/* Left Thigh */}
      <rect
        x="65"
        y="210"
        width="28"
        height="65"
        rx="10"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      
      {/* Right Thigh */}
      <rect
        x="107"
        y="210"
        width="28"
        height="65"
        rx="10"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      
      {/* Left Knee */}
      <ellipse
        cx="79"
        cy="285"
        rx="14"
        ry="12"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      
      {/* Right Knee */}
      <ellipse
        cx="121"
        cy="285"
        rx="14"
        ry="12"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      
      {/* Left Leg */}
      <rect
        x="68"
        y="298"
        width="22"
        height="60"
        rx="8"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      
      {/* Right Leg */}
      <rect
        x="110"
        y="298"
        width="22"
        height="60"
        rx="8"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      
      {/* Left Foot */}
      <ellipse
        cx="79"
        cy="372"
        rx="16"
        ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      
      {/* Right Foot */}
      <ellipse
        cx="121"
        cy="372"
        rx="16"
        ry="10"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  // Back view zones
  const backZones = (
    <>
      {/* Head */}
      <ellipse
        cx="100"
        cy="35"
        rx="25"
        ry="30"
        className={zoneClass('head')}
        onClick={handleClick('head')}
        style={{ fill: getZoneColor('head', selectedZones, zoneIntensities['head']) }}
      />
      
      {/* Neck */}
      <rect
        x="90"
        y="62"
        width="20"
        height="18"
        rx="4"
        className={zoneClass('neck')}
        onClick={handleClick('neck')}
        style={{ fill: getZoneColor('neck', selectedZones, zoneIntensities['neck']) }}
      />
      
      {/* Left Shoulder */}
      <ellipse
        cx="60"
        cy="90"
        rx="18"
        ry="12"
        className={zoneClass('left-shoulder')}
        onClick={handleClick('left-shoulder')}
        style={{ fill: getZoneColor('left-shoulder', selectedZones, zoneIntensities['left-shoulder']) }}
      />
      
      {/* Right Shoulder */}
      <ellipse
        cx="140"
        cy="90"
        rx="18"
        ry="12"
        className={zoneClass('right-shoulder')}
        onClick={handleClick('right-shoulder')}
        style={{ fill: getZoneColor('right-shoulder', selectedZones, zoneIntensities['right-shoulder']) }}
      />
      
      {/* Upper Back */}
      <rect
        x="68"
        y="80"
        width="64"
        height="50"
        rx="8"
        className={zoneClass('upper-back')}
        onClick={handleClick('upper-back')}
        style={{ fill: getZoneColor('upper-back', selectedZones, zoneIntensities['upper-back']) }}
      />
      
      {/* Left Arm */}
      <rect
        x="38"
        y="100"
        width="22"
        height="50"
        rx="8"
        className={zoneClass('left-arm')}
        onClick={handleClick('left-arm')}
        style={{ fill: getZoneColor('left-arm', selectedZones, zoneIntensities['left-arm']) }}
      />
      
      {/* Right Arm */}
      <rect
        x="140"
        y="100"
        width="22"
        height="50"
        rx="8"
        className={zoneClass('right-arm')}
        onClick={handleClick('right-arm')}
        style={{ fill: getZoneColor('right-arm', selectedZones, zoneIntensities['right-arm']) }}
      />
      
      {/* Left Forearm */}
      <rect
        x="32"
        y="152"
        width="20"
        height="45"
        rx="6"
        className={zoneClass('left-forearm')}
        onClick={handleClick('left-forearm')}
        style={{ fill: getZoneColor('left-forearm', selectedZones, zoneIntensities['left-forearm']) }}
      />
      
      {/* Right Forearm */}
      <rect
        x="148"
        y="152"
        width="20"
        height="45"
        rx="6"
        className={zoneClass('right-forearm')}
        onClick={handleClick('right-forearm')}
        style={{ fill: getZoneColor('right-forearm', selectedZones, zoneIntensities['right-forearm']) }}
      />
      
      {/* Left Hand */}
      <ellipse
        cx="42"
        cy="210"
        rx="12"
        ry="16"
        className={zoneClass('left-hand')}
        onClick={handleClick('left-hand')}
        style={{ fill: getZoneColor('left-hand', selectedZones, zoneIntensities['left-hand']) }}
      />
      
      {/* Right Hand */}
      <ellipse
        cx="158"
        cy="210"
        rx="12"
        ry="16"
        className={zoneClass('right-hand')}
        onClick={handleClick('right-hand')}
        style={{ fill: getZoneColor('right-hand', selectedZones, zoneIntensities['right-hand']) }}
      />
      
      {/* Lower Back */}
      <rect
        x="70"
        y="132"
        width="60"
        height="50"
        rx="6"
        className={zoneClass('lower-back')}
        onClick={handleClick('lower-back')}
        style={{ fill: getZoneColor('lower-back', selectedZones, zoneIntensities['lower-back']) }}
      />
      
      {/* Pelvis */}
      <path
        d="M 70 183 Q 100 205 130 183 L 130 200 Q 100 215 70 200 Z"
        className={zoneClass('pelvis')}
        onClick={handleClick('pelvis')}
        style={{ fill: getZoneColor('pelvis', selectedZones, zoneIntensities['pelvis']) }}
      />
      
      {/* Left Hip */}
      <ellipse
        cx="72"
        cy="200"
        rx="12"
        ry="15"
        className={zoneClass('left-hip')}
        onClick={handleClick('left-hip')}
        style={{ fill: getZoneColor('left-hip', selectedZones, zoneIntensities['left-hip']) }}
      />
      
      {/* Right Hip */}
      <ellipse
        cx="128"
        cy="200"
        rx="12"
        ry="15"
        className={zoneClass('right-hip')}
        onClick={handleClick('right-hip')}
        style={{ fill: getZoneColor('right-hip', selectedZones, zoneIntensities['right-hip']) }}
      />
      
      {/* Left Thigh */}
      <rect
        x="65"
        y="215"
        width="28"
        height="60"
        rx="10"
        className={zoneClass('left-thigh')}
        onClick={handleClick('left-thigh')}
        style={{ fill: getZoneColor('left-thigh', selectedZones, zoneIntensities['left-thigh']) }}
      />
      
      {/* Right Thigh */}
      <rect
        x="107"
        y="215"
        width="28"
        height="60"
        rx="10"
        className={zoneClass('right-thigh')}
        onClick={handleClick('right-thigh')}
        style={{ fill: getZoneColor('right-thigh', selectedZones, zoneIntensities['right-thigh']) }}
      />
      
      {/* Left Knee */}
      <ellipse
        cx="79"
        cy="285"
        rx="14"
        ry="12"
        className={zoneClass('left-knee')}
        onClick={handleClick('left-knee')}
        style={{ fill: getZoneColor('left-knee', selectedZones, zoneIntensities['left-knee']) }}
      />
      
      {/* Right Knee */}
      <ellipse
        cx="121"
        cy="285"
        rx="14"
        ry="12"
        className={zoneClass('right-knee')}
        onClick={handleClick('right-knee')}
        style={{ fill: getZoneColor('right-knee', selectedZones, zoneIntensities['right-knee']) }}
      />
      
      {/* Left Leg */}
      <rect
        x="68"
        y="298"
        width="22"
        height="60"
        rx="8"
        className={zoneClass('left-leg')}
        onClick={handleClick('left-leg')}
        style={{ fill: getZoneColor('left-leg', selectedZones, zoneIntensities['left-leg']) }}
      />
      
      {/* Right Leg */}
      <rect
        x="110"
        y="298"
        width="22"
        height="60"
        rx="8"
        className={zoneClass('right-leg')}
        onClick={handleClick('right-leg')}
        style={{ fill: getZoneColor('right-leg', selectedZones, zoneIntensities['right-leg']) }}
      />
      
      {/* Left Foot */}
      <ellipse
        cx="79"
        cy="372"
        rx="16"
        ry="10"
        className={zoneClass('left-foot')}
        onClick={handleClick('left-foot')}
        style={{ fill: getZoneColor('left-foot', selectedZones, zoneIntensities['left-foot']) }}
      />
      
      {/* Right Foot */}
      <ellipse
        cx="121"
        cy="372"
        rx="16"
        ry="10"
        className={zoneClass('right-foot')}
        onClick={handleClick('right-foot')}
        style={{ fill: getZoneColor('right-foot', selectedZones, zoneIntensities['right-foot']) }}
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 200 390"
      className="w-full h-auto max-h-[400px]"
      aria-label={`Corps humain vue ${view === 'front' ? 'de face' : 'de dos'}`}
    >
      {view === 'front' ? frontZones : backZones}
    </svg>
  );
}
