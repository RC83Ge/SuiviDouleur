import React, { useState } from 'react';
import { BodyView, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { cn } from '@/lib/utils';
import { X, Sparkles } from 'lucide-react';

type ViewMode = 'avant' | 'gauche' | 'droite';

interface ZoneDef {
  id: BodyZone;
  label: string;
  path: string;
}

// Pure SVG vector zones for front view — viewBox 40 0 216 570
const FRONT_ZONES: ZoneDef[] = [
  {
    id: 'head',
    label: 'Tête',
    path: 'M148,8 C130,10 122,28 116,42 C112,58 114,72 120,82 C128,92 138,96 148,97 C158,96 168,92 176,82 C182,72 184,58 180,42 C174,28 166,10 148,8 Z',
  },
  {
    id: 'neck',
    label: 'Cou',
    path: 'M136,97 C136,97 136,108 136,116 C136,121 141,126 148,126 C155,126 160,121 160,116 C160,108 160,97 160,97 C156,99 152,100 148,100 C144,100 140,99 136,97 Z',
  },
  {
    id: 'left-shoulder',
    label: 'Épaule G',
    path: 'M104,126 L96,128 C88,132 82,140 78,150 L76,158 L86,158 C90,148 94,140 100,134 L104,130 Z',
  },
  {
    id: 'right-shoulder',
    label: 'Épaule D',
    path: 'M192,126 L200,128 C208,132 214,140 218,150 L220,158 L210,158 C206,148 202,140 196,134 L192,130 Z',
  },
  {
    id: 'chest',
    label: 'Thorax',
    path: 'M104,126 L192,126 L196,140 C198,155 198,172 196,186 L192,198 L148,204 L104,198 L100,186 C98,172 98,155 100,140 Z',
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    path: 'M104,198 L192,198 L190,228 C188,248 186,265 182,278 L148,288 L114,278 C110,265 108,248 106,228 Z',
  },
  {
    id: 'left-arm',
    label: 'Bras G',
    path: 'M76,158 L68,178 C64,196 60,218 58,240 L56,270 L54,310 L64,312 L66,272 L70,240 C72,218 76,196 82,178 L86,158 Z',
  },
  {
    id: 'right-arm',
    label: 'Bras D',
    path: 'M220,158 L228,178 C232,196 236,218 238,240 L240,270 L242,310 L232,312 L230,272 L226,240 C224,218 220,196 214,178 L210,158 Z',
  },
  {
    id: 'left-hand',
    label: 'Main G',
    path: 'M54,310 L50,340 C48,355 50,365 56,365 C60,365 64,355 66,340 L64,312 Z',
  },
  {
    id: 'right-hand',
    label: 'Main D',
    path: 'M242,310 L246,340 C248,355 246,365 240,365 C236,365 232,355 230,340 L232,312 Z',
  },
  {
    id: 'pelvis',
    label: 'Bassin',
    path: 'M114,278 L182,278 L184,300 C184,312 180,320 172,326 L148,334 L124,326 C116,320 112,312 112,300 Z',
  },
  {
    id: 'left-thigh',
    label: 'Cuisse G',
    path: 'M112,300 L124,326 L148,334 L144,370 L138,420 L134,460 L120,460 L118,420 L116,370 L112,326 Z',
  },
  {
    id: 'right-thigh',
    label: 'Cuisse D',
    path: 'M184,300 L172,326 L148,334 L152,370 L158,420 L162,460 L176,460 L178,420 L180,370 L184,326 Z',
  },
  {
    id: 'left-knee',
    label: 'Genou G',
    path: 'M120,460 L134,460 L132,490 L118,490 Z',
  },
  {
    id: 'right-knee',
    label: 'Genou D',
    path: 'M162,460 L176,460 L178,490 L164,490 Z',
  },
  {
    id: 'left-leg',
    label: 'Jambe G',
    path: 'M118,490 L132,490 L130,540 L128,560 L116,560 L114,540 Z',
  },
  {
    id: 'right-leg',
    label: 'Jambe D',
    path: 'M164,490 L178,490 L180,540 L182,560 L170,560 L168,540 Z',
  },
  {
    id: 'left-foot',
    label: 'Pied G',
    path: 'M116,560 L128,560 L126,580 L130,590 L110,590 L112,580 Z',
  },
  {
    id: 'right-foot',
    label: 'Pied D',
    path: 'M170,560 L182,560 L184,580 L186,590 L166,590 L168,580 Z',
  },
];

interface BodyMapSelectorProps {
  selectedZones: BodyZone[];
  onZonesChange: (zones: BodyZone[]) => void;
}

export function BodyMapSelector({ selectedZones, onZonesChange }: BodyMapSelectorProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('avant');

  const handleZoneClick = (zone: BodyZone) => {
    if (selectedZones.includes(zone)) {
      onZonesChange(selectedZones.filter(z => z !== zone));
    } else {
      onZonesChange([...selectedZones, zone]);
    }
  };

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex bg-muted rounded-xl p-1 gap-1 w-fit">
        {(['avant', 'gauche', 'droite'] as ViewMode[]).map(mode => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={cn(
              'px-4 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200',
              viewMode === mode
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* SVG Body Map */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[220px]">
            {viewMode === 'avant' ? (
              <svg
                viewBox="40 0 216 600"
                className="w-full h-auto select-none"
                style={{ touchAction: 'manipulation' }}
              >
                <defs>
                  <filter id="zone-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feFlood floodColor="hsl(199, 89%, 48%)" floodOpacity="0.4" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="zone-hover-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="hsl(199, 70%, 70%)" floodOpacity="0.25" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {FRONT_ZONES.map(zone => {
                  const isSelected = selectedZones.includes(zone.id);
                  const isHovered = hoveredZone === zone.id;

                  return (
                    <path
                      key={zone.id}
                      d={zone.path}
                      className="cursor-pointer transition-all duration-200"
                      fill={
                        isSelected
                          ? 'hsl(199, 89%, 48%)'
                          : isHovered
                            ? 'hsl(199, 70%, 75%)'
                            : 'hsl(210, 20%, 90%)'
                      }
                      fillOpacity={isSelected ? 0.5 : isHovered ? 0.4 : 0.7}
                      stroke={
                        isSelected
                          ? 'hsl(199, 89%, 42%)'
                          : isHovered
                            ? 'hsl(199, 60%, 55%)'
                            : 'hsl(210, 15%, 78%)'
                      }
                      strokeWidth={isSelected ? 2.5 : 1.2}
                      strokeLinejoin="round"
                      filter={isSelected ? 'url(#zone-glow)' : isHovered ? 'url(#zone-hover-glow)' : undefined}
                      onClick={() => handleZoneClick(zone.id)}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                    />
                  );
                })}

                {/* Hover tooltip */}
                {hoveredZone && !selectedZones.includes(hoveredZone as BodyZone) && (() => {
                  const zone = FRONT_ZONES.find(z => z.id === hoveredZone);
                  if (!zone) return null;
                  // Rough center from path
                  const match = zone.path.match(/M(\d+),(\d+)/);
                  if (!match) return null;
                  const x = parseInt(match[1]);
                  const y = parseInt(match[2]) - 14;
                  return (
                    <g className="pointer-events-none">
                      <rect
                        x={x - 36} y={y - 12} width="72" height="20" rx="6"
                        fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth="0.8"
                        opacity="0.95"
                      />
                      <text
                        x={x} y={y + 2} textAnchor="middle" fontSize="9" fontWeight="500"
                        fill="hsl(var(--popover-foreground))" fontFamily="system-ui"
                      >
                        {zone.label}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            ) : (
              <div className="flex items-center justify-center h-64 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20">
                <p className="text-xs text-muted-foreground text-center px-4">
                  Vue «&nbsp;{viewMode}&nbsp;» — bientôt disponible
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Selected zones panel */}
        <div className="flex-1 min-w-[140px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Zones</span>
            </div>
            {selectedZones.length > 0 && (
              <button
                type="button"
                onClick={() => onZonesChange([])}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Effacer
              </button>
            )}
          </div>

          {selectedZones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 px-3 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Touchez le corps pour sélectionner les zones douloureuses
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground mb-2">
                {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedZones.map((zone, index) => (
                  <span
                    key={zone}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium',
                      'bg-primary/10 text-primary border border-primary/20',
                      'hover:bg-primary/15 transition-all duration-200',
                      'animate-scale-in'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {BODY_ZONE_LABELS[zone]}
                    <button
                      type="button"
                      onClick={() => handleZoneClick(zone)}
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200 -mr-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
