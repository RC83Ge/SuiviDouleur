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
// Calibrées pour image 608x1080
export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE - Centrée en haut =====
  {
    zone: 'head',
    path: ellipse(cx, 65, 38, 48),
    views: ['front', 'back'],
  },

  // ===== COU - Juste sous la tête =====
  {
    zone: 'neck',
    path: ellipse(cx, 138, 16, 20),
    views: ['front', 'back'],
  },

  // ===== ÉPAULES - Collées au torse =====
  {
    zone: 'left-shoulder',
    path: ellipse(cx - 48, 175, 22, 22),
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: ellipse(cx + 48, 175, 22, 22),
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE =====
  {
    zone: 'chest',
    path: ellipse(cx, 230, 42, 50),
    views: ['front'],
  },

  // ===== HAUT DU DOS =====
  {
    zone: 'upper-back',
    path: ellipse(cx, 245, 42, 60),
    views: ['back'],
  },

  // ===== BRAS SUPÉRIEURS - Proches du corps =====
  {
    zone: 'left-arm',
    path: ellipse(cx - 54, 270, 11, 48),
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: ellipse(cx + 54, 270, 11, 48),
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS - Dans le prolongement =====
  {
    zone: 'left-forearm',
    path: ellipse(cx - 56, 395, 9, 48),
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: ellipse(cx + 56, 395, 9, 48),
    views: ['front', 'back'],
  },

  // ===== MAINS - Au bout des avant-bras =====
  {
    zone: 'left-hand',
    path: ellipse(cx - 58, 495, 9, 28),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: ellipse(cx + 58, 495, 9, 28),
    views: ['front', 'back'],
  },

  // ===== ABDOMEN =====
  {
    zone: 'abdomen',
    path: ellipse(cx, 345, 38, 50),
    views: ['front'],
  },

  // ===== BAS DU DOS =====
  {
    zone: 'lower-back',
    path: ellipse(cx, 380, 38, 55),
    views: ['back'],
  },

  // ===== BASSIN =====
  {
    zone: 'pelvis',
    path: ellipse(cx, 460, 42, 40),
    views: ['front'],
  },

  // ===== HANCHES - Plus proches du centre =====
  {
    zone: 'left-hip',
    path: ellipse(cx - 42, 510, 18, 30),
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: ellipse(cx + 42, 510, 18, 30),
    views: ['front', 'back'],
  },

  // ===== CUISSES =====
  {
    zone: 'left-thigh',
    path: ellipse(cx - 34, 630, 22, 80),
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: ellipse(cx + 34, 630, 22, 80),
    views: ['front', 'back'],
  },

  // ===== GENOUX =====
  {
    zone: 'left-knee',
    path: ellipse(cx - 30, 770, 16, 32),
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: ellipse(cx + 30, 770, 16, 32),
    views: ['front', 'back'],
  },

  // ===== MOLLETS =====
  {
    zone: 'left-leg',
    path: ellipse(cx - 26, 880, 14, 65),
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: ellipse(cx + 26, 880, 14, 65),
    views: ['front', 'back'],
  },

  // ===== PIEDS =====
  {
    zone: 'left-foot',
    path: ellipse(cx - 24, 1010, 16, 32),
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: ellipse(cx + 24, 1010, 16, 32),
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
