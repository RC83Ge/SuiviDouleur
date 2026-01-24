import React from 'react';
import { TRIGGER_FACTORS, RELIEF_FACTORS, TriggerFactor } from '@/types/pain';
import { AlertTriangle, Heart } from 'lucide-react';

interface FactorsSelectorProps {
  triggerFactors: string[];
  reliefFactors: string[];
  onTriggerChange: (factors: string[]) => void;
  onReliefChange: (factors: string[]) => void;
}

function FactorButtons({
  factors,
  selectedFactors,
  onChange,
}: {
  factors: TriggerFactor[];
  selectedFactors: string[];
  onChange: (factors: string[]) => void;
}) {
  const toggleFactor = (id: string) => {
    if (selectedFactors.includes(id)) {
      onChange(selectedFactors.filter(f => f !== id));
    } else {
      onChange([...selectedFactors, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {factors.map((factor) => (
        <button
          key={factor.id}
          type="button"
          onClick={() => toggleFactor(factor.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedFactors.includes(factor.id)
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {factor.label}
        </button>
      ))}
    </div>
  );
}

export function FactorsSelector({
  triggerFactors,
  reliefFactors,
  onTriggerChange,
  onReliefChange,
}: FactorsSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-foreground">Facteurs déclenchants</span>
          <span className="text-xs text-muted-foreground">(optionnel)</span>
        </div>
        <FactorButtons
          factors={TRIGGER_FACTORS}
          selectedFactors={triggerFactors}
          onChange={onTriggerChange}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Facteurs de soulagement</span>
          <span className="text-xs text-muted-foreground">(optionnel)</span>
        </div>
        <FactorButtons
          factors={RELIEF_FACTORS}
          selectedFactors={reliefFactors}
          onChange={onReliefChange}
        />
      </div>
    </div>
  );
}
