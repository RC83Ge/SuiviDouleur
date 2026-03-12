import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 200 480
// Clean medical illustration — gender-neutral figure
// Arms slightly away from body, palms forward, feet slightly apart
// Patient LEFT = screen RIGHT on front view (anatomical position)
// Center line at x=100

export const FRONT_PATHS: ZonePath[] = [
  // HEAD — smooth oval cranium
  {
    id: 'head',
    label: 'Tête',
    d: 'M100,6 C112,6 122,14 125,26 C127,34 127,42 125,48 C122,54 118,58 113,61 C109,63 105,64 100,64 C95,64 91,63 87,61 C82,58 78,54 75,48 C73,42 73,34 75,26 C78,14 88,6 100,6 Z',
  },
  // NECK
  {
    id: 'neck',
    label: 'Cou',
    d: 'M92,64 C95,65 97,65 100,65 C103,65 105,65 108,64 L110,68 C110,72 109,76 108,78 C105,79 102,80 100,80 C98,80 95,79 92,78 C91,76 90,72 90,68 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M92,78 C86,76 78,74 70,74 C62,74 56,76 50,80 C46,84 43,88 42,94 L48,96 C49,92 52,88 56,84 C60,81 66,78 72,77 L82,77 Z',
  },
  // LEFT SHOULDER
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M108,78 C114,76 122,74 130,74 C138,74 144,76 150,80 C154,84 157,88 158,94 L152,96 C151,92 148,88 144,84 C140,81 134,78 128,77 L118,77 Z',
  },
  // CHEST
  {
    id: 'chest',
    label: 'Thorax',
    d: 'M48,96 L82,77 L92,78 L100,80 L108,78 L118,77 L152,96 L150,140 L100,140 L50,140 Z',
  },
  // ABDOMEN
  {
    id: 'abdomen',
    label: 'Abdomen',
    d: 'M50,140 L100,140 L150,140 L148,185 L100,185 L52,185 Z',
  },
  // PELVIS
  {
    id: 'pelvis',
    label: 'Bassin',
    d: 'M52,185 L100,185 L148,185 L146,210 C140,222 126,228 100,230 C74,228 60,222 54,210 Z',
  },
  // RIGHT UPPER ARM
  {
    id: 'right-upper-arm',
    label: 'Bras droit',
    d: 'M42,94 C40,104 38,114 36,126 C34,138 33,148 33,156 L39,158 C39,148 40,138 42,126 C44,114 46,104 48,96 Z',
  },
  // LEFT UPPER ARM
  {
    id: 'left-upper-arm',
    label: 'Bras gauche',
    d: 'M158,94 C160,104 162,114 164,126 C166,138 167,148 167,156 L161,158 C161,148 160,138 158,126 C156,114 154,104 152,96 Z',
  },
  // RIGHT ELBOW
  {
    id: 'right-elbow',
    label: 'Coude droit',
    d: 'M33,156 L39,158 L38,174 L32,172 Z',
  },
  // LEFT ELBOW
  {
    id: 'left-elbow',
    label: 'Coude gauche',
    d: 'M167,156 L161,158 L162,174 L168,172 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm',
    label: 'Avant-bras droit',
    d: 'M32,172 L38,174 L36,226 C36,232 35,238 34,242 L28,240 C29,234 30,228 30,222 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm',
    label: 'Avant-bras gauche',
    d: 'M168,172 L162,174 L164,226 C164,232 165,238 166,242 L172,240 C171,234 170,228 170,222 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand',
    label: 'Main droite',
    d: 'M28,240 L34,242 L33,252 C33,258 31,264 28,270 C26,274 22,278 18,276 C15,274 15,268 17,262 C19,256 22,248 24,244 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand',
    label: 'Main gauche',
    d: 'M172,240 L166,242 L167,252 C167,258 169,264 172,270 C174,274 178,278 182,276 C185,274 185,268 183,262 C181,256 178,248 176,244 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh',
    label: 'Cuisse droite',
    d: 'M54,210 C58,220 68,226 82,228 L100,230 L100,310 L88,312 C86,304 83,292 80,278 C78,264 72,248 66,234 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh',
    label: 'Cuisse gauche',
    d: 'M146,210 C142,220 132,226 118,228 L100,230 L100,310 L112,312 C114,304 117,292 120,278 C122,264 128,248 134,234 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M88,312 L100,310 L100,340 L86,340 C84,334 84,326 86,318 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M112,312 L100,310 L100,340 L114,340 C116,334 116,326 114,318 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M86,340 L100,340 L98,412 C97,416 96,420 94,422 L84,422 C84,418 85,414 86,408 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M114,340 L100,340 L102,412 C103,416 104,420 106,422 L116,422 C116,418 115,414 114,408 Z',
  },
  // RIGHT ANKLE
  {
    id: 'right-ankle',
    label: 'Cheville droite',
    d: 'M84,422 L94,422 L93,438 L83,438 Z',
  },
  // LEFT ANKLE
  {
    id: 'left-ankle',
    label: 'Cheville gauche',
    d: 'M116,422 L106,422 L107,438 L117,438 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot',
    label: 'Pied droit',
    d: 'M83,438 L93,438 L92,448 C90,454 86,458 80,460 C76,460 74,456 74,452 C76,446 78,442 80,440 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot',
    label: 'Pied gauche',
    d: 'M117,438 L107,438 L108,448 C110,454 114,458 120,460 C124,460 126,456 126,452 C124,446 122,442 120,440 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // NECK BACK
  {
    id: 'neck-back',
    label: 'Nuque',
    d: 'M92,64 C95,65 97,65 100,65 C103,65 105,65 108,64 L110,68 C110,72 109,76 108,78 C105,79 102,80 100,80 C98,80 95,79 92,78 C91,76 90,72 90,68 Z',
  },
  // HEAD (back view — same silhouette)
  {
    id: 'head',
    label: 'Tête',
    d: 'M100,6 C112,6 122,14 125,26 C127,34 127,42 125,48 C122,54 118,58 113,61 C109,63 105,64 100,64 C95,64 91,63 87,61 C82,58 78,54 75,48 C73,42 73,34 75,26 C78,14 88,6 100,6 Z',
  },
  // LEFT SHOULDER BLADE (patient left = screen left on back)
  {
    id: 'left-shoulder-blade',
    label: 'Omoplate gauche',
    d: 'M92,78 C86,76 78,74 70,74 C62,74 56,76 50,80 C46,84 43,88 42,94 L48,96 C50,104 52,112 54,120 L58,140 L100,140 L100,80 L92,78 Z',
  },
  // RIGHT SHOULDER BLADE
  {
    id: 'right-shoulder-blade',
    label: 'Omoplate droite',
    d: 'M108,78 C114,76 122,74 130,74 C138,74 144,76 150,80 C154,84 157,88 158,94 L152,96 C150,104 148,112 146,120 L142,140 L100,140 L100,80 L108,78 Z',
  },
  // UPPER BACK
  {
    id: 'upper-back',
    label: 'Haut du dos',
    d: 'M58,140 L100,140 L142,140 L140,170 L100,170 L60,170 Z',
  },
  // MIDDLE BACK
  {
    id: 'middle-back',
    label: 'Milieu du dos',
    d: 'M60,170 L100,170 L140,170 L138,200 L100,200 L62,200 Z',
  },
  // LOWER BACK
  {
    id: 'lower-back',
    label: 'Bas du dos',
    d: 'M62,200 L100,200 L138,200 L136,218 L100,218 L64,218 Z',
  },
  // LEFT BUTTOCK
  {
    id: 'left-buttock',
    label: 'Fessier gauche',
    d: 'M64,218 L100,218 L100,230 C74,228 60,222 54,210 L56,204 Z',
  },
  // RIGHT BUTTOCK
  {
    id: 'right-buttock',
    label: 'Fessier droit',
    d: 'M136,218 L100,218 L100,230 C126,228 140,222 146,210 L144,204 Z',
  },
  // LEFT ARM BACK
  {
    id: 'left-arm-back',
    label: 'Bras gauche (arrière)',
    d: 'M42,94 C40,104 38,114 36,126 C34,138 33,148 33,156 L39,158 L38,174 L32,172 L30,222 C30,228 29,234 28,240 L24,244 C22,248 19,256 17,262 C15,268 15,274 18,276 C22,278 26,274 28,270 C31,264 33,258 33,252 L34,242 C35,238 36,232 36,226 L38,174 L39,158 C39,148 40,138 42,126 C44,114 46,104 48,96 Z',
  },
  // RIGHT ARM BACK
  {
    id: 'right-arm-back',
    label: 'Bras droit (arrière)',
    d: 'M158,94 C160,104 162,114 164,126 C166,138 167,148 167,156 L161,158 L162,174 L168,172 L170,222 C170,228 171,234 172,240 L176,244 C178,248 181,256 183,262 C185,268 185,274 182,276 C178,278 174,274 172,270 C169,264 167,258 167,252 L166,242 C165,238 164,232 164,226 L162,174 L161,158 C161,148 160,138 158,126 C156,114 154,104 152,96 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M54,210 C58,220 68,226 82,228 L100,230 L100,310 L88,312 C86,304 83,292 80,278 C78,264 72,248 66,234 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M146,210 C142,220 132,226 118,228 L100,230 L100,310 L112,312 C114,304 117,292 120,278 C122,264 128,248 134,234 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M88,312 L100,310 L100,340 L98,412 C97,416 96,420 94,422 L84,422 C84,418 85,414 86,408 L86,340 C84,334 84,326 86,318 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M112,312 L100,310 L100,340 L102,412 C103,416 104,420 106,422 L116,422 C116,418 115,414 114,408 L114,340 C116,334 116,326 114,318 Z',
  },
  // LEFT ANKLE BACK
  {
    id: 'left-ankle-back',
    label: 'Cheville gauche (arrière)',
    d: 'M84,422 L94,422 L93,438 L83,438 Z',
  },
  // RIGHT ANKLE BACK
  {
    id: 'right-ankle-back',
    label: 'Cheville droite (arrière)',
    d: 'M116,422 L106,422 L107,438 L117,438 Z',
  },
];
