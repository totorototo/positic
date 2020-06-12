import { Position } from '../types/position';

export const calculateDistance = (
  origin: Position,
  destination: Position
): number => {
  const R = 6371e3; // metres
  const φ1 = (origin[1] * Math.PI) / 180; // φ, λ in radians
  const φ2 = (destination[1] * Math.PI) / 180;
  const Δφ = ((destination[1] - origin[1]) * Math.PI) / 180;
  const Δλ = ((destination[0] - origin[0]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters;
};

export const calculateBearing = (
  origin: Position,
  destination: Position
): number => {
  const convertDegToRad = (deg: number): number => deg * (Math.PI / 180);
  const λ1 = convertDegToRad(origin[0]);
  const λ2 = convertDegToRad(destination[0]);
  const φ1 = convertDegToRad(origin[1]);
  const φ2 = convertDegToRad(destination[1]);

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

  const θ = Math.atan2(y, x);

  return ((θ * 180) / Math.PI + 360) % 360; // in degrees
};
