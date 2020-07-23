import { Position } from './position';
import { Area } from './area';
import { Elevation } from './elevation';
import { Statistics } from './statistics';

export type Track = {
  getProgressionStatistics: (currentPathIndex: number) => Statistics;
  getPositionsAt: (...distances: number[]) => Position[];
  getPositionsIndicesAt: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  slice: (start?: number, end?: number) => Position[];
  getLength: () => number;
  getElevation: (smoothingFactor?: number) => Elevation;
  getBoundingBox: () => Area;
  findClosestPosition: (currentLocation: Position) => Position;
};
