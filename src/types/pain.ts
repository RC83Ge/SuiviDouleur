export type Gender = 'male' | 'female';
export type BodyView = 'front' | 'back';

export type BodyZone =
  // Front zones
  | 'head-front'
  | 'neck-front'
  | 'left-shoulder'
  | 'right-shoulder'
  | 'left-pectoral'
  | 'right-pectoral'
  | 'upper-abdomen'
  | 'lower-abdomen'
  | 'left-bicep'
  | 'right-bicep'
  | 'left-forearm-front'
  | 'right-forearm-front'
  | 'left-hand-palm'
  | 'right-hand-palm'
  | 'left-thigh-front'
  | 'right-thigh-front'
  | 'left-knee'
  | 'right-knee'
  | 'left-shin'
  | 'right-shin'
  | 'left-foot-top'
  | 'right-foot-top'
  // Back zones
  | 'head-back'
  | 'nape'
  | 'left-scapula'
  | 'right-scapula'
  | 'left-lower-back'
  | 'right-lower-back'
  | 'left-glute'
  | 'right-glute'
  | 'left-tricep'
  | 'right-tricep'
  | 'left-forearm-back'
  | 'right-forearm-back'
  | 'left-hand-back'
  | 'right-hand-back'
  | 'left-hamstring'
  | 'right-hamstring'
  | 'left-popliteal'
  | 'right-popliteal'
  | 'left-calf'
  | 'right-calf'
  | 'left-heel'
  | 'right-heel'
  // Legacy compat
  | 'head'
  | 'neck'
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
  // Front
  'head-front': 'Tête (Face)',
  'neck-front': 'Cou (Avant)',
  'left-shoulder': 'Épaule gauche',
  'right-shoulder': 'Épaule droite',
  'left-pectoral': 'Pectoral gauche',
  'right-pectoral': 'Pectoral droit',
  'upper-abdomen': 'Abdomen haut',
  'lower-abdomen': 'Abdomen bas',
  'left-bicep': 'Biceps gauche',
  'right-bicep': 'Biceps droit',
  'left-forearm-front': 'Avant-bras gauche',
  'right-forearm-front': 'Avant-bras droit',
  'left-hand-palm': 'Main gauche (Paume)',
  'right-hand-palm': 'Main droite (Paume)',
  'left-thigh-front': 'Cuisse gauche (Avant)',
  'right-thigh-front': 'Cuisse droite (Avant)',
  'left-knee': 'Genou gauche',
  'right-knee': 'Genou droit',
  'left-shin': 'Tibia gauche',
  'right-shin': 'Tibia droit',
  'left-foot-top': 'Pied gauche (Dessus)',
  'right-foot-top': 'Pied droit (Dessus)',
  // Back
  'head-back': 'Tête (Arrière)',
  'nape': 'Nuque',
  'left-scapula': 'Omoplate gauche',
  'right-scapula': 'Omoplate droite',
  'left-lower-back': 'Lombaire gauche',
  'right-lower-back': 'Lombaire droite',
  'left-glute': 'Fessier gauche',
  'right-glute': 'Fessier droit',
  'left-tricep': 'Triceps gauche',
  'right-tricep': 'Triceps droit',
  'left-forearm-back': 'Arrière avant-bras gauche',
  'right-forearm-back': 'Arrière avant-bras droit',
  'left-hand-back': 'Main gauche (Dos)',
  'right-hand-back': 'Main droite (Dos)',
  'left-hamstring': 'Ischio-jambier gauche',
  'right-hamstring': 'Ischio-jambier droit',
  'left-popliteal': 'Creux poplité gauche',
  'right-popliteal': 'Creux poplité droit',
  'left-calf': 'Mollet gauche',
  'right-calf': 'Mollet droit',
  'left-heel': 'Talon gauche',
  'right-heel': 'Talon droit',
  // Legacy
  head: 'Tête',
  neck: 'Cou',
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
