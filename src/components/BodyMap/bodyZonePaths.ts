import { BodyZone } from '@/types/pain';

// Coordonnées des polygones anatomiques pour une image 608x1080
// Chaque zone est définie par un chemin SVG path qui épouse la forme réelle du corps
// Centre X = 304

export interface ZonePathData {
  zone: BodyZone;
  path: string;
  views: ('front' | 'back')[];
}

// Dimensions de l'image : 608x1080
const cx = 304;

export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE =====
  {
    zone: 'head',
    path: `M${cx - 50} 20 
           Q${cx - 55} 40 ${cx - 52} 65 
           Q${cx - 48} 95 ${cx - 35} 110 
           Q${cx - 20} 120 ${cx} 122 
           Q${cx + 20} 120 ${cx + 35} 110 
           Q${cx + 48} 95 ${cx + 52} 65 
           Q${cx + 55} 40 ${cx + 50} 20 
           Q${cx + 30} 5 ${cx} 5 
           Q${cx - 30} 5 ${cx - 50} 20 Z`,
    views: ['front', 'back'],
  },

  // ===== COU =====
  {
    zone: 'neck',
    path: `M${cx - 25} 122 
           Q${cx - 30} 135 ${cx - 28} 150 
           L${cx + 28} 150 
           Q${cx + 30} 135 ${cx + 25} 122 
           Q${cx + 15} 125 ${cx} 125 
           Q${cx - 15} 125 ${cx - 25} 122 Z`,
    views: ['front', 'back'],
  },

  // ===== ÉPAULES =====
  {
    zone: 'left-shoulder',
    path: `M${cx - 28} 150 
           Q${cx - 50} 148 ${cx - 75} 155 
           Q${cx - 100} 165 ${cx - 115} 180 
           Q${cx - 108} 200 ${cx - 95} 210 
           Q${cx - 75} 195 ${cx - 55} 190 
           Q${cx - 40} 188 ${cx - 30} 195 
           L${cx - 30} 175 
           Q${cx - 28} 160 ${cx - 28} 150 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: `M${cx + 28} 150 
           Q${cx + 50} 148 ${cx + 75} 155 
           Q${cx + 100} 165 ${cx + 115} 180 
           Q${cx + 108} 200 ${cx + 95} 210 
           Q${cx + 75} 195 ${cx + 55} 190 
           Q${cx + 40} 188 ${cx + 30} 195 
           L${cx + 30} 175 
           Q${cx + 28} 160 ${cx + 28} 150 Z`,
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE (FACE) =====
  {
    zone: 'chest',
    path: `M${cx - 65} 195 
           Q${cx - 70} 220 ${cx - 68} 250 
           Q${cx - 65} 275 ${cx - 55} 290 
           Q${cx - 35} 295 ${cx} 298 
           Q${cx + 35} 295 ${cx + 55} 290 
           Q${cx + 65} 275 ${cx + 68} 250 
           Q${cx + 70} 220 ${cx + 65} 195 
           Q${cx + 45} 188 ${cx + 30} 190 
           L${cx + 30} 195 
           Q${cx + 15} 200 ${cx} 200 
           Q${cx - 15} 200 ${cx - 30} 195 
           L${cx - 30} 190 
           Q${cx - 45} 188 ${cx - 65} 195 Z`,
    views: ['front'],
  },

  // ===== HAUT DU DOS (DOS) =====
  {
    zone: 'upper-back',
    path: `M${cx - 65} 195 
           Q${cx - 70} 220 ${cx - 68} 250 
           Q${cx - 65} 290 ${cx - 55} 310 
           Q${cx - 35} 320 ${cx} 322 
           Q${cx + 35} 320 ${cx + 55} 310 
           Q${cx + 65} 290 ${cx + 68} 250 
           Q${cx + 70} 220 ${cx + 65} 195 
           Q${cx + 45} 188 ${cx + 30} 190 
           L${cx + 30} 195 
           Q${cx + 15} 200 ${cx} 200 
           Q${cx - 15} 200 ${cx - 30} 195 
           L${cx - 30} 190 
           Q${cx - 45} 188 ${cx - 65} 195 Z`,
    views: ['back'],
  },

  // ===== BRAS (partie supérieure) =====
  {
    zone: 'left-arm',
    path: `M${cx - 95} 210 
           Q${cx - 105} 220 ${cx - 115} 245 
           Q${cx - 125} 280 ${cx - 130} 315 
           Q${cx - 132} 330 ${cx - 128} 340 
           Q${cx - 115} 345 ${cx - 105} 335 
           Q${cx - 100} 310 ${cx - 95} 280 
           Q${cx - 88} 250 ${cx - 82} 225 
           Q${cx - 85} 215 ${cx - 95} 210 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: `M${cx + 95} 210 
           Q${cx + 105} 220 ${cx + 115} 245 
           Q${cx + 125} 280 ${cx + 130} 315 
           Q${cx + 132} 330 ${cx + 128} 340 
           Q${cx + 115} 345 ${cx + 105} 335 
           Q${cx + 100} 310 ${cx + 95} 280 
           Q${cx + 88} 250 ${cx + 82} 225 
           Q${cx + 85} 215 ${cx + 95} 210 Z`,
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS =====
  {
    zone: 'left-forearm',
    path: `M${cx - 128} 340 
           Q${cx - 135} 365 ${cx - 142} 395 
           Q${cx - 148} 425 ${cx - 150} 450 
           Q${cx - 145} 460 ${cx - 135} 455 
           Q${cx - 125} 430 ${cx - 118} 400 
           Q${cx - 110} 370 ${cx - 105} 340 
           Q${cx - 115} 338 ${cx - 128} 340 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: `M${cx + 128} 340 
           Q${cx + 135} 365 ${cx + 142} 395 
           Q${cx + 148} 425 ${cx + 150} 450 
           Q${cx + 145} 460 ${cx + 135} 455 
           Q${cx + 125} 430 ${cx + 118} 400 
           Q${cx + 110} 370 ${cx + 105} 340 
           Q${cx + 115} 338 ${cx + 128} 340 Z`,
    views: ['front', 'back'],
  },

  // ===== MAINS =====
  {
    zone: 'left-hand',
    path: `M${cx - 150} 450 
           Q${cx - 155} 470 ${cx - 158} 495 
           Q${cx - 160} 515 ${cx - 155} 530 
           Q${cx - 145} 535 ${cx - 135} 525 
           Q${cx - 130} 510 ${cx - 125} 490 
           Q${cx - 122} 470 ${cx - 125} 455 
           Q${cx - 135} 448 ${cx - 150} 450 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: `M${cx + 150} 450 
           Q${cx + 155} 470 ${cx + 158} 495 
           Q${cx + 160} 515 ${cx + 155} 530 
           Q${cx + 145} 535 ${cx + 135} 525 
           Q${cx + 130} 510 ${cx + 125} 490 
           Q${cx + 122} 470 ${cx + 125} 455 
           Q${cx + 135} 448 ${cx + 150} 450 Z`,
    views: ['front', 'back'],
  },

  // ===== ABDOMEN (FACE) =====
  {
    zone: 'abdomen',
    path: `M${cx - 55} 298 
           Q${cx - 60} 330 ${cx - 62} 365 
           Q${cx - 60} 395 ${cx - 55} 410 
           Q${cx - 35} 415 ${cx} 418 
           Q${cx + 35} 415 ${cx + 55} 410 
           Q${cx + 60} 395 ${cx + 62} 365 
           Q${cx + 60} 330 ${cx + 55} 298 
           Q${cx + 35} 295 ${cx} 298 
           Q${cx - 35} 295 ${cx - 55} 298 Z`,
    views: ['front'],
  },

  // ===== BAS DU DOS (DOS) =====
  {
    zone: 'lower-back',
    path: `M${cx - 55} 322 
           Q${cx - 60} 355 ${cx - 62} 390 
           Q${cx - 60} 425 ${cx - 55} 445 
           Q${cx - 35} 450 ${cx} 452 
           Q${cx + 35} 450 ${cx + 55} 445 
           Q${cx + 60} 425 ${cx + 62} 390 
           Q${cx + 60} 355 ${cx + 55} 322 
           Q${cx + 35} 318 ${cx} 320 
           Q${cx - 35} 318 ${cx - 55} 322 Z`,
    views: ['back'],
  },

  // ===== BASSIN / PELVIS (FACE) =====
  {
    zone: 'pelvis',
    path: `M${cx - 55} 418 
           Q${cx - 65} 440 ${cx - 75} 465 
           Q${cx - 70} 485 ${cx - 55} 495 
           Q${cx - 30} 500 ${cx} 502 
           Q${cx + 30} 500 ${cx + 55} 495 
           Q${cx + 70} 485 ${cx + 75} 465 
           Q${cx + 65} 440 ${cx + 55} 418 
           Q${cx + 35} 415 ${cx} 418 
           Q${cx - 35} 415 ${cx - 55} 418 Z`,
    views: ['front'],
  },

  // ===== HANCHES =====
  {
    zone: 'left-hip',
    path: `M${cx - 75} 465 
           Q${cx - 85} 480 ${cx - 90} 500 
           Q${cx - 88} 520 ${cx - 80} 535 
           Q${cx - 65} 525 ${cx - 55} 510 
           Q${cx - 50} 495 ${cx - 55} 480 
           Q${cx - 62} 470 ${cx - 75} 465 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: `M${cx + 75} 465 
           Q${cx + 85} 480 ${cx + 90} 500 
           Q${cx + 88} 520 ${cx + 80} 535 
           Q${cx + 65} 525 ${cx + 55} 510 
           Q${cx + 50} 495 ${cx + 55} 480 
           Q${cx + 62} 470 ${cx + 75} 465 Z`,
    views: ['front', 'back'],
  },

  // ===== CUISSES =====
  {
    zone: 'left-thigh',
    path: `M${cx - 80} 535 
           Q${cx - 85} 565 ${cx - 82} 600 
           Q${cx - 78} 635 ${cx - 72} 665 
           Q${cx - 65} 680 ${cx - 55} 685 
           Q${cx - 45} 680 ${cx - 38} 665 
           Q${cx - 32} 635 ${cx - 30} 600 
           Q${cx - 32} 565 ${cx - 38} 535 
           Q${cx - 50} 520 ${cx - 65} 525 
           Q${cx - 78} 528 ${cx - 80} 535 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: `M${cx + 80} 535 
           Q${cx + 85} 565 ${cx + 82} 600 
           Q${cx + 78} 635 ${cx + 72} 665 
           Q${cx + 65} 680 ${cx + 55} 685 
           Q${cx + 45} 680 ${cx + 38} 665 
           Q${cx + 32} 635 ${cx + 30} 600 
           Q${cx + 32} 565 ${cx + 38} 535 
           Q${cx + 50} 520 ${cx + 65} 525 
           Q${cx + 78} 528 ${cx + 80} 535 Z`,
    views: ['front', 'back'],
  },

  // ===== GENOUX =====
  {
    zone: 'left-knee',
    path: `M${cx - 72} 665 
           Q${cx - 75} 690 ${cx - 72} 715 
           Q${cx - 68} 735 ${cx - 58} 745 
           Q${cx - 48} 750 ${cx - 38} 745 
           Q${cx - 30} 735 ${cx - 28} 715 
           Q${cx - 30} 690 ${cx - 35} 665 
           Q${cx - 45} 660 ${cx - 55} 665 
           Q${cx - 68} 662 ${cx - 72} 665 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: `M${cx + 72} 665 
           Q${cx + 75} 690 ${cx + 72} 715 
           Q${cx + 68} 735 ${cx + 58} 745 
           Q${cx + 48} 750 ${cx + 38} 745 
           Q${cx + 30} 735 ${cx + 28} 715 
           Q${cx + 30} 690 ${cx + 35} 665 
           Q${cx + 45} 660 ${cx + 55} 665 
           Q${cx + 68} 662 ${cx + 72} 665 Z`,
    views: ['front', 'back'],
  },

  // ===== JAMBES (mollets/tibias) =====
  {
    zone: 'left-leg',
    path: `M${cx - 58} 745 
           Q${cx - 62} 780 ${cx - 60} 820 
           Q${cx - 58} 860 ${cx - 52} 895 
           Q${cx - 48} 910 ${cx - 42} 915 
           Q${cx - 35} 912 ${cx - 32} 895 
           Q${cx - 28} 860 ${cx - 28} 820 
           Q${cx - 30} 780 ${cx - 35} 745 
           Q${cx - 45} 742 ${cx - 58} 745 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: `M${cx + 58} 745 
           Q${cx + 62} 780 ${cx + 60} 820 
           Q${cx + 58} 860 ${cx + 52} 895 
           Q${cx + 48} 910 ${cx + 42} 915 
           Q${cx + 35} 912 ${cx + 32} 895 
           Q${cx + 28} 860 ${cx + 28} 820 
           Q${cx + 30} 780 ${cx + 35} 745 
           Q${cx + 45} 742 ${cx + 58} 745 Z`,
    views: ['front', 'back'],
  },

  // ===== PIEDS =====
  {
    zone: 'left-foot',
    path: `M${cx - 52} 915 
           Q${cx - 58} 940 ${cx - 62} 970 
           Q${cx - 65} 1000 ${cx - 60} 1020 
           Q${cx - 50} 1035 ${cx - 35} 1040 
           Q${cx - 22} 1038 ${cx - 18} 1025 
           Q${cx - 20} 1000 ${cx - 25} 970 
           Q${cx - 28} 940 ${cx - 32} 915 
           Q${cx - 42} 912 ${cx - 52} 915 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: `M${cx + 52} 915 
           Q${cx + 58} 940 ${cx + 62} 970 
           Q${cx + 65} 1000 ${cx + 60} 1020 
           Q${cx + 50} 1035 ${cx + 35} 1040 
           Q${cx + 22} 1038 ${cx + 18} 1025 
           Q${cx + 20} 1000 ${cx + 25} 970 
           Q${cx + 28} 940 ${cx + 32} 915 
           Q${cx + 42} 912 ${cx + 52} 915 Z`,
    views: ['front', 'back'],
  },
];

// Helper pour obtenir les zones par vue
export const getZonesForView = (view: 'front' | 'back'): ZonePathData[] => {
  return bodyZonePaths.filter(zone => zone.views.includes(view));
};

// Helper pour obtenir le centre d'un path (approximatif pour le tooltip)
export const getPathCenter = (path: string): { x: number; y: number } => {
  // Extraire les coordonnées du path et calculer le centre approximatif
  const numbers = path.match(/-?\d+\.?\d*/g)?.map(Number) || [];
  if (numbers.length < 4) return { x: 304, y: 540 };
  
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < numbers.length - 1; i += 2) {
    if (!isNaN(numbers[i]) && !isNaN(numbers[i + 1])) {
      sumX += numbers[i];
      sumY += numbers[i + 1];
      count++;
    }
  }
  
  return {
    x: count > 0 ? sumX / count : 304,
    y: count > 0 ? sumY / count : 540,
  };
};
