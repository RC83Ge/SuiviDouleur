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
    d: 'M179,6 C191,6 201,14 204,26 C206,34 206,42 204,48 C201,54 197,58 192,61 C188,63 184,64 179,64 C174,64 170,63 166,61 C161,58 157,54 154,48 C152,42 152,34 154,26 C157,14 167,6 179,6 Z',
  },
  // NECK
  {
    id: 'neck',
    label: 'Cou',
    d: 'M171,64 C174,65 176,65 179,65 C182,65 184,65 187,64 L189,68 C189,72 188,76 187,78 C184,79 181,80 179,80 C177,80 174,79 171,78 C170,76 169,72 169,68 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M171,78 C165,76 157,74 149,74 C141,74 135,76 129,80 C125,84 122,88 121,94 L127,96 C128,92 131,88 135,84 C139,81 145,78 151,77 L161,77 Z',
  },
  // LEFT SHOULDER
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M187,78 C193,76 201,74 209,74 C217,74 223,76 229,80 C233,84 236,88 237,94 L231,96 C230,92 227,88 223,84 C219,81 213,78 207,77 L197,77 Z',
  },
  // CHEST
  {
    id: 'chest',
    label: 'Thorax',
    d: 'M127,96 L161,77 L171,78 L179,80 L187,78 L197,77 L231,96 L229,140 L179,140 L129,140 Z',
  },
  // ABDOMEN
  {
    id: 'abdomen',
    label: 'Abdomen',
    d: 'M129,140 L179,140 L229,140 L227,185 L179,185 L131,185 Z',
  },
  // PELVIS
  {
    id: 'pelvis',
    label: 'Bassin',
    d: 'M131,185 L179,185 L227,185 L225,210 C219,222 205,228 179,230 C153,228 139,222 133,210 Z',
  },
  // RIGHT UPPER ARM
  {
    id: 'right-upper-arm',
    label: 'Bras droit',
    d: 'M121,94 C119,104 117,114 115,126 C113,138 112,148 112,156 L118,158 C118,148 119,138 121,126 C123,114 125,104 127,96 Z',
  },
  // LEFT UPPER ARM
  {
    id: 'left-upper-arm',
    label: 'Bras gauche',
    d: 'M237,94 C239,104 241,114 243,126 C245,138 246,148 246,156 L240,158 C240,148 239,138 237,126 C235,114 233,104 231,96 Z',
  },
  // RIGHT ELBOW
  {
    id: 'right-elbow',
    label: 'Coude droit',
    d: 'M112,156 L118,158 L117,174 L111,172 Z',
  },
  // LEFT ELBOW
  {
    id: 'left-elbow',
    label: 'Coude gauche',
    d: 'M246,156 L240,158 L241,174 L247,172 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm',
    label: 'Avant-bras droit',
    d: 'M111,172 L117,174 L115,226 C115,232 114,238 113,242 L107,240 C108,234 109,228 109,222 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm',
    label: 'Avant-bras gauche',
    d: 'M247,172 L241,174 L243,226 C243,232 244,238 245,242 L251,240 C250,234 249,228 249,222 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand',
    label: 'Main droite',
    d: 'M107,240 L113,242 L112,252 C112,258 110,264 107,270 C105,274 101,278 97,276 C94,274 94,268 96,262 C98,256 101,248 103,244 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand',
    label: 'Main gauche',
    d: 'M251,240 L245,242 L246,252 C246,258 248,264 251,270 C253,274 257,278 261,276 C264,274 264,268 262,262 C260,256 257,248 255,244 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh',
    label: 'Cuisse droite',
    d: 'M133,210 C137,220 147,226 161,228 L179,230 L179,310 L167,312 C165,304 162,292 159,278 C157,264 151,248 145,234 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh',
    label: 'Cuisse gauche',
    d: 'M225,210 C221,220 211,226 197,228 L179,230 L179,310 L191,312 C193,304 196,292 199,278 C201,264 207,248 213,234 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M167,312 L179,310 L179,340 L165,340 C163,334 163,326 165,318 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M191,312 L179,310 L179,340 L193,340 C195,334 195,326 193,318 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M165,340 L179,340 L177,412 C176,416 175,420 173,422 L163,422 C163,418 164,414 165,408 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M193,340 L179,340 L181,412 C182,416 183,420 185,422 L195,422 C195,418 194,414 193,408 Z',
  },
  // RIGHT ANKLE
  {
    id: 'right-ankle',
    label: 'Cheville droite',
    d: 'M163,422 L173,422 L172,438 L162,438 Z',
  },
  // LEFT ANKLE
  {
    id: 'left-ankle',
    label: 'Cheville gauche',
    d: 'M195,422 L185,422 L186,438 L196,438 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot',
    label: 'Pied droit',
    d: 'M162,438 L172,438 L171,448 C169,454 165,458 159,460 C155,460 153,456 153,452 C155,446 157,442 159,440 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot',
    label: 'Pied gauche',
    d: 'M196,438 L186,438 L187,448 C189,454 193,458 199,460 C203,460 205,456 205,452 C203,446 201,442 199,440 Z',
  },
];

