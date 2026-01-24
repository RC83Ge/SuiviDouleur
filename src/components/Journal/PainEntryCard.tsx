import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PainEntry, BODY_ZONE_LABELS, PAIN_TYPE_LABELS, PAIN_DURATION_LABELS } from '@/types/pain';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';

interface PainEntryCardProps {
  entry: PainEntry;
  onDelete: (id: string) => void;
}

const getIntensityColor = (intensity: number) => {
  const colors = [
    'bg-pain-0',
    'bg-pain-1',
    'bg-pain-2',
    'bg-pain-3',
    'bg-pain-4',
    'bg-pain-5',
    'bg-pain-6',
    'bg-pain-7',
    'bg-pain-8',
    'bg-pain-9',
    'bg-pain-10',
  ];
  return colors[intensity] || colors[5];
};

export function PainEntryCard({ entry, onDelete }: PainEntryCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(entry.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="card-medical p-4 space-y-3 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground ${getIntensityColor(entry.intensity)}`}>
            {entry.intensity}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(entry.date), "d MMMM yyyy", { locale: fr })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {format(new Date(entry.date), "HH:mm", { locale: fr })}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg transition-all ${
            showDeleteConfirm
              ? 'bg-destructive text-destructive-foreground'
              : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Zones */}
      <div className="flex items-start gap-2">
        <MapPin className="w-4 h-4 text-primary mt-0.5" />
        <div className="flex flex-wrap gap-1">
          {entry.zones.map(zone => (
            <span
              key={zone}
              className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {BODY_ZONE_LABELS[zone]}
            </span>
          ))}
        </div>
      </div>

      {/* Pain Types */}
      {entry.painTypes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.painTypes.map(type => (
            <span
              key={type}
              className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
            >
              {PAIN_TYPE_LABELS[type]}
            </span>
          ))}
        </div>
      )}

      {/* Duration */}
      <div className="text-sm text-muted-foreground">
        Durée : {PAIN_DURATION_LABELS[entry.duration]}
      </div>

      {/* Notes */}
      {entry.notes && (
        <p className="text-sm text-foreground bg-muted/50 rounded-lg px-3 py-2">
          {entry.notes}
        </p>
      )}
    </div>
  );
}
