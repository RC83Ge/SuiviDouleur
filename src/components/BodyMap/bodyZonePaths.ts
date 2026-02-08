import { BodyZone } from '@/types/pain';

// Coordonnées des polygones anatomiques pour une image 608x1080
// Recalibrés pour épouser précisément les contours du modèle anatomique
// Centre X = 304, Hauteur totale = 1080
// Les bras sont le long du corps (pas écartés)

export interface ZonePathData {
  zone: BodyZone;
  path: string;
  views: ('front' | 'back')[];
}

const cx = 304; // Centre horizontal

export const bodyZonePaths: ZonePathData[] = [
  // ===== TÊTE (y: 15-115) =====
  {
    zone: 'head',
    path: `M${cx - 38} 28 
           C${cx - 44} 42 ${cx - 46} 62 ${cx - 42} 85
           C${cx - 36} 100 ${cx - 20} 110 ${cx} 112
           C${cx + 20} 110 ${cx + 36} 100 ${cx + 42} 85
           C${cx + 46} 62 ${cx + 44} 42 ${cx + 38} 28
           C${cx + 26} 14 ${cx + 13} 10 ${cx} 10
           C${cx - 13} 10 ${cx - 26} 14 ${cx - 38} 28 Z`,
    views: ['front', 'back'],
  },

  // ===== COU (y: 112-152) =====
  {
    zone: 'neck',
    path: `M${cx - 18} 112 
           C${cx - 22} 122 ${cx - 22} 138 ${cx - 20} 152
           L${cx + 20} 152 
           C${cx + 22} 138 ${cx + 22} 122 ${cx + 18} 112
           C${cx + 10} 114 ${cx} 115 ${cx} 115
           C${cx} 115 ${cx - 10} 114 ${cx - 18} 112 Z`,
    views: ['front', 'back'],
  },

  // ===== ÉPAULES (y: 152-210) - Réduites en largeur =====
  {
    zone: 'left-shoulder',
    path: `M${cx - 20} 152 
           C${cx - 38} 150 ${cx - 55} 155 ${cx - 68} 165
           C${cx - 78} 175 ${cx - 82} 188 ${cx - 82} 200
           C${cx - 78} 208 ${cx - 72} 212 ${cx - 65} 210
           C${cx - 55} 200 ${cx - 45} 190 ${cx - 38} 185
           C${cx - 32} 182 ${cx - 26} 178 ${cx - 24} 172
           L${cx - 24} 160 
           C${cx - 22} 156 ${cx - 20} 154 ${cx - 20} 152 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-shoulder',
    path: `M${cx + 20} 152 
           C${cx + 38} 150 ${cx + 55} 155 ${cx + 68} 165
           C${cx + 78} 175 ${cx + 82} 188 ${cx + 82} 200
           C${cx + 78} 208 ${cx + 72} 212 ${cx + 65} 210
           C${cx + 55} 200 ${cx + 45} 190 ${cx + 38} 185
           C${cx + 32} 182 ${cx + 26} 178 ${cx + 24} 172
           L${cx + 24} 160 
           C${cx + 22} 156 ${cx + 20} 154 ${cx + 20} 152 Z`,
    views: ['front', 'back'],
  },

  // ===== THORAX / POITRINE - FACE (y: 172-290) =====
  {
    zone: 'chest',
    path: `M${cx - 52} 180 
           C${cx - 56} 205 ${cx - 58} 235 ${cx - 56} 260
           C${cx - 53} 278 ${cx - 46} 288 ${cx - 38} 292
           C${cx - 22} 296 ${cx} 298 ${cx} 298
           C${cx} 298 ${cx + 22} 296 ${cx + 38} 292
           C${cx + 46} 288 ${cx + 53} 278 ${cx + 56} 260
           C${cx + 58} 235 ${cx + 56} 205 ${cx + 52} 180
           C${cx + 40} 178 ${cx + 24} 175 ${cx + 24} 175
           L${cx + 24} 180 
           C${cx + 12} 184 ${cx} 186 ${cx} 186
           C${cx} 186 ${cx - 12} 184 ${cx - 24} 180
           L${cx - 24} 175 
           C${cx - 24} 175 ${cx - 40} 178 ${cx - 52} 180 Z`,
    views: ['front'],
  },

  // ===== HAUT DU DOS - DOS (y: 172-320) =====
  {
    zone: 'upper-back',
    path: `M${cx - 52} 180 
           C${cx - 56} 210 ${cx - 58} 250 ${cx - 56} 285
           C${cx - 53} 305 ${cx - 46} 318 ${cx - 38} 322
           C${cx - 22} 326 ${cx} 328 ${cx} 328
           C${cx} 328 ${cx + 22} 326 ${cx + 38} 322
           C${cx + 46} 318 ${cx + 53} 305 ${cx + 56} 285
           C${cx + 58} 250 ${cx + 56} 210 ${cx + 52} 180
           C${cx + 40} 178 ${cx + 24} 175 ${cx + 24} 175
           L${cx + 24} 180 
           C${cx + 12} 184 ${cx} 186 ${cx} 186
           C${cx} 186 ${cx - 12} 184 ${cx - 24} 180
           L${cx - 24} 175 
           C${cx - 24} 175 ${cx - 40} 178 ${cx - 52} 180 Z`,
    views: ['back'],
  },

  // ===== BRAS SUPÉRIEUR (y: 210-340) - Rapprochés du corps =====
  {
    zone: 'left-arm',
    path: `M${cx - 65} 210 
           C${cx - 70} 225 ${cx - 75} 260 ${cx - 78} 295
           C${cx - 80} 320 ${cx - 80} 340 ${cx - 78} 355
           C${cx - 72} 360 ${cx - 66} 358 ${cx - 64} 350
           C${cx - 62} 330 ${cx - 60} 300 ${cx - 58} 270
           C${cx - 56} 245 ${cx - 56} 225 ${cx - 58} 212
           C${cx - 60} 210 ${cx - 63} 210 ${cx - 65} 210 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-arm',
    path: `M${cx + 65} 210 
           C${cx + 70} 225 ${cx + 75} 260 ${cx + 78} 295
           C${cx + 80} 320 ${cx + 80} 340 ${cx + 78} 355
           C${cx + 72} 360 ${cx + 66} 358 ${cx + 64} 350
           C${cx + 62} 330 ${cx + 60} 300 ${cx + 58} 270
           C${cx + 56} 245 ${cx + 56} 225 ${cx + 58} 212
           C${cx + 60} 210 ${cx + 63} 210 ${cx + 65} 210 Z`,
    views: ['front', 'back'],
  },

  // ===== AVANT-BRAS (y: 355-480) - Rapprochés du corps =====
  {
    zone: 'left-forearm',
    path: `M${cx - 78} 355 
           C${cx - 82} 380 ${cx - 85} 415 ${cx - 88} 450
           C${cx - 90} 470 ${cx - 90} 485 ${cx - 88} 495
           C${cx - 82} 500 ${cx - 76} 498 ${cx - 74} 488
           C${cx - 72} 465 ${cx - 70} 430 ${cx - 68} 400
           C${cx - 66} 375 ${cx - 65} 358 ${cx - 65} 352
           C${cx - 70} 352 ${cx - 75} 354 ${cx - 78} 355 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-forearm',
    path: `M${cx + 78} 355 
           C${cx + 82} 380 ${cx + 85} 415 ${cx + 88} 450
           C${cx + 90} 470 ${cx + 90} 485 ${cx + 88} 495
           C${cx + 82} 500 ${cx + 76} 498 ${cx + 74} 488
           C${cx + 72} 465 ${cx + 70} 430 ${cx + 68} 400
           C${cx + 66} 375 ${cx + 65} 358 ${cx + 65} 352
           C${cx + 70} 352 ${cx + 75} 354 ${cx + 78} 355 Z`,
    views: ['front', 'back'],
  },

  // ===== MAINS (y: 495-560) - Repositionnées à côté des cuisses =====
  {
    zone: 'left-hand',
    path: `M${cx - 88} 495 
           C${cx - 92} 515 ${cx - 95} 540 ${cx - 94} 558
           C${cx - 92} 572 ${cx - 86} 580 ${cx - 78} 578
           C${cx - 72} 575 ${cx - 70} 565 ${cx - 71} 548
           C${cx - 72} 528 ${cx - 75} 508 ${cx - 76} 492
           C${cx - 80} 492 ${cx - 85} 494 ${cx - 88} 495 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hand',
    path: `M${cx + 88} 495 
           C${cx + 92} 515 ${cx + 95} 540 ${cx + 94} 558
           C${cx + 92} 572 ${cx + 86} 580 ${cx + 78} 578
           C${cx + 72} 575 ${cx + 70} 565 ${cx + 71} 548
           C${cx + 72} 528 ${cx + 75} 508 ${cx + 76} 492
           C${cx + 80} 492 ${cx + 85} 494 ${cx + 88} 495 Z`,
    views: ['front', 'back'],
  },

  // ===== ABDOMEN - FACE (y: 298-420) =====
  {
    zone: 'abdomen',
    path: `M${cx - 44} 298 
           C${cx - 48} 328 ${cx - 50} 365 ${cx - 48} 395
           C${cx - 45} 412 ${cx - 40} 420 ${cx - 32} 425
           C${cx - 18} 430 ${cx} 432 ${cx} 432
           C${cx} 432 ${cx + 18} 430 ${cx + 32} 425
           C${cx + 40} 420 ${cx + 45} 412 ${cx + 48} 395
           C${cx + 50} 365 ${cx + 48} 328 ${cx + 44} 298
           C${cx + 26} 296 ${cx} 298 ${cx} 298
           C${cx} 298 ${cx - 26} 296 ${cx - 44} 298 Z`,
    views: ['front'],
  },

  // ===== BAS DU DOS - DOS (y: 328-460) =====
  {
    zone: 'lower-back',
    path: `M${cx - 44} 328 
           C${cx - 48} 360 ${cx - 50} 400 ${cx - 48} 435
           C${cx - 45} 452 ${cx - 40} 460 ${cx - 32} 465
           C${cx - 18} 470 ${cx} 472 ${cx} 472
           C${cx} 472 ${cx + 18} 470 ${cx + 32} 465
           C${cx + 40} 460 ${cx + 45} 452 ${cx + 48} 435
           C${cx + 50} 400 ${cx + 48} 360 ${cx + 44} 328
           C${cx + 26} 326 ${cx} 328 ${cx} 328
           C${cx} 328 ${cx - 26} 326 ${cx - 44} 328 Z`,
    views: ['back'],
  },

  // ===== BASSIN - FACE (y: 432-520) =====
  {
    zone: 'pelvis',
    path: `M${cx - 48} 432 
           C${cx - 55} 452 ${cx - 62} 478 ${cx - 64} 500
           C${cx - 62} 515 ${cx - 55} 525 ${cx - 45} 530
           C${cx - 26} 536 ${cx} 538 ${cx} 538
           C${cx} 538 ${cx + 26} 536 ${cx + 45} 530
           C${cx + 55} 525 ${cx + 62} 515 ${cx + 64} 500
           C${cx + 62} 478 ${cx + 55} 452 ${cx + 48} 432
           C${cx + 30} 430 ${cx} 432 ${cx} 432
           C${cx} 432 ${cx - 30} 430 ${cx - 48} 432 Z`,
    views: ['front'],
  },

  // ===== HANCHES (y: 500-575) - Ajustées =====
  {
    zone: 'left-hip',
    path: `M${cx - 64} 500 
           C${cx - 72} 518 ${cx - 78} 540 ${cx - 76} 560
           C${cx - 72} 572 ${cx - 65} 578 ${cx - 56} 576
           C${cx - 50} 570 ${cx - 46} 558 ${cx - 48} 542
           C${cx - 50} 525 ${cx - 55} 508 ${cx - 58} 498
           C${cx - 60} 498 ${cx - 62} 499 ${cx - 64} 500 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-hip',
    path: `M${cx + 64} 500 
           C${cx + 72} 518 ${cx + 78} 540 ${cx + 76} 560
           C${cx + 72} 572 ${cx + 65} 578 ${cx + 56} 576
           C${cx + 50} 570 ${cx + 46} 558 ${cx + 48} 542
           C${cx + 50} 525 ${cx + 55} 508 ${cx + 58} 498
           C${cx + 60} 498 ${cx + 62} 499 ${cx + 64} 500 Z`,
    views: ['front', 'back'],
  },

  // ===== CUISSES (y: 576-740) =====
  {
    zone: 'left-thigh',
    path: `M${cx - 56} 576 
           C${cx - 62} 615 ${cx - 64} 660 ${cx - 60} 700
           C${cx - 56} 725 ${cx - 50} 742 ${cx - 42} 752
           C${cx - 35} 756 ${cx - 30} 754 ${cx - 26} 748
           C${cx - 22} 725 ${cx - 20} 690 ${cx - 22} 655
           C${cx - 24} 618 ${cx - 30} 588 ${cx - 38} 574
           C${cx - 44} 574 ${cx - 52} 575 ${cx - 56} 576 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-thigh',
    path: `M${cx + 56} 576 
           C${cx + 62} 615 ${cx + 64} 660 ${cx + 60} 700
           C${cx + 56} 725 ${cx + 50} 742 ${cx + 42} 752
           C${cx + 35} 756 ${cx + 30} 754 ${cx + 26} 748
           C${cx + 22} 725 ${cx + 20} 690 ${cx + 22} 655
           C${cx + 24} 618 ${cx + 30} 588 ${cx + 38} 574
           C${cx + 44} 574 ${cx + 52} 575 ${cx + 56} 576 Z`,
    views: ['front', 'back'],
  },

  // ===== GENOUX (y: 752-825) =====
  {
    zone: 'left-knee',
    path: `M${cx - 42} 752 
           C${cx - 46} 772 ${cx - 46} 798 ${cx - 42} 818
           C${cx - 38} 832 ${cx - 33} 840 ${cx - 28} 842
           C${cx - 23} 840 ${cx - 20} 832 ${cx - 20} 820
           C${cx - 20} 800 ${cx - 22} 775 ${cx - 24} 755
           C${cx - 30} 752 ${cx - 38} 752 ${cx - 42} 752 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-knee',
    path: `M${cx + 42} 752 
           C${cx + 46} 772 ${cx + 46} 798 ${cx + 42} 818
           C${cx + 38} 832 ${cx + 33} 840 ${cx + 28} 842
           C${cx + 23} 840 ${cx + 20} 832 ${cx + 20} 820
           C${cx + 20} 800 ${cx + 22} 775 ${cx + 24} 755
           C${cx + 30} 752 ${cx + 38} 752 ${cx + 42} 752 Z`,
    views: ['front', 'back'],
  },

  // ===== JAMBES/MOLLETS (y: 842-960) =====
  {
    zone: 'left-leg',
    path: `M${cx - 28} 842 
           C${cx - 32} 875 ${cx - 34} 915 ${cx - 32} 948
           C${cx - 30} 970 ${cx - 26} 988 ${cx - 24} 1000
           C${cx - 20} 1005 ${cx - 16} 1003 ${cx - 15} 996
           C${cx - 14} 978 ${cx - 14} 945 ${cx - 16} 908
           C${cx - 18} 875 ${cx - 20} 850 ${cx - 22} 842
           C${cx - 24} 842 ${cx - 26} 842 ${cx - 28} 842 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-leg',
    path: `M${cx + 28} 842 
           C${cx + 32} 875 ${cx + 34} 915 ${cx + 32} 948
           C${cx + 30} 970 ${cx + 26} 988 ${cx + 24} 1000
           C${cx + 20} 1005 ${cx + 16} 1003 ${cx + 15} 996
           C${cx + 14} 978 ${cx + 14} 945 ${cx + 16} 908
           C${cx + 18} 875 ${cx + 20} 850 ${cx + 22} 842
           C${cx + 24} 842 ${cx + 26} 842 ${cx + 28} 842 Z`,
    views: ['front', 'back'],
  },

  // ===== PIEDS (y: 1000-1065) - Remontés pour rester dans le viewBox =====
  {
    zone: 'left-foot',
    path: `M${cx - 24} 1000 
           C${cx - 28} 1018 ${cx - 34} 1038 ${cx - 38} 1052
           C${cx - 40} 1062 ${cx - 36} 1068 ${cx - 28} 1070
           C${cx - 20} 1072 ${cx - 14} 1068 ${cx - 12} 1060
           C${cx - 10} 1048 ${cx - 12} 1028 ${cx - 15} 1008
           C${cx - 18} 1002 ${cx - 22} 1000 ${cx - 24} 1000 Z`,
    views: ['front', 'back'],
  },
  {
    zone: 'right-foot',
    path: `M${cx + 24} 1000 
           C${cx + 28} 1018 ${cx + 34} 1038 ${cx + 38} 1052
           C${cx + 40} 1062 ${cx + 36} 1068 ${cx + 28} 1070
           C${cx + 20} 1072 ${cx + 14} 1068 ${cx + 12} 1060
           C${cx + 10} 1048 ${cx + 12} 1028 ${cx + 15} 1008
           C${cx + 18} 1002 ${cx + 22} 1000 ${cx + 24} 1000 Z`,
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
