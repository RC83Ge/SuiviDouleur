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
    d: 'M147,100 L127,96 C121,110 117,125 114,140 L112,160 L130,155 C132,140 135,125 139,110 Z',
  },
  // LEFT UPPER ARM
  {
    id: 'left-upper-arm',
    label: 'Bras gauche',
    d: 'M211,100 L231,96 C237,110 241,125 244,140 L246,160 L228,155 C226,140 223,125 219,110 Z',
  },
  // RIGHT ELBOW
  {
    id: 'right-elbow',
    label: 'Coude droit',
    d: 'M112,160 L130,155 L126,180 L108,180 Z',
  },
  // LEFT ELBOW
  {
    id: 'left-elbow',
    label: 'Coude gauche',
    d: 'M246,160 L228,155 L232,180 L250,180 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm',
    label: 'Avant-bras droit',
    d: 'M100,185 L116,180 L104,225 L86,230 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm',
    label: 'Avant-bras gauche',
    d: 'M258,185 L242,180 L254,225 L272,230 Z',
  },
  // RIGHT HAND
  {
    id: 'right-hand',
    label: 'Main droite',
    d: 'M57,242 A13,13 0 1,1 83,242 A13,13 0 1,1 57,242 Z',
  },
  // LEFT HAND
  {
    id: 'left-hand',
    label: 'Main gauche',
    d: 'M275,242 A13,13 0 1,1 301,242 A13,13 0 1,1 275,242 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh',
    label: 'Cuisse droite',
    d: 'M133,210 C139,222 153,228 179,230 L179,315 L140,315 C137,295 136,275 135,255 C134,240 133,225 133,215 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh',
    label: 'Cuisse gauche',
    d: 'M225,210 C219,222 205,228 179,230 L179,315 L218,315 C221,295 222,275 223,255 C224,240 225,225 225,215 Z',
  },
  // RIGHT KNEE
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M143,328 A13,13 0 1,1 169,328 A13,13 0 1,1 143,328 Z',
  },
  // LEFT KNEE
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M189,328 A13,13 0 1,1 215,328 A13,13 0 1,1 189,328 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M139,345 L179,345 L179,425 L140,425 C139,405 138,385 137,365 C137,355 138,348 139,345 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M219,345 L179,345 L179,425 L218,425 C219,405 220,385 221,365 C221,355 220,348 219,345 Z',
  },
  // RIGHT ANKLE
  {
    id: 'right-ankle',
    label: 'Cheville droite',
    d: 'M137,436 A8,8 0 1,1 153,436 A8,8 0 1,1 137,436 Z',
  },
  // LEFT ANKLE
  {
    id: 'left-ankle',
    label: 'Cheville gauche',
    d: 'M205,436 A8,8 0 1,1 221,436 A8,8 0 1,1 205,436 Z',
  },
  // RIGHT FOOT
  {
    id: 'right-foot',
    label: 'Pied droit',
    d: 'M128,460 A12,12 0 1,1 152,460 A12,12 0 1,1 128,460 Z',
  },
  // LEFT FOOT
  {
    id: 'left-foot',
    label: 'Pied gauche',
    d: 'M206,460 A12,12 0 1,1 230,460 A12,12 0 1,1 206,460 Z',
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
    d: 'M127,96 C121,110 117,125 114,140 L112,160 L130,155 L126,180 L108,180 L94,225 L114,220 L105,240 C95,252 82,260 70,258 C62,255 60,248 64,240 C68,234 78,228 88,226 L94,225 L108,180 L112,160 C115,154 116,142 118,130 C120,118 123,106 127,96 Z',
  },
  // RIGHT ARM BACK
  {
    id: 'right-arm-back',
    label: 'Bras droit (arrière)',
    d: 'M231,96 C237,110 241,125 244,140 L246,160 L228,155 L232,180 L250,180 L264,225 L244,220 L253,240 C263,252 276,260 288,258 C296,255 298,248 294,240 C290,234 280,228 270,226 L264,225 L250,180 L246,160 C243,154 242,142 240,130 C238,118 235,106 231,96 Z',
  },
  // LEFT HAMSTRING
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M133,210 C139,222 153,228 179,230 L179,315 L140,315 C137,295 136,275 135,255 C134,240 133,225 133,215 Z',
  },
  // RIGHT HAMSTRING
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M225,210 C219,222 205,228 179,230 L179,315 L218,315 C221,295 222,275 223,255 C224,240 225,225 225,215 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M140,315 L179,315 L179,425 L140,425 C139,405 138,385 137,365 C137,355 138,348 140,315 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M218,315 L179,315 L179,425 L218,425 C219,405 220,385 221,365 C221,355 220,348 218,315 Z',
  },
  // LEFT ANKLE BACK
  {
    id: 'left-ankle-back',
    label: 'Cheville gauche (arrière)',
    d: 'M140,425 L179,425 L179,442 L139,442 Z',
  },
  // RIGHT ANKLE BACK
  {
    id: 'right-ankle-back',
    label: 'Cheville droite (arrière)',
    d: 'M218,425 L179,425 L179,442 L219,442 Z',
  },
];
