import { Position } from './position';
import { Path } from './path';

export type PathAnalyst = {
  getPositionsAlongPath: (...distances: number[]) => Path;
  getPositionsIndicesAlongPath: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  splitPath: (start?: number, end?: number) => Path;
  calculatePathLength: () => number;
  calculatePathElevation: (
    smoothingFactor?: number
  ) => { positive: number; negative: number };
  calculatePathBoundingBox: () => {
    minLongitude: number;
    maxLongitude: number;
    minLatitude: number;
    maxLatitude: number;
  };
  findClosestPosition: (currentLocation: Position) => Position;
};
