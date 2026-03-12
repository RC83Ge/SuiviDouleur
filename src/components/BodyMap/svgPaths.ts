import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 200 500
// Anatomical convention: patient's LEFT = screen RIGHT on front view
// Patient's RIGHT = screen LEFT on front view

export const FRONT_PATHS: ZonePath[] = [
  // HEAD (front)
  {
    id: 'head-front',
    label: 'Tête (Face)',
    d: 'M88,8 C88,3 92,0 100,0 C108,0 112,3 112,8 L114,22 C115,32 114,42 112,48 C110,52 106,55 100,56 C94,55 90,52 88,48 C86,42 85,32 86,22 Z',
  },
  // NECK (front)
  {
    id: 'neck-front',
    label: 'Cou (Avant)',
    d: 'M93,56 C96,58 100,59 104,58 L107,56 L109,68 C106,70 100,71 94,70 L91,68 Z',
  },
  // RIGHT SHOULDER (patient's right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M68,70 C72,66 80,65 91,68 L91,82 C82,80 74,78 68,82 Z',
  },
  // LEFT SHOULDER (patient's left = screen right)
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M109,68 C120,65 128,66 132,70 L132,82 C126,78 118,80 109,82 Z',
  },
  // RIGHT PECTORAL
  {
    id: 'right-pectoral',
    label: 'Pectoral droit',
    d: 'M91,82 C82,80 74,78 68,82 L66,104 C70,108 80,110 91,108 Z',
  },
  // LEFT PECTORAL
  {
    id: 'left-pectoral',
    label: 'Pectoral gauche',
    d: 'M109,82 C118,80 126,78 132,82 L134,104 C130,108 120,110 109,108 Z',
  },
  // UPPER ABDOMEN
  {
    id: 'upper-abdomen',
    label: 'Abdomen haut',
    d: 'M91,108 L109,108 L110,140 L90,140 Z',
  },
  // LOWER ABDOMEN
  {
    id: 'lower-abdomen',
    label: 'Abdomen bas',
    d: 'M90,140 L110,140 L112,170 C108,176 104,178 100,179 C96,178 92,176 88,170 Z',
  },
  // RIGHT BICEP
  {
    id: 'right-bicep',
    label: 'Biceps droit',
    d: 'M68,82 C64,84 60,88 58,94 L54,130 C56,134 60,136 64,134 L66,104 Z',
  },
  // LEFT BICEP
  {
    id: 'left-bicep',
    label: 'Biceps gauche',
    d: 'M132,82 C136,84 140,88 142,94 L146,130 C144,134 140,136 136,134 L134,104 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm-front',
    label: 'Avant-bras droit',
    d: 'M54,130 C56,134 60,136 64,134 L62,190 C58,192 54,191 50,188 L48,170 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm-front',
    label: 'Avant-bras gauche',
    d: 'M146,130 C144,134 140,136 136,134 L138,190 C142,192 146,191 150,188 L152,170 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand-palm',
    label: 'Main droite (Paume)',
    d: 'M50,188 C54,191 58,192 62,190 L64,208 C64,216 60,222 56,224 C52,224 48,220 44,214 C42,210 44,204 46,198 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand-palm',
    label: 'Main gauche (Paume)',
    d: 'M150,188 C146,191 142,192 138,190 L136,208 C136,216 140,222 144,224 C148,224 152,220 156,214 C158,210 156,204 154,198 Z',
  },
  // RIGHT THIGH (front)
  {
    id: 'right-thigh-front',
    label: 'Cuisse droite (Avant)',
    d: 'M88,170 C86,176 86,180 86,182 L82,256 C83,262 86,264 88,264 L98,264 L100,179 C96,178 92,176 88,170 Z',
  },
  // LEFT THIGH (front)
  {
    id: 'left-thigh-front',
    label: 'Cuisse gauche (Avant)',
    d: 'M112,170 C114,176 114,180 114,182 L118,256 C117,262 114,264 112,264 L102,264 L100,179 C104,178 108,176 112,170 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M82,256 C83,262 86,264 88,264 L98,264 L98,290 L88,290 C84,288 82,282 81,274 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M118,256 C117,262 114,264 112,264 L102,264 L102,290 L112,290 C116,288 118,282 119,274 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M88,290 L98,290 L96,380 C94,386 92,388 90,388 C87,386 85,382 84,376 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M112,290 L102,290 L104,380 C106,386 108,388 110,388 C113,386 115,382 116,376 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot-top',
    label: 'Pied droit (Dessus)',
    d: 'M84,376 C85,382 87,386 90,388 L96,388 C96,392 94,400 92,408 C90,414 86,418 80,420 C76,418 74,414 74,408 C76,400 78,392 80,386 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot-top',
    label: 'Pied gauche (Dessus)',
    d: 'M116,376 C115,382 113,386 110,388 L104,388 C104,392 106,400 108,408 C110,414 114,418 120,420 C124,418 126,414 126,408 C124,400 122,392 120,386 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // HEAD (back)
  {
    id: 'head-back',
    label: 'Tête (Arrière)',
    d: 'M88,8 C88,3 92,0 100,0 C108,0 112,3 112,8 L114,22 C115,32 114,42 112,48 C110,52 106,55 100,56 C94,55 90,52 88,48 C86,42 85,32 86,22 Z',
  },
  // NAPE
  {
    id: 'nape',
    label: 'Nuque',
    d: 'M93,56 C96,58 100,59 104,58 L107,56 L109,68 C106,70 100,71 94,70 L91,68 Z',
  },
  // LEFT SCAPULA (patient's left = screen LEFT on back view)
  {
    id: 'left-scapula',
    label: 'Omoplate gauche',
    d: 'M68,70 C72,66 80,65 91,68 L91,82 L91,108 C80,110 70,108 66,104 L68,82 Z',
  },
  // RIGHT SCAPULA (patient's right = screen RIGHT on back view)
  {
    id: 'right-scapula',
    label: 'Omoplate droite',
    d: 'M109,68 C120,65 128,66 132,70 L132,82 L134,104 C130,108 120,110 109,108 L109,82 Z',
  },
  // LEFT LOWER BACK
  {
    id: 'left-lower-back',
    label: 'Lombaire gauche',
    d: 'M91,108 L100,108 L100,155 C96,158 92,157 88,152 L90,140 Z',
  },
  // RIGHT LOWER BACK
  {
    id: 'right-lower-back',
    label: 'Lombaire droite',
    d: 'M100,108 L109,108 L110,140 L112,152 C108,157 104,158 100,155 Z',
  },
  // LEFT GLUTE
  {
    id: 'left-glute',
    label: 'Fessier gauche',
    d: 'M88,152 C86,158 86,166 88,170 C90,174 94,177 100,179 L100,155 C96,158 92,157 88,152 Z',
  },
  // RIGHT GLUTE
  {
    id: 'right-glute',
    label: 'Fessier droit',
    d: 'M112,152 C114,158 114,166 112,170 C110,174 106,177 100,179 L100,155 C104,158 108,157 112,152 Z',
  },
  // LEFT TRICEP
  {
    id: 'left-tricep',
    label: 'Triceps gauche',
    d: 'M68,82 C64,84 60,88 58,94 L54,130 C56,134 60,136 64,134 L66,104 Z',
  },
  // RIGHT TRICEP
  {
    id: 'right-tricep',
    label: 'Triceps droit',
    d: 'M132,82 C136,84 140,88 142,94 L146,130 C144,134 140,136 136,134 L134,104 Z',
  },
  // LEFT FOREARM (back)
  {
    id: 'left-forearm-back',
    label: 'Arrière avant-bras gauche',
    d: 'M54,130 C56,134 60,136 64,134 L62,190 C58,192 54,191 50,188 L48,170 Z',
  },
  // RIGHT FOREARM (back)
  {
    id: 'right-forearm-back',
    label: 'Arrière avant-bras droit',
    d: 'M146,130 C144,134 140,136 136,134 L138,190 C142,192 146,191 150,188 L152,170 Z',
  },
  // LEFT HAND (back)
  {
    id: 'left-hand-back',
    label: 'Main gauche (Dos)',
    d: 'M50,188 C54,191 58,192 62,190 L64,208 C64,216 60,222 56,224 C52,224 48,220 44,214 C42,210 44,204 46,198 Z',
  },
  // RIGHT HAND (back)
  {
    id: 'right-hand-back',
    label: 'Main droite (Dos)',
    d: 'M150,188 C146,191 142,192 138,190 L136,208 C136,216 140,222 144,224 C148,224 152,220 156,214 C158,210 156,204 154,198 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M88,170 C86,176 86,180 86,182 L82,256 C83,262 86,264 88,264 L98,264 L100,179 C96,178 92,176 88,170 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M112,170 C114,176 114,180 114,182 L118,256 C117,262 114,264 112,264 L102,264 L100,179 C104,178 108,176 112,170 Z',
  },
  // LEFT POPLITEAL
  {
    id: 'left-popliteal',
    label: 'Creux poplité gauche',
    d: 'M82,256 C83,262 86,264 88,264 L98,264 L98,290 L88,290 C84,288 82,282 81,274 Z',
  },
  // RIGHT POPLITEAL
  {
    id: 'right-popliteal',
    label: 'Creux poplité droit',
    d: 'M118,256 C117,262 114,264 112,264 L102,264 L102,290 L112,290 C116,288 118,282 119,274 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M88,290 L98,290 L96,380 C94,386 92,388 90,388 C87,386 85,382 84,376 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M112,290 L102,290 L104,380 C106,386 108,388 110,388 C113,386 115,382 116,376 Z',
  },
  // LEFT HEEL
  {
    id: 'left-heel',
    label: 'Talon gauche',
    d: 'M84,376 C85,382 87,386 90,388 L96,388 C96,392 94,400 92,408 C90,414 86,418 80,420 C76,418 74,414 74,408 C76,400 78,392 80,386 Z',
  },
  // RIGHT HEEL
  {
    id: 'right-heel',
    label: 'Talon droit',
    d: 'M116,376 C115,382 113,386 110,388 L104,388 C104,392 106,400 108,408 C110,414 114,418 120,420 C124,418 126,414 126,408 C124,400 122,392 120,386 Z',
  },
];
