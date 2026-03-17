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
    <div className="rounded-[1.2rem] border border-border/70 bg-card/95 p-3 shadow-medical-sm backdrop-blur-sm sm:rounded-[1.5rem] sm:p-4">
      <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Zones déclarées
        </div>
        {selectedZones.length > 0 && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear} className="h-8 px-2.5 text-xs sm:h-9 sm:px-3">
            <X className="h-4 w-4" />
            Effacer
          </Button>
        )}
      </div>

      {selectedZones.length === 0 ? (
        <p className="text-xs leading-5 text-muted-foreground sm:text-sm">Aucune zone sélectionnée pour le moment.</p>
      ) : (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {selectedZones.map((zoneId) => (
            <button
              key={zoneId}
              type="button"
              onClick={() => onSelectZone(zoneId)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-all sm:gap-2 sm:px-3 sm:text-xs ${
                activeZone === zoneId
                  ? 'border-primary/30 bg-primary text-primary-foreground shadow-medical-sm'
                  : 'border-border bg-background text-foreground hover:border-primary/20'
              }`}
            >
              <span>{ZONE_LABELS[zoneId] ?? zoneId}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 ${
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
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {selectedGroups.map((group) => (
            <Badge key={group.id} variant="outline" className="rounded-full px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs">
              {group.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
