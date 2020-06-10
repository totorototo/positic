import { createPathAnalyst, PathAnalyst, Position } from '../src/index';
import data from './data';

let analyst: PathAnalyst;
beforeEach(() => (analyst = createPathAnalyst(data)));

describe('trace', () => {
  it('create helper', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const analyst = createPathAnalyst(data);
    expect(analyst).toMatchSnapshot();
  });

  it('compute trace length', () => {
    const length = analyst.calculatePathLength();
    expect(length).toMatchSnapshot();
  });

  it('compute trace elevation', () => {
    const elevation = analyst.calculatePathElevation();
    expect(elevation).toMatchSnapshot();
  });

  it('compute trace region', () => {
    const boundindBox = analyst.calculatePathBoundingBox();
    expect(boundindBox).toMatchSnapshot();
  });

  it('get section between 10km and 40 km', () => {
    const section = analyst.splitPath(10, 40);
    expect(section.length).toEqual(1086);
  });

  it('get location index for a given location', () => {
    const index = analyst.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toEqual(5546);
  });

  it('get location at 10km', () => {
    const location = analyst.getPositionsAlongPath(10);
    expect(location.length).toEqual(1);
    expect(location[0]).toMatchSnapshot();
  });

  it('find closest location of Paris', () => {
    const Paris: Position = [2.3488, 48.8534];
    const closestLocation = analyst.findClosestPosition(Paris);
    expect(closestLocation).toMatchSnapshot();
  });

  it('compute trace elevation from trace without elevation data', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const helper = createPathAnalyst(data);
    const computedElevation = helper.calculatePathElevation();
    expect(computedElevation).toMatchSnapshot();
  });
});
