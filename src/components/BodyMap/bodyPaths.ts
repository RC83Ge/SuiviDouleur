import { BodyZone } from '@/types/pain';

export interface BodyZonePath {
  zone: BodyZone;
  frontPath: string | null;
  backPath: string | null;
}

// ViewBox: 0 0 200 450
// Center X = 100
// All paths use cubic bezier curves for anatomically fluid shapes

export const bodyZonePaths: BodyZonePath[] = [
  // HEAD — oval skull with jaw tapering
  {
    zone: 'head',
    frontPath: 'M100,8 C113,8 124,16 126,30 C128,42 122,54 114,58 C110,60 106,60 100,60 C94,60 90,60 86,58 C78,54 72,42 74,30 C76,16 87,8 100,8 Z',
    backPath: 'M100,8 C113,8 124,16 126,30 C128,42 122,54 114,58 C110,60 106,60 100,60 C94,60 90,60 86,58 C78,54 72,42 74,30 C76,16 87,8 100,8 Z',
  },
  // NECK — tapered cylinder
  {
    zone: 'neck',
    frontPath: 'M92,58 C94,58 96,59 100,59 C104,59 106,58 108,58 L110,72 C106,74 104,75 100,75 C96,75 94,74 90,72 Z',
    backPath: 'M92,58 C94,58 96,59 100,59 C104,59 106,58 108,58 L110,72 C106,74 104,75 100,75 C96,75 94,74 90,72 Z',
  },
  // LEFT SHOULDER — rounded deltoid
  {
    zone: 'left-shoulder',
    frontPath: 'M90,72 C84,72 74,74 66,80 C60,86 58,92 60,96 L72,96 L72,84 C76,78 84,74 90,72 Z',
    backPath: 'M90,72 C84,72 74,74 66,80 C60,86 58,92 60,96 L72,96 L72,84 C76,78 84,74 90,72 Z',
  },
  // RIGHT SHOULDER — rounded deltoid
  {
    zone: 'right-shoulder',
    frontPath: 'M110,72 C116,72 126,74 134,80 C140,86 142,92 140,96 L128,96 L128,84 C124,78 116,74 110,72 Z',
    backPath: 'M110,72 C116,72 126,74 134,80 C140,86 142,92 140,96 L128,96 L128,84 C124,78 116,74 110,72 Z',
  },
  // CHEST (front only) — broad torso with pec curvature
  {
    zone: 'chest',
    frontPath: 'M72,84 L128,84 C130,90 130,100 130,110 C130,130 128,146 126,150 L74,150 C72,146 70,130 70,110 C70,100 70,90 72,84 Z',
    backPath: null,
  },
  // UPPER BACK (back only)
  {
    zone: 'upper-back',
    frontPath: null,
    backPath: 'M72,84 L128,84 C130,90 130,100 130,110 C130,130 128,146 126,150 L74,150 C72,146 70,130 70,110 C70,100 70,90 72,84 Z',
  },
  // LEFT ARM — upper arm with bicep/tricep curve
  {
    zone: 'left-arm',
    frontPath: 'M60,96 C56,100 52,108 50,118 C48,130 48,142 50,154 L64,154 C64,142 64,130 64,118 C64,108 66,100 72,96 Z',
    backPath: 'M60,96 C56,100 52,108 50,118 C48,130 48,142 50,154 L64,154 C64,142 64,130 64,118 C64,108 66,100 72,96 Z',
  },
  // RIGHT ARM
  {
    zone: 'right-arm',
    frontPath: 'M140,96 C144,100 148,108 150,118 C152,130 152,142 150,154 L136,154 C136,142 136,130 136,118 C136,108 134,100 128,96 Z',
    backPath: 'M140,96 C144,100 148,108 150,118 C152,130 152,142 150,154 L136,154 C136,142 136,130 136,118 C136,108 134,100 128,96 Z',
  },
  // LEFT FOREARM — tapered with slight muscle curve
  {
    zone: 'left-forearm',
    frontPath: 'M50,154 C48,162 46,174 44,188 C42,200 42,210 44,218 L56,218 C58,210 58,200 58,188 C58,174 60,162 64,154 Z',
    backPath: 'M50,154 C48,162 46,174 44,188 C42,200 42,210 44,218 L56,218 C58,210 58,200 58,188 C58,174 60,162 64,154 Z',
  },
  // RIGHT FOREARM
  {
    zone: 'right-forearm',
    frontPath: 'M150,154 C152,162 154,174 156,188 C158,200 158,210 156,218 L144,218 C142,210 142,200 142,188 C142,174 140,162 136,154 Z',
    backPath: 'M150,154 C152,162 154,174 156,188 C158,200 158,210 156,218 L144,218 C142,210 142,200 142,188 C142,174 140,162 136,154 Z',
  },
  // LEFT HAND — organic hand shape
  {
    zone: 'left-hand',
    frontPath: 'M44,218 C42,222 38,228 36,236 C34,244 36,250 40,252 C44,254 48,252 52,248 C54,244 56,236 56,228 L56,218 Z',
    backPath: 'M44,218 C42,222 38,228 36,236 C34,244 36,250 40,252 C44,254 48,252 52,248 C54,244 56,236 56,228 L56,218 Z',
  },
  // RIGHT HAND
  {
    zone: 'right-hand',
    frontPath: 'M156,218 C158,222 162,228 164,236 C166,244 164,250 160,252 C156,254 152,252 148,248 C146,244 144,236 144,228 L144,218 Z',
    backPath: 'M156,218 C158,222 162,228 164,236 C166,244 164,250 160,252 C156,254 152,252 148,248 C146,244 144,236 144,228 L144,218 Z',
  },
  // ABDOMEN (front only) — soft belly curvature
  {
    zone: 'abdomen',
    frontPath: 'M74,150 L126,150 C128,158 130,168 130,178 C130,188 128,196 126,204 L74,204 C72,196 70,188 70,178 C70,168 72,158 74,150 Z',
    backPath: null,
  },
  // LOWER BACK (back only)
  {
    zone: 'lower-back',
    frontPath: null,
    backPath: 'M74,150 L126,150 C128,158 130,168 130,178 C130,188 128,196 126,204 L74,204 C72,196 70,188 70,178 C70,168 72,158 74,150 Z',
  },
  // PELVIS — wide hip with iliac crest shape
  {
    zone: 'pelvis',
    frontPath: 'M74,204 L126,204 C130,212 132,222 130,232 C128,240 124,248 118,252 L82,252 C76,248 72,240 70,232 C68,222 70,212 74,204 Z',
    backPath: 'M74,204 L126,204 C130,212 132,222 130,232 C128,240 124,248 118,252 L82,252 C76,248 72,240 70,232 C68,222 70,212 74,204 Z',
  },
  // LEFT HIP — lateral hip bulge
  {
    zone: 'left-hip',
    frontPath: 'M82,252 C78,254 74,258 72,264 C70,270 72,276 76,278 L96,278 L96,252 Z',
    backPath: 'M82,252 C78,254 74,258 72,264 C70,270 72,276 76,278 L96,278 L96,252 Z',
  },
  // RIGHT HIP
  {
    zone: 'right-hip',
    frontPath: 'M118,252 C122,254 126,258 128,264 C130,270 128,276 124,278 L104,278 L104,252 Z',
    backPath: 'M118,252 C122,254 126,258 128,264 C130,270 128,276 124,278 L104,278 L104,252 Z',
  },
  // LEFT THIGH — muscular taper with quadriceps curve
  {
    zone: 'left-thigh',
    frontPath: 'M76,278 C72,286 70,300 70,316 C70,330 72,342 76,350 L96,350 C94,342 92,330 92,316 C92,300 94,286 96,278 Z',
    backPath: 'M76,278 C72,286 70,300 70,316 C70,330 72,342 76,350 L96,350 C94,342 92,330 92,316 C92,300 94,286 96,278 Z',
  },
  // RIGHT THIGH
  {
    zone: 'right-thigh',
    frontPath: 'M124,278 C128,286 130,300 130,316 C130,330 128,342 124,350 L104,350 C106,342 108,330 108,316 C108,300 106,286 104,278 Z',
    backPath: 'M124,278 C128,286 130,300 130,316 C130,330 128,342 124,350 L104,350 C106,342 108,330 108,316 C108,300 106,286 104,278 Z',
  },
  // LEFT KNEE — rounded joint
  {
    zone: 'left-knee',
    frontPath: 'M76,350 C74,354 72,360 72,366 C72,374 74,380 78,384 L94,384 C96,380 98,374 98,366 C98,360 96,354 96,350 Z',
    backPath: 'M76,350 C74,354 72,360 72,366 C72,374 74,380 78,384 L94,384 C96,380 98,374 98,366 C98,360 96,354 96,350 Z',
  },
  // RIGHT KNEE
  {
    zone: 'right-knee',
    frontPath: 'M124,350 C126,354 128,360 128,366 C128,374 126,380 122,384 L106,384 C104,380 102,374 102,366 C102,360 104,354 104,350 Z',
    backPath: 'M124,350 C126,354 128,360 128,366 C128,374 126,380 122,384 L106,384 C104,380 102,374 102,366 C102,360 104,354 104,350 Z',
  },
  // LEFT LEG (calf) — tapered with gastrocnemius curve
  {
    zone: 'left-leg',
    frontPath: 'M78,384 C76,392 74,404 74,416 C74,426 76,434 80,440 L94,440 C96,434 96,426 96,416 C96,404 96,392 94,384 Z',
    backPath: 'M78,384 C76,392 74,404 74,416 C74,426 76,434 80,440 L94,440 C96,434 96,426 96,416 C96,404 96,392 94,384 Z',
  },
  // RIGHT LEG (calf)
  {
    zone: 'right-leg',
    frontPath: 'M122,384 C124,392 126,404 126,416 C126,426 124,434 120,440 L106,440 C104,434 104,426 104,416 C104,404 104,392 106,384 Z',
    backPath: 'M122,384 C124,392 126,404 126,416 C126,426 124,434 120,440 L106,440 C104,434 104,426 104,416 C104,404 104,392 106,384 Z',
  },
  // LEFT FOOT — anatomical foot shape
  {
    zone: 'left-foot',
    frontPath: 'M80,440 C78,442 74,444 70,446 C66,448 64,450 66,452 C68,454 74,456 82,456 C88,456 92,454 94,452 C96,450 96,446 94,440 Z',
    backPath: 'M80,440 C78,442 74,444 70,446 C66,448 64,450 66,452 C68,454 74,456 82,456 C88,456 92,454 94,452 C96,450 96,446 94,440 Z',
  },
  // RIGHT FOOT
  {
    zone: 'right-foot',
    frontPath: 'M120,440 C122,442 126,444 130,446 C134,448 136,450 134,452 C132,454 126,456 118,456 C112,456 108,454 106,452 C104,450 104,446 106,440 Z',
    backPath: 'M120,440 C122,442 126,444 130,446 C134,448 136,450 134,452 C132,454 126,456 118,456 C112,456 108,454 106,452 C104,450 104,446 106,440 Z',
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
  // Parse all coordinate pairs from M, L, C commands
  const coords: { x: number; y: number }[] = [];
  const re = /[MLC]\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g;
  let m;
  while ((m = re.exec(path)) !== null) {
    coords.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  if (coords.length === 0) return { x: 100, y: 240 };

  const minX = Math.min(...coords.map(c => c.x));
  const maxX = Math.max(...coords.map(c => c.x));
  const minY = Math.min(...coords.map(c => c.y));
  const maxY = Math.max(...coords.map(c => c.y));
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
};
