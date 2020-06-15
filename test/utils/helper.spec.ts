import { calculateDistance, calculateBearing, Position } from '../../src/index';

describe('helper', () => {
  it('calcute distance between Paris and Moscow', () => {
    const origin: Position = [37.618423, 55.751244];
    const destination: Position = [2.3488, 48.8534];

    const distance = calculateDistance(origin, destination);
    expect(distance).toMatchSnapshot();
  });

  it('calculate bearing between two positions', () => {
    const origin: Position = [-3.94915, 51.2194];
    const destination: Position = [-3.95935, 51.2392];

    const bearing = calculateBearing(origin, destination);
    expect(bearing).toMatchSnapshot();
  });
});
