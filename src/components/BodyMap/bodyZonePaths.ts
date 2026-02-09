import { BodyZone } from '@/types/pain';

export interface ZonePathData {
  zone: BodyZone;
  path: string;
  views: ('front' | 'back')[];
}

// Centre de l'image
const cx = 304;

// Fonction helper pour créer un path elliptique
const ellipse = (centerX: number, centerY: number, radiusX: number, radiusY: number): string => {
  return `M${centerX - radiusX},${centerY} 
          A${radiusX},${radiusY} 0 1,0 ${centerX + radiusX},${centerY} 
          A${radiusX},${radiusY} 0 1,0 ${centerX - radiusX},${centerY} Z`;
};

// Zones définies avec des ellipses simples (cx, cy, rx, ry)
// Calibrées pour image 608x1080 - silhouette bleue
export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE =====
  {
    zone: 'head',
    path: ellipse(cx, 75, 40, 50),
    views: ['front', 'back'],
  },

  // ===== COU =====
  {
    zone: 'neck',
    path: ellipse(cx, 148, 18, 22),
    views: ['front', 'back'],
  },

  // ===== ÉPAULES =====
  {
    zone: 'left-shoulder',
    path: ellipse(cx - 62, 195, 25, 20),
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: ellipse(cx + 62, 195, 25, 20),
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE =====
  {
    zone: 'chest',
    path: ellipse(cx, 245, 55, 55),
    views: ['front'],
  },

  // ===== HAUT DU DOS =====
  {
    zone: 'upper-back',
    path: ellipse(cx, 255, 55, 60),
    views: ['back'],
  },

  // ===== BRAS SUPÉRIEURS =====
  {
    zone: 'left-arm',
    path: ellipse(cx - 80, 275, 14, 50),
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: ellipse(cx + 80, 275, 14, 50),
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS =====
  {
    zone: 'left-forearm',
    path: ellipse(cx - 88, 390, 12, 45),
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: ellipse(cx + 88, 390, 12, 45),
    views: ['front', 'back'],
  },

  // ===== MAINS =====
  {
    zone: 'left-hand',
    path: ellipse(cx - 92, 475, 14, 25),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: ellipse(cx + 92, 475, 14, 25),
    views: ['front', 'back'],
  },

  // ===== ABDOMEN =====
  {
    zone: 'abdomen',
    path: ellipse(cx, 365, 48, 55),
    views: ['front'],
  },

  // ===== BAS DU DOS =====
  {
    zone: 'lower-back',
    path: ellipse(cx, 385, 48, 55),
    views: ['back'],
  },

  // ===== BASSIN =====
  {
    zone: 'pelvis',
    path: ellipse(cx, 450, 50, 35),
    views: ['front'],
  },

  // ===== HANCHES =====
  {
    zone: 'left-hip',
    path: ellipse(cx - 45, 480, 20, 25),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: ellipse(cx + 45, 480, 20, 25),
    views: ['front', 'back'],
  },

  // ===== CUISSES =====
  {
    zone: 'left-thigh',
    path: ellipse(cx - 48, 620, 28, 80),
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: ellipse(cx + 48, 620, 28, 80),
    views: ['front', 'back'],
  },

  // ===== GENOUX =====
  {
    zone: 'left-knee',
    path: ellipse(cx - 42, 745, 20, 30),
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: ellipse(cx + 42, 745, 20, 30),
    views: ['front', 'back'],
  },

  // ===== MOLLETS =====
  {
    zone: 'left-leg',
    path: ellipse(cx - 38, 860, 18, 65),
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: ellipse(cx + 38, 860, 18, 65),
    views: ['front', 'back'],
  },

  // ===== PIEDS =====
  {
    zone: 'left-foot',
    path: ellipse(cx - 35, 985, 22, 35),
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: ellipse(cx + 35, 985, 22, 35),
    views: ['front', 'back'],
  },
];

// Helper pour obtenir les zones par vue
export const getZonesForView = (view: 'front' | 'back'): ZonePathData[] => {
  return bodyZonePaths.filter(zone => zone.views.includes(view));
};

// Helper pour obtenir le centre d'une ellipse
export const getPathCenter = (path: string): { x: number; y: number } => {
  const match = path.match(/M(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (match) {
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    const arcMatch = path.match(/A(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (arcMatch) {
      const rx = parseFloat(arcMatch[1]);
      return { x: startX + rx, y: startY };
    }
  }
  return { x: 304, y: 540 };
};
