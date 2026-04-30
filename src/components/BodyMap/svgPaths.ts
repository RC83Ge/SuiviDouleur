import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  d: string;
  label: string;
}

// ViewBox: 0 0 358 480 — calibré sur l'image 896x1200 (facteur ×0.4)
// Silhouette réelle : x 57-301, y 29-456, centre x=179
// Repères mesurés (viewBox) :
//   Tête : y 29-78, x 158-200
//   Cou : y 80-90, x 164-194
//   Épaules max : y 140, x 117-240
//   Coudes : y 184, x 110/130 et 224/249
//   Mains (centre) : gauche écran x=73 y=256 ; droite écran x=285 y=256
//   Hanches max (tronc seul) : y 252, x 135-223
//   Genoux : gauche x=153 y=336 ; droite x=204 y=336
//   Chevilles : gauche x=148 y=430 ; droite x=210 y=430
//   Pieds (centre) : gauche x=146 y=448 ; droite x=212 y=448

export const FRONT_PATHS: ZonePath[] = [
  // HEAD — crâne ovale
  {
    id: 'head',
    label: 'Tête',
    d: 'M179,29 C194,29 207,38 211,53 C213,62 213,70 211,76 C209,82 205,86 200,89 C194,91 188,92 179,92 C170,92 164,91 158,89 C153,86 149,82 147,76 C145,70 145,62 147,53 C151,38 164,29 179,29 Z',
  },
  // NECK
  {
    id: 'neck',
    label: 'Cou',
    d: 'M170,89 C173,90 176,90 179,90 C182,90 185,90 188,89 L191,98 C191,104 190,108 188,112 C185,114 182,115 179,115 C176,115 173,114 170,112 C168,108 167,104 167,98 Z',
  },
  // RIGHT SHOULDER (patient right = screen left)
  {
    id: 'right-shoulder',
    label: 'Épaule droite',
    d: 'M170,112 C160,113 145,116 132,121 C123,125 117,131 115,140 L120,144 C123,138 130,133 138,130 C146,127 156,125 165,125 L172,128 Z',
  },
  // LEFT SHOULDER
  {
    id: 'left-shoulder',
    label: 'Épaule gauche',
    d: 'M188,112 C198,113 213,116 226,121 C235,125 241,131 243,140 L238,144 C235,138 228,133 220,130 C212,127 202,125 193,125 L186,128 Z',
  },
  // CHEST
  {
    id: 'chest',
    label: 'Thorax',
    d: 'M120,144 L172,128 L179,130 L186,128 L238,144 L235,180 L179,180 L123,180 Z',
  },
  // ABDOMEN
  {
    id: 'abdomen',
    label: 'Abdomen',
    d: 'M123,180 L179,180 L235,180 L233,222 L179,222 L125,222 Z',
  },
  // PELVIS
  {
    id: 'pelvis',
    label: 'Bassin',
    d: 'M125,222 L179,222 L233,222 L230,256 C223,266 205,272 179,272 C153,272 135,266 128,256 Z',
  },
  // RIGHT UPPER ARM (screen left)
  {
    id: 'right-upper-arm',
    label: 'Bras droit',
    d: 'M115,140 L132,138 L128,170 L108,180 L102,165 Z',
  },
  // LEFT UPPER ARM
  {
    id: 'left-upper-arm',
    label: 'Bras gauche',
    d: 'M243,140 L226,138 L230,170 L250,180 L256,165 Z',
  },
  // RIGHT ELBOW
  {
    id: 'right-elbow',
    label: 'Coude droit',
    d: 'M102,165 L128,170 L124,190 L98,188 Z',
  },
  // LEFT ELBOW
  {
    id: 'left-elbow',
    label: 'Coude gauche',
    d: 'M256,165 L230,170 L234,190 L260,188 Z',
  },
  // RIGHT FOREARM
  {
    id: 'right-forearm',
    label: 'Avant-bras droit',
    d: 'M98,188 L124,190 L112,235 L84,235 Z',
  },
  // LEFT FOREARM
  {
    id: 'left-forearm',
    label: 'Avant-bras gauche',
    d: 'M260,188 L234,190 L246,235 L274,235 Z',
  },
  // RIGHT HAND (centre 73, 256)
  {
    id: 'right-hand',
    label: 'Main droite',
    d: 'M55,256 A18,16 0 1,1 91,256 A18,16 0 1,1 55,256 Z',
  },
  // LEFT HAND (centre 285, 256)
  {
    id: 'left-hand',
    label: 'Main gauche',
    d: 'M267,256 A18,16 0 1,1 303,256 A18,16 0 1,1 267,256 Z',
  },
  // RIGHT THIGH
  {
    id: 'right-thigh',
    label: 'Cuisse droite',
    d: 'M128,256 C135,266 153,272 179,272 L179,325 L143,325 C140,310 138,295 135,280 C133,272 130,265 128,256 Z',
  },
  // LEFT THIGH
  {
    id: 'left-thigh',
    label: 'Cuisse gauche',
    d: 'M230,256 C223,266 205,272 179,272 L179,325 L215,325 C218,310 220,295 223,280 C225,272 228,265 230,256 Z',
  },
  // RIGHT KNEE (centre 153, 336)
  {
    id: 'right-knee',
    label: 'Genou droit',
    d: 'M138,336 A15,12 0 1,1 168,336 A15,12 0 1,1 138,336 Z',
  },
  // LEFT KNEE (centre 204, 336)
  {
    id: 'left-knee',
    label: 'Genou gauche',
    d: 'M189,336 A15,12 0 1,1 219,336 A15,12 0 1,1 189,336 Z',
  },
  // RIGHT SHIN
  {
    id: 'right-shin',
    label: 'Tibia droit',
    d: 'M141,348 L168,348 L162,418 L138,418 C137,400 137,380 138,365 Z',
  },
  // LEFT SHIN
  {
    id: 'left-shin',
    label: 'Tibia gauche',
    d: 'M217,348 L190,348 L196,418 L220,418 C221,400 221,380 220,365 Z',
  },
  // RIGHT ANKLE (centre 148, 430)
  {
    id: 'right-ankle',
    label: 'Cheville droite',
    d: 'M137,430 A11,9 0 1,1 159,430 A11,9 0 1,1 137,430 Z',
  },
  // LEFT ANKLE (centre 210, 430)
  {
    id: 'left-ankle',
    label: 'Cheville gauche',
    d: 'M199,430 A11,9 0 1,1 221,430 A11,9 0 1,1 199,430 Z',
  },
  // RIGHT FOOT (centre 146, 449)
  {
    id: 'right-foot',
    label: 'Pied droit',
    d: 'M128,449 A18,11 0 1,1 164,449 A18,11 0 1,1 128,449 Z',
  },
  // LEFT FOOT (centre 212, 449)
  {
    id: 'left-foot',
    label: 'Pied gauche',
    d: 'M194,449 A18,11 0 1,1 230,449 A18,11 0 1,1 194,449 Z',
  },
];

