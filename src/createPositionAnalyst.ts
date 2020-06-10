import { PositionAnalyst, Position, Area } from './types';
import { calculateDistance } from './utils/helper';

export const createPositionAnalyst = (position: Position): PositionAnalyst => {
  const isInArea = (area: Area): boolean => {
    return (
      position[0] > area.minLongitude &&
      position[0] < area.maxLongitude &&
      position[1] > area.minLatitude &&
      position[1] < area.maxLatitude
    );
  };

  const isInRadius = (center: Position, radius: number): boolean => {
    const distance = calculateDistance(center, position);
    return distance - radius < 0;
  };
  const distanceFromPosition = (destination: Position): number => {
    return calculateDistance(position, destination);
  };
  return { isInArea, isInRadius, distanceFromPosition };
};
