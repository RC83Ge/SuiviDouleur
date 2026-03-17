import React from 'react';
import { MessageSquare } from 'lucide-react';
import { PainType, PAIN_TYPE_LABELS } from '@/types/pain';

interface PainTypeSelectorProps {
  selectedTypes: PainType[];
  onChange: (types: PainType[]) => void;
  otherDescription?: string;
  onOtherDescriptionChange?: (value: string) => void;
}

const painTypes: PainType[] = [
  'burning',
  'stabbing',
  'electric',
  'pulsating',
  'shooting',
  'crushing',
  'cramping',
  'numbness',
  'other',
];

export function PainTypeSelector({
  selectedTypes,
  onChange,
  otherDescription = '',
  onOtherDescriptionChange,
}: PainTypeSelectorProps) {
  const selectedType = selectedTypes[0] ?? '';

  const handleValueChange = (value: string) => {
    onChange(value ? [value as PainType] : []);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Type de douleur</label>

      <select
        value={selectedType}
        onChange={(e) => handleValueChange(e.target.value)}
        className="input-medical h-11"
      >
        <option value="">Sélectionnez un type de douleur</option>
        {painTypes.map((type) => (
          <option key={type} value={type}>
            {PAIN_TYPE_LABELS[type]}
          </option>
        ))}
      </select>

      {selectedType === 'other' && onOtherDescriptionChange && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            Précisez le type de douleur
          </div>
          <input
            type="text"
            value={otherDescription}
            onChange={(e) => onOtherDescriptionChange(e.target.value)}
            placeholder="Décrivez le type de douleur..."
            className="input-medical"
          />
        </div>
      )}
    </div>
  );
}
