# positic

[![Build Status](https://travis-ci.org/totorototo/positic.svg?branch=master)](https://travis-ci.org/totorototo/positic)

manipulate positions from [GeoJSON](http://geojson.org/).

# install

    $ npm install --save positic

or

    $ yarn add positic

# Usage

## Javascript

```js
// CommonsJs
const createTrack = require('positic').createTrack;

// ES Modules
import { createTrack } from 'positic';
```

## TypeScript

```ts
import { Track, createTrack } from 'positic';

const track: Track = createTrack([5.77367, 45.07122, 279.608]);
```

# api

### `createTrack: (positions: Positions[]) => Track`

Given any valid position array, return an object that manipulate positions and calculate data.

# type definitions

- based types

```ts
type Longitude = number;
type Latitude = number;
type Altitude = number;
type Loss = number;
type Gain = number;
type Distance = number;
```

```ts
type Position = [Longitude, Latitude, Altitude?];
```

```ts
type Elevation = {
  positive: number;
  negative: number;
};
```

```ts
type Area = {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
};
```

```ts
type Statistics = [Distance, Gain, Loss];
```

- Track

```ts
type Track = {
  getPositionsAt: (...distances: number[]) => Position[];
  getPositionsIndicesAt: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  slice: (start?: number, end?: number) => Path;
  getLength: () => number;
  getElevation: (smoothingFactor?: number) => Elevation;
  getBoundingBox: () => Area;
  findClosestPosition: (currentLocation: Position) => Position;
  getProgressionStatistics: (currentPathIndex: number) => Statistics;
};
```

# Track usage

```js
import { createTrack } = from "positic";

const positions = [
  [5.77367, 45.07122, 279.608],
  [5.77367, 45.07122, 279.608],
  [5.77407, 45.07117, 279.926],
  [5.77467, 45.07108, 280.112],
  [5.77487, 45.07091, 280.871],
  [5.77501, 45.07069, 281.516],
  [5.77515, 45.07045, 282.205],
  [5.77573, 45.07057, 280.301],
  ...,
  [6.30269, 45.54447, 320],
  [6.30273, 45.54463, 320],
  [6.30281, 45.5447, 320],
  [6.30275, 45.54486, 320],
  [6.30267, 45.54509, 320],
  [6.30259, 45.54522, 320],
  [6.30245, 45.54534, 320],
  [6.30233, 45.54542, 320]
  ];

const track = createTrack(positions);
```

or

```js
const track = createTrack(GeoJSON.features[0].geometry.coordinates);
```

- calculate track length

```js
const distance = track.getLength();
// distance = 144670 (in meters);
```

- calculate track elevation

```js
const elevation = track.getElevation();
// elevation = {positive:1243.33, negative:1209.34} (in meters)
```

- calculate track bounding box

```js
const area = track.getBoundingBox();
// area = {
// "maxLatitude": 45.55014,
// "maxLongitude": 6.30281,
// "minLatitude": 45.06822,
// "minLongitude": 5.77311,
// }
```

- get positions at 10km and 20km marks

```js
const marks = [10000, 20000];
const positions = get.getPositionsAt(...marks);
// positions = [
//     [5.77501, 45.07069, 281.516],
//     [6.30259, 45.54522, 320],
//]
```

- find the closest track position to a given position

```js
const PARIS = [2.3488, 48.8534];
const closestPosition = track.findClosestPosition(PARIS);
// closestPosition = [6.30259, 45.54522, 320]
```

- get progression statistics

```js
const currentIndex = 1200;
const statistics = track.getProgressionStatistics(currentIndex);
// statistics = [120.23, 6787.34, 5683.22] (distance in meters, positive elevation in meters, negative elevation in meters)
```

# generic helper functions

- calculate distance between two positions

```js
import { calculateDistance } from 'positic';

const origin = [37.618423, 55.751244];
const destination = [2.3488, 48.8534];

const distance = calculateDistance(origin, destination);
// distance = 2486688.9750256147 (in meters)
```

- calculate bearing between two positions

```js
import { calculateBearing } from 'positic';

const origin = [-3.94915, 51.2194];
const destination = [-3.95935, 51.2392];

const bearing = calculateBearing(origin, destination);
// bearing = 342.1247653798634 (in deg)
```

- check if position is in a given area

```js
import { isInArea } from 'positic';

const current = [-3.94915, 51.2194];

const area = {
  maxLatitude: 49.07122,
  minLatitude: 40.07122,
  minLongitude: 1.77367,
  maxLongitude: 9.77367
};
const isIn = isInArea(current, area);
// isIn = true / false
```

- check if position is in a given radius

```js
import { isRadius } from 'positic';

const current = [-3.94915, 51.2194];
const center = [6.23828, 45.50127, 888.336];
const radius = 70;

const isIn = location.isInRadius(current, center, radius);
// isIn = true / false
```

## TypeScript

positic includes [TypeScript](http://typescriptlang.org) definitions.

## License

[MIT](LICENSE)
