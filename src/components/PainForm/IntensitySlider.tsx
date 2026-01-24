import React from 'react';

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

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const getColor = (intensity: number) => {
    const colors = [
      'bg-pain-0',
      'bg-pain-1',
      'bg-pain-2',
      'bg-pain-3',
      'bg-pain-4',
      'bg-pain-5',
      'bg-pain-6',
      'bg-pain-7',
      'bg-pain-8',
      'bg-pain-9',
      'bg-pain-10',
    ];
    return colors[intensity] || colors[0];
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Intensité</span>
        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground ${getColor(value)}`}>
            {value}
          </span>
          <span className="text-sm text-muted-foreground">
            {intensityLabels[value]}
          </span>
        </div>
      </div>
      
      <div className="relative pt-1">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer pain-gradient"
          style={{
            WebkitAppearance: 'none',
          }}
        />
        
        <div className="flex justify-between mt-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-all ${
                value === n
                  ? `${getColor(n)} text-primary-foreground scale-110`
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
