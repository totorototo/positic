import { Position } from './position';
import { Path } from './path';
import { Area } from './area';
import { Elevation } from './elevation';
import { Statistics } from './statistics';

export type PathHelper = {
  getProgressionStatistics: (currentPathIndex: number) => Statistics;
  getPositionsAlongPath: (...distances: number[]) => Path;
  getPositionsIndicesAlongPath: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  slicePath: (start?: number, end?: number) => Path;
  calculatePathLength: () => number;
  calculatePathElevation: (smoothingFactor?: number) => Elevation;
  calculatePathBoundingBox: () => Area;
  findClosestPosition: (currentLocation: Position) => Position;
};
