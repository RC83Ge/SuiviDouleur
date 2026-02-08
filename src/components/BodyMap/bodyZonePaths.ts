import { BodyZone } from '@/types/pain';

// Coordonnées des polygones anatomiques pour une image 608x1080
// Recalibrés pour épouser précisément les contours du modèle anatomique
// Centre X = 304, Hauteur totale = 1080

export interface ZonePathData {
  zone: BodyZone;
  path: string;
  views: ('front' | 'back')[];
}

const cx = 304; // Centre horizontal

export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE (y: 15-120) =====
  {
    zone: 'head',
    path: `M${cx - 40} 25 
           C${cx - 46} 40 ${cx - 48} 60 ${cx - 44} 85
           C${cx - 38} 102 ${cx - 22} 112 ${cx} 115
           C${cx + 22} 112 ${cx + 38} 102 ${cx + 44} 85
           C${cx + 48} 60 ${cx + 46} 40 ${cx + 40} 25
           C${cx + 28} 12 ${cx + 14} 8 ${cx} 8
           C${cx - 14} 8 ${cx - 28} 12 ${cx - 40} 25 Z`,
    views: ['front', 'back'],
  },

  // ===== COU (y: 115-155) =====
  {
    zone: 'neck',
    path: `M${cx - 20} 115 
           C${cx - 24} 125 ${cx - 24} 140 ${cx - 22} 155
           L${cx + 22} 155 
           C${cx + 24} 140 ${cx + 24} 125 ${cx + 20} 115
           C${cx + 12} 117 ${cx} 118 ${cx} 118
           C${cx} 118 ${cx - 12} 117 ${cx - 20} 115 Z`,
    views: ['front', 'back'],
  },

  // ===== ÉPAULES (y: 155-220) =====
  {
    zone: 'left-shoulder',
    path: `M${cx - 22} 155 
           C${cx - 42} 152 ${cx - 65} 158 ${cx - 82} 168
           C${cx - 96} 178 ${cx - 105} 190 ${cx - 108} 205
           C${cx - 102} 215 ${cx - 92} 220 ${cx - 82} 222
           C${cx - 70} 212 ${cx - 56} 202 ${cx - 45} 198
           C${cx - 36} 194 ${cx - 28} 190 ${cx - 26} 185
           L${cx - 26} 168 
           C${cx - 24} 162 ${cx - 22} 158 ${cx - 22} 155 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: `M${cx + 22} 155 
           C${cx + 42} 152 ${cx + 65} 158 ${cx + 82} 168
           C${cx + 96} 178 ${cx + 105} 190 ${cx + 108} 205
           C${cx + 102} 215 ${cx + 92} 220 ${cx + 82} 222
           C${cx + 70} 212 ${cx + 56} 202 ${cx + 45} 198
           C${cx + 36} 194 ${cx + 28} 190 ${cx + 26} 185
           L${cx + 26} 168 
           C${cx + 24} 162 ${cx + 22} 158 ${cx + 22} 155 Z`,
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE - FACE (y: 185-290) =====
  {
    zone: 'chest',
    path: `M${cx - 55} 185 
           C${cx - 60} 210 ${cx - 62} 240 ${cx - 60} 265
           C${cx - 57} 280 ${cx - 50} 288 ${cx - 42} 292
           C${cx - 24} 296 ${cx} 298 ${cx} 298
           C${cx} 298 ${cx + 24} 296 ${cx + 42} 292
           C${cx + 50} 288 ${cx + 57} 280 ${cx + 60} 265
           C${cx + 62} 240 ${cx + 60} 210 ${cx + 55} 185
           C${cx + 42} 190 ${cx + 26} 185 ${cx + 26} 185
           L${cx + 26} 190 
           C${cx + 14} 195 ${cx} 198 ${cx} 198
           C${cx} 198 ${cx - 14} 195 ${cx - 26} 190
           L${cx - 26} 185 
           C${cx - 26} 185 ${cx - 42} 190 ${cx - 55} 185 Z`,
    views: ['front'],
  },

  // ===== HAUT DU DOS - DOS (y: 185-320) =====
  {
    zone: 'upper-back',
    path: `M${cx - 55} 185 
           C${cx - 60} 215 ${cx - 62} 255 ${cx - 60} 290
           C${cx - 57} 310 ${cx - 50} 318 ${cx - 42} 322
           C${cx - 24} 326 ${cx} 328 ${cx} 328
           C${cx} 328 ${cx + 24} 326 ${cx + 42} 322
           C${cx + 50} 318 ${cx + 57} 310 ${cx + 60} 290
           C${cx + 62} 255 ${cx + 60} 215 ${cx + 55} 185
           C${cx + 42} 190 ${cx + 26} 185 ${cx + 26} 185
           L${cx + 26} 190 
           C${cx + 14} 195 ${cx} 198 ${cx} 198
           C${cx} 198 ${cx - 14} 195 ${cx - 26} 190
           L${cx - 26} 185 
           C${cx - 26} 185 ${cx - 42} 190 ${cx - 55} 185 Z`,
    views: ['back'],
  },

  // ===== BRAS SUPÉRIEUR (y: 222-350) =====
  {
    zone: 'left-arm',
    path: `M${cx - 82} 222 
           C${cx - 88} 235 ${cx - 96} 265 ${cx - 102} 295
           C${cx - 107} 320 ${cx - 110} 345 ${cx - 112} 360
           C${cx - 106} 368 ${cx - 98} 365 ${cx - 94} 355
           C${cx - 89} 335 ${cx - 84} 305 ${cx - 80} 280
           C${cx - 76} 255 ${cx - 74} 235 ${cx - 75} 222
           C${cx - 77} 220 ${cx - 80} 221 ${cx - 82} 222 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: `M${cx + 82} 222 
           C${cx + 88} 235 ${cx + 96} 265 ${cx + 102} 295
           C${cx + 107} 320 ${cx + 110} 345 ${cx + 112} 360
           C${cx + 106} 368 ${cx + 98} 365 ${cx + 94} 355
           C${cx + 89} 335 ${cx + 84} 305 ${cx + 80} 280
           C${cx + 76} 255 ${cx + 74} 235 ${cx + 75} 222
           C${cx + 77} 220 ${cx + 80} 221 ${cx + 82} 222 Z`,
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS (y: 360-480) =====
  {
    zone: 'left-forearm',
    path: `M${cx - 112} 360 
           C${cx - 116} 385 ${cx - 122} 415 ${cx - 128} 445
           C${cx - 132} 465 ${cx - 134} 480 ${cx - 132} 492
           C${cx - 126} 498 ${cx - 118} 495 ${cx - 114} 485
           C${cx - 109} 465 ${cx - 104} 435 ${cx - 100} 410
           C${cx - 96} 385 ${cx - 94} 365 ${cx - 94} 358
           C${cx - 99} 357 ${cx - 106} 358 ${cx - 112} 360 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: `M${cx + 112} 360 
           C${cx + 116} 385 ${cx + 122} 415 ${cx + 128} 445
           C${cx + 132} 465 ${cx + 134} 480 ${cx + 132} 492
           C${cx + 126} 498 ${cx + 118} 495 ${cx + 114} 485
           C${cx + 109} 465 ${cx + 104} 435 ${cx + 100} 410
           C${cx + 96} 385 ${cx + 94} 365 ${cx + 94} 358
           C${cx + 99} 357 ${cx + 106} 358 ${cx + 112} 360 Z`,
    views: ['front', 'back'],
  },

  // ===== MAINS (y: 492-570) =====
  {
    zone: 'left-hand',
    path: `M${cx - 132} 492 
           C${cx - 136} 515 ${cx - 140} 542 ${cx - 138} 565
           C${cx - 135} 580 ${cx - 128} 590 ${cx - 118} 588
           C${cx - 110} 584 ${cx - 106} 572 ${cx - 108} 552
           C${cx - 110} 530 ${cx - 114} 508 ${cx - 116} 488
           C${cx - 122} 490 ${cx - 128} 490 ${cx - 132} 492 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: `M${cx + 132} 492 
           C${cx + 136} 515 ${cx + 140} 542 ${cx + 138} 565
           C${cx + 135} 580 ${cx + 128} 590 ${cx + 118} 588
           C${cx + 110} 584 ${cx + 106} 572 ${cx + 108} 552
           C${cx + 110} 530 ${cx + 114} 508 ${cx + 116} 488
           C${cx + 122} 490 ${cx + 128} 490 ${cx + 132} 492 Z`,
    views: ['front', 'back'],
  },

  // ===== ABDOMEN - FACE (y: 298-420) =====
  {
    zone: 'abdomen',
    path: `M${cx - 46} 298 
           C${cx - 50} 328 ${cx - 52} 365 ${cx - 50} 395
           C${cx - 47} 412 ${cx - 42} 420 ${cx - 34} 425
           C${cx - 18} 430 ${cx} 432 ${cx} 432
           C${cx} 432 ${cx + 18} 430 ${cx + 34} 425
           C${cx + 42} 420 ${cx + 47} 412 ${cx + 50} 395
           C${cx + 52} 365 ${cx + 50} 328 ${cx + 46} 298
           C${cx + 28} 296 ${cx} 298 ${cx} 298
           C${cx} 298 ${cx - 28} 296 ${cx - 46} 298 Z`,
    views: ['front'],
  },

  // ===== BAS DU DOS - DOS (y: 328-460) =====
  {
    zone: 'lower-back',
    path: `M${cx - 46} 328 
           C${cx - 50} 360 ${cx - 52} 400 ${cx - 50} 435
           C${cx - 47} 452 ${cx - 42} 460 ${cx - 34} 465
           C${cx - 18} 470 ${cx} 472 ${cx} 472
           C${cx} 472 ${cx + 18} 470 ${cx + 34} 465
           C${cx + 42} 460 ${cx + 47} 452 ${cx + 50} 435
           C${cx + 52} 400 ${cx + 50} 360 ${cx + 46} 328
           C${cx + 28} 326 ${cx} 328 ${cx} 328
           C${cx} 328 ${cx - 28} 326 ${cx - 46} 328 Z`,
    views: ['back'],
  },

  // ===== BASSIN - FACE (y: 432-520) =====
  {
    zone: 'pelvis',
    path: `M${cx - 50} 432 
           C${cx - 58} 452 ${cx - 68} 478 ${cx - 70} 500
           C${cx - 68} 515 ${cx - 60} 525 ${cx - 48} 530
           C${cx - 28} 536 ${cx} 538 ${cx} 538
           C${cx} 538 ${cx + 28} 536 ${cx + 48} 530
           C${cx + 60} 525 ${cx + 68} 515 ${cx + 70} 500
           C${cx + 68} 478 ${cx + 58} 452 ${cx + 50} 432
           C${cx + 32} 430 ${cx} 432 ${cx} 432
           C${cx} 432 ${cx - 32} 430 ${cx - 50} 432 Z`,
    views: ['front'],
  },

  // ===== HANCHES (y: 500-575) =====
  {
    zone: 'left-hip',
    path: `M${cx - 70} 500 
           C${cx - 78} 518 ${cx - 84} 540 ${cx - 82} 560
           C${cx - 78} 575 ${cx - 70} 582 ${cx - 60} 584
           C${cx - 52} 578 ${cx - 48} 565 ${cx - 50} 548
           C${cx - 52} 528 ${cx - 58} 510 ${cx - 62} 498
           C${cx - 65} 498 ${cx - 68} 499 ${cx - 70} 500 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: `M${cx + 70} 500 
           C${cx + 78} 518 ${cx + 84} 540 ${cx + 82} 560
           C${cx + 78} 575 ${cx + 70} 582 ${cx + 60} 584
           C${cx + 52} 578 ${cx + 48} 565 ${cx + 50} 548
           C${cx + 52} 528 ${cx + 58} 510 ${cx + 62} 498
           C${cx + 65} 498 ${cx + 68} 499 ${cx + 70} 500 Z`,
    views: ['front', 'back'],
  },

  // ===== CUISSES (y: 584-740) =====
  {
    zone: 'left-thigh',
    path: `M${cx - 60} 584 
           C${cx - 66} 620 ${cx - 68} 665 ${cx - 64} 705
           C${cx - 60} 730 ${cx - 54} 748 ${cx - 46} 758
           C${cx - 38} 762 ${cx - 32} 760 ${cx - 28} 754
           C${cx - 24} 730 ${cx - 22} 695 ${cx - 24} 658
           C${cx - 26} 620 ${cx - 32} 590 ${cx - 40} 580
           C${cx - 46} 580 ${cx - 54} 582 ${cx - 60} 584 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: `M${cx + 60} 584 
           C${cx + 66} 620 ${cx + 68} 665 ${cx + 64} 705
           C${cx + 60} 730 ${cx + 54} 748 ${cx + 46} 758
           C${cx + 38} 762 ${cx + 32} 760 ${cx + 28} 754
           C${cx + 24} 730 ${cx + 22} 695 ${cx + 24} 658
           C${cx + 26} 620 ${cx + 32} 590 ${cx + 40} 580
           C${cx + 46} 580 ${cx + 54} 582 ${cx + 60} 584 Z`,
    views: ['front', 'back'],
  },

  // ===== GENOUX (y: 758-830) =====
  {
    zone: 'left-knee',
    path: `M${cx - 46} 758 
           C${cx - 50} 780 ${cx - 50} 805 ${cx - 46} 825
           C${cx - 42} 840 ${cx - 36} 848 ${cx - 30} 852
           C${cx - 24} 850 ${cx - 22} 842 ${cx - 22} 828
           C${cx - 22} 805 ${cx - 24} 778 ${cx - 26} 760
           C${cx - 32} 756 ${cx - 40} 756 ${cx - 46} 758 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: `M${cx + 46} 758 
           C${cx + 50} 780 ${cx + 50} 805 ${cx + 46} 825
           C${cx + 42} 840 ${cx + 36} 848 ${cx + 30} 852
           C${cx + 24} 850 ${cx + 22} 842 ${cx + 22} 828
           C${cx + 22} 805 ${cx + 24} 778 ${cx + 26} 760
           C${cx + 32} 756 ${cx + 40} 756 ${cx + 46} 758 Z`,
    views: ['front', 'back'],
  },

  // ===== JAMBES/MOLLETS (y: 852-970) =====
  {
    zone: 'left-leg',
    path: `M${cx - 30} 852 
           C${cx - 34} 885 ${cx - 36} 925 ${cx - 34} 960
           C${cx - 32} 985 ${cx - 28} 1005 ${cx - 25} 1020
           C${cx - 20} 1026 ${cx - 16} 1024 ${cx - 15} 1016
           C${cx - 14} 995 ${cx - 14} 960 ${cx - 16} 920
           C${cx - 18} 885 ${cx - 20} 858 ${cx - 22} 850
           C${cx - 25} 850 ${cx - 28} 851 ${cx - 30} 852 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: `M${cx + 30} 852 
           C${cx + 34} 885 ${cx + 36} 925 ${cx + 34} 960
           C${cx + 32} 985 ${cx + 28} 1005 ${cx + 25} 1020
           C${cx + 20} 1026 ${cx + 16} 1024 ${cx + 15} 1016
           C${cx + 14} 995 ${cx + 14} 960 ${cx + 16} 920
           C${cx + 18} 885 ${cx + 20} 858 ${cx + 22} 850
           C${cx + 25} 850 ${cx + 28} 851 ${cx + 30} 852 Z`,
    views: ['front', 'back'],
  },

  // ===== PIEDS (y: 1020-1075) =====
  {
    zone: 'left-foot',
    path: `M${cx - 25} 1020 
           C${cx - 28} 1038 ${cx - 34} 1055 ${cx - 38} 1068
           C${cx - 40} 1078 ${cx - 36} 1085 ${cx - 28} 1088
           C${cx - 20} 1090 ${cx - 14} 1086 ${cx - 12} 1078
           C${cx - 10} 1065 ${cx - 12} 1045 ${cx - 15} 1025
           C${cx - 18} 1022 ${cx - 22} 1020 ${cx - 25} 1020 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: `M${cx + 25} 1020 
           C${cx + 28} 1038 ${cx + 34} 1055 ${cx + 38} 1068
           C${cx + 40} 1078 ${cx + 36} 1085 ${cx + 28} 1088
           C${cx + 20} 1090 ${cx + 14} 1086 ${cx + 12} 1078
           C${cx + 10} 1065 ${cx + 12} 1045 ${cx + 15} 1025
           C${cx + 18} 1022 ${cx + 22} 1020 ${cx + 25} 1020 Z`,
    views: ['front', 'back'],
  },
];

// Helper pour obtenir les zones par vue
export const getZonesForView = (view: 'front' | 'back'): ZonePathData[] => {
  return bodyZonePaths.filter(zone => zone.views.includes(view));
};

// Helper pour obtenir le centre d'un path (pour le tooltip)
export const getPathCenter = (path: string): { x: number; y: number } => {
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