// Vue dorsale — superposable à la vue face (mêmes coordonnées)
export const BACK_PATHS: ZonePath[] = [
  // HEAD (back)
  {
    id: 'head',
    label: 'Tête',
    d: 'M179,29 C194,29 207,38 211,53 C213,62 213,70 211,76 C209,82 205,86 200,89 C194,91 188,92 179,92 C170,92 164,91 158,89 C153,86 149,82 147,76 C145,70 145,62 147,53 C151,38 164,29 179,29 Z',
  },
  // NECK BACK
  {
    id: 'neck-back',
    label: 'Nuque',
    d: 'M170,89 C173,90 176,90 179,90 C182,90 185,90 188,89 L191,98 C191,104 190,108 188,112 C185,114 182,115 179,115 C176,115 173,114 170,112 C168,108 167,104 167,98 Z',
  },
  // LEFT SHOULDER BLADE (patient left = screen right on back view, but we keep label-side consistency)
  {
    id: 'left-shoulder-blade',
    label: 'Omoplate gauche',
    d: 'M188,112 C198,113 213,116 226,121 C235,125 241,131 243,140 L238,144 C235,148 232,156 230,165 L226,180 L179,180 L179,128 L186,128 Z',
  },
  // RIGHT SHOULDER BLADE
  {
    id: 'right-shoulder-blade',
    label: 'Omoplate droite',
    d: 'M170,112 C160,113 145,116 132,121 C123,125 117,131 115,140 L120,144 C123,148 126,156 128,165 L132,180 L179,180 L179,128 L172,128 Z',
  },
  // UPPER BACK
  {
    id: 'upper-back',
    label: 'Haut du dos',
    d: 'M132,180 L179,180 L226,180 L223,202 L179,202 L135,202 Z',
  },
  // MIDDLE BACK
  {
    id: 'middle-back',
    label: 'Milieu du dos',
    d: 'M135,202 L179,202 L223,202 L221,222 L179,222 L137,222 Z',
  },
  // LOWER BACK
  {
    id: 'lower-back',
    label: 'Bas du dos',
    d: 'M137,222 L179,222 L221,222 L218,240 L179,240 L140,240 Z',
  },
  // LEFT BUTTOCK (patient left = screen right on back; keep right-of-center)
  {
    id: 'left-buttock',
    label: 'Fessier gauche',
    d: 'M179,240 L218,240 L230,256 C223,266 205,272 179,272 Z',
  },
  // RIGHT BUTTOCK
  {
    id: 'right-buttock',
    label: 'Fessier droit',
    d: 'M179,240 L140,240 L128,256 C135,266 153,272 179,272 Z',
  },
  // LEFT ARM BACK (screen right)
  {
    id: 'left-arm-back',
    label: 'Bras gauche (arrière)',
    d: 'M243,140 L226,138 L230,170 L256,165 L260,188 L274,235 L246,235 L234,190 L230,170 Z',
  },
  // RIGHT ARM BACK (screen left)
  {
    id: 'right-arm-back',
    label: 'Bras droit (arrière)',
    d: 'M115,140 L132,138 L128,170 L102,165 L98,188 L84,235 L112,235 L124,190 L128,170 Z',
  },
  // LEFT HAMSTRING (screen right)
  {
    id: 'left-hamstring',
    label: 'Ischio-jambier gauche',
    d: 'M230,256 C223,266 205,272 179,272 L179,325 L215,325 C218,310 220,295 223,280 C225,272 228,265 230,256 Z',
  },
  // RIGHT HAMSTRING (screen left)
  {
    id: 'right-hamstring',
    label: 'Ischio-jambier droit',
    d: 'M128,256 C135,266 153,272 179,272 L179,325 L143,325 C140,310 138,295 135,280 C133,272 130,265 128,256 Z',
  },
  // LEFT CALF
  {
    id: 'left-calf',
    label: 'Mollet gauche',
    d: 'M217,348 L190,348 L196,418 L220,418 C221,400 221,380 220,365 Z',
  },
  // RIGHT CALF
  {
    id: 'right-calf',
    label: 'Mollet droit',
    d: 'M141,348 L168,348 L162,418 L138,418 C137,400 137,380 138,365 Z',
  },
  // LEFT ANKLE BACK
  {
    id: 'left-ankle-back',
    label: 'Cheville gauche (arrière)',
    d: 'M199,430 A11,9 0 1,1 221,430 A11,9 0 1,1 199,430 Z',
  },
  // RIGHT ANKLE BACK
  {
    id: 'right-ankle-back',
    label: 'Cheville droite (arrière)',
    d: 'M137,430 A11,9 0 1,1 159,430 A11,9 0 1,1 137,430 Z',
  },
];
