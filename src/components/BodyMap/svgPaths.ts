import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 200 480
// Paths recalibrated to match the current front/back assets more closely.
// Patient LEFT = screen RIGHT on front view (anatomical position)
// Center line at x=100

export const FRONT_PATHS: ZonePath[] = [
  {
    id: 'head',
    label: 'Tête',
    d: 'M100,10 C112,10 121,17 124,29 C126,38 126,48 123,56 C119,64 113,70 106,73 C104,74 102,75 100,75 C98,75 96,74 94,73 C87,70 81,64 77,56 C74,48 74,38 76,29 C79,17 88,10 100,10 Z',
  },
  {
    id: 'neck',
    label: 'Cou',
    d: 'M89,74 C93,76 97,77 100,77 C103,77 107,76 111,74 L114,86 C111,95 106,100 100,101 C94,100 89,95 86,86 Z',
  },
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M86,92 C77,89 66,90 56,96 C46,101 39,109 36,120 L47,123 C51,113 58,106 68,102 C76,99 83,98 90,100 Z',
  },
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M114,92 C123,89 134,90 144,96 C154,101 161,109 164,120 L153,123 C149,113 142,106 132,102 C124,99 117,98 110,100 Z',
  },
  {
    id: 'chest',
    label: 'Thorax',
    d: 'M47,123 C57,111 74,102 90,100 L100,101 L110,100 C126,102 143,111 153,123 L148,176 L52,176 Z',
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    d: 'M52,176 L148,176 L143,234 L100,240 L57,234 Z',
  },
  {
    id: 'pelvis',
    label: 'Bassin',
    d: 'M57,234 L100,240 L143,234 L139,264 C129,272 118,277 100,279 C82,277 71,272 61,264 Z',
  },
  {
    id: 'right-upper-arm',
    label: 'Bras droit',
    d: 'M36,120 C34,136 31,154 26,171 C22,186 18,199 12,212 L23,220 C29,206 34,190 39,173 C44,155 47,138 47,123 Z',
  },
  {
    id: 'left-upper-arm',
    label: 'Bras gauche',
    d: 'M164,120 C166,136 169,154 174,171 C178,186 182,199 188,212 L177,220 C171,206 166,190 161,173 C156,155 153,138 153,123 Z',
  },
  {
    id: 'right-elbow',
    label: 'Coude droit',
    d: 'M12,212 L23,220 L17,239 L8,233 Z',
  },
  {
    id: 'left-elbow',
    label: 'Coude gauche',
    d: 'M188,212 L177,220 L183,239 L192,233 Z',
  },
  {
    id: 'right-forearm',
    label: 'Avant-bras droit',
    d: 'M8,233 L17,239 C13,254 9,270 5,285 C3,294 4,301 8,307 L18,301 C16,292 17,279 21,264 C24,253 28,241 31,232 Z',
  },
  {
    id: 'left-forearm',
    label: 'Avant-bras gauche',
    d: 'M192,233 L183,239 C187,254 191,270 195,285 C197,294 196,301 192,307 L182,301 C184,292 183,279 179,264 C176,253 172,241 169,232 Z',
  },
  {
    id: 'right-hand',
    label: 'Main droite',
    d: 'M8,307 C7,314 8,321 11,327 C14,333 19,338 24,337 C28,335 28,328 27,322 L31,342 C32,348 36,351 40,349 C43,346 43,341 42,334 L46,351 C48,356 52,358 56,355 C58,351 58,346 57,340 L62,352 C64,356 68,357 71,354 C73,350 72,345 69,339 L58,314 C53,305 44,299 33,298 L18,301 Z',
  },
  {
    id: 'left-hand',
    label: 'Main gauche',
    d: 'M192,307 C193,314 192,321 189,327 C186,333 181,338 176,337 C172,335 172,328 173,322 L169,342 C168,348 164,351 160,349 C157,346 157,341 158,334 L154,351 C152,356 148,358 144,355 C142,351 142,346 143,340 L138,352 C136,356 132,357 129,354 C127,350 128,345 131,339 L142,314 C147,305 156,299 167,298 L182,301 Z',
  },
  {
    id: 'right-thigh',
    label: 'Cuisse droite',
    d: 'M61,264 C69,273 81,278 96,279 L96,364 C88,364 79,363 73,360 C67,341 63,320 61,300 Z',
  },
  {
    id: 'left-thigh',
    label: 'Cuisse gauche',
    d: 'M139,264 C131,273 119,278 104,279 L104,364 C112,364 121,363 127,360 C133,341 137,320 139,300 Z',
  },
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M73,360 C80,363 88,364 96,364 L95,390 C87,392 79,392 72,388 Z',
  },
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M127,360 C120,363 112,364 104,364 L105,390 C113,392 121,392 128,388 Z',
  },
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M72,388 C79,392 87,392 95,390 L92,455 C88,463 84,468 80,470 L70,468 C68,460 68,446 70,430 Z',
  },
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M128,388 C121,392 113,392 105,390 L108,455 C112,463 116,468 120,470 L130,468 C132,460 132,446 130,430 Z',
  },
  {
    id: 'right-ankle',
    label: 'Cheville droite',
    d: 'M70,468 L80,470 L79,481 L68,481 Z',
  },
  {
    id: 'left-ankle',
    label: 'Cheville gauche',
    d: 'M130,468 L120,470 L121,481 L132,481 Z',
  },
  {
    id: 'right-foot',
    label: 'Pied droit',
    d: 'M68,481 L79,481 C82,487 82,492 80,496 C74,499 66,498 60,494 C57,491 57,486 60,482 Z',
  },
  {
    id: 'left-foot',
    label: 'Pied gauche',
    d: 'M132,481 L121,481 C118,487 118,492 120,496 C126,499 134,498 140,494 C143,491 143,486 140,482 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  {
    id: 'neck-back',
    label: 'Nuque',
    d: 'M89,73 C93,76 97,77 100,77 C103,77 107,76 111,73 L112,87 C108,95 104,98 100,99 C96,98 92,95 88,87 Z',
  },
  {
    id: 'head',
    label: 'Tête',
    d: 'M100,10 C112,10 121,17 124,29 C126,38 126,48 123,56 C119,64 113,70 106,73 C104,74 102,75 100,75 C98,75 96,74 94,73 C87,70 81,64 77,56 C74,48 74,38 76,29 C79,17 88,10 100,10 Z',
  },
  {
    id: 'left-shoulder-blade',
    label: 'Omoplate gauche',
    d: 'M89,96 C79,92 67,93 56,98 C45,103 39,111 36,121 L48,124 C53,113 62,107 72,104 C78,102 84,101 90,102 L100,154 L54,164 L50,142 C47,132 44,126 48,124 Z',
  },
  {
    id: 'right-shoulder-blade',
    label: 'Omoplate droite',
    d: 'M111,96 C121,92 133,93 144,98 C155,103 161,111 164,121 L152,124 C147,113 138,107 128,104 C122,102 116,101 110,102 L100,154 L146,164 L150,142 C153,132 156,126 152,124 Z',
  },
  {
    id: 'upper-back',
    label: 'Haut du dos',
    d: 'M54,164 L100,154 L146,164 L142,205 L58,205 Z',
  },
  {
    id: 'middle-back',
    label: 'Milieu du dos',
    d: 'M58,205 L142,205 L138,242 L62,242 Z',
  },
  {
    id: 'lower-back',
    label: 'Bas du dos',
    d: 'M62,242 L138,242 L136,266 L64,266 Z',
  },
  {
    id: 'left-buttock',
    label: 'Fessier gauche',
    d: 'M64,266 L100,266 L100,284 C82,283 71,279 62,271 Z',
  },
  {
    id: 'right-buttock',
    label: 'Fessier droit',
    d: 'M136,266 L100,266 L100,284 C118,283 129,279 138,271 Z',
  },
  {
    id: 'left-arm-back',
    label: 'Bras gauche (arrière)',
    d: 'M36,121 C34,136 31,154 26,171 C22,186 18,199 12,212 L23,220 L17,239 C13,254 9,270 5,285 C3,294 4,301 8,307 L18,301 C16,292 17,279 21,264 C24,253 28,241 31,232 L37,215 C42,198 46,180 49,161 C51,146 51,133 48,124 Z',
  },
  {
    id: 'right-arm-back',
    label: 'Bras droit (arrière)',
    d: 'M164,121 C166,136 169,154 174,171 C178,186 182,199 188,212 L177,220 L183,239 C187,254 191,270 195,285 C197,294 196,301 192,307 L182,301 C184,292 183,279 179,264 C176,253 172,241 169,232 L163,215 C158,198 154,180 151,161 C149,146 149,133 152,124 Z',
  },
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M62,271 C69,279 81,283 96,284 L96,368 C88,369 80,368 74,365 C67,347 63,325 62,303 Z',
  },
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M138,271 C131,279 119,283 104,284 L104,368 C112,369 120,368 126,365 C133,347 137,325 138,303 Z',
  },
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M74,365 C81,368 88,369 96,368 L94,456 C90,464 85,470 80,472 L70,468 C68,460 68,446 70,430 Z',
  },
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M126,365 C119,368 112,369 104,368 L106,456 C110,464 115,470 120,472 L130,468 C132,460 132,446 130,430 Z',
  },
  {
    id: 'left-ankle-back',
    label: 'Cheville gauche (arrière)',
    d: 'M70,468 L80,472 L79,484 L68,484 Z',
  },
  {
    id: 'right-ankle-back',
    label: 'Cheville droite (arrière)',
    d: 'M130,468 L120,472 L121,484 L132,484 Z',
  },
];
