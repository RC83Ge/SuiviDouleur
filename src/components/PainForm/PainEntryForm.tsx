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
  const [selectedZones, setSelectedZones] = useState<BodyZone[]>([]);
  const [painTypes, setPainTypes] = useState<PainType[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState<PainDuration>('minutes');
  const [triggerFactors, setTriggerFactors] = useState<string[]>([]);
  const [reliefFactors, setReliefFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [otherDescription, setOtherDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedZones.length === 0) {
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    
    onSave({
      date: dateTime,
      zones: selectedZones,
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
    <form onSubmit={handleSubmit} className="space-y-6 pb-8">
      {/* Date and Time */}
      <div className="card-medical p-4 space-y-4">
        <h3 className="section-header flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Date et heure
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-medical"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Heure</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-medical"
            />
          </div>
        </div>
      </div>

      {/* Body Map */}
      <div className="card-medical p-4 space-y-4">
        <h3 className="section-header">Localisation</h3>
        <BodyMapSelector
          selectedZones={selectedZones}
          onZonesChange={setSelectedZones}
          intensity={intensity}
          onIntensityChange={setIntensity}
          painTypes={painTypes}
          onPainTypesChange={setPainTypes}
          duration={duration}
          onDurationChange={setDuration}
          otherDescription={otherDescription}
          onOtherDescriptionChange={setOtherDescription}
        />
      </div>

      {/* Intensity */}
      <div className="card-medical p-4">
        <IntensitySlider value={intensity} onChange={setIntensity} />
      </div>

      {/* Pain Type */}
      <div className="card-medical p-4">
        <PainTypeSelector
          selectedTypes={painTypes}
          onChange={setPainTypes}
          otherDescription={otherDescription}
          onOtherDescriptionChange={setOtherDescription}
        />
      </div>

      {/* Duration */}
      <div className="card-medical p-4">
        <DurationSelector value={duration} onChange={setDuration} />
      </div>

      {/* Factors */}
      <div className="card-medical p-4">
        <FactorsSelector
          triggerFactors={triggerFactors}
          reliefFactors={reliefFactors}
          onTriggerChange={setTriggerFactors}
          onReliefChange={setReliefFactors}
        />
      </div>

      {/* Notes */}
      <div className="card-medical p-4 space-y-3">
        <label className="text-sm font-medium text-foreground">
          Commentaire libre
          <span className="text-xs text-muted-foreground ml-2">(optionnel)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Décrivez votre douleur plus en détail..."
          rows={3}
          className="input-medical resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn-medical bg-secondary text-secondary-foreground"
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 btn-medical-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-medical">
        <strong>Important :</strong> Cette application est un outil de suivi personnel. 
        Elle ne fournit aucun diagnostic médical. Consultez un professionnel de santé 
        pour toute question médicale.
      </div>
    </form>
  );
}
