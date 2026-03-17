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
    <div className="card-medical-elevated rounded-[1.6rem] border-border/70 bg-card/95 p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-medical-sm">
          {zones.length} zones
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[1.35rem] border border-border/70 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.6))] p-3">
        <div className="absolute inset-3 rounded-[1rem] border border-primary/10" />
        <div className="absolute inset-x-8 top-4 h-16 rounded-full bg-primary/5 blur-2xl" />

        <img
          src={imageSrc}
          alt={`Silhouette anatomique ${subtitle.toLowerCase()}`}
          className="relative z-0 block h-auto w-full select-none object-contain"
          draggable={false}
        />

        <svg
          viewBox="0 0 200 480"
          className="absolute inset-3 z-10 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]"
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
                  fillOpacity: isSelected ? 0.88 : isHovered ? 0.38 : debugMode ? 0.12 : 0.02,
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
          <div className="pointer-events-none absolute inset-3 z-20 bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        )}
      </div>
    </div>
  );
}
