import { createTrack, Track, Position } from '../src';
import data from './data';

let track: Track;
beforeEach(() => (track = createTrack(data)));

describe('path', () => {
  it('create track', () => {
    const data: Position[] = [
      [5.77367, 45.07122],
      [5.77367, 45.07122],
      [5.77407, 45.07117],
      [5.77467, 45.07108],
      [5.77487, 45.07091]
    ];
    const track = createTrack(data);
    expect(track).toMatchSnapshot();
  });

  it('calculate path length', () => {
    const length = track.getLength();
    expect(length).toMatchSnapshot();
  });

  it('calculate path elevation', () => {
    const elevation = track.getElevation();
    expect(elevation).toMatchSnapshot();
  });

  it('calculate path area', () => {
    const boundingBox = track.getBoundingBox();
    expect(boundingBox).toMatchSnapshot();
  });

  it('get section between 10km and 40 km marks', () => {
    const section = track.slice(10000, 40000);
    expect(section.length).toMatchSnapshot();
  });

  it('unable to get section', () => {
    const section = track.slice(-10, -18);
    expect(section).toMatchSnapshot();
  });

  it('unable to get section 2', () => {
    const section = track.slice();
    expect(section).toMatchSnapshot();
  });

  it('get position index for a given position', () => {
    const index = track.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();
  });

  it('get position at 10km mark', () => {
    const location = track.getPositionsAt(10000);
    expect(location.length).toMatchSnapshot();
    expect(location[0]).toMatchSnapshot();
  });

  it('find closest path position of Paris', () => {
    const Paris: Position = [2.3488, 48.8534];
    const closestPosition = track.findClosestPosition(Paris);
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
    const track = createTrack(data);
    const computedElevation = track.getElevation();
    expect(computedElevation).toMatchSnapshot();
  });

  it('get progression statistics', () => {
    const index = track.getPositionIndex([6.30262, 45.54413, 320]);
    expect(index).toMatchSnapshot();

    const statistics = track.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });

  it('unable to get progression statistics', () => {
    const index = -1;
    const statistics = track.getProgressionStatistics(index);
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
    const track = createTrack(data);
    const index = 4;
    const statistics = track.getProgressionStatistics(index);
    expect(statistics).toMatchSnapshot();
  });
});
