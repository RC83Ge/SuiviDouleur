import React from 'react';
import { usePainStore } from '@/hooks/usePainStore';
import { StatCard } from './StatCard';
import { BODY_ZONE_LABELS, PAIN_TYPE_LABELS, BodyZone, PainType } from '@/types/pain';
import { Activity, TrendingUp, MapPin, Flame, Calendar, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const { entries, getStats } = usePainStore();
  const stats = getStats();

  if (entries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Bienvenue dans votre suivi de douleur
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Commencez à enregistrer vos épisodes de douleur pour voir des statistiques 
            et tendances apparaître ici.
          </p>
        </div>

        <div className="disclaimer-medical mx-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Outil de suivi personnel</strong>
              <p className="mt-1">
                Cette application ne fournit aucun diagnostic médical. 
                Consultez un professionnel de santé pour toute question.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="section-header flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Résumé
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Calendar}
          label="Épisodes"
          value={stats.totalEntries}
          color="primary"
        />
        <StatCard
          icon={Activity}
          label="Intensité moy."
          value={stats.averageIntensity}
          sublabel={`Max: ${stats.maxIntensity}/10`}
          color="destructive"
        />
      </div>

      {stats.mostAffectedZones.length > 0 && (
        <div className="card-medical p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Zones les plus touchées</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.mostAffectedZones.map((zone, index) => (
              <span
                key={zone}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  index === 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {BODY_ZONE_LABELS[zone as BodyZone]}
              </span>
            ))}
          </div>
        </div>
      )}

      {stats.mostCommonPainTypes.length > 0 && (
        <div className="card-medical p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Types de douleur fréquents</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.mostCommonPainTypes.map((type, index) => (
              <span
                key={type}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  index === 0
                    ? 'bg-destructive/20 text-destructive'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {PAIN_TYPE_LABELS[type as PainType]}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="disclaimer-medical">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Rappel</strong>
            <p className="mt-1">
              Ces données sont à titre informatif. Partagez-les avec votre médecin 
              pour un suivi médical adapté.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
