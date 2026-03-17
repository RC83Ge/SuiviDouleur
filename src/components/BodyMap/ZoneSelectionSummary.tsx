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
    <div className="rounded-[1.5rem] border border-border/70 bg-card/95 p-4 shadow-medical-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Zones déclarées
        </div>
        {selectedZones.length > 0 && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4" />
            Effacer
          </Button>
        )}
      </div>

      {selectedZones.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune zone sélectionnée pour le moment.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {selectedZones.map((zoneId) => (
            <button
              key={zoneId}
              type="button"
              onClick={() => onSelectZone(zoneId)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
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
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedGroups.map((group) => (
            <Badge key={group.id} variant="outline" className="rounded-full px-3 py-1 text-xs">
              {group.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