export const BACK_PATHS: ZonePath[] = [
  // NECK BACK
  {
    id: 'neck-back',
    label: 'Nuque',
    d: 'M171,64 C174,65 176,65 179,65 C182,65 184,65 187,64 L189,68 C189,72 188,76 187,78 C184,79 181,80 179,80 C177,80 174,79 171,78 C170,76 169,72 169,68 Z',
  },
  // HEAD (back view — same silhouette)
  {
    id: 'head',
    label: 'Tête',
    d: 'M179,6 C191,6 201,14 204,26 C206,34 206,42 204,48 C201,54 197,58 192,61 C188,63 184,64 179,64 C174,64 170,63 166,61 C161,58 157,54 154,48 C152,42 152,34 154,26 C157,14 167,6 179,6 Z',
  },
  // LEFT SHOULDER BLADE (patient left = screen left on back)
  {
    id: 'left-shoulder-blade',
    label: 'Omoplate gauche',
    d: 'M171,78 C165,76 157,74 149,74 C141,74 135,76 129,80 C125,84 122,88 121,94 L127,96 C129,104 131,112 133,120 L137,140 L179,140 L179,80 L171,78 Z',
  },
  // RIGHT SHOULDER BLADE
  {
    id: 'right-shoulder-blade',
    label: 'Omoplate droite',
    d: 'M187,78 C193,76 201,74 209,74 C217,74 223,76 229,80 C233,84 236,88 237,94 L231,96 C229,104 227,112 225,120 L221,140 L179,140 L179,80 L187,78 Z',
  },
  // UPPER BACK
  {
    id: 'upper-back',
    label: 'Haut du dos',
    d: 'M137,140 L179,140 L221,140 L219,170 L179,170 L139,170 Z',
  },
  // MIDDLE BACK
  {
    id: 'middle-back',
    label: 'Milieu du dos',
    d: 'M139,170 L179,170 L219,170 L217,200 L179,200 L141,200 Z',
  },
  // LOWER BACK
  {
    id: 'lower-back',
    label: 'Bas du dos',
    d: 'M141,200 L179,200 L217,200 L215,218 L179,218 L143,218 Z',
  },
  // LEFT BUTTOCK
  {
    id: 'left-buttock',
    label: 'Fessier gauche',
    d: 'M143,218 L179,218 L179,230 C153,228 139,222 133,210 L135,204 Z',
  },
  // RIGHT BUTTOCK
  {
    id: 'right-buttock',
    label: 'Fessier droit',
    d: 'M215,218 L179,218 L179,230 C205,228 219,222 225,210 L223,204 Z',
  },
  // LEFT ARM BACK
  {
    id: 'left-arm-back',
    label: 'Bras gauche (arrière)',
    d: 'M121,94 C119,104 117,114 115,126 C113,138 112,148 112,156 L118,158 L117,174 L111,172 L109,222 C109,228 108,234 107,240 L103,244 C101,248 98,256 96,262 C94,268 94,274 97,276 C101,278 105,274 107,270 C110,264 112,258 112,252 L113,242 C114,238 115,232 115,226 L117,174 L118,158 C118,148 119,138 121,126 C123,114 125,104 127,96 Z',
  },
  // RIGHT ARM BACK
  {
    id: 'right-arm-back',
    label: 'Bras droit (arrière)',
    d: 'M237,94 C239,104 241,114 243,126 C245,138 246,148 246,156 L240,158 L241,174 L247,172 L249,222 C249,228 250,234 251,240 L255,244 C257,248 260,256 262,262 C264,268 264,274 261,276 C257,278 253,274 251,270 C248,264 246,258 246,252 L245,242 C244,238 243,232 243,226 L241,174 L240,158 C240,148 239,138 237,126 C235,114 233,104 231,96 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M133,210 C137,220 147,226 161,228 L179,230 L179,310 L167,312 C165,304 162,292 159,278 C157,264 151,248 145,234 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M225,210 C221,220 211,226 197,228 L179,230 L179,310 L191,312 C193,304 196,292 199,278 C201,264 207,248 213,234 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M167,312 L179,310 L179,340 L177,412 C176,416 175,420 173,422 L163,422 C163,418 164,414 165,408 L165,340 C163,334 163,326 165,318 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M191,312 L179,310 L179,340 L181,412 C182,416 183,420 185,422 L195,422 C195,418 194,414 193,408 L193,340 C195,334 195,326 193,318 Z',
  },
  // LEFT ANKLE BACK
  {
    id: 'left-ankle-back',
    label: 'Cheville gauche (arrière)',
    d: 'M163,422 L173,422 L172,438 L162,438 Z',
  },
  // RIGHT ANKLE BACK
  {
    id: 'right-ankle-back',
    label: 'Cheville droite (arrière)',
    d: 'M195,422 L185,422 L186,438 L196,438 Z',
  },
];
