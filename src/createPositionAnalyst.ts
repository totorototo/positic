import { PositionAnalyst, Position, Area } from './types';

export const createPositionAnalyst = (position: Position): PositionAnalyst => {
  const isInArea = (area: Area): boolean => {
    return (
      position[0] > area.minLongitude &&
      position[0] < area.maxLongitude &&
      position[1] > area.minLatitude &&
      position[1] < area.maxLatitude
    );
  };
  return { isInArea };
};
