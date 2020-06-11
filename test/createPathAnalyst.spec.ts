import { createPathAnalyst, PathAnalyst, Position } from '../src/index';
import data from './data';

let analyst: PathAnalyst;
beforeEach(() => (analyst = createPathAnalyst(data)));

describe('path', () => {
  it('create analyst', () => {
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

  it('calculate path length', () => {
    const length = analyst.calculatePathLength();
    expect(length).toMatchSnapshot();
  });

  it('calculate path elevation', () => {
    const elevation = analyst.calculatePathElevation();
    expect(elevation).toMatchSnapshot();
  });

  it('calculate path area', () => {
    const boundindBox = analyst.calculatePathBoundingBox();
    expect(boundindBox).toMatchSnapshot();
  });

  it('get section between 10km and 40 km marks', () => {
    const section = analyst.splitPath(10, 40);
    expect(section.length).toMatchSnapshot();
  });

  it('get position index for a given position', () => {
    const index = analyst.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();
  });

  it('get position at 10km mark', () => {
    const location = analyst.getPositionsAlongPath(10);
    expect(location.length).toMatchSnapshot();
    expect(location[0]).toMatchSnapshot();
  });

  it('find closest path position of Paris', () => {
    const Paris: Position = [2.3488, 48.8534];
    const closestPosition = analyst.findClosestPosition(Paris);
    expect(closestPosition).toMatchSnapshot();
  });

  it('compute path elevation of path without elevation data', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const analyst = createPathAnalyst(data);
    const computedElevation = analyst.calculatePathElevation();
    expect(computedElevation).toMatchSnapshot();
  });

  it('get progression statistics', () => {
    const index = analyst.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();

    const statistics = analyst.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });
});
