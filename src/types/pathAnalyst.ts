import { Position } from './position';
import { Path } from './path';
import { Area } from './area';
import { PathElevation } from './pathElevation';
import { Statistics } from './statistics';

export type PathAnalyst = {
  getProgressionStatistics: (currentPathIndex: number) => Statistics;
  getPositionsAlongPath: (...distances: number[]) => Path;
  getPositionsIndicesAlongPath: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  splitPath: (start?: number, end?: number) => Path;
  calculatePathLength: () => number;
  calculatePathElevation: (smoothingFactor?: number) => PathElevation;
  calculatePathBoundingBox: () => Area;
  findClosestPosition: (currentLocation: Position) => Position;
};
