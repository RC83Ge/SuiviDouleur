import { BodyZone } from '@/types/pain';

export interface BodyZonePath {
  zone: BodyZone;
  frontPath: string | null;
  backPath: string | null;
}

// ViewBox: 0 0 200 460
// Anatomically fluid mannequin — all paths use cubic Bézier curves
// The silhouette is a continuous, sculpted form (like an artist's wooden mannequin)

export const bodyZonePaths: BodyZonePath[] = [
  // ── HEAD ── smooth oval with slight chin taper
  {
    zone: 'head',
    frontPath: `M100,6 C116,6 128,18 128,34 C128,48 120,58 112,62 C108,64 104,65 100,65 C96,65 92,64 88,62 C80,58 72,48 72,34 C72,18 84,6 100,6 Z`,
    backPath: `M100,6 C116,6 128,18 128,34 C128,48 120,58 112,62 C108,64 104,65 100,65 C96,65 92,64 88,62 C80,58 72,48 72,34 C72,18 84,6 100,6 Z`,
  },
  // ── NECK ── short tapered column
  {
    zone: 'neck',
    frontPath: `M92,63 C95,64 97,65 100,65 C103,65 105,64 108,63 C109,65 110,70 110,76 C108,77 104,78 100,78 C96,78 92,77 90,76 C90,70 91,65 92,63 Z`,
    backPath: `M92,63 C95,64 97,65 100,65 C103,65 105,64 108,63 C109,65 110,70 110,76 C108,77 104,78 100,78 C96,78 92,77 90,76 C90,70 91,65 92,63 Z`,
  },
  // ── LEFT SHOULDER ── rounded deltoid cap
  {
    zone: 'left-shoulder',
    frontPath: `M90,76 C84,76 76,78 68,84 C62,90 58,96 58,100 C60,102 64,102 68,100 L74,94 L74,86 C78,80 84,77 90,76 Z`,
    backPath: `M90,76 C84,76 76,78 68,84 C62,90 58,96 58,100 C60,102 64,102 68,100 L74,94 L74,86 C78,80 84,77 90,76 Z`,
  },
  // ── RIGHT SHOULDER ── mirrored deltoid
  {
    zone: 'right-shoulder',
    frontPath: `M110,76 C116,76 124,78 132,84 C138,90 142,96 142,100 C140,102 136,102 132,100 L126,94 L126,86 C122,80 116,77 110,76 Z`,
    backPath: `M110,76 C116,76 124,78 132,84 C138,90 142,96 142,100 C140,102 136,102 132,100 L126,94 L126,86 C122,80 116,77 110,76 Z`,
  },
  // ── CHEST (front) ── sculpted torso: pecs + ribcage flowing into waist
  {
    zone: 'chest',
    frontPath: `M74,86 L126,86 C128,90 130,98 130,108 C130,120 129,134 128,144 C126,150 124,154 122,156 L78,156 C76,154 74,150 72,144 C71,134 70,120 70,108 C70,98 72,90 74,86 Z`,
    backPath: null,
  },
  // ── UPPER BACK (back) ── same torso shape for back view
  {
    zone: 'upper-back',
    frontPath: null,
    backPath: `M74,86 L126,86 C128,90 130,98 130,108 C130,120 129,134 128,144 C126,150 124,154 122,156 L78,156 C76,154 74,150 72,144 C71,134 70,120 70,108 C70,98 72,90 74,86 Z`,
  },
  // ── LEFT ARM (upper) ── bicep/tricep shape, slight muscle bulge
  {
    zone: 'left-arm',
    frontPath: `M58,100 C54,106 50,116 48,128 C46,140 46,150 48,160 L62,158 C64,148 64,138 64,128 C64,116 66,106 68,100 Z`,
    backPath: `M58,100 C54,106 50,116 48,128 C46,140 46,150 48,160 L62,158 C64,148 64,138 64,128 C64,116 66,106 68,100 Z`,
  },
  // ── RIGHT ARM (upper) ── mirrored
  {
    zone: 'right-arm',
    frontPath: `M142,100 C146,106 150,116 152,128 C154,140 154,150 152,160 L138,158 C136,148 136,138 136,128 C136,116 134,106 132,100 Z`,
    backPath: `M142,100 C146,106 150,116 152,128 C154,140 154,150 152,160 L138,158 C136,148 136,138 136,128 C136,116 134,106 132,100 Z`,
  },
  // ── LEFT FOREARM ── tapered with wrist narrowing
  {
    zone: 'left-forearm',
    frontPath: `M48,160 C46,170 44,182 42,194 C40,206 40,216 42,224 L56,222 C58,214 58,204 58,194 C58,182 60,170 62,158 Z`,
    backPath: `M48,160 C46,170 44,182 42,194 C40,206 40,216 42,224 L56,222 C58,214 58,204 58,194 C58,182 60,170 62,158 Z`,
  },
  // ── RIGHT FOREARM ── mirrored
  {
    zone: 'right-forearm',
    frontPath: `M152,160 C154,170 156,182 158,194 C160,206 160,216 158,224 L144,222 C142,214 142,204 142,194 C142,182 140,170 138,158 Z`,
    backPath: `M152,160 C154,170 156,182 158,194 C160,206 160,216 158,224 L144,222 C142,214 142,204 142,194 C142,182 140,170 138,158 Z`,
  },
  // ── LEFT HAND ── organic palm+fingers shape
  {
    zone: 'left-hand',
    frontPath: `M42,224 C40,228 36,234 34,242 C32,250 34,256 38,258 C42,260 48,258 52,254 C55,250 56,242 56,234 L56,222 Z`,
    backPath: `M42,224 C40,228 36,234 34,242 C32,250 34,256 38,258 C42,260 48,258 52,254 C55,250 56,242 56,234 L56,222 Z`,
  },
  // ── RIGHT HAND ── mirrored
  {
    zone: 'right-hand',
    frontPath: `M158,224 C160,228 164,234 166,242 C168,250 166,256 162,258 C158,260 152,258 148,254 C145,250 144,242 144,234 L144,222 Z`,
    backPath: `M158,224 C160,228 164,234 166,242 C168,250 166,256 162,258 C158,260 152,258 148,254 C145,250 144,242 144,234 L144,222 Z`,
  },
  // ── ABDOMEN (front) ── waisted belly flowing from ribcage
  {
    zone: 'abdomen',
    frontPath: `M78,156 L122,156 C124,162 126,170 126,180 C126,190 124,198 122,206 L78,206 C76,198 74,190 74,180 C74,170 76,162 78,156 Z`,
    backPath: null,
  },
  // ── LOWER BACK (back) ──
  {
    zone: 'lower-back',
    frontPath: null,
    backPath: `M78,156 L122,156 C124,162 126,170 126,180 C126,190 124,198 122,206 L78,206 C76,198 74,190 74,180 C74,170 76,162 78,156 Z`,
  },
  // ── PELVIS ── wide hip basin, iliac crest contour
  {
    zone: 'pelvis',
    frontPath: `M78,206 L122,206 C126,214 128,224 126,234 C124,242 120,250 114,256 L86,256 C80,250 76,242 74,234 C72,224 74,214 78,206 Z`,
    backPath: `M78,206 L122,206 C126,214 128,224 126,234 C124,242 120,250 114,256 L86,256 C80,250 76,242 74,234 C72,224 74,214 78,206 Z`,
  },
  // ── LEFT HIP ── lateral hip joint transition to thigh
  {
    zone: 'left-hip',
    frontPath: `M86,256 C82,258 76,262 74,268 C72,274 74,280 78,284 L96,284 L96,256 Z`,
    backPath: `M86,256 C82,258 76,262 74,268 C72,274 74,280 78,284 L96,284 L96,256 Z`,
  },
  // ── RIGHT HIP ── mirrored
  {
    zone: 'right-hip',
    frontPath: `M114,256 C118,258 124,262 126,268 C128,274 126,280 122,284 L104,284 L104,256 Z`,
    backPath: `M114,256 C118,258 124,262 126,268 C128,274 126,280 122,284 L104,284 L104,256 Z`,
  },
  // ── LEFT THIGH ── muscular quad taper
  {
    zone: 'left-thigh',
    frontPath: `M78,284 C74,294 72,310 72,326 C72,340 74,350 78,358 L94,358 C92,350 90,340 90,326 C90,310 92,294 96,284 Z`,
    backPath: `M78,284 C74,294 72,310 72,326 C72,340 74,350 78,358 L94,358 C92,350 90,340 90,326 C90,310 92,294 96,284 Z`,
  },
  // ── RIGHT THIGH ── mirrored
  {
    zone: 'right-thigh',
    frontPath: `M122,284 C126,294 128,310 128,326 C128,340 126,350 122,358 L106,358 C108,350 110,340 110,326 C110,310 108,294 104,284 Z`,
    backPath: `M122,284 C126,294 128,310 128,326 C128,340 126,350 122,358 L106,358 C108,350 110,340 110,326 C110,310 108,294 104,284 Z`,
  },
  // ── LEFT KNEE ── rounded patella joint
  {
    zone: 'left-knee',
    frontPath: `M78,358 C76,362 74,368 74,374 C74,382 76,388 80,392 L92,392 C94,388 96,382 96,374 C96,368 94,362 94,358 Z`,
    backPath: `M78,358 C76,362 74,368 74,374 C74,382 76,388 80,392 L92,392 C94,388 96,382 96,374 C96,368 94,362 94,358 Z`,
  },
  // ── RIGHT KNEE ── mirrored
  {
    zone: 'right-knee',
    frontPath: `M122,358 C124,362 126,368 126,374 C126,382 124,388 120,392 L108,392 C106,388 104,382 104,374 C104,368 106,362 106,358 Z`,
    backPath: `M122,358 C124,362 126,368 126,374 C126,382 124,388 120,392 L108,392 C106,388 104,382 104,374 C104,368 106,362 106,358 Z`,
  },
  // ── LEFT LEG (calf) ── gastrocnemius curve tapering to ankle
  {
    zone: 'left-leg',
    frontPath: `M80,392 C78,400 76,412 76,424 C76,434 78,440 82,446 L92,446 C94,440 94,434 94,424 C94,412 94,400 92,392 Z`,
    backPath: `M80,392 C78,400 76,412 76,424 C76,434 78,440 82,446 L92,446 C94,440 94,434 94,424 C94,412 94,400 92,392 Z`,
  },
  // ── RIGHT LEG (calf) ── mirrored
  {
    zone: 'right-leg',
    frontPath: `M120,392 C122,400 124,412 124,424 C124,434 122,440 118,446 L108,446 C106,440 106,434 106,424 C106,412 106,400 108,392 Z`,
    backPath: `M120,392 C122,400 124,412 124,424 C124,434 122,440 118,446 L108,446 C106,440 106,434 106,424 C106,412 106,400 108,392 Z`,
  },
  // ── LEFT FOOT ── anatomical foot with arch
  {
    zone: 'left-foot',
    frontPath: `M82,446 C80,448 76,450 72,452 C68,454 66,456 68,458 C70,460 76,462 84,462 C90,462 92,460 94,458 C95,456 94,452 92,446 Z`,
    backPath: `M82,446 C80,448 76,450 72,452 C68,454 66,456 68,458 C70,460 76,462 84,462 C90,462 92,460 94,458 C95,456 94,452 92,446 Z`,
  },
  // ── RIGHT FOOT ── mirrored
  {
    zone: 'right-foot',
    frontPath: `M118,446 C120,448 124,450 128,452 C132,454 134,456 132,458 C130,460 124,462 116,462 C110,462 108,460 106,458 C105,456 106,452 108,446 Z`,
    backPath: `M118,446 C120,448 124,450 128,452 C132,454 134,456 132,458 C130,460 124,462 116,462 C110,462 108,460 106,458 C105,456 106,452 108,446 Z`,
  },
];

export const getZonesForView = (view: 'front' | 'back') => {
  return bodyZonePaths
    .filter(z => (view === 'front' ? z.frontPath : z.backPath) !== null)
    .map(z => ({
      zone: z.zone,
      path: (view === 'front' ? z.frontPath : z.backPath)!,
    }));
};

export const getPathCenter = (path: string): { x: number; y: number } => {
  const coords: { x: number; y: number }[] = [];
  // Match all explicit coordinate pairs after M, L, C commands
  const re = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g;
  let m;
  while ((m = re.exec(path)) !== null) {
    coords.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  if (coords.length === 0) return { x: 100, y: 230 };

  const minX = Math.min(...coords.map(c => c.x));
  const maxX = Math.max(...coords.map(c => c.x));
  const minY = Math.min(...coords.map(c => c.y));
  const maxY = Math.max(...coords.map(c => c.y));
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
};
