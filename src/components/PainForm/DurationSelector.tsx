import React from 'react';
import { PainDuration, PAIN_DURATION_LABELS } from '@/types/pain';
import { Clock, Timer, Hourglass, Infinity } from 'lucide-react';

interface DurationSelectorProps {
  value: PainDuration;
  onChange: (duration: PainDuration) => void;
}

const durationIcons: Record<PainDuration, React.ReactNode> = {
  instant: <Clock className="w-4 h-4" />,
  minutes: <Timer className="w-4 h-4" />,
  hours: <Hourglass className="w-4 h-4" />,
  continuous: <Infinity className="w-4 h-4" />,
};

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const durations: PainDuration[] = ['instant', 'minutes', 'hours', 'continuous'];

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-foreground">Durée</span>
      
      <div className="grid grid-cols-4 gap-2">
        {durations.map((duration) => (
          <button
            key={duration}
            type="button"
            onClick={() => onChange(duration)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
              value === duration
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card hover:border-primary/50 text-foreground'
            }`}
          >
            {durationIcons[duration]}
            <span className="text-xs font-medium text-center">
              {PAIN_DURATION_LABELS[duration]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
