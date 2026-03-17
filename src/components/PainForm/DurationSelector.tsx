import React from 'react';
import { PainDuration, PAIN_DURATION_LABELS } from '@/types/pain';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DurationSelectorProps {
  value: PainDuration;
  onChange: (duration: PainDuration) => void;
}

const durations: PainDuration[] = ['instant', 'minutes', 'hours', 'continuous'];

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Durée</label>

      <Select value={value} onValueChange={(nextValue) => onChange(nextValue as PainDuration)}>
        <SelectTrigger className="h-11 rounded-xl border-border bg-background text-left">
          <SelectValue placeholder="Sélectionnez une durée" />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration) => (
            <SelectItem key={duration} value={duration}>
              {PAIN_DURATION_LABELS[duration]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
