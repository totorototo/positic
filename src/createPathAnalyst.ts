import { Position } from './types/position';
import { PathAnalyst } from './types/pathAnalyst';
import { Path } from './types/path';
import { calculateDistance } from './utils/helper';

type Statistics = [number, number, number, number];
type Elevation = { positive: number; negative: number };
type Region = {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
};
type Internals = {
  distance: number;
  gain: number;
  loss: number;
  map: Statistics[];
};

export const createPathAnalyst = (path: Path): PathAnalyst => {
  const mapLocationsToProgression = (): Internals =>
    path.reduce(
      (
        accu: {
          distance: number;
          gain: number;
          loss: number;
          map: [Statistics];
        },
        location: Position,
        index: number,
        array: Position[]
      ) => {
        if (index > 0) {
          const distance = calculateDistance(array[index - 1], location);
          accu.distance += distance;
          const destinationElevation = array[index - 1][2];
          const originElevation = location[2];
          if (originElevation && destinationElevation) {
            const Δφ = destinationElevation - destinationElevation;
            if (Δφ > 0) {
              accu.gain += Δφ;
            } else {
              accu.loss += Math.abs(Δφ);
            }
          }

          accu.map.push([index, accu.distance, accu.gain, accu.loss]);
          return accu;
        } else {
          return accu;
        }
      },
      { distance: 0, gain: 0, loss: 0, map: [[0, 0, 0, 0]] }
    );

  const calculatePathLength = (): number =>
    path.reduce(
      (distance, position, index, array) =>
        index < array.length - 1
          ? distance + calculateDistance(position, array[index + 1])
          : distance,
      0
    );

  const calculatePathElevation = (smoothingFactor = 5): Elevation => {
    const elevations = path.map(position => position[2] || 0);

    // smooth array values (remove noise).
    const smoothedElevations = elevations.reduce(
      (
        elevations: number[],
        elevation: number,
        index: number,
        values: number[]
      ) => {
        if (
          values[index - smoothingFactor] &&
          values[index + smoothingFactor]
        ) {
          const filteredElevations = values.slice(
            index - smoothingFactor,
            index + smoothingFactor
          );
          const elevationGain = filteredElevations.reduce(
            (sum, item) => sum + item,
            0
          );

          const averageElevationGain = elevationGain / (smoothingFactor * 2);
          elevations.push(averageElevationGain);
          return elevations;
        }
        elevations.push(elevation);
        return elevations;
      },
      []
    );
    return smoothedElevations.reduce(
      (elevationGain, elevation, index, values) => {
        if (values[index + 1]) {
          const Δφ = values[index + 1] - elevation;
          if (Δφ > 0) {
            elevationGain.positive = elevationGain.positive + Δφ;
          } else {
            elevationGain.negative = elevationGain.negative + Math.abs(Δφ);
          }
          return elevationGain;
        }
        return elevationGain;
      },
      { positive: 0, negative: 0 }
    );
  };

  const calculatePathBoundingBox = (): Region =>
    path.reduce(
      (region, position) => ({
        minLongitude:
          position[0] < region.minLongitude ? position[0] : region.minLongitude,
        maxLongitude:
          position[0] > region.maxLongitude ? position[0] : region.maxLongitude,
        minLatitude:
          position[1] < region.minLatitude ? position[1] : region.minLatitude,
        maxLatitude:
          position[1] > region.maxLatitude ? position[1] : region.maxLatitude
      }),
      {
        minLongitude: path[0][0],
        maxLongitude: path[0][0],
        minLatitude: path[0][1],
        maxLatitude: path[0][1]
      }
    );

  const findClosestPosition = (currentPosition: Position): Position => {
    const closestLocation = path.reduce(
      (accu, position) => {
        const distance = calculateDistance(position, currentPosition);

        if (distance < accu.distance) {
          accu.distance = distance;
          accu.position = position;
        }
        return accu;
      },
      {
        position: path[0],
        distance: calculateDistance(currentPosition, path[0])
      }
    );
    return closestLocation.position;
  };

  const getPositionIndex = (position: Position): number =>
    path.findIndex(
      currentPosition =>
        currentPosition[0] === position[0] &&
        currentPosition[1] === position[1] &&
        currentPosition[2] === position[2]
    );

  const findClosestIndex = (map: Statistics[], distance: number): number => {
    return map.reduce((accu, item) => {
      if (accu === null) return item;
      if (Math.abs(distance - item[1]) >= Math.abs(distance - accu[1])) {
        return accu;
      }
      return item;
    })[0];
  };

  const getPositionsIndicesAlongPath = (...distances: number[]): number[] => {
    const mapIndexProgression = mapLocationsToProgression();
    return distances.map(distance => {
      return findClosestIndex(mapIndexProgression.map, distance);
    });
  };

  const getPositionsAlongPath = (...distances: number[]): Position[] =>
    getPositionsIndicesAlongPath(...distances).map(index => path[index]);

  const splitPath = (start = 0, end = 0): Position[] => {
    const locationsIndices = getPositionsIndicesAlongPath(start, end);
    const splitTrace = path.slice(locationsIndices[0], locationsIndices[1]);

    return splitTrace;
  };

  return {
    getPositionsAlongPath,
    getPositionsIndicesAlongPath,
    getPositionIndex,
    splitPath,
    calculatePathLength,
    calculatePathElevation,
    calculatePathBoundingBox,
    findClosestPosition
  };
};
