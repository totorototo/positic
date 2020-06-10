# neptunus

[![Build Status](https://travis-ci.org/totorototo/neptunus.svg?branch=master)](https://travis-ci.org/totorototo/neptunus)

manipulate coordinates from [GeoJSON](http://geojson.org/).

## install

    npm install --save neptunus

or

    yarn add neptunus

## api

### `createPathAnalyst: (path: Path) => PathAnalyst`

Given any valid position array, return an helper object that manipulate positions and calculate data.

## types definitions

```ts
type Path = Position[];
```

```ts
type Position = [Longitude, Latitude, Elevation?];
```

```ts
type Longitude = number;
type Latitude = number;
type Elevation = number;
```

```ts
type PathAnalyst = {
  getPositionsAlongPath: (...distances: number[]) => Path;
  getPositionsIndicesAlongPath: (...distances: number[]) => number[];
  getPositionIndex: (position: Position) => number;
  splitPath: (start?: number, end?: number) => Path;
  calculatePathLength: () => number;
  calculatePathElevation: (
    smoothingFactor?: number
  ) => { positive: number; negative: number };
  calculatePathBoundingBox: () => {
    minLongitude: number;
    maxLongitude: number;
    minLatitude: number;
    maxLatitude: number;
  };
  findClosestPosition: (currentLocation: Position) => Position;
};
```

## example

### create path analyst

```js
import { createAnalyst } = from "neptunus";

const path = [
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

const analyst = createPathAnalyst(path);
```

or

```js
const analyst = createPathAnalyst(GeoJSON.features[0].geometry.coordinates);
```

### calculate path length

```js
const distance = analyst.calculatePathLength();
// distance = 144.67;
```

### calculate path elevation

```js
const elevation = analyst.calculatePathElevation();
// elevation = {positive:1243.33, negative:1209.34}
```

### calculate path bounding box

```js
const region = analyst.calculatePathBoundingBox();
// region = {
// "maxLatitude": 45.55014,
// "maxLongitude": 6.30281,
// "minLatitude": 45.06822,
// "minLongitude": 5.77311,
// }
```

### get positions at 10km and 20km marks

```js
const positions = analyst.getPositionsAlongPath([10, 20]);
// positions = [
//     [5.77501, 45.07069, 281.516],
//     [6.30259, 45.54522, 320],
//]
```

### find closest path position to given position

```js
const PARIS = [2.3488, 48.8534];
const closestPosition = analyst.findClosestPosition(PARIS);
// closestPosition = [6.30259, 45.54522, 320]
```
