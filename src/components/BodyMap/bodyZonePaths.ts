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
export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE =====
  {
    zone: 'head',
    path: ellipse(cx, 60, 42, 50),
    views: ['front', 'back'],
  },

  // ===== COU =====
  {
    zone: 'neck',
    path: ellipse(cx, 132, 18, 22),
    views: ['front', 'back'],
  },

  // ===== ÉPAULES =====
  {
    zone: 'left-shoulder',
    path: ellipse(cx - 58, 180, 28, 25),
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: ellipse(cx + 58, 180, 28, 25),
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE =====
  {
    zone: 'chest',
    path: ellipse(cx, 235, 48, 55),
    views: ['front'],
  },

  // ===== HAUT DU DOS =====
  {
    zone: 'upper-back',
    path: ellipse(cx, 250, 48, 65),
    views: ['back'],
  },

  // ===== BRAS SUPÉRIEURS =====
  {
    zone: 'left-arm',
    path: ellipse(cx - 72, 280, 14, 55),
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: ellipse(cx + 72, 280, 14, 55),
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS =====
  {
    zone: 'left-forearm',
    path: ellipse(cx - 78, 420, 12, 55),
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: ellipse(cx + 78, 420, 12, 55),
    views: ['front', 'back'],
  },

  // ===== MAINS =====
  {
    zone: 'left-hand',
    path: ellipse(cx - 82, 530, 12, 35),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: ellipse(cx + 82, 530, 12, 35),
    views: ['front', 'back'],
  },

  // ===== ABDOMEN =====
  {
    zone: 'abdomen',
    path: ellipse(cx, 360, 42, 55),
    views: ['front'],
  },

  // ===== BAS DU DOS =====
  {
    zone: 'lower-back',
    path: ellipse(cx, 400, 42, 60),
    views: ['back'],
  },

  // ===== BASSIN =====
  {
    zone: 'pelvis',
    path: ellipse(cx, 480, 50, 45),
    views: ['front'],
  },

  // ===== HANCHES =====
  {
    zone: 'left-hip',
    path: ellipse(cx - 52, 530, 20, 35),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: ellipse(cx + 52, 530, 20, 35),
    views: ['front', 'back'],
  },

  // ===== CUISSES =====
  {
    zone: 'left-thigh',
    path: ellipse(cx - 38, 650, 24, 85),
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: ellipse(cx + 38, 650, 24, 85),
    views: ['front', 'back'],
  },

  // ===== GENOUX =====
  {
    zone: 'left-knee',
    path: ellipse(cx - 32, 790, 18, 35),
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: ellipse(cx + 32, 790, 18, 35),
    views: ['front', 'back'],
  },

  // ===== MOLLETS =====
  {
    zone: 'left-leg',
    path: ellipse(cx - 28, 900, 16, 70),
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: ellipse(cx + 28, 900, 16, 70),
    views: ['front', 'back'],
  },

  // ===== PIEDS =====
  {
    zone: 'left-foot',
    path: ellipse(cx - 26, 1030, 18, 35),
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: ellipse(cx + 26, 1030, 18, 35),
    views: ['front', 'back'],
  },
];

// Helper pour obtenir les zones par vue
export const getZonesForView = (view: 'front' | 'back'): ZonePathData[] => {
  return bodyZonePaths.filter(zone => zone.views.includes(view));
};

// Helper pour obtenir le centre d'une ellipse
export const getPathCenter = (path: string): { x: number; y: number } => {
  // Pour les ellipses, le premier M contient le point de départ (cx - rx, cy)
  // On peut extraire cx et cy depuis le path
  const match = path.match(/M(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (match) {
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    // Le premier arc nous donne rx
    const arcMatch = path.match(/A(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (arcMatch) {
      const rx = parseFloat(arcMatch[1]);
      return { x: startX + rx, y: startY };
    }
  }
  return { x: 304, y: 540 };
};
