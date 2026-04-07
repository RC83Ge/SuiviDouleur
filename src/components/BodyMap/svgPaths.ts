import { BodyZone } from '@/types/pain';

export interface ZonePath {
  id: BodyZone;
  cx: number;
  cy: number;
  r: number;
  label: string;
  /** @deprecated kept for compat — not used for circle rendering */
  d?: string;
}

// ViewBox: 0 0 358 480
// Center line at x=179

export const FRONT_PATHS: ZonePath[] = [
  // HEAD
  { id: 'head', label: 'Tête', cx: 179, cy: 35, r: 18 },
  // NECK
  { id: 'neck', label: 'Cou', cx: 179, cy: 72, r: 8 },
  // SHOULDERS
  { id: 'right-shoulder', label: 'Épaule droite', cx: 140, cy: 88, r: 10 },
  { id: 'left-shoulder', label: 'Épaule gauche', cx: 218, cy: 88, r: 10 },
  // CHEST
  { id: 'chest', label: 'Thorax', cx: 179, cy: 115, r: 16 },
  // ABDOMEN
  { id: 'abdomen', label: 'Abdomen', cx: 179, cy: 160, r: 14 },
  // PELVIS
  { id: 'pelvis', label: 'Bassin', cx: 179, cy: 205, r: 14 },
  // UPPER ARMS
  { id: 'right-upper-arm', label: 'Bras droit', cx: 122, cy: 130, r: 9 },
  { id: 'left-upper-arm', label: 'Bras gauche', cx: 236, cy: 130, r: 9 },
  // ELBOWS
  { id: 'right-elbow', label: 'Coude droit', cx: 114, cy: 170, r: 7 },
  { id: 'left-elbow', label: 'Coude gauche', cx: 244, cy: 170, r: 7 },
  // FOREARMS
  { id: 'right-forearm', label: 'Avant-bras droit', cx: 104, cy: 200, r: 8 },
  { id: 'left-forearm', label: 'Avant-bras gauche', cx: 254, cy: 200, r: 8 },
  // HANDS
  { id: 'right-hand', label: 'Main droite', cx: 90, cy: 238, r: 8 },
  { id: 'left-hand', label: 'Main gauche', cx: 268, cy: 238, r: 8 },
  // THIGHS
  { id: 'right-thigh', label: 'Cuisse droite', cx: 160, cy: 270, r: 12 },
  { id: 'left-thigh', label: 'Cuisse gauche', cx: 198, cy: 270, r: 12 },
  // KNEES
  { id: 'right-knee', label: 'Genou droit', cx: 158, cy: 330, r: 9 },
  { id: 'left-knee', label: 'Genou gauche', cx: 200, cy: 330, r: 9 },
  // SHINS
  { id: 'right-shin', label: 'Tibia droit', cx: 157, cy: 380, r: 9 },
  { id: 'left-shin', label: 'Tibia gauche', cx: 201, cy: 380, r: 9 },
  // ANKLES
  { id: 'right-ankle', label: 'Cheville droite', cx: 157, cy: 432, r: 6 },
  { id: 'left-ankle', label: 'Cheville gauche', cx: 201, cy: 432, r: 6 },
  // FEET
  { id: 'right-foot', label: 'Pied droit', cx: 155, cy: 456, r: 8 },
  { id: 'left-foot', label: 'Pied gauche', cx: 203, cy: 456, r: 8 },
];

export const BACK_PATHS: ZonePath[] = [
  // HEAD
  { id: 'head', label: 'Tête', cx: 179, cy: 35, r: 18 },
  // NECK BACK
  { id: 'neck-back', label: 'Nuque', cx: 179, cy: 72, r: 8 },
  // SHOULDER BLADES
  { id: 'left-shoulder-blade', label: 'Omoplate gauche', cx: 148, cy: 105, r: 12 },
  { id: 'right-shoulder-blade', label: 'Omoplate droite', cx: 210, cy: 105, r: 12 },
  // BACK ZONES
  { id: 'upper-back', label: 'Haut du dos', cx: 179, cy: 140, r: 14 },
  { id: 'middle-back', label: 'Milieu du dos', cx: 179, cy: 175, r: 12 },
  { id: 'lower-back', label: 'Bas du dos', cx: 179, cy: 208, r: 11 },
  // BUTTOCKS
  { id: 'left-buttock', label: 'Fessier gauche', cx: 160, cy: 228, r: 10 },
  { id: 'right-buttock', label: 'Fessier droit', cx: 198, cy: 228, r: 10 },
  // ARMS BACK
  { id: 'left-arm-back', label: 'Bras gauche (arrière)', cx: 115, cy: 165, r: 10 },
  { id: 'right-arm-back', label: 'Bras droit (arrière)', cx: 243, cy: 165, r: 10 },
  // HAMSTRINGS
  { id: 'left-hamstring', label: 'Ischio-jambier gauche', cx: 160, cy: 275, r: 12 },
  { id: 'right-hamstring', label: 'Ischio-jambier droit', cx: 198, cy: 275, r: 12 },
  // CALVES
  { id: 'left-calf', label: 'Mollet gauche', cx: 158, cy: 375, r: 10 },
  { id: 'right-calf', label: 'Mollet droit', cx: 200, cy: 375, r: 10 },
  // ANKLES BACK
  { id: 'left-ankle-back', label: 'Cheville gauche (arrière)', cx: 157, cy: 432, r: 6 },
  { id: 'right-ankle-back', label: 'Cheville droite (arrière)', cx: 201, cy: 432, r: 6 },
];
