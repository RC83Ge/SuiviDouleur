import { BodyZone } from '@/types/pain';

export interface BodyZonePath {
  zone: BodyZone;
  frontPath: string | null;
  backPath: string | null;
}

// ViewBox: 0 0 200 480
// Center X = 100
// Clean mannequin silhouette using simple geometric shapes

const CX = 100;

// Helper: rounded rect path
const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
  r = Math.min(r, w / 2, h / 2);
  return `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - 2 * r} a${r},${r} 0 0 1 -${r},-${r} v-${h - 2 * r} a${r},${r} 0 0 1 ${r},-${r} z`;
};

// Helper: ellipse path
const ellipse = (cx: number, cy: number, rx: number, ry: number) => {
  return `M${cx - rx},${cy} A${rx},${ry} 0 1,0 ${cx + rx},${cy} A${rx},${ry} 0 1,0 ${cx - rx},${cy} Z`;
};

// Helper: custom polygon
const poly = (...points: [number, number][]) => {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + ' Z';
};

export const bodyZonePaths: BodyZonePath[] = [
  // HEAD
  {
    zone: 'head',
    frontPath: ellipse(CX, 32, 20, 24),
    backPath: ellipse(CX, 32, 20, 24),
  },
  // NECK
  {
    zone: 'neck',
    frontPath: roundedRect(CX - 8, 56, 16, 16, 3),
    backPath: roundedRect(CX - 8, 56, 16, 16, 3),
  },
  // SHOULDERS
  {
    zone: 'left-shoulder',
    frontPath: poly([CX - 28, 72], [CX - 8, 72], [CX - 8, 88], [CX - 20, 96], [CX - 40, 88], [CX - 40, 78]),
    backPath: poly([CX - 28, 72], [CX - 8, 72], [CX - 8, 88], [CX - 20, 96], [CX - 40, 88], [CX - 40, 78]),
  },
  {
    zone: 'right-shoulder',
    frontPath: poly([CX + 28, 72], [CX + 8, 72], [CX + 8, 88], [CX + 20, 96], [CX + 40, 88], [CX + 40, 78]),
    backPath: poly([CX + 28, 72], [CX + 8, 72], [CX + 8, 88], [CX + 20, 96], [CX + 40, 88], [CX + 40, 78]),
  },
  // CHEST (front) / UPPER-BACK (back)
  {
    zone: 'chest',
    frontPath: roundedRect(CX - 28, 88, 56, 62, 4),
    backPath: null,
  },
  {
    zone: 'upper-back',
    frontPath: null,
    backPath: roundedRect(CX - 28, 88, 56, 62, 4),
  },
  // UPPER ARMS
  {
    zone: 'left-arm',
    frontPath: roundedRect(CX - 50, 90, 14, 60, 6),
    backPath: roundedRect(CX - 50, 90, 14, 60, 6),
  },
  {
    zone: 'right-arm',
    frontPath: roundedRect(CX + 36, 90, 14, 60, 6),
    backPath: roundedRect(CX + 36, 90, 14, 60, 6),
  },
  // FOREARMS
  {
    zone: 'left-forearm',
    frontPath: roundedRect(CX - 54, 154, 14, 58, 5),
    backPath: roundedRect(CX - 54, 154, 14, 58, 5),
  },
  {
    zone: 'right-forearm',
    frontPath: roundedRect(CX + 40, 154, 14, 58, 5),
    backPath: roundedRect(CX + 40, 154, 14, 58, 5),
  },
  // HANDS
  {
    zone: 'left-hand',
    frontPath: ellipse(CX - 47, 224, 8, 14),
    backPath: ellipse(CX - 47, 224, 8, 14),
  },
  {
    zone: 'right-hand',
    frontPath: ellipse(CX + 47, 224, 8, 14),
    backPath: ellipse(CX + 47, 224, 8, 14),
  },
  // ABDOMEN (front) / LOWER-BACK (back)
  {
    zone: 'abdomen',
    frontPath: roundedRect(CX - 26, 152, 52, 52, 4),
    backPath: null,
  },
  {
    zone: 'lower-back',
    frontPath: null,
    backPath: roundedRect(CX - 26, 152, 52, 52, 4),
  },
  // PELVIS
  {
    zone: 'pelvis',
    frontPath: poly([CX - 28, 204], [CX + 28, 204], [CX + 30, 240], [CX + 22, 248], [CX - 22, 248], [CX - 30, 240]),
    backPath: poly([CX - 28, 204], [CX + 28, 204], [CX + 30, 240], [CX + 22, 248], [CX - 22, 248], [CX - 30, 240]),
  },
  // HIPS
  {
    zone: 'left-hip',
    frontPath: ellipse(CX - 20, 250, 12, 14),
    backPath: ellipse(CX - 20, 250, 12, 14),
  },
  {
    zone: 'right-hip',
    frontPath: ellipse(CX + 20, 250, 12, 14),
    backPath: ellipse(CX + 20, 250, 12, 14),
  },
  // THIGHS
  {
    zone: 'left-thigh',
    frontPath: roundedRect(CX - 28, 262, 22, 72, 8),
    backPath: roundedRect(CX - 28, 262, 22, 72, 8),
  },
  {
    zone: 'right-thigh',
    frontPath: roundedRect(CX + 6, 262, 22, 72, 8),
    backPath: roundedRect(CX + 6, 262, 22, 72, 8),
  },
  // KNEES
  {
    zone: 'left-knee',
    frontPath: ellipse(CX - 17, 342, 11, 14),
    backPath: ellipse(CX - 17, 342, 11, 14),
  },
  {
    zone: 'right-knee',
    frontPath: ellipse(CX + 17, 342, 11, 14),
    backPath: ellipse(CX + 17, 342, 11, 14),
  },
  // LOWER LEGS
  {
    zone: 'left-leg',
    frontPath: roundedRect(CX - 25, 356, 16, 68, 6),
    backPath: roundedRect(CX - 25, 356, 16, 68, 6),
  },
  {
    zone: 'right-leg',
    frontPath: roundedRect(CX + 9, 356, 16, 68, 6),
    backPath: roundedRect(CX + 9, 356, 16, 68, 6),
  },
  // FEET
  {
    zone: 'left-foot',
    frontPath: roundedRect(CX - 28, 426, 20, 14, 5),
    backPath: roundedRect(CX - 28, 426, 20, 14, 5),
  },
  {
    zone: 'right-foot',
    frontPath: roundedRect(CX + 8, 426, 20, 14, 5),
    backPath: roundedRect(CX + 8, 426, 20, 14, 5),
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
  // Extract all numbers from the path to estimate center
  const nums = path.match(/-?\d+\.?\d*/g);
  if (!nums || nums.length < 2) return { x: 100, y: 240 };
  
  // For M command, first two numbers are x,y
  const firstX = parseFloat(nums[0]);
  const firstY = parseFloat(nums[1]);
  
  // For ellipse paths (M cx-rx, cy A...)
  if (path.includes('A') && path.split('A').length > 2) {
    const arcMatch = path.match(/A(\d+\.?\d*),(\d+\.?\d*)/);
    if (arcMatch) {
      const rx = parseFloat(arcMatch[1]);
      return { x: firstX + rx, y: firstY };
    }
  }
  
  // For rect/poly, find bounding box center
  const coords: { x: number; y: number }[] = [];
  const mMatches = path.matchAll(/[ML](-?\d+\.?\d*),(-?\d+\.?\d*)/g);
  for (const m of mMatches) {
    coords.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  if (coords.length > 0) {
    const minX = Math.min(...coords.map(c => c.x));
    const maxX = Math.max(...coords.map(c => c.x));
    const minY = Math.min(...coords.map(c => c.y));
    const maxY = Math.max(...coords.map(c => c.y));
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  }
  
  return { x: 100, y: 240 };
};
