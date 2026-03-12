export type Gender = 'male' | 'female';
export type BodyView = 'front' | 'back';

export type BodyZone =
  // Front zones
  | 'head'
  | 'neck'
  | 'left-shoulder'
  | 'right-shoulder'
  | 'chest'
  | 'abdomen'
  | 'pelvis'
  | 'left-upper-arm'
  | 'right-upper-arm'
  | 'left-elbow'
  | 'right-elbow'
  | 'left-forearm'
  | 'right-forearm'
  | 'left-hand'
  | 'right-hand'
  | 'left-thigh'
  | 'right-thigh'
  | 'left-knee'
  | 'right-knee'
  | 'left-shin'
  | 'right-shin'
  | 'left-ankle'
  | 'right-ankle'
  | 'left-foot'
  | 'right-foot'
  // Back zones
  | 'neck-back'
  | 'left-shoulder-blade'
  | 'right-shoulder-blade'
  | 'upper-back'
  | 'middle-back'
  | 'lower-back'
  | 'left-arm-back'
  | 'right-arm-back'
  | 'left-buttock'
  | 'right-buttock'
  | 'left-hamstring'
  | 'right-hamstring'
  | 'left-calf'
  | 'right-calf'
  | 'left-ankle-back'
  | 'right-ankle-back';

export type PainType =
  | 'burning'
  | 'stabbing'
  | 'electric'
  | 'pulsating'
  | 'shooting'
  | 'crushing'
  | 'cramping'
  | 'numbness'
  | 'other';

export type PainDuration =
  | 'instant'
  | 'minutes'
  | 'hours'
  | 'continuous';

export const PAIN_TYPE_LABELS: Record<PainType, string> = {
  burning: 'Brûlure',
  stabbing: 'Piqûre',
  electric: 'Décharge électrique',
  pulsating: 'Pulsatile',
  shooting: 'Élancement',
  crushing: 'Écrasement',
  cramping: 'Crampes',
  numbness: 'Engourdissement',
  other: 'Autre',
};

export const PAIN_DURATION_LABELS: Record<PainDuration, string> = {
  instant: 'Instantanée',
  minutes: 'Minutes',
  hours: 'Heures',
  continuous: 'Continue',
};

export const BODY_ZONE_LABELS: Record<BodyZone, string> = {
  // Front
  'head': 'Tête',
  'neck': 'Cou',
  'left-shoulder': 'Épaule gauche',
  'right-shoulder': 'Épaule droite',
  'chest': 'Thorax',
  'abdomen': 'Abdomen',
  'pelvis': 'Bassin',
  'left-upper-arm': 'Bras gauche',
  'right-upper-arm': 'Bras droit',
  'left-elbow': 'Coude gauche',
  'right-elbow': 'Coude droit',
  'left-forearm': 'Avant-bras gauche',
  'right-forearm': 'Avant-bras droit',
  'left-hand': 'Main gauche',
  'right-hand': 'Main droite',
  'left-thigh': 'Cuisse gauche',
  'right-thigh': 'Cuisse droite',
  'left-knee': 'Genou gauche',
  'right-knee': 'Genou droit',
  'left-shin': 'Tibia gauche',
  'right-shin': 'Tibia droit',
  'left-ankle': 'Cheville gauche',
  'right-ankle': 'Cheville droite',
  'left-foot': 'Pied gauche',
  'right-foot': 'Pied droit',
  // Back
  'neck-back': 'Nuque',
  'left-shoulder-blade': 'Omoplate gauche',
  'right-shoulder-blade': 'Omoplate droite',
  'upper-back': 'Haut du dos',
  'middle-back': 'Milieu du dos',
  'lower-back': 'Bas du dos',
  'left-arm-back': 'Bras gauche (arrière)',
  'right-arm-back': 'Bras droit (arrière)',
  'left-buttock': 'Fessier gauche',
  'right-buttock': 'Fessier droit',
  'left-hamstring': 'Ischio-jambier gauche',
  'right-hamstring': 'Ischio-jambier droit',
  'left-calf': 'Mollet gauche',
  'right-calf': 'Mollet droit',
  'left-ankle-back': 'Cheville gauche (arrière)',
  'right-ankle-back': 'Cheville droite (arrière)',
};

export interface TriggerFactor {
  id: string;
  label: string;
}

export const TRIGGER_FACTORS: TriggerFactor[] = [
  { id: 'effort', label: 'Effort physique' },
  { id: 'stress', label: 'Stress' },
  { id: 'meal', label: 'Repas' },
  { id: 'position', label: 'Position' },
  { id: 'weather', label: 'Météo' },
  { id: 'sleep', label: 'Manque de sommeil' },
];

export const RELIEF_FACTORS: TriggerFactor[] = [
  { id: 'rest', label: 'Repos' },
  { id: 'medication', label: 'Médicament' },
  { id: 'heat', label: 'Chaleur' },
  { id: 'cold', label: 'Froid' },
  { id: 'massage', label: 'Massage' },
  { id: 'movement', label: 'Mouvement' },
];

export interface PainEntry {
  id: string;
  date: Date;
  zones: BodyZone[];
  painTypes: PainType[];
  intensity: number;
  duration: PainDuration;
  triggerFactors: string[];
  reliefFactors: string[];
  notes: string;
  createdAt: Date;
}
