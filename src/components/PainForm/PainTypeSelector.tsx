import React from 'react';
import { PainType, PAIN_TYPE_LABELS } from '@/types/pain';
import { Flame, Zap, Heart, ArrowUp, Grip, Circle, Hash, MessageSquare } from 'lucide-react';

interface PainTypeSelectorProps {
  selectedTypes: PainType[];
  onChange: (types: PainType[]) => void;
  otherDescription?: string;
  onOtherDescriptionChange?: (value: string) => void;
}

const painTypeIcons: Record<PainType, React.ReactNode> = {
  burning: <Flame className="w-4 h-4" />,
  stabbing: <ArrowUp className="w-4 h-4 rotate-45" />,
  electric: <Zap className="w-4 h-4" />,
  pulsating: <Heart className="w-4 h-4" />,
  shooting: <ArrowUp className="w-4 h-4" />,
  crushing: <Grip className="w-4 h-4" />,
  cramping: <Circle className="w-4 h-4" />,
  numbness: <Hash className="w-4 h-4" />,
  other: <MessageSquare className="w-4 h-4" />,
};

export function PainTypeSelector({
  selectedTypes,
  onChange,
  otherDescription = '',
  onOtherDescriptionChange,
}: PainTypeSelectorProps) {
  const toggleType = (type: PainType) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

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

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-foreground">Type de douleur</span>
      
      <div className="grid grid-cols-3 gap-2">
        {painTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => toggleType(type)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
              selectedTypes.includes(type)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card hover:border-primary/50 text-foreground'
            }`}
          >
            {painTypeIcons[type]}
            <span className="text-xs font-medium text-center">
              {PAIN_TYPE_LABELS[type]}
            </span>
          </button>
        ))}
      </div>

      {selectedTypes.includes('other') && onOtherDescriptionChange && (
        <input
          type="text"
          value={otherDescription}
          onChange={(e) => onOtherDescriptionChange(e.target.value)}
          placeholder="Décrivez le type de douleur..."
          className="input-medical mt-2"
        />
      )}
    </div>
  );
}
