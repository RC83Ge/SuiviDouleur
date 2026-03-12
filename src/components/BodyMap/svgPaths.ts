import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 200 480
// Anatomical convention: patient's LEFT = screen RIGHT on front view
// Patient's RIGHT = screen LEFT on front view
// Blue monochrome style matching reference image_12.png

export const FRONT_PATHS: ZonePath[] = [
  // HEAD
  {
    id: 'head-front',
    label: 'Tête (Face)',
    d: 'M89,12 C87,6 90,1 100,0 C110,1 113,6 111,12 L113,28 C114,36 113,44 110,50 C107,54 104,56 100,57 C96,56 93,54 90,50 C87,44 86,36 87,28 Z',
  },
  // NECK
  {
    id: 'neck-front',
    label: 'Cou (Avant)',
    d: 'M93,57 L107,57 L109,72 C106,74 100,75 94,74 L91,72 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M91,72 C82,68 72,68 64,72 C60,75 58,80 58,86 L66,86 C68,80 74,76 82,74 L91,76 Z',
  },
  // LEFT SHOULDER (patient left = screen right)
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M109,72 C118,68 128,68 136,72 C140,75 142,80 142,86 L134,86 C132,80 126,76 118,74 L109,76 Z',
  },
  // RIGHT PECTORAL
  {
    id: 'right-pectoral',
    label: 'Pectoral droit',
    d: 'M66,86 L91,76 L91,120 L68,120 C66,110 65,98 66,86 Z',
  },
  // LEFT PECTORAL
  {
    id: 'left-pectoral',
    label: 'Pectoral gauche',
    d: 'M134,86 L109,76 L109,120 L132,120 C134,110 135,98 134,86 Z',
  },
  // UPPER ABDOMEN
  {
    id: 'upper-abdomen',
    label: 'Abdomen haut',
    d: 'M68,120 L91,120 L100,120 L109,120 L132,120 L130,155 L100,155 L70,155 Z',
  },
  // LOWER ABDOMEN
  {
    id: 'lower-abdomen',
    label: 'Abdomen bas',
    d: 'M70,155 L100,155 L130,155 L128,180 C122,190 112,195 100,196 C88,195 78,190 72,180 Z',
  },
  // RIGHT BICEP
  {
    id: 'right-bicep',
    label: 'Biceps droit',
    d: 'M58,86 C56,92 54,100 52,110 L48,142 C50,146 54,148 58,146 L66,120 L66,86 Z',
  },
  // LEFT BICEP
  {
    id: 'left-bicep',
    label: 'Biceps gauche',
    d: 'M142,86 C144,92 146,100 148,110 L152,142 C150,146 146,148 142,146 L134,120 L134,86 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm-front',
    label: 'Avant-bras droit',
    d: 'M48,142 C50,146 54,148 58,146 L56,200 C52,204 48,204 44,200 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm-front',
    label: 'Avant-bras gauche',
    d: 'M152,142 C150,146 146,148 142,146 L144,200 C148,204 152,204 156,200 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand-palm',
    label: 'Main droite (Paume)',
    d: 'M44,200 C48,204 52,204 56,200 L58,218 C58,226 56,234 52,240 C48,244 42,244 38,238 C34,232 34,222 36,214 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand-palm',
    label: 'Main gauche (Paume)',
    d: 'M156,200 C152,204 148,204 144,200 L142,218 C142,226 144,234 148,240 C152,244 158,244 162,238 C166,232 166,222 164,214 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh-front',
    label: 'Cuisse droite (Avant)',
    d: 'M72,180 C74,186 78,192 84,196 L100,196 L100,280 L90,280 C86,276 82,268 80,258 L76,220 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh-front',
    label: 'Cuisse gauche (Avant)',
    d: 'M128,180 C126,186 122,192 116,196 L100,196 L100,280 L110,280 C114,276 118,268 120,258 L124,220 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M90,280 L100,280 L100,310 L88,310 C86,304 86,296 88,290 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M110,280 L100,280 L100,310 L112,310 C114,304 114,296 112,290 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M88,310 L100,310 L98,400 C96,406 94,410 92,412 C89,412 87,408 86,402 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M112,310 L100,310 L102,400 C104,406 106,410 108,412 C111,412 113,408 114,402 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot-top',
    label: 'Pied droit (Dessus)',
    d: 'M86,402 C87,408 89,412 92,412 L98,412 C98,418 96,428 92,436 C88,442 82,446 76,444 C72,440 72,434 74,426 C76,418 78,410 82,406 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot-top',
    label: 'Pied gauche (Dessus)',
    d: 'M114,402 C113,408 111,412 108,412 L102,412 C102,418 104,428 108,436 C112,442 118,446 124,444 C128,440 128,434 126,426 C124,418 122,410 118,406 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // HEAD (back)
  {
    id: 'head-back',
    label: 'Tête (Arrière)',
    d: 'M89,12 C87,6 90,1 100,0 C110,1 113,6 111,12 L113,28 C114,36 113,44 110,50 C107,54 104,56 100,57 C96,56 93,54 90,50 C87,44 86,36 87,28 Z',
  },
  // NAPE
  {
    id: 'nape',
    label: 'Nuque',
    d: 'M93,57 L107,57 L109,72 C106,74 100,75 94,74 L91,72 Z',
  },
  // LEFT SCAPULA (patient left = screen left on back)
  {
    id: 'left-scapula',
    label: 'Omoplate gauche',
    d: 'M91,72 C82,68 72,68 64,72 C60,75 58,80 58,86 L66,86 C66,90 66,98 68,108 L68,120 L91,120 L91,76 Z',
  },
  // RIGHT SCAPULA (patient right = screen right on back)
  {
    id: 'right-scapula',
    label: 'Omoplate droite',
    d: 'M109,72 C118,68 128,68 136,72 C140,75 142,80 142,86 L134,86 C134,90 134,98 132,108 L132,120 L109,120 L109,76 Z',
  },
  // LEFT LOWER BACK
  {
    id: 'left-lower-back',
    label: 'Lombaire gauche',
    d: 'M68,120 L91,120 L100,120 L100,165 L70,165 Z',
  },
  // RIGHT LOWER BACK
  {
    id: 'right-lower-back',
    label: 'Lombaire droite',
    d: 'M100,120 L109,120 L132,120 L130,165 L100,165 Z',
  },
  // LEFT GLUTE
  {
    id: 'left-glute',
    label: 'Fessier gauche',
    d: 'M70,165 L100,165 L100,196 C88,195 78,190 72,180 Z',
  },
  // RIGHT GLUTE
  {
    id: 'right-glute',
    label: 'Fessier droit',
    d: 'M130,165 L100,165 L100,196 C112,195 122,190 128,180 Z',
  },
  // LEFT TRICEP
  {
    id: 'left-tricep',
    label: 'Triceps gauche',
    d: 'M58,86 C56,92 54,100 52,110 L48,142 C50,146 54,148 58,146 L66,120 L66,86 Z',
  },
  // RIGHT TRICEP
  {
    id: 'right-tricep',
    label: 'Triceps droit',
    d: 'M142,86 C144,92 146,100 148,110 L152,142 C150,146 146,148 142,146 L134,120 L134,86 Z',
  },
  // LEFT FOREARM BACK
  {
    id: 'left-forearm-back',
    label: 'Arrière avant-bras gauche',
    d: 'M48,142 C50,146 54,148 58,146 L56,200 C52,204 48,204 44,200 Z',
  },
  // RIGHT FOREARM BACK
  {
    id: 'right-forearm-back',
    label: 'Arrière avant-bras droit',
    d: 'M152,142 C150,146 146,148 142,146 L144,200 C148,204 152,204 156,200 Z',
  },
  // LEFT HAND BACK
  {
    id: 'left-hand-back',
    label: 'Main gauche (Dos)',
    d: 'M44,200 C48,204 52,204 56,200 L58,218 C58,226 56,234 52,240 C48,244 42,244 38,238 C34,232 34,222 36,214 Z',
  },
  // RIGHT HAND BACK
  {
    id: 'right-hand-back',
    label: 'Main droite (Dos)',
    d: 'M156,200 C152,204 148,204 144,200 L142,218 C142,226 144,234 148,240 C152,244 158,244 162,238 C166,232 166,222 164,214 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M72,180 C74,186 78,192 84,196 L100,196 L100,280 L90,280 C86,276 82,268 80,258 L76,220 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M128,180 C126,186 122,192 116,196 L100,196 L100,280 L110,280 C114,276 118,268 120,258 L124,220 Z',
  },
  // LEFT POPLITEAL
  {
    id: 'left-popliteal',
    label: 'Creux poplité gauche',
    d: 'M90,280 L100,280 L100,310 L88,310 C86,304 86,296 88,290 Z',
  },
  // RIGHT POPLITEAL
  {
    id: 'right-popliteal',
    label: 'Creux poplité droit',
    d: 'M110,280 L100,280 L100,310 L112,310 C114,304 114,296 112,290 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M88,310 L100,310 L98,400 C96,406 94,410 92,412 C89,412 87,408 86,402 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M112,310 L100,310 L102,400 C104,406 106,410 108,412 C111,412 113,408 114,402 Z',
  },
  // LEFT HEEL
  {
    id: 'left-heel',
    label: 'Talon gauche',
    d: 'M86,402 C87,408 89,412 92,412 L98,412 C98,418 96,428 92,436 C88,442 82,446 76,444 C72,440 72,434 74,426 C76,418 78,410 82,406 Z',
  },
  // RIGHT HEEL
  {
    id: 'right-heel',
    label: 'Talon droit',
    d: 'M114,402 C113,408 111,412 108,412 L102,412 C102,418 104,428 108,436 C112,442 118,446 124,444 C128,440 128,434 126,426 C124,418 122,410 118,406 Z',
  },
];
