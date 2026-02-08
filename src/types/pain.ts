export type Gender = 'male' | 'female';
export type BodyView = 'front' | 'back';

export type BodyZone =
  | 'head'
  | 'neck'
  | 'left-shoulder'
  | 'right-shoulder'
  | 'chest'
  | 'left-arm'
  | 'right-arm'
  | 'left-forearm'
  | 'right-forearm'
  | 'left-hand'
  | 'right-hand'
  | 'abdomen'
  | 'left-hip'
  | 'right-hip'
  | 'pelvis'
  | 'left-thigh'
  | 'right-thigh'
  | 'left-knee'
  | 'right-knee'
  | 'left-leg'
  | 'right-leg'
  | 'left-foot'
  | 'right-foot'
  | 'upper-back'
  | 'lower-back';

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
  head: 'Tête',
  neck: 'Cou',
  'left-shoulder': 'Épaule gauche',
  'right-shoulder': 'Épaule droite',
  chest: 'Thorax',
  'left-arm': 'Bras gauche',
  'right-arm': 'Bras droit',
  'left-forearm': 'Avant-bras gauche',
  'right-forearm': 'Avant-bras droit',
  'left-hand': 'Main gauche',
  'right-hand': 'Main droite',
  abdomen: 'Abdomen',
  'left-hip': 'Hanche gauche',
  'right-hip': 'Hanche droite',
  pelvis: 'Bassin',
  'left-thigh': 'Cuisse gauche',
  'right-thigh': 'Cuisse droite',
  'left-knee': 'Genou gauche',
  'right-knee': 'Genou droit',
  'left-leg': 'Jambe gauche',
  'right-leg': 'Jambe droite',
  'left-foot': 'Pied gauche',
  'right-foot': 'Pied droit',
  'upper-back': 'Haut du dos',
  'lower-back': 'Bas du dos',
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
