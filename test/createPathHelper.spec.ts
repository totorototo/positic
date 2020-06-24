import { createPathHelper, PathHelper, Position } from '../src';
import data from './data';

let helper: PathHelper;
beforeEach(() => (helper = createPathHelper(data)));

describe('path', () => {
  it('create helper', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const helper = createPathHelper(data);
    expect(helper).toMatchSnapshot();
  });

  it('calculate path length', () => {
    const length = helper.calculatePathLength();
    expect(length).toMatchSnapshot();
  });

  it('calculate path elevation', () => {
    const elevation = helper.calculatePathElevation();
    expect(elevation).toMatchSnapshot();
  });

  it('calculate path area', () => {
    const boundindBox = helper.calculatePathBoundingBox();
    expect(boundindBox).toMatchSnapshot();
  });

  it('get section between 10km and 40 km marks', () => {
    const section = helper.slicePath(10000, 40000);
    expect(section.length).toMatchSnapshot();
  });

  it('unable to get section', () => {
    const section = helper.slicePath(-10, -18);
    expect(section).toMatchSnapshot();
  });

  it('unable to get section 2', () => {
    const section = helper.slicePath();
    expect(section).toMatchSnapshot();
  });

  it('get position index for a given position', () => {
    const index = helper.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();
  });

  it('get position at 10km mark', () => {
    const location = helper.getPositionsAlongPath(10000);
    expect(location.length).toMatchSnapshot();
    expect(location[0]).toMatchSnapshot();
  });

  it('find closest path position of Paris', () => {
    const Paris: Position = [2.3488, 48.8534];
    const closestPosition = helper.findClosestPosition(Paris);
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
    const helper = createPathHelper(data);
    const computedElevation = helper.calculatePathElevation();
    expect(computedElevation).toMatchSnapshot();
  });

  it('get progression statistics', () => {
    const index = helper.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();

    const statistics = helper.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });

  it('unable to get progression statistics', () => {
    const index = -1;
    const statistics = helper.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });

  it('get partial progression statistics', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const helper = createPathHelper(data);
    const index = 4;
    const statistics = helper.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });
});
