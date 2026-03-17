import { BodyZone } from '@/types/pain';
import { BACK_PATHS, FRONT_PATHS } from './svgPaths';

export type BodyView = 'front' | 'back';

export interface ZoneGroup {
  id: string;
  label: string;
  description: string;
  zones: BodyZone[];
}

export const BODY_PATHS = {
  front: FRONT_PATHS,
  back: BACK_PATHS,
} as const;

export const VIEW_META: Record<BodyView, { title: string; subtitle: string }> = {
  front: {
    title: 'Anterior',
    subtitle: 'Vue frontale',
  },
  back: {
    title: 'Posterior',
    subtitle: 'Vue dorsale',
  },
};

export const ZONE_GROUPS: ZoneGroup[] = [
  {
    id: 'head-neck',
    label: 'Tête & cou',
    description: 'Tête, cou et nuque',
    zones: ['head', 'neck', 'neck-back'],
  },
  {
    id: 'shoulders',
    label: 'Épaules',
    description: 'Épaules et omoplates',
    zones: ['left-shoulder', 'right-shoulder', 'left-shoulder-blade', 'right-shoulder-blade'],
  },
  {
    id: 'torso',
    label: 'Tronc',
    description: 'Thorax, abdomen et bassin',
    zones: ['chest', 'abdomen', 'pelvis', 'upper-back', 'middle-back', 'lower-back', 'left-buttock', 'right-buttock'],
  },
  {
    id: 'arms',
    label: 'Bras',
    description: 'Bras, coudes, avant-bras et mains',
    zones: [
      'left-upper-arm',
      'right-upper-arm',
      'left-elbow',
      'right-elbow',
      'left-forearm',
      'right-forearm',
      'left-hand',
      'right-hand',
      'left-arm-back',
      'right-arm-back',
    ],
  },
  {
    id: 'knees-legs',
    label: 'Jambes & genoux',
    description: 'Cuisses, genoux, mollets et tibias',
    zones: [
      'left-thigh',
      'right-thigh',
      'left-knee',
      'right-knee',
      'left-shin',
      'right-shin',
      'left-hamstring',
      'right-hamstring',
      'left-calf',
      'right-calf',
    ],
  },
  {
    id: 'feet-ankles',
    label: 'Chevilles & pieds',
    description: 'Chevilles et pieds',
    zones: ['left-ankle', 'right-ankle', 'left-foot', 'right-foot', 'left-ankle-back', 'right-ankle-back'],
  },
];

export const ZONE_LABELS = [...FRONT_PATHS, ...BACK_PATHS].reduce(
  (acc, zone) => ({ ...acc, [zone.id]: zone.label }),
  {} as Record<BodyZone, string>
);

export function getZonesForView(view: BodyView) {
  return BODY_PATHS[view];
}
