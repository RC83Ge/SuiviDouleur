import { Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZONE_LABELS } from './bodyMapData';

interface ZoneSelectionSummaryProps {
  activeZone: string | null;
  draftIntensity: number;
  selectedZones: string[];
  zoneIntensities: Record<string, number>;
  selectedGroups: { id: string; label: string }[];
  onClear: () => void;
  onSelectZone: (zoneId: string) => void;
}

export function ZoneSelectionSummary({
  activeZone,
  draftIntensity,
  selectedZones,
  zoneIntensities,
  selectedGroups,
  onClear,
  onSelectZone,
}: ZoneSelectionSummaryProps) {
  return (
    <div className="rounded-[1rem] border border-border/70 bg-card/95 p-2 shadow-medical-sm backdrop-blur-sm sm:rounded-[1.5rem] sm:p-4">
      <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground sm:text-sm sm:gap-2">
          <Activity className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
          Zones déclarées
        </div>
        {selectedZones.length > 0 && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear} className="h-6 px-1.5 text-[10px] sm:h-9 sm:px-3 sm:text-xs">
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
            Effacer
          </Button>
        )}
      </div>

      {selectedZones.length === 0 ? (
        <p className="text-[11px] leading-4 text-muted-foreground sm:text-sm sm:leading-5">Aucune zone sélectionnée.</p>
      ) : (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {selectedZones.map((zoneId) => (
            <button
              key={zoneId}
              type="button"
              onClick={() => onSelectZone(zoneId)}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium transition-all sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs ${
                activeZone === zoneId
                  ? 'border-primary/30 bg-primary text-primary-foreground shadow-medical-sm'
                  : 'border-border bg-background text-foreground hover:border-primary/20'
              }`}
            >
              <span>{ZONE_LABELS[zoneId] ?? zoneId}</span>
              <span
                className={`rounded-full px-1 py-px text-[9px] sm:px-1.5 sm:py-0.5 sm:text-xs ${
                  activeZone === zoneId ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}
              >
                {zoneIntensities[zoneId] ?? draftIntensity}/10
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedGroups.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">
          {selectedGroups.map((group) => (
            <Badge key={group.id} variant="outline" className="rounded-full px-2 py-px text-[9px] sm:px-3 sm:py-1 sm:text-xs">
              {group.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
