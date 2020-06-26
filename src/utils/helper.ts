import { Position } from '../types';

export const calculateDistance = (
  origin: Position,
  destination: Position
): number => {
  const R = 6371e3; // metres
  const phi1 = (origin[1] * Math.PI) / 180; // phi, lamda in radians
  const phi2 = (destination[1] * Math.PI) / 180;
  const deltaPhi = ((destination[1] - origin[1]) * Math.PI) / 180;
  const deltaLamda = ((destination[0] - origin[0]) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLamda / 2) *
      Math.sin(deltaLamda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters;
};

export const calculateBearing = (
  origin: Position,
  destination: Position
): number => {
  const convertDegToRad = (deg: number): number => deg * (Math.PI / 180);
  const lambda1 = convertDegToRad(origin[0]);
  const lambda2 = convertDegToRad(destination[0]);
  const phi1 = convertDegToRad(origin[1]);
  const phi2 = convertDegToRad(destination[1]);

  const y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);

  const teta = Math.atan2(y, x);

  return ((teta * 180) / Math.PI + 360) % 360; // in degrees
};
