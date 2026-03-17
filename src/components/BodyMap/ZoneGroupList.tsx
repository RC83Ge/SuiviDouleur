import { ScanSearch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ZONE_GROUPS, type ZoneGroup } from './bodyMapData';

interface ZoneGroupListProps {
  hoveredGroup: string | null;
  selectedZones: string[];
  onGroupHover: (groupId: string | null) => void;
  onGroupSelect: (group: ZoneGroup) => void;
}

export function ZoneGroupList({
  hoveredGroup,
  selectedZones,
  onGroupHover,
  onGroupSelect,
}: ZoneGroupListProps) {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-card/95 p-3 shadow-medical-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ScanSearch className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Zones cliniques</p>
          <p className="text-sm text-foreground">Survolez puis sélectionnez une région</p>
        </div>
      </div>

      <div className="space-y-2">
        {ZONE_GROUPS.map((group) => {
          const isHovered = hoveredGroup === group.id;
          const selectedCount = group.zones.filter((zone) => selectedZones.includes(zone)).length;
          const isSelected = selectedCount > 0;

          return (
            <button
              key={group.id}
              type="button"
              onMouseEnter={() => onGroupHover(group.id)}
              onMouseLeave={() => onGroupHover(null)}
              onFocus={() => onGroupHover(group.id)}
              onBlur={() => onGroupHover(null)}
              onClick={() => onGroupSelect(group)}
              className={cn(
                'w-full rounded-[1.2rem] border px-3 py-3 text-left transition-all duration-200',
                isSelected
                  ? 'border-primary/25 bg-primary/10 shadow-medical-sm'
                  : isHovered
                    ? 'border-primary/20 bg-accent/80'
                    : 'border-border/80 bg-background/80 hover:border-primary/15 hover:bg-accent/70'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{group.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{group.description}</p>
                </div>
                {isSelected && <Badge variant="secondary">{selectedCount}</Badge>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
