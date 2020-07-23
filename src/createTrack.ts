import { Area, Elevation, Track, Position, Statistics } from './types';
import { calculateDistance } from './utils/helper';

type Internals = {
  distance: number;
  gain: number;
  loss: number;
  map: Statistics[];
};

export const createTrack = (positions: Position[]): Track => {
  const mapPositionsToProgression = (): Internals =>
    positions.reduce(
      (
        accum: {
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
          accum.distance += distance;
          const destinationElevation = location[2];
          const originElevation = array[index - 1][2];
          if (originElevation && destinationElevation) {
            const delta = destinationElevation - originElevation;
            if (delta > 0) {
              accum.gain += delta;
            } else {
              accum.loss += Math.abs(delta);
            }
          }
          accum.map.push([accum.distance, accum.gain, accum.loss]);
          return accum;
        } else {
          return accum;
        }
      },
      { distance: 0, gain: 0, loss: 0, map: [[0, 0, 0]] }
    );

  const getLength = (): number =>
    positions.reduce(
      (distance, position, index, array) =>
        index < array.length - 1
          ? distance + calculateDistance(position, array[index + 1])
          : distance,
      0
    );

  const getElevation = (smoothingFactor = 5): Elevation => {
    const elevations = positions.map(position => position[2] || 0);

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
          const delta = values[index + 1] - elevation;
          if (delta > 0) {
            elevationGain.positive = elevationGain.positive + delta;
          } else {
            elevationGain.negative = elevationGain.negative + Math.abs(delta);
          }
          return elevationGain;
        }
        return elevationGain;
      },
      { positive: 0, negative: 0 }
    );
  };

  const getBoundingBox = (): Area =>
    positions.reduce(
      (region, position) => ({
        minLongitude: Math.min(position[0], region.minLongitude),
        maxLongitude: Math.max(position[0], region.maxLongitude),
        minLatitude: Math.min(position[1], region.minLatitude),
        maxLatitude: Math.max(position[1], region.maxLatitude)
      }),
      {
        minLongitude: positions[0][0],
        maxLongitude: positions[0][0],
        minLatitude: positions[0][1],
        maxLatitude: positions[0][1]
      }
    );

  const findClosestPosition = (currentPosition: Position): Position => {
    const closestLocation = positions.reduce(
      (accum, position) => {
        const distance = calculateDistance(position, currentPosition);

        if (distance < accum.distance) {
          accum.distance = distance;
          accum.position = position;
        }
        return accum;
      },
      {
        position: positions[0],
        distance: calculateDistance(currentPosition, positions[0])
      }
    );
    return closestLocation.position;
  };

  const getPositionIndex = (position: Position): number =>
    positions.findIndex(
      currentPosition =>
        currentPosition[0] === position[0] &&
        currentPosition[1] === position[1] &&
        currentPosition[2] === position[2]
    );

  const findClosestIndex = (map: Statistics[], distance: number): number => {
    const { index } = map.reduce(
      (accum, item, index) => {
        if (
          Math.abs(distance - item[0]) >= Math.abs(distance - accum.stat[0])
        ) {
          return accum;
        }
        return { ...accum, index: index, stat: item };
      },
      { index: 0, stat: [0, 0, 0] }
    );

    return index;
  };

  const getPositionsIndicesAt = (...distances: number[]): number[] => {
    const mapIndexProgression = mapPositionsToProgression();
    return distances.map(distance => {
      return findClosestIndex(mapIndexProgression.map, distance);
    });
  };

  const getPositionsAt = (...distances: number[]): Position[] =>
    getPositionsIndicesAt(...distances).map(index => positions[index]);

  const slice = (start = 0, end = 0): Position[] => {
    const locationsIndices = getPositionsIndicesAt(start, end);
    return positions.slice(locationsIndices[0], locationsIndices[1]);
  };

  const getProgressionStatistics = (currentPathIndex: number): Statistics => {
    const mapIndexProgression = mapPositionsToProgression();
    const result = mapIndexProgression.map.find(
      (_, index) => index === currentPathIndex
    );
    return result ? result : [0, 0, 0];
  };

  return {
    getProgressionStatistics,
    getPositionsAt,
    getPositionsIndicesAt,
    getPositionIndex,
    slice,
    getLength,
    getElevation,
    getBoundingBox,
    findClosestPosition
  };
};
