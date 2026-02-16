import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import bodyZonesImage from '@/assets/body-zones-face.png';
import { toast } from 'sonner';

interface Zone {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

const ZONES: Zone[] = [
  { id: 'cou', label: 'Cou', top: '11.5%', left: '38%', width: '24%', height: '4%' },
  { id: 'thorax', label: 'Thorax', top: '16%', left: '30%', width: '40%', height: '12%' },
  { id: 'abdomen', label: 'Abdomen', top: '28%', left: '30%', width: '40%', height: '12%' },
  { id: 'epaule-gauche', label: 'Épaule Gauche', top: '14%', left: '14%', width: '16%', height: '7%' },
  { id: 'epaule-droite', label: 'Épaule Droite', top: '14%', left: '70%', width: '16%', height: '7%' },
  { id: 'bras-gauche', label: 'Bras Gauche', top: '21%', left: '10%', width: '14%', height: '12%' },
  { id: 'bras-droit', label: 'Bras Droit', top: '21%', left: '76%', width: '14%', height: '12%' },
  { id: 'avant-bras-gauche', label: 'Avant-bras Gauche', top: '33%', left: '4%', width: '14%', height: '12%' },
  { id: 'avant-bras-droit', label: 'Avant-bras Droit', top: '33%', left: '82%', width: '14%', height: '12%' },
  { id: 'main-gauche', label: 'Main Gauche', top: '44%', left: '2%', width: '12%', height: '6%' },
  { id: 'main-droite', label: 'Main Droite', top: '44%', left: '86%', width: '12%', height: '6%' },
  { id: 'hanche-gauche', label: 'Hanche Gauche', top: '40%', left: '26%', width: '18%', height: '7%' },
  { id: 'hanche-droite', label: 'Hanche Droite', top: '40%', left: '56%', width: '18%', height: '7%' },
  { id: 'cuisse-gauche', label: 'Cuisse Gauche', top: '47%', left: '22%', width: '20%', height: '14%' },
  { id: 'cuisse-droite', label: 'Cuisse Droite', top: '47%', left: '58%', width: '20%', height: '14%' },
  { id: 'genou-gauche', label: 'Genou Gauche', top: '61%', left: '24%', width: '16%', height: '7%' },
  { id: 'genou-droit', label: 'Genou Droit', top: '61%', left: '60%', width: '16%', height: '7%' },
  { id: 'jambe-gauche', label: 'Jambe Gauche', top: '68%', left: '26%', width: '14%', height: '14%' },
  { id: 'jambe-droite', label: 'Jambe Droite', top: '68%', left: '60%', width: '14%', height: '14%' },
  { id: 'pied-gauche', label: 'Pied Gauche', top: '82%', left: '24%', width: '14%', height: '6%' },
  { id: 'pied-droit', label: 'Pied Droit', top: '82%', left: '62%', width: '14%', height: '6%' },
];

interface BodyZoneSelectorProps {
  onSelectZone?: (zoneId: string, label: string) => void;
  selectedZone?: string | null;
  className?: string;
}

export function BodyZoneSelector({ onSelectZone, selectedZone, className }: BodyZoneSelectorProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const handleClick = (zone: Zone) => {
    if (onSelectZone) {
      onSelectZone(zone.id, zone.label);
    } else {
      toast.success(`Douleur sélectionnée : ${zone.label}`);
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <h2 className="text-lg font-semibold text-foreground">Sélectionnez la zone de douleur</h2>
      <div className="relative w-full max-w-[400px] mx-auto">
        <img
          src={bodyZonesImage}
          alt="Corps humain - sélecteur de zones"
          draggable={false}
          className="block w-full pointer-events-none select-none"
        />
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            onClick={() => handleClick(zone)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            className={cn(
              'absolute rounded-md cursor-pointer transition-all duration-200',
              selectedZone === zone.id
                ? 'bg-primary/30 ring-2 ring-primary'
                : hoveredZone === zone.id
                  ? 'bg-primary/15'
                  : 'bg-transparent'
            )}
            style={{
              top: zone.top,
              left: zone.left,
              width: zone.width,
              height: zone.height,
            }}
            title={zone.label}
          />
        ))}
      </div>
      {selectedZone && (
        <p className="text-sm font-medium text-primary animate-in fade-in-0">
          Zone sélectionnée : {ZONES.find(z => z.id === selectedZone)?.label}
        </p>
      )}
    </div>
  );
}
