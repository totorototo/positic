import { Area } from './area';

export type PositionAnalyst = {
  isInArea: (area: Area) => boolean;
};
