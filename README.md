# @nkp/array-map

![npm version](https://badge.fury.io/js/%40@nkp%2Farray-map.svg)
[![Node.js Package](https://github.com/NickKelly1/array-map/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/array-map/actions/workflows/release.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/array-map/badge.svg)

ArrayMap holds key-array with arrays of the given value types.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [Exports](#exports)
- [Usage](#usage)
  - [ArrayMap.Uniq](#arraymapuniq)
  - [ArrayMap.arrayEntries](#arraymaparrayentries)
  - [ArrayMap.arrayEntriesPolyfill](#arraymaparrayentriespolyfill)
  - [ArrayMap.mapEntries](#arraymapmapentries)
  - [ArrayMap.mapEntriesPolyfill](#arraymapmapentriespolyfill)
  - [ArrayMap.calculateIndex](#arraymapcalculateindex)
  - [ArrayMap.at](#arraymapat)
  - [ArrayMap.cloneEntries](#arraymapcloneentries)
  - [ArrayMap.cloneMap](#arraymapclonemap)
  - [ArrayMap.groupBy](#arraymapgroupby)
  - [ArrayMap.fromMap](#arraymapfrommap)
  - [ArrayMap.fromMapRef](#arraymapfrommapref)
  - [ArrayMap.fromTuples](#arraymapfromtuples)
  - [ArrayMap.fromEntries](#arraymapfromentries)
  - [ArrayMap.fromEntriesByRef](#arraymapfromentriesbyref)
  - [ArrayMap.new](#arraymapnew)
  - [ArrayMap.prototype.size](#arraymapprototypesize)
  - [ArrayMap.prototype.clone](#arraymapprototypeclone)
  - [ArrayMap.prototype.has](#arraymapprototypehas)
  - [ArrayMap.prototype.hasAt](#arraymapprototypehasat)
  - [ArrayMap.prototype.get](#arraymapprototypeget)
  - [ArrayMap.prototype.getAt](#arraymapprototypegetat)
  - [ArrayMap.prototype.set](#arraymapprototypeset)
  - [ArrayMap.prototype.setAt](#arraymapprototypesetat)
  - [ArrayMap.prototype.delete](#arraymapprototypedelete)
  - [ArrayMap.prototype.clear](#arraymapprototypeclear)
  - [ArrayMap.prototype.vacuum](#arraymapprototypevacuum)
  - [ArrayMap.prototype.length](#arraymapprototypelength)
  - [ArrayMap.prototype.pop](#arraymapprototypepop)
  - [ArrayMap.prototype.push](#arraymapprototypepush)
  - [ArrayMap.prototype.concat](#arraymapprototypeconcat)
  - [ArrayMap.prototype.reverseKeys](#arraymapprototypereversekeys)
  - [ArrayMap.prototype.reverseValues](#arraymapprototypereversevalues)
  - [ArrayMap.prototype.shift](#arraymapprototypeshift)
  - [ArrayMap.prototype.unshift](#arraymapprototypeunshift)
  - [ArrayMap.prototype.indexOf](#arraymapprototypeindexof)
  - [ArrayMap.prototype.lastIndexOf](#arraymapprototypelastindexof)
  - [ArrayMap.prototype.everyEntry](#arraymapprototypeeveryentry)
  - [ArrayMap.prototype.everyTuple](#arraymapprototypeeverytuple)
  - [ArrayMap.prototype.everyValue](#arraymapprototypeeveryvalue)
  - [ArrayMap.prototype.everyKey](#arraymapprototypeeverykey)
  - [ArrayMap.prototype.someEntry](#arraymapprototypesomeentry)
  - [ArrayMap.prototype.someTuple](#arraymapprototypesometuple)
  - [ArrayMap.prototype.someValue](#arraymapprototypesomevalue)
  - [ArrayMap.prototype.someKey](#arraymapprototypesomekey)
  - [ArrayMap.prototype.mapEntries](#arraymapprototypemapentries)
  - [ArrayMap.prototype.mapTuples](#arraymapprototypemaptuples)
  - [ArrayMap.prototype.mapValues](#arraymapprototypemapvalues)
  - [ArrayMap.prototype.mapKeys](#arraymapprototypemapkeys)
  - [ArrayMap.prototype.filterEntries](#arraymapprototypefilterentries)
  - [ArrayMap.prototype.filterTuples](#arraymapprototypefiltertuples)
  - [ArrayMap.prototype.filterValues](#arraymapprototypefiltervalues)
  - [ArrayMap.prototype.filterKeys](#arraymapprototypefilterkeys)
  - [ArrayMap.prototype.sortValues](#arraymapprototypesortvalues)
  - [ArrayMap.prototype.sortKeys](#arraymapprototypesortkeys)
  - [ArrayMap.prototype.entries](#arraymapprototypeentries)
  - [ArrayMap.prototype.tuples](#arraymapprototypetuples)
  - [ArrayMap.prototype.keys](#arraymapprototypekeys)
  - [ArrayMap.prototype.arrays](#arraymapprototypearrays)
  - [ArrayMap.prototype.values](#arraymapprototypevalues)
  - [ArrayMap.prototype.toEntries](#arraymapprototypetoentries)
  - [ArrayMap.prototype.toTuples](#arraymapprototypetotuples)
  - [ArrayMap.prototype.toKeys](#arraymapprototypetokeys)
  - [ArrayMap.prototype.toArrays](#arraymapprototypetoarrays)
  - [ArrayMap.prototype.toValues](#arraymapprototypetovalues)
  - [ArrayMap.prototype.toMap](#arraymapprototypetomap)
  - [ArrayMap.prototype.getMapRef](#arraymapprototypegetmapref)

## Installation

### NPM

```sh
npm install @nkp/array-map
```

### Yarn

```sh
yarn add @nkp/array-map
```

### Exports

`@nkp/array-map` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

### ArrayMap.Uniq

Returns a unique array clone of the given array.

```ts
// interface

function static uniq<T>(array: T[]): T[];
```

```ts
// usage

import { ArrayMap } from '@nkp/array-map';

// [1, 2, 3]
ArrayMap.uniq([1, 1, 2, 3]);
```

### ArrayMap.getArrayEntries

Get an iterator for the array's entries.

Uses `Array.prototype.entries` if it exists.

Otherwise uses `ArrayMap.getArrayEntriesPolyfill`.

```ts
// interface 

function getArrayEntries<T>(array: T[]): IterableIterator<[number, T]>;
```

```ts
// usage

import { ArrayMap } from '@nkp/array-map';

// [[1, 'a'], [2, 'b'], [3, 'c']]
ArrayMap.getArrayEntries(['a', 'b', 'c']); 
```

### ArrayMap.getArrayEntriesPolyfill

Polyfill for `Array.prototype.entries` in-case `Array.prototype.entries` does not exist.

```ts
// interface

function getArrayEntriesPolyfill<T>(array: T[]): IterableIterator<[number, T]>;
```

```ts
// usage

import { ArrayMap } from '@nkp/array-map';

// [[1, 'a'], [2, 'b'], [3, 'c']]
ArrayMap.getArrayEntriesPolyfill(['a', 'b', 'c']); 
```

### ArrayMap.getMapEntries

Get an iterator for the map's entries.

Uses `Map.prototype.entries` if it exists.

Otherwise uses `ArrayMap.getMapEntriesPolyfill`.

```ts
// interface

function getMapEntries<K, V>(map: Map<K, V>): IterableIterator<[K, V]>;
```

```ts
// usage

import { ArrayMap } from '@nkp/array-map';

// [[1, 'a'], [2, 'b'], [3, 'c']]
ArrayMap.getMapEntries(['a', 'b', 'c']); 
```

### ArrayMap.getMapEntriesPolyfill

Polyfill for `Map.prototype.entries` in-case `Map.prototype.entries` does not exist.

```ts
// interface

function getMapEntriesPolyfill<T>(array: T[]): IterableIterator<[number, T]>;
```

```ts
// usage

import { ArrayMap } from '@nkp/array-map';

// [[1, 'a'], [2, 'b'], [3, 'c']]
ArrayMap.getMapEntriesPolyfill(['a', 'b', 'c']); 
```

### ArrayMap.calculateIndex

Calculate the real index for a possibly negative index value.

```ts
// interface

function calculateIndex(length: number, index: number): number;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const array = [0, 1, 2];

// positive indexing
array[ArrayMap.calculateIndex(array.length, 0)] // 0
array[ArrayMap.calculateIndex(array.length, 1)] // 1
array[ArrayMap.calculateIndex(array.length, 2)] // 2

// negative indexing
array[ArrayMap.calculateIndex(array.length, -1)] // 2
array[ArrayMap.calculateIndex(array.length, -2)] // 1
array[ArrayMap.calculateIndex(array.length, -3)] // 0
```

### ArrayMap.at

Get the element at the array's index.

Supports negative indexing.

```ts
// interface

function at<T>(array: T[], index: number): undefined | T;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const array = [0, 1, 2];

// positive indexing
ArrayMap.at(array, 0); // 0
ArrayMap.at(array, 1); // 1
ArrayMap.at(array, 2); // 2

// negative indexing
ArrayMap.at(array, -1); // 2
ArrayMap.at(array, -2); // 1
ArrayMap.at(array, -3); // 0
```

### ArrayMap.cloneEntries

Clone an array of arrays whose first element is a key and second element is an array of values.

Clones the outer and inner arrays. Does not clone the inner array's elements.

```ts
// interface

function cloneEntries<K, V>(ref: [K, V[]][]): [K, V[]][];
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

// [['a', [1, 2, 3]], ['b', [2, 3]], ['c', [3]]]
const entries: [string, number[]][] = [
  ['a', [1, 2, 3],],
  ['b', [2, 3],],
  ['c', [3],],
];

// [['a', [1, 2, 3]], ['b', [2, 3]], ['c', [3]]]
const cloned = ArrayMap.cloneEntries(entries);

entries !== cloned        // true
entries[0] !== cloned[0]  // true
entries[1] !== cloned[1]  // true
entries[2] !== cloned[2]  // true
```

### ArrayMap.cloneMap

Clone a map of arrays whose first element is a key and second element is an array of values.

Clones the outer and inner arrays. Does not clone the inner array's elements.

```ts
// interface

function cloneMap<K, V>(ref: Map<K, V[]>): Map<K, V[]>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

// Map([['a' => [1, 2, 3]], ['b' => [2, 3]], ['c' => [3]]])
const entries: Map<string, number[]> = new Map([
  ['a', [1, 2, 3],],
  ['b', [2, 3],],
  ['c', [3],],
]);

// Map([['a' => [1, 2, 3]], ['b' => [2, 3]], ['c' => [3]]])
const cloned = ArrayMap.cloneMap(entries);

entries !== cloned                    // true
entries.get('a') !== cloned.get('a')  // true
entries.get('b') !== cloned.get('b')  // true
entries.get('c') !== cloned.get('c')  // true
```

### ArrayMap.groupBy

Create a new ArrayMap by grouping an array of values by a key or calculated value.

```ts
// interface
function groupBy<K extends keyof V, V>(array: V[], by: K): ArrayMap<V[K], V>;
function groupBy<K, V>(array: V[], by: (value: V) => K): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const objects = [
  { score: 1, name: 'Nick', },
  { score: 1, name: 'John', },
  { score: 2, name: 'James', },
  { score: 3, name: 'Oliver', },
  { score: 3, name: 'Rudolph', },
  { score: 4, name: 'Steve', },
  { score: 6, name: 'Irene', },
  { score: 6, name: 'Lisa', },
  { score: 7, name: 'Brian', },
  { score: 8, name: 'Furball', },
]

// ArrayMap([
//   1 => ['Nick', 'John'],
//   2 => ['James'],
//   3 => ['Oliver', Rudolph'],
//   4 => ['Steve'],
//   6 => ['Irene', 'Lisa'],
//   7 => ['Brian'],
//   8 => ['Furball'],
// ])
const group = ArrayMap.groupBy(objects, 'score');

// ArrayMap([
//   0 => ['Nick', 'John'],
//   2 => ['James', 'Oliver', 'Rudolph'],
//   4 => ['Steve'],
//   6 => ['Irene', 'Lisa', 'Brian'],
//   8 => ['Furball'],
// ])
const buckets = ArrayMap.groupBy(objects, (score) => score - (score % 2));
```

### ArrayMap.fromMap

Create a new ArrayMap from a Map of arrays.

Clones the map and its array values.

```ts
// interface

function fromMap<K, V>(map: Map<K, V[]>): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const map = Map<number, string[]>([
  [0, ['Nick', 'John'],],
  [2, ['James', 'Oliver', 'Rudolph'],],
  [4, ['Steve'],],
  [6, ['Irene', 'Lisa', 'Brian'],],
  [8, ['Furball'],],
  [10, [],],
]);

const group: ArrayGroup<number, string[]> = ArrayMap.fromMap(map);
```

### ArrayMap.fromMapRef

Create a new ArrayMap from a Map of arrays.

References the given map and its array values.

```ts
// interface

function fromMapByRef<K, V>(map: Map<K, V[]>): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const map = Map<number, string[]>([
  [0, ['Nick', 'John'],],
  [2, ['James', 'Oliver', 'Rudolph'],],
  [4, ['Steve'],],
  [6, ['Irene', 'Lisa', 'Brian'],],
  [8, ['Furball'],],
  [10, [],],
]);

const group: ArrayGroup<number, string[]> = ArrayMap.fromMapByRef(map);
```

### ArrayMap.fromTuples

Create an ArrayMap from an array of key value arrays.

Groups together like keys and concatenates values.

```ts
// interface

function fromTuples<K, V>(array: [K, V][]): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const tuples: [string, number] = [['a', 1], ['a', 2], ['b', 3]];
//  ArrayMap(
//    'a' => [1, 2],
//    'b' => [3],
//  )
const group: ArrayMap<string, number> = ArrayMap.fromTuples(tuples);
```

### ArrayMap.fromEntries

Create an ArrayMap from an array key-value-arrays.

Groups together like keys and concatenates their values.

Clones the array values in the process.

```ts
// interface

function fromEntries<K, V>(entries: [K, V[]][]): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const entries: [string, number[]] = [['a', [1, 2]], ['a', [3]], ['b', 4]];

//  ArrayMap(
//    'a' => [1, 2, 3],
//    'b' => [4],
//  )
const group: ArrayMap<string, number> = ArrayMap.fromEntries(entries);
```

### ArrayMap.fromEntriesByRef

Create an ArrayMap from an array key-value-arrays.

Groups together like keys and concatenates their values.

Keeps reference to the original array values.

```ts
// interface

function fromEntriesByRef<K, V>(entries: [K, V[]][]): ArrayMap<K, V>;
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const entries: [string, number[]] = [['a', [1, 2]], ['a', [3]], ['b', 4]];

//  ArrayMap(
//    'a' => [1, 2, 3],
//    'b' => [4],
//  )
const group: ArrayMap<string, number> = ArrayMap.fromEntries(entries);
```

### ArrayMap.new

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.size

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.clone

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.has

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.hasAt

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.get

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.getAt

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.set

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.setAt

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.delete

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.clear

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.vacuum

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.length

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.pop

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.push

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.concat

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.reverseKeys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.reverseValues

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.shift

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.unshift

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.indexOf

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.lastIndexOf

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.everyEntry

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.everyTuple

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.everyValue

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.everyKey

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.someEntry

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.someTuple

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.someValue

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.someKey

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.mapEntries

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.mapTuples

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.mapValues

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.mapKeys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.filterEntries

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.filterTuples

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.filterValues

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.filterKeys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.sortValues

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.sortKeys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.entries

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.tuples

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.keys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.arrays

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.values

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toEntries

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toTuples

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toKeys

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toArrays

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toValues

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.toMap

```ts
// interface

```

```ts
// example

```

### ArrayMap.prototype.getMapRef

```ts
// interface

```

```ts
// example

```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
