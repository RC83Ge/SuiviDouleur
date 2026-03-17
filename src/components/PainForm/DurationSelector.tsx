import React from 'react';
import { PainDuration, PAIN_DURATION_LABELS } from '@/types/pain';

interface DurationSelectorProps {
  value: PainDuration;
  onChange: (duration: PainDuration) => void;
}

const durations: PainDuration[] = ['instant', 'minutes', 'hours', 'continuous'];

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      <label className="text-sm font-medium text-foreground">Durée</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PainDuration)}
        className="input-medical h-10 px-3 py-2 text-sm"
      >
        {durations.map((duration) => (
          <option key={duration} value={duration}>
            {PAIN_DURATION_LABELS[duration]}
          </option>
        ))}
      </select>
    </div>
  );
}
