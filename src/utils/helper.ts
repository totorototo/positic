import { Position } from '../types/position';

export const calculateDistance = (
  origin: Position,
  destination: Position
): number => {
  const R = 6371e3; // metres
  const φ1 = (origin[1] * Math.PI) / 180;
  const φ2 = (destination[1] * Math.PI) / 180;
  const Δφ = ((destination[1] - origin[1]) * Math.PI) / 180;
  const Δλ = ((destination[0] - origin[0]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) / 1000;
};
