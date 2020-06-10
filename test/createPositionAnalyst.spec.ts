import {
    createPositionAnalyst,
    PositionAnalyst,
    Position,
    Area
} from '../src/index';

let analyst: PositionAnalyst;
const position: Position = [5.77367, 45.07122];
beforeEach(() => (analyst = createPositionAnalyst(position)));

describe('position', () => {
    it('create analyst', () => {
        expect(analyst).toMatchSnapshot();
    });

    it('position is in area', () => {
        const area: Area = {
            maxLatitude: 49.07122,
            minLatitude: 40.07122,
            minLongitude: 1.77367,
            maxLongitude: 9.77367
        };
        const isInArea: boolean = analyst.isInArea(area);
        expect(isInArea).toBe(true);
    });

    it('position is not in area', () => {
        const area: Area = {
            maxLatitude: 44.07122,
            minLatitude: 40.07122,
            minLongitude: 1.77367,
            maxLongitude: 9.77367
        };
        const isInArea: boolean = analyst.isInArea(area);
        expect(isInArea).toBe(false);
    });
});
