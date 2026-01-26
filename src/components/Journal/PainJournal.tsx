import React, { useState, useMemo } from 'react';
import { PainEntry, BodyZone, BODY_ZONE_LABELS } from '@/types/pain';
import { PainEntryCard } from './PainEntryCard';
import { ExportDialog } from './ExportDialog';
import { Filter, Calendar, ChevronDown, Share2 } from 'lucide-react';
import { subDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

interface PainJournalProps {
  entries: PainEntry[];
  onDeleteEntry: (id: string) => void;
}

type DateFilter = 'all' | 'today' | 'week' | 'month';
type IntensityFilter = 'all' | 'low' | 'medium' | 'high';

export function PainJournal({ entries, onDeleteEntry }: PainJournalProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [intensityFilter, setIntensityFilter] = useState<IntensityFilter>('all');
  const [zoneFilter, setZoneFilter] = useState<BodyZone | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const allZones = useMemo(() => {
    const zones = new Set<BodyZone>();
    entries.forEach(entry => {
      entry.zones.forEach(zone => zones.add(zone));
    });
    return Array.from(zones);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const now = new Date();

      // Date filter
      if (dateFilter === 'today') {
        if (!isWithinInterval(entryDate, {
          start: startOfDay(now),
          end: endOfDay(now),
        })) return false;
      } else if (dateFilter === 'week') {
        if (!isWithinInterval(entryDate, {
          start: startOfDay(subDays(now, 7)),
          end: endOfDay(now),
        })) return false;
      } else if (dateFilter === 'month') {
        if (!isWithinInterval(entryDate, {
          start: startOfDay(subDays(now, 30)),
          end: endOfDay(now),
        })) return false;
      }

      // Intensity filter
      if (intensityFilter === 'low' && entry.intensity > 3) return false;
      if (intensityFilter === 'medium' && (entry.intensity < 4 || entry.intensity > 6)) return false;
      if (intensityFilter === 'high' && entry.intensity < 7) return false;

      // Zone filter
      if (zoneFilter !== 'all' && !entry.zones.includes(zoneFilter)) return false;

      return true;
    });
  }, [entries, dateFilter, intensityFilter, zoneFilter]);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucun enregistrement
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Commencez à suivre votre douleur en ajoutant votre premier épisode.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-card border border-border"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Filtres</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card-medical p-4 space-y-4 animate-slide-up">
          {/* Date Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Période</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'today', 'week', 'month'] as DateFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    dateFilter === filter
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {filter === 'all' && 'Tout'}
                  {filter === 'today' && "Aujourd'hui"}
                  {filter === 'week' && '7 jours'}
                  {filter === 'month' && '30 jours'}
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Intensité</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'low', 'medium', 'high'] as IntensityFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setIntensityFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    intensityFilter === filter
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {filter === 'all' && 'Toutes'}
                  {filter === 'low' && 'Faible (0-3)'}
                  {filter === 'medium' && 'Moyenne (4-6)'}
                  {filter === 'high' && 'Forte (7-10)'}
                </button>
              ))}
            </div>
          </div>

          {/* Zone Filter */}
          {allZones.length > 0 && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Zone</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setZoneFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    zoneFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Toutes
                </button>
                {allZones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setZoneFilter(zone)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      zoneFilter === zone
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {BODY_ZONE_LABELS[zone]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Count & Export Button */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {filteredEntries.length} enregistrement{filteredEntries.length > 1 ? 's' : ''}
        </span>
        <button
          onClick={() => setShowExportDialog(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Exporter
        </button>
      </div>

      {/* Export Dialog */}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        entries={filteredEntries}
      />

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.map(entry => (
          <PainEntryCard
            key={entry.id}
            entry={entry}
            onDelete={onDeleteEntry}
          />
        ))}
      </div>

      {filteredEntries.length === 0 && entries.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun résultat pour ces filtres</p>
        </div>
      )}
    </div>
  );
}
