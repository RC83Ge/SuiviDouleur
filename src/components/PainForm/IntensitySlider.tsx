import React from 'react';
import { cn } from '@/lib/utils';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const intensityLabels = [
  'Aucune',
  'Très légère',
  'Légère',
  'Modérée',
  'Modérée+',
  'Moyenne',
  'Forte',
  'Très forte',
  'Intense',
  'Très intense',
  'Insupportable',
];

function getDotColor(index: number): string {
  // Blue gradient from light to dark/intense
  const colors = [
    '#BFDBFE', // 0
    '#93C5FD', // 1
    '#60A5FA', // 2
    '#3B82F6', // 3
    '#2563EB', // 4
    '#1D4ED8', // 5
    '#1E40AF', // 6
    '#1E3A8A', // 7
    '#1E3A7B', // 8
    '#172554', // 9
    '#0F172A', // 10
  ];
  return colors[index];
}

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          Pic de Douleur Maximum
        </span>
        <span className="text-sm font-bold" style={{ color: getDotColor(value) }}>
          {value}/10
        </span>
      </div>

      <p className="text-xs text-muted-foreground">{intensityLabels[value]}</p>

      {/* Dot slider */}
      <div className="flex items-center justify-between gap-1 py-2">
        {Array.from({ length: 11 }, (_, i) => {
          const isActive = i <= value;
          const isSelected = i === value;
          const size = isSelected ? 'w-8 h-8' : 'w-5 h-5';

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              className={cn(
                'rounded-full transition-all duration-200 flex items-center justify-center text-[10px] font-bold',
                size
              )}
              style={{
                backgroundColor: isActive ? getDotColor(i) : '#E2E8F0',
                color: isActive ? '#fff' : '#94A3B8',
                boxShadow: isSelected
                  ? `0 0 0 3px ${getDotColor(i)}33, 0 2px 8px ${getDotColor(i)}44`
                  : 'none',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {isSelected ? i : ''}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Aucune</span>
        <span>Insupportable</span>
      </div>
    </div>
  );
}
