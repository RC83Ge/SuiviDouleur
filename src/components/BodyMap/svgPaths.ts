import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 180 440
// Proportions based on the reference image: smooth anatomical silhouette
// Patient's LEFT = screen RIGHT on front view
// Patient's RIGHT = screen LEFT on front view

export const FRONT_PATHS: ZonePath[] = [
  // HEAD - smooth oval, no facial features
  {
    id: 'head-front',
    label: 'Tête (Face)',
    d: 'M78,28 C78,12 82,2 90,0 C98,2 102,12 102,28 C102,38 100,46 96,50 C93,53 90,54 90,54 C90,54 87,53 84,50 C80,46 78,38 78,28 Z',
  },
  // NECK
  {
    id: 'neck-front',
    label: 'Cou (Avant)',
    d: 'M84,54 C87,55 90,56 93,55 L96,54 L97,64 C94,66 90,67 86,66 L83,64 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M83,64 C76,62 68,62 60,65 C54,68 50,73 48,78 L56,80 C58,76 62,72 68,70 L76,68 L83,66 Z',
  },
  // LEFT SHOULDER
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M97,64 C104,62 112,62 120,65 C126,68 130,73 132,78 L124,80 C122,76 118,72 112,70 L104,68 L97,66 Z',
  },
  // RIGHT PECTORAL
  {
    id: 'right-pectoral',
    label: 'Pectoral droit',
    d: 'M56,80 L76,68 L83,66 L83,72 L83,105 L58,105 C56,95 55,87 56,80 Z',
  },
  // LEFT PECTORAL
  {
    id: 'left-pectoral',
    label: 'Pectoral gauche',
    d: 'M124,80 L104,68 L97,66 L97,72 L97,105 L122,105 C124,95 125,87 124,80 Z',
  },
  // UPPER ABDOMEN
  {
    id: 'upper-abdomen',
    label: 'Abdomen haut',
    d: 'M58,105 L83,105 L90,105 L97,105 L122,105 L121,140 L90,140 L59,140 Z',
  },
  // LOWER ABDOMEN
  {
    id: 'lower-abdomen',
    label: 'Abdomen bas',
    d: 'M59,140 L90,140 L121,140 L120,162 C116,172 108,178 90,180 C72,178 64,172 60,162 Z',
  },
  // RIGHT BICEP
  {
    id: 'right-bicep',
    label: 'Biceps droit',
    d: 'M48,78 C46,84 44,92 42,100 L38,132 C40,136 44,138 48,136 L56,105 L56,80 Z',
  },
  // LEFT BICEP
  {
    id: 'left-bicep',
    label: 'Biceps gauche',
    d: 'M132,78 C134,84 136,92 138,100 L142,132 C140,136 136,138 132,136 L124,105 L124,80 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm-front',
    label: 'Avant-bras droit',
    d: 'M38,132 C40,136 44,138 48,136 L46,188 C42,192 38,192 34,188 L32,166 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm-front',
    label: 'Avant-bras gauche',
    d: 'M142,132 C140,136 136,138 132,136 L134,188 C138,192 142,192 146,188 L148,166 Z',
  },
  // RIGHT HAND - open palm, fingers together
  {
    id: 'right-hand-palm',
    label: 'Main droite (Paume)',
    d: 'M34,188 C38,192 42,192 46,188 L47,198 C48,204 48,210 47,216 C46,222 44,228 40,232 C36,236 30,236 26,230 C22,224 22,216 24,208 C26,200 28,194 30,190 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand-palm',
    label: 'Main gauche (Paume)',
    d: 'M146,188 C142,192 138,192 134,188 L133,198 C132,204 132,210 133,216 C134,222 136,228 140,232 C144,236 150,236 154,230 C158,224 158,216 156,208 C154,200 152,194 150,190 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh-front',
    label: 'Cuisse droite (Avant)',
    d: 'M60,162 C62,170 68,176 76,180 L90,180 L90,262 L82,264 C78,260 74,252 72,240 L66,202 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh-front',
    label: 'Cuisse gauche (Avant)',
    d: 'M120,162 C118,170 112,176 104,180 L90,180 L90,262 L98,264 C102,260 106,252 108,240 L114,202 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M82,264 L90,262 L90,290 L80,290 C78,284 78,276 80,270 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M98,264 L90,262 L90,290 L100,290 C102,284 102,276 100,270 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M80,290 L90,290 L88,374 C87,380 85,384 83,386 C80,386 78,382 77,376 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M100,290 L90,290 L92,374 C93,380 95,384 97,386 C100,386 102,382 103,376 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot-top',
    label: 'Pied droit (Dessus)',
    d: 'M77,376 C78,382 80,386 83,386 L88,386 C88,390 87,398 84,406 C82,412 78,416 72,416 C68,414 66,410 66,404 C68,396 70,388 73,382 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot-top',
    label: 'Pied gauche (Dessus)',
    d: 'M103,376 C102,382 100,386 97,386 L92,386 C92,390 93,398 96,406 C98,412 102,416 108,416 C112,414 114,410 114,404 C112,396 110,388 107,382 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // HEAD (back)
  {
    id: 'head-back',
    label: 'Tête (Arrière)',
    d: 'M78,28 C78,12 82,2 90,0 C98,2 102,12 102,28 C102,38 100,46 96,50 C93,53 90,54 90,54 C90,54 87,53 84,50 C80,46 78,38 78,28 Z',
  },
  // NAPE
  {
    id: 'nape',
    label: 'Nuque',
    d: 'M84,54 C87,55 90,56 93,55 L96,54 L97,64 C94,66 90,67 86,66 L83,64 Z',
  },
  // LEFT SCAPULA (patient left = screen left on back)
  {
    id: 'left-scapula',
    label: 'Omoplate gauche',
    d: 'M83,64 C76,62 68,62 60,65 C54,68 50,73 48,78 L56,80 C56,87 55,95 58,105 L83,105 L83,72 L83,66 Z',
  },
  // RIGHT SCAPULA
  {
    id: 'right-scapula',
    label: 'Omoplate droite',
    d: 'M97,64 C104,62 112,62 120,65 C126,68 130,73 132,78 L124,80 C124,87 125,95 122,105 L97,105 L97,72 L97,66 Z',
  },
  // LEFT LOWER BACK
  {
    id: 'left-lower-back',
    label: 'Lombaire gauche',
    d: 'M58,105 L83,105 L90,105 L90,150 L59,150 Z',
  },
  // RIGHT LOWER BACK
  {
    id: 'right-lower-back',
    label: 'Lombaire droite',
    d: 'M90,105 L97,105 L122,105 L121,150 L90,150 Z',
  },
  // LEFT GLUTE
  {
    id: 'left-glute',
    label: 'Fessier gauche',
    d: 'M59,150 L90,150 L90,180 C72,178 64,172 60,162 Z',
  },
  // RIGHT GLUTE
  {
    id: 'right-glute',
    label: 'Fessier droit',
    d: 'M121,150 L90,150 L90,180 C108,178 116,172 120,162 Z',
  },
  // LEFT TRICEP
  {
    id: 'left-tricep',
    label: 'Triceps gauche',
    d: 'M48,78 C46,84 44,92 42,100 L38,132 C40,136 44,138 48,136 L56,105 L56,80 Z',
  },
  // RIGHT TRICEP
  {
    id: 'right-tricep',
    label: 'Triceps droit',
    d: 'M132,78 C134,84 136,92 138,100 L142,132 C140,136 136,138 132,136 L124,105 L124,80 Z',
  },
  // LEFT FOREARM BACK
  {
    id: 'left-forearm-back',
    label: 'Arrière avant-bras gauche',
    d: 'M38,132 C40,136 44,138 48,136 L46,188 C42,192 38,192 34,188 L32,166 Z',
  },
  // RIGHT FOREARM BACK
  {
    id: 'right-forearm-back',
    label: 'Arrière avant-bras droit',
    d: 'M142,132 C140,136 136,138 132,136 L134,188 C138,192 142,192 146,188 L148,166 Z',
  },
  // LEFT HAND BACK
  {
    id: 'left-hand-back',
    label: 'Main gauche (Dos)',
    d: 'M34,188 C38,192 42,192 46,188 L47,198 C48,204 48,210 47,216 C46,222 44,228 40,232 C36,236 30,236 26,230 C22,224 22,216 24,208 C26,200 28,194 30,190 Z',
  },
  // RIGHT HAND BACK
  {
    id: 'right-hand-back',
    label: 'Main droite (Dos)',
    d: 'M146,188 C142,192 138,192 134,188 L133,198 C132,204 132,210 133,216 C134,222 136,228 140,232 C144,236 150,236 154,230 C158,224 158,216 156,208 C154,200 152,194 150,190 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M60,162 C62,170 68,176 76,180 L90,180 L90,262 L82,264 C78,260 74,252 72,240 L66,202 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M120,162 C118,170 112,176 104,180 L90,180 L90,262 L98,264 C102,260 106,252 108,240 L114,202 Z',
  },
  // LEFT POPLITEAL
  {
    id: 'left-popliteal',
    label: 'Creux poplité gauche',
    d: 'M82,264 L90,262 L90,290 L80,290 C78,284 78,276 80,270 Z',
  },
  // RIGHT POPLITEAL
  {
    id: 'right-popliteal',
    label: 'Creux poplité droit',
    d: 'M98,264 L90,262 L90,290 L100,290 C102,284 102,276 100,270 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M80,290 L90,290 L88,374 C87,380 85,384 83,386 C80,386 78,382 77,376 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M100,290 L90,290 L92,374 C93,380 95,384 97,386 C100,386 102,382 103,376 Z',
  },
  // LEFT HEEL
  {
    id: 'left-heel',
    label: 'Talon gauche',
    d: 'M77,376 C78,382 80,386 83,386 L88,386 C88,390 87,398 84,406 C82,412 78,416 72,416 C68,414 66,410 66,404 C68,396 70,388 73,382 Z',
  },
  // RIGHT HEEL
  {
    id: 'right-heel',
    label: 'Talon droit',
    d: 'M103,376 C102,382 100,386 97,386 L92,386 C92,390 93,398 96,406 C98,412 102,416 108,416 C112,414 114,410 114,404 C112,396 110,388 107,382 Z',
  },
];
