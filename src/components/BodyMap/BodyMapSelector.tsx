import React, { useState, useCallback } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FRONT_PATHS, BACK_PATHS, ZonePath } from './svgPaths';

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

type ViewTab = 'front' | 'back';

// Blue monochrome palette matching the reference image (center figure)
const BODY_FILL = '#8BB8CC';
const BODY_FILL_DARK = '#6EA3BB';
const BODY_STROKE = '#5A93AC';
const BODY_FILL_HOVER = '#7AAFC5';
const SELECTED_FILL = '#FB923C';
const SELECTED_STROKE = '#E87F28';

function BodyZonePath({
  zone,
  isSelected,
  onClick,
}: {
  zone: ZonePath;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const fill = isSelected
    ? SELECTED_FILL
    : hovered
    ? BODY_FILL_HOVER
    : BODY_FILL;
  const stroke = isSelected ? SELECTED_STROKE : BODY_STROKE;

  return (
    <path
      d={zone.d}
      id={zone.id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      fill={fill}
      stroke={stroke}
      strokeWidth="0.4"
      strokeLinejoin="round"
      style={{
        transition: 'fill 0.15s ease',
        filter: isSelected ? 'drop-shadow(0 0 3px rgba(251,146,60,0.45))' : 'none',
      }}
    >
      <title>{zone.label}</title>
    </path>
  );
}

// Outline silhouette for depth/shadow behind interactive zones
function BodyOutline({ paths }: { paths: ZonePath[] }) {
  const allD = paths.map((p) => p.d).join(' ');
  return (
    <>
      {/* Subtle outer shadow */}
      <path
        d={allD}
        fill="none"
        stroke={BODY_STROKE}
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity={0.15}
        style={{ filter: 'blur(2px)' }}
      />
    </>
  );
}

export function BodyMapSelector({
  selectedZones,
  onZonesChange,
}: BodyMapSelectorProps) {
  const [view, setView] = useState<ViewTab>('front');

  const handleZoneClick = useCallback(
    (zoneId: BodyZone) => {
      if (selectedZones.includes(zoneId)) {
        onZonesChange(selectedZones.filter((z) => z !== zoneId));
      } else {
        onZonesChange([...selectedZones, zoneId]);
      }
    },
    [selectedZones, onZonesChange]
  );

  const clearSelection = () => onZonesChange([]);
  const paths = view === 'front' ? FRONT_PATHS : BACK_PATHS;

  return (
    <div className="space-y-4">
      {/* SVG Body - centered */}
      <div className="flex flex-col items-center">
        <div className="w-[200px]">
          <svg
            viewBox="0 0 300 500"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ userSelect: 'none' }}
          >
            <defs>
              {/* Subtle inner lighting gradient */}
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A8D0E0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6EA3BB" stopOpacity="0" />
              </linearGradient>
              {/* Soft inner shadow for volume */}
              <filter id="vol" x="-3%" y="-2%" width="106%" height="104%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b" />
                <feOffset dy="1" />
                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="sd" />
                <feFlood floodColor={BODY_FILL_DARK} floodOpacity="0.3" />
                <feComposite in2="sd" operator="in" />
                <feComposite in="SourceGraphic" operator="over" />
              </filter>
            </defs>

            <BodyOutline paths={paths} />

            <g filter="url(#vol)">
              {paths.map((zone) => (
                <BodyZonePath
                  key={zone.id}
                  zone={zone}
                  isSelected={selectedZones.includes(zone.id)}
                  onClick={() => handleZoneClick(zone.id)}
                />
              ))}
              {/* Light overlay for 3D feel */}
              <rect
                x="0"
                y="0"
                width="180"
                height="430"
                fill="url(#bodyGrad)"
                pointerEvents="none"
              />
            </g>
          </svg>
        </div>

        {/* View toggle */}
        <div className="flex mt-3 bg-muted rounded-lg p-1 gap-0.5">
          {(['front', 'back'] as ViewTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setView(tab)}
              className={cn(
                'px-5 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
                view === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'front' ? 'Face' : 'Dos'}
            </button>
          ))}
        </div>
      </div>

      {/* Selected zones */}
      {selectedZones.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''} sélectionnée
              {selectedZones.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedZones.map((zone) => (
              <span
                key={zone}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FB923C]/15 text-[#EA7E2B] border border-[#FB923C]/25"
              >
                {BODY_ZONE_LABELS[zone]}
                <button
                  type="button"
                  onClick={() =>
                    onZonesChange(selectedZones.filter((z) => z !== zone))
                  }
                  className="hover:bg-[#FB923C]/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedZones.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Touchez une zone du corps pour localiser la douleur
        </p>
      )}
    </div>
  );
}
