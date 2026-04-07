import { cn } from '@/lib/utils';
import { ZonePath } from './svgPaths';

interface AnatomyFigureProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  zones: ZonePath[];
  selectedZones: string[];
  hoveredZones: string[];
  debugMode: boolean;
  zoneIntensities: Record<string, number>;
  onZoneClick: (zoneId: string) => void;
  onZoneHover: (zoneId: string | null) => void;
  intensityTone: (level: number, isHovered: boolean) => string;
}

export function AnatomyFigure({
  title,
  subtitle,
  imageSrc,
  zones,
  selectedZones,
  hoveredZones,
  debugMode,
  zoneIntensities,
  onZoneClick,
  onZoneHover,
  intensityTone,
}: AnatomyFigureProps) {
  return (
    <div className="relative mx-auto w-full">
      <img
        src={imageSrc}
        alt={`Silhouette anatomique ${subtitle.toLowerCase()}`}
        className="relative z-0 block h-auto w-full select-none object-contain"
        draggable={false}
      />

      <svg
        viewBox="0 0 358 480"
        className="absolute inset-0 z-10 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {zones.map((zone) => {
          const isSelected = selectedZones.includes(zone.id);
          const isHovered = hoveredZones.includes(zone.id);
          const level = zoneIntensities[zone.id] ?? 5;

          return (
            <path
              key={zone.id}
              d={zone.d}
              onClick={() => onZoneClick(zone.id)}
              onMouseEnter={() => onZoneHover(zone.id)}
              onMouseLeave={() => onZoneHover(null)}
              onFocus={() => onZoneHover(zone.id)}
              onBlur={() => onZoneHover(null)}
              className={cn(
                'cursor-pointer transition-all duration-200 outline-none',
                isSelected || isHovered ? 'stroke-primary' : 'stroke-transparent'
              )}
              style={{
                fill: intensityTone(level, isHovered),
                fillOpacity: isSelected ? 0.88 : isHovered ? 0.38 : debugMode ? 0.45 : 0.02,
                strokeWidth: isSelected ? 1.8 : isHovered || debugMode ? 1.2 : 0.6,
                strokeDasharray: debugMode && !isSelected ? '3 2' : '0',
                filter: isSelected || isHovered ? 'drop-shadow(0 0 10px hsl(var(--primary) / 0.22))' : 'none',
              }}
              aria-label={zone.label}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onZoneClick(zone.id);
                }
              }}
            />
          );
        })}
      </svg>

      {debugMode && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      )}
    </div>
  );
}
