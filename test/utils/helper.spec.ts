import {
  calculateDistance,
  calculateBearing,
  Position,
  Area,
  isInArea,
  isInRadius
} from '../../src';

describe('helper', () => {
  it('calculate distance between Paris and Moscow', () => {
    const origin: Position = [37.618423, 55.751244];
    const destination: Position = [2.3488, 48.8534];

    const distance = calculateDistance(origin, destination);
    expect(distance).toMatchSnapshot();
  });

  it('calculate bearing between two positions', () => {
    const origin: Position = [2.350987, 48.856667];
    const destination: Position = [37.617634, 55.755787];

    const bearing = calculateBearing(origin, destination);
    expect(bearing).toMatchSnapshot();
  });

  it('position is in area', () => {
    const area: Area = {
      maxLatitude: 49.07122,
      minLatitude: 40.07122,
      minLongitude: 1.77367,
      maxLongitude: 9.77367
    };
    const current: Position = [5.77367, 45.07122];
    const isIn: boolean = isInArea(current, area);
    expect(isIn).toBe(true);
  });

  it('position is not in area', () => {
    const area: Area = {
      maxLatitude: 44.07122,
      minLatitude: 40.07122,
      minLongitude: 1.77367,
      maxLongitude: 9.77367
    };
    const current: Position = [5.77367, 45.07122];
    const isIn: boolean = isInArea(current, area);
    expect(isIn).toBe(false);
  });

  it('position is in not radius', () => {
    const center: Position = [6.23828, 45.50127, 888.336];
    const current: Position = [5.77367, 45.07122];
    const radius = 10000;
    const isIn: boolean = isInRadius(current, center, radius);
    expect(isIn).toBe(false);
  });

  it('position is in radius', () => {
    const center: Position = [6.23828, 45.50127, 888.336];
    const current: Position = [5.77367, 45.07122];
    const radius = 70000;
    const isIn: boolean = isInRadius(current, center, radius);
    expect(isIn).toBe(true);
  });
});
