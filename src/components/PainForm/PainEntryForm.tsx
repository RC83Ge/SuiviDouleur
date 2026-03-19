import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BodyMapSelector } from '@/components/BodyMap/BodyMapSelector';
import { IntensitySlider } from './IntensitySlider';
import { PainTypeSelector } from './PainTypeSelector';
import { DurationSelector } from './DurationSelector';
import { FactorsSelector } from './FactorsSelector';
import { BodyZone, PainType, PainDuration, PainEntry } from '@/types/pain';
import { Calendar, Clock, Save, X } from 'lucide-react';

interface PainEntryFormProps {
  onSave: (entry: Omit<PainEntry, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function PainEntryForm({ onSave, onCancel }: PainEntryFormProps) {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [zoneIntensities, setZoneIntensities] = useState<Record<string, number>>({});
  const [painTypes, setPainTypes] = useState<PainType[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState<PainDuration>('minutes');
  const [triggerFactors, setTriggerFactors] = useState<string[]>([]);
  const [reliefFactors, setReliefFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [otherDescription, setOtherDescription] = useState('');

  const handleZoneIntensityChange = (zoneId: string, value: number) => {
    setZoneIntensities((prev) => ({ ...prev, [zoneId]: value }));
    // Also update the global intensity to the max of all zone intensities
    const allIntensities = { ...zoneIntensities, [zoneId]: value };
    const maxIntensity = Math.max(...Object.values(allIntensities));
    setIntensity(maxIntensity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedZones.length === 0) {
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    
    onSave({
      date: dateTime,
      zones: selectedZones as BodyZone[],
      painTypes: painTypes,
      intensity,
      duration,
      triggerFactors,
      reliefFactors,
      notes: painTypes.includes('other') ? `${notes}\n[Autre: ${otherDescription}]` : notes,
    });
  };

  const isValid = selectedZones.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 pb-4 sm:space-y-5 sm:pb-8">
      {/* Date and Time */}
      <div className="card-medical space-y-2 p-2.5 sm:p-4">
        <h3 className="section-header mb-0 flex items-center gap-2 text-base sm:text-lg">
          <Calendar className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
          Date et heure
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground sm:text-sm">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-medical h-10 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground sm:text-sm">Heure</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-medical h-10 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Body Map */}
      <div className="card-medical space-y-3 p-3 sm:p-4">
        <h3 className="section-header mb-0 text-base sm:text-lg">Localisation</h3>
        <BodyMapSelector
          selectedZones={selectedZones}
          onZonesChange={setSelectedZones}
          zoneIntensities={zoneIntensities}
          onZoneIntensityChange={handleZoneIntensityChange}
        />
      </div>


      {/* Pain Type */}
      <div className="card-medical p-3 sm:p-4">
        <PainTypeSelector
          selectedTypes={painTypes}
          onChange={setPainTypes}
          otherDescription={otherDescription}
          onOtherDescriptionChange={setOtherDescription}
        />
      </div>

      {/* Duration */}
      <div className="card-medical p-3 sm:p-4">
        <DurationSelector value={duration} onChange={setDuration} />
      </div>

      {/* Factors */}
      <div className="card-medical p-3 sm:p-4">
        <FactorsSelector
          triggerFactors={triggerFactors}
          reliefFactors={reliefFactors}
          onTriggerChange={setTriggerFactors}
          onReliefChange={setReliefFactors}
        />
      </div>

      {/* Notes */}
      <div className="card-medical space-y-2 p-3 sm:space-y-3 sm:p-4">
        <label className="text-sm font-medium text-foreground">
          Commentaire libre
          <span className="ml-2 text-xs text-muted-foreground">(optionnel)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Décrivez votre douleur plus en détail..."
          rows={3}
          className="input-medical min-h-24 resize-none px-3 py-2 text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-1 sm:gap-3 sm:pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn-medical h-10 flex-1 bg-secondary px-3 text-sm text-secondary-foreground"
        >
          <X className="h-4 w-4" />
          Annuler
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="btn-medical-primary h-10 flex-1 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-medical px-3 py-2 text-[11px] sm:px-4 sm:py-3 sm:text-xs">
        <strong>Important :</strong> Cette application est un outil de suivi personnel. 
        Elle ne fournit aucun diagnostic médical. Consultez un professionnel de santé 
        pour toute question médicale.
      </div>
    </form>
  );
}
