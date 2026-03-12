import { BodyZone } from '@/types/pain';

export interface BodyZonePath {
  zone: BodyZone;
  frontPath: string | null;
  backPath: string | null;
}

// ViewBox: 0 0 220 500
// Traced from reference silhouette — smooth continuous body
// Arms slightly out, legs apart, natural standing pose
// All adjacent zones share exact border points for seamless tiling

export const bodyZonePaths: BodyZonePath[] = [
  // ── HEAD ── smooth skull with natural crown and jaw
  {
    zone: 'head',
    frontPath: `M110,8 C120,8 130,14 134,26 C137,36 136,48 132,56 C128,62 122,66 116,68 L114,68 L106,68 L104,68 C98,66 92,62 88,56 C84,48 83,36 86,26 C90,14 100,8 110,8 Z`,
    backPath: `M110,8 C120,8 130,14 134,26 C137,36 136,48 132,56 C128,62 122,66 116,68 L114,68 L106,68 L104,68 C98,66 92,62 88,56 C84,48 83,36 86,26 C90,14 100,8 110,8 Z`,
  },
  // ── NECK ── connects head to shoulders
  {
    zone: 'neck',
    frontPath: `M104,68 L116,68 C118,72 119,76 120,80 L120,86 L100,86 L100,80 C101,76 102,72 104,68 Z`,
    backPath: `M104,68 L116,68 C118,72 119,76 120,80 L120,86 L100,86 L100,80 C101,76 102,72 104,68 Z`,
  },
  // ── LEFT SHOULDER ── rounded deltoid flowing from neck to arm
  {
    zone: 'left-shoulder',
    frontPath: `M100,86 L100,80 C96,78 90,76 84,78 C76,80 68,86 62,94 C58,100 56,106 56,110 L56,114 L72,114 L72,104 C74,98 78,92 84,88 C88,86 94,85 100,86 Z`,
    backPath: `M100,86 L100,80 C96,78 90,76 84,78 C76,80 68,86 62,94 C58,100 56,106 56,110 L56,114 L72,114 L72,104 C74,98 78,92 84,88 C88,86 94,85 100,86 Z`,
  },
  // ── RIGHT SHOULDER ── mirrored
  {
    zone: 'right-shoulder',
    frontPath: `M120,86 L120,80 C124,78 130,76 136,78 C144,80 152,86 158,94 C162,100 164,106 164,110 L164,114 L148,114 L148,104 C146,98 142,92 136,88 C132,86 126,85 120,86 Z`,
    backPath: `M120,86 L120,80 C124,78 130,76 136,78 C144,80 152,86 158,94 C162,100 164,106 164,110 L164,114 L148,114 L148,104 C146,98 142,92 136,88 C132,86 126,85 120,86 Z`,
  },
  // ── CHEST (front) ── broad torso from shoulder line to waist
  {
    zone: 'chest',
    frontPath: `M72,104 L148,104 L148,114 L164,114 C164,114 164,116 164,118 L164,118 L148,118 L148,170 C146,176 142,180 138,182 L82,182 C78,180 74,176 72,170 L72,118 L56,118 C56,116 56,114 56,114 L72,114 Z`,
    backPath: null,
  },
  // ── UPPER BACK (back) ── same shape
  {
    zone: 'upper-back',
    frontPath: null,
    backPath: `M72,104 L148,104 L148,114 L164,114 C164,114 164,116 164,118 L164,118 L148,118 L148,170 C146,176 142,180 138,182 L82,182 C78,180 74,176 72,170 L72,118 L56,118 C56,116 56,114 56,114 L72,114 Z`,
  },
  // ── LEFT ARM ── upper arm from shoulder to elbow, with bicep curve
  {
    zone: 'left-arm',
    frontPath: `M56,114 L56,118 C54,124 50,134 48,146 C46,158 44,168 44,176 L58,176 C58,168 60,158 62,146 C64,134 66,124 72,118 L72,114 Z`,
    backPath: `M56,114 L56,118 C54,124 50,134 48,146 C46,158 44,168 44,176 L58,176 C58,168 60,158 62,146 C64,134 66,124 72,118 L72,114 Z`,
  },
  // ── RIGHT ARM ── mirrored
  {
    zone: 'right-arm',
    frontPath: `M164,114 L164,118 C166,124 170,134 172,146 C174,158 176,168 176,176 L162,176 C162,168 160,158 158,146 C156,134 154,124 148,118 L148,114 Z`,
    backPath: `M164,114 L164,118 C166,124 170,134 172,146 C174,158 176,168 176,176 L162,176 C162,168 160,158 158,146 C156,134 154,124 148,118 L148,114 Z`,
  },
  // ── LEFT FOREARM ── elbow to wrist, tapered
  {
    zone: 'left-forearm',
    frontPath: `M44,176 L58,176 C58,184 56,196 54,208 C52,220 50,230 48,240 L36,236 C38,226 40,216 42,204 C44,192 44,184 44,176 Z`,
    backPath: `M44,176 L58,176 C58,184 56,196 54,208 C52,220 50,230 48,240 L36,236 C38,226 40,216 42,204 C44,192 44,184 44,176 Z`,
  },
  // ── RIGHT FOREARM ── mirrored
  {
    zone: 'right-forearm',
    frontPath: `M176,176 L162,176 C162,184 164,196 166,208 C168,220 170,230 172,240 L184,236 C182,226 180,216 178,204 C176,192 176,184 176,176 Z`,
    backPath: `M176,176 L162,176 C162,184 164,196 166,208 C168,220 170,230 172,240 L184,236 C182,226 180,216 178,204 C176,192 176,184 176,176 Z`,
  },
  // ── LEFT HAND ── organic hand with finger spread
  {
    zone: 'left-hand',
    frontPath: `M36,236 L48,240 C48,246 46,254 44,262 C42,270 38,278 34,284 C30,288 26,290 24,288 C22,286 22,280 24,274 C26,268 28,262 30,256 C30,252 28,250 26,252 C24,256 20,264 18,272 C16,278 16,282 18,284 C14,284 12,280 12,274 C12,266 16,256 20,248 C22,244 26,240 30,238 C32,237 34,236 36,236 Z`,
    backPath: `M36,236 L48,240 C48,246 46,254 44,262 C42,270 38,278 34,284 C30,288 26,290 24,288 C22,286 22,280 24,274 C26,268 28,262 30,256 C30,252 28,250 26,252 C24,256 20,264 18,272 C16,278 16,282 18,284 C14,284 12,280 12,274 C12,266 16,256 20,248 C22,244 26,240 30,238 C32,237 34,236 36,236 Z`,
  },
  // ── RIGHT HAND ── mirrored
  {
    zone: 'right-hand',
    frontPath: `M184,236 L172,240 C172,246 174,254 176,262 C178,270 182,278 186,284 C190,288 194,290 196,288 C198,286 198,280 196,274 C194,268 192,262 190,256 C190,252 192,250 194,252 C196,256 200,264 202,272 C204,278 204,282 202,284 C206,284 208,280 208,274 C208,266 204,256 200,248 C198,244 194,240 190,238 C188,237 186,236 184,236 Z`,
    backPath: `M184,236 L172,240 C172,246 174,254 176,262 C178,270 182,278 186,284 C190,288 194,290 196,288 C198,286 198,280 196,274 C194,268 192,262 190,256 C190,252 192,250 194,252 C196,256 200,264 202,272 C204,278 204,282 202,284 C206,284 208,280 208,274 C208,266 204,256 200,248 C198,244 194,240 190,238 C188,237 186,236 184,236 Z`,
  },
  // ── ABDOMEN (front) ── waist narrowing, belly curve
  {
    zone: 'abdomen',
    frontPath: `M82,182 L138,182 C140,190 142,200 142,210 C142,220 140,228 138,234 L82,234 C80,228 78,220 78,210 C78,200 80,190 82,182 Z`,
    backPath: null,
  },
  // ── LOWER BACK (back) ──
  {
    zone: 'lower-back',
    frontPath: null,
    backPath: `M82,182 L138,182 C140,190 142,200 142,210 C142,220 140,228 138,234 L82,234 C80,228 78,220 78,210 C78,200 80,190 82,182 Z`,
  },
  // ── PELVIS ── wide hip basin
  {
    zone: 'pelvis',
    frontPath: `M82,234 L138,234 C142,242 144,252 142,262 C140,270 136,278 130,284 L90,284 C84,278 80,270 78,262 C76,252 78,242 82,234 Z`,
    backPath: `M82,234 L138,234 C142,242 144,252 142,262 C140,270 136,278 130,284 L90,284 C84,278 80,270 78,262 C76,252 78,242 82,234 Z`,
  },
  // ── LEFT HIP ── hip joint to upper thigh
  {
    zone: 'left-hip',
    frontPath: `M90,284 C86,286 82,290 80,296 C78,302 78,308 80,312 L104,312 L104,284 Z`,
    backPath: `M90,284 C86,286 82,290 80,296 C78,302 78,308 80,312 L104,312 L104,284 Z`,
  },
  // ── RIGHT HIP ── mirrored
  {
    zone: 'right-hip',
    frontPath: `M130,284 C134,286 138,290 140,296 C142,302 142,308 140,312 L116,312 L116,284 Z`,
    backPath: `M130,284 C134,286 138,290 140,296 C142,302 142,308 140,312 L116,312 L116,284 Z`,
  },
  // ── LEFT THIGH ── muscular quad tapering to knee
  {
    zone: 'left-thigh',
    frontPath: `M80,312 C78,322 76,336 76,352 C76,366 78,376 80,384 L102,384 C100,376 98,366 98,352 C98,336 100,322 104,312 Z`,
    backPath: `M80,312 C78,322 76,336 76,352 C76,366 78,376 80,384 L102,384 C100,376 98,366 98,352 C98,336 100,322 104,312 Z`,
  },
  // ── RIGHT THIGH ── mirrored
  {
    zone: 'right-thigh',
    frontPath: `M140,312 C142,322 144,336 144,352 C144,366 142,376 140,384 L118,384 C120,376 122,366 122,352 C122,336 120,322 116,312 Z`,
    backPath: `M140,312 C142,322 144,336 144,352 C144,366 142,376 140,384 L118,384 C120,376 122,366 122,352 C122,336 120,322 116,312 Z`,
  },
  // ── LEFT KNEE ── rounded joint
  {
    zone: 'left-knee',
    frontPath: `M80,384 C78,390 76,396 76,402 C76,410 78,416 82,420 L100,420 C102,416 104,410 104,402 C104,396 102,390 102,384 Z`,
    backPath: `M80,384 C78,390 76,396 76,402 C76,410 78,416 82,420 L100,420 C102,416 104,410 104,402 C104,396 102,390 102,384 Z`,
  },
  // ── RIGHT KNEE ── mirrored
  {
    zone: 'right-knee',
    frontPath: `M140,384 C142,390 144,396 144,402 C144,410 142,416 138,420 L120,420 C118,416 116,410 116,402 C116,396 118,390 118,384 Z`,
    backPath: `M140,384 C142,390 144,396 144,402 C144,410 142,416 138,420 L120,420 C118,416 116,410 116,402 C116,396 118,390 118,384 Z`,
  },
  // ── LEFT LEG (calf) ── gastrocnemius curve to ankle
  {
    zone: 'left-leg',
    frontPath: `M82,420 C80,428 78,440 78,452 C78,462 80,468 84,474 L98,474 C100,468 100,462 100,452 C100,440 100,428 100,420 Z`,
    backPath: `M82,420 C80,428 78,440 78,452 C78,462 80,468 84,474 L98,474 C100,468 100,462 100,452 C100,440 100,428 100,420 Z`,
  },
  // ── RIGHT LEG (calf) ── mirrored
  {
    zone: 'right-leg',
    frontPath: `M138,420 C140,428 142,440 142,452 C142,462 140,468 136,474 L122,474 C120,468 120,462 120,452 C120,440 120,428 120,420 Z`,
    backPath: `M138,420 C140,428 142,440 142,452 C142,462 140,468 136,474 L122,474 C120,468 120,462 120,452 C120,440 120,428 120,420 Z`,
  },
  // ── LEFT FOOT ── natural foot shape with toes
  {
    zone: 'left-foot',
    frontPath: `M84,474 C82,476 78,478 74,480 C70,482 68,484 68,486 C68,490 74,494 84,494 C92,494 98,492 100,488 C100,486 100,480 98,474 Z`,
    backPath: `M84,474 C82,476 78,478 74,480 C70,482 68,484 68,486 C68,490 74,494 84,494 C92,494 98,492 100,488 C100,486 100,480 98,474 Z`,
  },
  // ── RIGHT FOOT ── mirrored
  {
    zone: 'right-foot',
    frontPath: `M136,474 C138,476 142,478 146,480 C150,482 152,484 152,486 C152,490 146,494 136,494 C128,494 122,492 120,488 C120,486 120,480 122,474 Z`,
    backPath: `M136,474 C138,476 142,478 146,480 C150,482 152,484 152,486 C152,490 146,494 136,494 C128,494 122,492 120,488 C120,486 120,480 122,474 Z`,
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
  const re = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g;
  let m;
  while ((m = re.exec(path)) !== null) {
    coords.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  if (coords.length === 0) return { x: 110, y: 250 };

  const minX = Math.min(...coords.map(c => c.x));
  const maxX = Math.max(...coords.map(c => c.x));
  const minY = Math.min(...coords.map(c => c.y));
  const maxY = Math.max(...coords.map(c => c.y));
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
};
