import { Area } from './area';
import { Position } from './position';

export type PositionHelper = {
  isInArea: (area: Area) => boolean;
  isInRadius: (center: Position, radius: number) => boolean;
  distanceFromPosition: (destination: Position) => number;
};
