import { BodyZone } from '@/types/pain';

export interface EllipseZone {
  id: BodyZone;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

const CX = 50;

export const COMMON_ELLIPSES: EllipseZone[] = [
  // Head
  { id: 'head', cx: CX, cy: 7, rx: 7, ry: 6 },
  // Neck
  { id: 'neck', cx: CX, cy: 15, rx: 3, ry: 2 },
  // Shoulders
  { id: 'left-shoulder', cx: CX - 9, cy: 19.5, rx: 7, ry: 2.5 },
  { id: 'right-shoulder', cx: CX + 9, cy: 19.5, rx: 7, ry: 2.5 },
  // Arms
  { id: 'left-arm', cx: CX - 21, cy: 27.5, rx: 2, ry: 7.5 },
  { id: 'right-arm', cx: CX + 21, cy: 27.5, rx: 2, ry: 7.5 },
  // Forearms
  { id: 'left-forearm', cx: CX - 23, cy: 41.5, rx: 2, ry: 6.5 },
  { id: 'right-forearm', cx: CX + 23, cy: 41.5, rx: 2, ry: 6.5 },
  // Hands
  { id: 'left-hand', cx: CX - 28.2, cy: 51, rx: 2.5, ry: 3 },
  { id: 'right-hand', cx: CX + 28.2, cy: 51, rx: 2.5, ry: 3 },
  // Pelvis
  { id: 'pelvis', cx: CX, cy: 53, rx: 11, ry: 3 },
  // Hips
  { id: 'left-hip', cx: CX - 5.5, cy: 56.5, rx: 5, ry: 2.5 },
  { id: 'right-hip', cx: CX + 5.5, cy: 56.5, rx: 5, ry: 2.5 },
  // Thighs
  { id: 'left-thigh', cx: CX - 6, cy: 66.5, rx: 4, ry: 7.5 },
  { id: 'right-thigh', cx: CX + 6, cy: 66.5, rx: 4, ry: 7.5 },
  // Knees
  { id: 'left-knee', cx: CX - 5.5, cy: 76.5, rx: 3, ry: 2.5 },
  { id: 'right-knee', cx: CX + 5.5, cy: 76.5, rx: 3, ry: 2.5 },
  // Lower legs
  { id: 'left-leg', cx: CX - 5, cy: 84.5, rx: 2.5, ry: 5.5 },
  { id: 'right-leg', cx: CX + 5, cy: 84.5, rx: 2.5, ry: 5.5 },
  // Feet
  { id: 'left-foot', cx: CX - 4.5, cy: 93.5, rx: 3.5, ry: 3.5 },
  { id: 'right-foot', cx: CX + 4.5, cy: 93.5, rx: 3.5, ry: 3.5 },
];

export const FACE_ELLIPSES: EllipseZone[] = [
  { id: 'chest', cx: CX, cy: 28, rx: 14, ry: 8.5 },
  { id: 'abdomen', cx: CX, cy: 43, rx: 13, ry: 7 },
];

export const DOS_ELLIPSES: EllipseZone[] = [
  { id: 'upper-back', cx: CX, cy: 28, rx: 14, ry: 8.5 },
  { id: 'lower-back', cx: CX, cy: 43, rx: 13, ry: 7 },
];
