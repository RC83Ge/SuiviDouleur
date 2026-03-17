import React from 'react';
import { TRIGGER_FACTORS, RELIEF_FACTORS } from '@/types/pain';
import { AlertTriangle, Heart } from 'lucide-react';

interface FactorsSelectorProps {
  triggerFactors: string[];
  reliefFactors: string[];
  onTriggerChange: (factors: string[]) => void;
  onReliefChange: (factors: string[]) => void;
}

export function FactorsSelector({
  triggerFactors,
  reliefFactors,
  onTriggerChange,
  onReliefChange,
}: FactorsSelectorProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-foreground">Facteurs déclenchants</span>
          <span className="text-xs text-muted-foreground">(optionnel)</span>
        </div>
        <select
          value={triggerFactors[0] ?? ''}
          onChange={(e) => onTriggerChange(e.target.value ? [e.target.value] : [])}
          className="input-medical h-10 px-3 py-2 text-sm"
        >
          <option value="">Sélectionnez un facteur déclenchant</option>
          {TRIGGER_FACTORS.map((factor) => (
            <option key={factor.id} value={factor.id}>
              {factor.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Facteurs de soulagement</span>
          <span className="text-xs text-muted-foreground">(optionnel)</span>
        </div>
        <select
          value={reliefFactors[0] ?? ''}
          onChange={(e) => onReliefChange(e.target.value ? [e.target.value] : [])}
          className="input-medical h-10 px-3 py-2 text-sm"
        >
          <option value="">Sélectionnez un facteur de soulagement</option>
          {RELIEF_FACTORS.map((factor) => (
            <option key={factor.id} value={factor.id}>
              {factor.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
