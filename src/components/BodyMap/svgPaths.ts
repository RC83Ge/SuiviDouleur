import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 340 500
// Anatomical proportions matching reference: arms slightly away, palms forward, neutral stance
// Patient's LEFT = screen RIGHT on front view
// Patient's RIGHT = screen LEFT on front view

export const FRONT_PATHS: ZonePath[] = [
  // HEAD - oval with slight chin
  {
    id: 'head-front',
    label: 'Tête (Face)',
    d: 'M155,8 C162,8 170,14 174,24 C177,32 177,42 174,50 C172,55 168,60 164,63 C160,66 156,67 152,68 L148,68 C144,67 140,66 136,63 C132,60 128,55 126,50 C123,42 123,32 126,24 C130,14 138,8 145,8 Z',
  },
  // NECK
  {
    id: 'neck-front',
    label: 'Cou (Avant)',
    d: 'M143,68 C146,69 149,69 152,69 C155,69 158,68 160,68 L162,72 C162,76 161,80 160,84 C157,85 153,86 150,86 C147,86 143,85 140,84 C139,80 138,76 138,72 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M140,84 C134,82 126,80 118,80 C110,80 102,82 96,86 C90,90 86,96 84,102 L92,106 C94,100 98,96 104,92 C110,89 116,87 122,86 L130,85 Z',
  },
  // LEFT SHOULDER
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M160,84 C166,82 174,80 182,80 C190,80 198,82 204,86 C210,90 214,96 216,102 L208,106 C206,100 202,96 196,92 C190,89 184,87 178,86 L170,85 Z',
  },
  // RIGHT PECTORAL
  {
    id: 'right-pectoral',
    label: 'Pectoral droit',
    d: 'M92,106 L122,86 L130,85 L140,84 L150,86 L150,120 L150,150 L108,150 C104,138 100,126 96,116 Z',
  },
  // LEFT PECTORAL
  {
    id: 'left-pectoral',
    label: 'Pectoral gauche',
    d: 'M208,106 L178,86 L170,85 L160,84 L150,86 L150,120 L150,150 L192,150 C196,138 200,126 204,116 Z',
  },
  // UPPER ABDOMEN
  {
    id: 'upper-abdomen',
    label: 'Abdomen haut',
    d: 'M108,150 L150,150 L192,150 L190,195 L150,195 L110,195 Z',
  },
  // LOWER ABDOMEN
  {
    id: 'lower-abdomen',
    label: 'Abdomen bas',
    d: 'M110,195 L150,195 L190,195 L188,230 C184,242 174,250 150,252 C126,250 116,242 112,230 Z',
  },
  // RIGHT BICEP
  {
    id: 'right-bicep',
    label: 'Biceps droit',
    d: 'M84,102 C80,112 76,124 74,136 C72,148 70,160 70,170 L78,172 C78,162 80,150 82,138 C84,126 88,114 92,106 Z',
  },
  // LEFT BICEP
  {
    id: 'left-bicep',
    label: 'Biceps gauche',
    d: 'M216,102 C220,112 224,124 226,136 C228,148 230,160 230,170 L222,172 C222,162 220,150 218,138 C216,126 212,114 208,106 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm-front',
    label: 'Avant-bras droit',
    d: 'M70,170 L78,172 L76,230 C76,240 74,248 72,256 L64,254 C66,246 67,238 68,228 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm-front',
    label: 'Avant-bras gauche',
    d: 'M230,170 L222,172 L224,230 C224,240 226,248 228,256 L236,254 C234,246 233,238 232,228 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand-palm',
    label: 'Main droite (Paume)',
    d: 'M64,254 C66,246 72,256 76,256 L76,262 C77,270 77,278 76,286 C75,292 72,298 68,302 C64,306 58,308 54,304 C50,300 50,292 52,284 C54,276 58,266 60,260 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand-palm',
    label: 'Main gauche (Paume)',
    d: 'M236,254 C234,246 228,256 224,256 L224,262 C223,270 223,278 224,286 C225,292 228,298 232,302 C236,306 242,308 246,304 C250,300 250,292 248,284 C246,276 242,266 240,260 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh-front',
    label: 'Cuisse droite (Avant)',
    d: 'M112,230 C114,240 120,248 130,252 L150,252 L150,330 L138,332 C134,324 130,310 128,296 C126,280 122,264 118,248 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh-front',
    label: 'Cuisse gauche (Avant)',
    d: 'M188,230 C186,240 180,248 170,252 L150,252 L150,330 L162,332 C166,324 170,310 172,296 C174,280 178,264 182,248 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M138,332 L150,330 L150,360 L136,360 C134,352 134,344 136,338 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M162,332 L150,330 L150,360 L164,360 C166,352 166,344 164,338 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M136,360 L150,360 L148,440 C147,446 145,450 142,452 C139,452 137,448 136,442 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M164,360 L150,360 L152,440 C153,446 155,450 158,452 C161,452 163,448 164,442 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot-top',
    label: 'Pied droit (Dessus)',
    d: 'M136,442 C137,448 139,452 142,452 L148,452 C148,458 146,466 142,474 C140,480 136,484 130,484 C126,482 124,478 124,472 C126,464 128,456 132,448 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot-top',
    label: 'Pied gauche (Dessus)',
    d: 'M164,442 C163,448 161,452 158,452 L152,452 C152,458 154,466 158,474 C160,480 164,484 170,484 C174,482 176,478 176,472 C174,464 172,456 168,448 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // HEAD (back)
  {
    id: 'head-back',
    label: 'Tête (Arrière)',
    d: 'M155,8 C162,8 170,14 174,24 C177,32 177,42 174,50 C172,55 168,60 164,63 C160,66 156,67 152,68 L148,68 C144,67 140,66 136,63 C132,60 128,55 126,50 C123,42 123,32 126,24 C130,14 138,8 145,8 Z',
  },
  // NAPE
  {
    id: 'nape',
    label: 'Nuque',
    d: 'M143,68 C146,69 149,69 152,69 C155,69 158,68 160,68 L162,72 C162,76 161,80 160,84 C157,85 153,86 150,86 C147,86 143,85 140,84 C139,80 138,76 138,72 Z',
  },
  // LEFT SCAPULA (patient left = screen left on back view)
  {
    id: 'left-scapula',
    label: 'Omoplate gauche',
    d: 'M140,84 C134,82 126,80 118,80 C110,80 102,82 96,86 C90,90 86,96 84,102 L92,106 C96,116 100,126 104,138 L108,150 L150,150 L150,86 L140,84 Z',
  },
  // RIGHT SCAPULA
  {
    id: 'right-scapula',
    label: 'Omoplate droite',
    d: 'M160,84 C166,82 174,80 182,80 C190,80 198,82 204,86 C210,90 214,96 216,102 L208,106 C204,116 200,126 196,138 L192,150 L150,150 L150,86 L160,84 Z',
  },
  // LEFT LOWER BACK
  {
    id: 'left-lower-back',
    label: 'Lombaire gauche',
    d: 'M108,150 L150,150 L150,210 L110,210 Z',
  },
  // RIGHT LOWER BACK
  {
    id: 'right-lower-back',
    label: 'Lombaire droite',
    d: 'M150,150 L192,150 L190,210 L150,210 Z',
  },
  // LEFT GLUTE
  {
    id: 'left-glute',
    label: 'Fessier gauche',
    d: 'M110,210 L150,210 L150,252 C126,250 116,242 112,230 Z',
  },
  // RIGHT GLUTE
  {
    id: 'right-glute',
    label: 'Fessier droit',
    d: 'M190,210 L150,210 L150,252 C174,250 184,242 188,230 Z',
  },
  // LEFT TRICEP
  {
    id: 'left-tricep',
    label: 'Triceps gauche',
    d: 'M84,102 C80,112 76,124 74,136 C72,148 70,160 70,170 L78,172 C78,162 80,150 82,138 C84,126 88,114 92,106 Z',
  },
  // RIGHT TRICEP
  {
    id: 'right-tricep',
    label: 'Triceps droit',
    d: 'M216,102 C220,112 224,124 226,136 C228,148 230,160 230,170 L222,172 C222,162 220,150 218,138 C216,126 212,114 208,106 Z',
  },
  // LEFT FOREARM BACK
  {
    id: 'left-forearm-back',
    label: 'Arrière avant-bras gauche',
    d: 'M70,170 L78,172 L76,230 C76,240 74,248 72,256 L64,254 C66,246 67,238 68,228 Z',
  },
  // RIGHT FOREARM BACK
  {
    id: 'right-forearm-back',
    label: 'Arrière avant-bras droit',
    d: 'M230,170 L222,172 L224,230 C224,240 226,248 228,256 L236,254 C234,246 233,238 232,228 Z',
  },
  // LEFT HAND BACK
  {
    id: 'left-hand-back',
    label: 'Main gauche (Dos)',
    d: 'M64,254 C66,246 72,256 76,256 L76,262 C77,270 77,278 76,286 C75,292 72,298 68,302 C64,306 58,308 54,304 C50,300 50,292 52,284 C54,276 58,266 60,260 Z',
  },
  // RIGHT HAND BACK
  {
    id: 'right-hand-back',
    label: 'Main droite (Dos)',
    d: 'M236,254 C234,246 228,256 224,256 L224,262 C223,270 223,278 224,286 C225,292 228,298 232,302 C236,306 242,308 246,304 C250,300 250,292 248,284 C246,276 242,266 240,260 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M112,230 C114,240 120,248 130,252 L150,252 L150,330 L138,332 C134,324 130,310 128,296 C126,280 122,264 118,248 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M188,230 C186,240 180,248 170,252 L150,252 L150,330 L162,332 C166,324 170,310 172,296 C174,280 178,264 182,248 Z',
  },
  // LEFT POPLITEAL
  {
    id: 'left-popliteal',
    label: 'Creux poplité gauche',
    d: 'M138,332 L150,330 L150,360 L136,360 C134,352 134,344 136,338 Z',
  },
  // RIGHT POPLITEAL
  {
    id: 'right-popliteal',
    label: 'Creux poplité droit',
    d: 'M162,332 L150,330 L150,360 L164,360 C166,352 166,344 164,338 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M136,360 L150,360 L148,440 C147,446 145,450 142,452 C139,452 137,448 136,442 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M164,360 L150,360 L152,440 C153,446 155,450 158,452 C161,452 163,448 164,442 Z',
  },
  // LEFT HEEL
  {
    id: 'left-heel',
    label: 'Talon gauche',
    d: 'M136,442 C137,448 139,452 142,452 L148,452 C148,458 146,466 142,474 C140,480 136,484 130,484 C126,482 124,478 124,472 C126,464 128,456 132,448 Z',
  },
  // RIGHT HEEL
  {
    id: 'right-heel',
    label: 'Talon droit',
    d: 'M164,442 C163,448 161,452 158,452 L152,452 C152,458 154,466 158,474 C160,480 164,484 170,484 C174,482 176,478 176,472 C174,464 172,456 168,448 Z',
  },
];
