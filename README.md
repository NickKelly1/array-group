# @nkp/array-map

[![npm version](https://badge.fury.io/js/%40nkp%2Farray-map.svg)](https://www.npmjs.com/package/@nkp/array-map)
[![deploy status](https://github.com/NickKelly1/nkp-array-map/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/nkp-array-map/actions/workflows/release.yml)
[![known vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-array-map/badge.svg)](https://snyk.io/test/github/NickKelly1/nkp-array-map)

Zero dependency utility for working with one-to-many maps. ArrayMap is similar an es6 Map but the values are arrays.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
  - [Exports](#exports)
- [Usage](#usage)
  - [ArrayMap.groupBy](#arraymapgroupby)
  - [ArrayMap.fromMap](#arraymapfrommap)
  - [ArrayMap.fromMapByRef](#arraymapfrommapbyref)
  - [ArrayMap.fromEntries](#arraymapfromentries)
  - [ArrayMap.fromTuples](#arraymapfromtuples)
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
  - [ArrayMap.prototype.popVacuum](#arraymapprototypepopvacuum)
  - [ArrayMap.prototype.push](#arraymapprototypepush)
  - [ArrayMap.prototype.concat](#arraymapprototypeconcat)
  - [ArrayMap.prototype.reverseValues](#arraymapprototypereversevalues)
  - [ArrayMap.prototype.reverseValuesMut](#arraymapprototypereversevaluesmut)
  - [ArrayMap.prototype.reverseKeys](#arraymapprototypereversekeys)
  - [ArrayMap.prototype.reverseKeysMut](#arraymapprototypereversekeysmut)
  - [ArrayMap.prototype.shift](#arraymapprototypeshift)
  - [ArrayMap.prototype.shiftVacuum](#arraymapprototypeshiftvacuum)
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
  - [ArrayMap.prototype.sortValuesMut](#arraymapprototypesortvaluesmut)
  - [ArrayMap.prototype.sortKeys](#arraymapprototypesortkeys)
  - [ArrayMap.prototype.sortKeysMut](#arraymapprototypesortkeysmut)
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
- [Updating Dependencies](#updating-dependencies)
- [Publishing](#publishing)

## Installation

### npm

```sh
npm install @nkp/array-map
```

### yarn

```sh
yarn add @nkp/array-map
```

### pnpm

```sh
pnpm add @nkp/array-map
```

### Exports

`@nkp/array-map` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

### ArrayMap.groupBy

Create a new ArrayMap instance by grouping an array of values by a key or calculated value.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by grouping an array of objects by a key's
   * corresponding value and concatenating the values of matching keys
   *
   * @param array
   * @param by
   * @returns
   */
  static groupBy<K extends keyof V, V>(array: readonly V[], by: K): ArrayMap<V[K], V>;
  static groupBy<K, V>(array: readonly V[], by: (value: V) => K): ArrayMap<K, V>;

  // ...
}
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
//   1 => [{ score: 1, name: 'Nick' }, { score: 1, name: 'John' }],
//   2 => [{ score: 2, name: 'James' }],
//   3 => [{ score: 3, name: 'Oliver' }, { score: 3, name: 'Rudolph' }],
//   4 => [{ score: 4, name: 'Steve' }],
//   6 => [{ score: 6, name: 'Irene' }, { score: 6, name: 'Lisa' }],
//   7 => [{ score: 7, name: 'Brian' }],
//   8 => [{ score: 8, name: 'Furball' }],
// ])
const group = ArrayMap.groupBy(objects, 'score');

// ArrayMap([
//   0 => [{ score: 1, name: 'Nick' }, { score: 1, name: 'John' }],
//   2 => [
//      { score: 2, name: 'James' },
//      { score: 3, name: 'Oliver' },
//      { score: 3, name: 'Rudolph' ]
//   ],
//   4 => [{ score: 4, name: 'Steve' }],
//   6 => [
//      { score: 6, name: 'Irene' },
//      { score: 6, name: 'Lisa' },
//      { score: 7, name: 'Brian' }
//   ],
//   8 => [{ score: 8, name: 'Furball' }],
// ])
const buckets = ArrayMap.groupBy(objects, (score) => score - (score % 2));
```

### ArrayMap.fromMap

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance from a Map of arrays.

Clones the map and its array values.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance from a Map of arrays
   *
   * Clones the map and all its array values
   *
   * @param map
   * @returns
   */
  static fromMap<K, V>(map: Map<K, V[]>): ArrayMap<K, V>;

  // ...
}

```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const map = Map<number, string[]>([
  [0, ['Nick', 'John']],
  [2, ['James', 'Oliver', 'Rudolph']],
  [4, ['Steve']],
  [6, ['Irene', 'Lisa', 'Brian']],
  [8, ['Furball']],
  [10, []],
]);

// [ArrayMap] {
//   [0, ['Nick', 'John']],
//   [2, ['James', 'Oliver', 'Rudolph']],
//   [4, ['Steve']],
//   [6, ['Irene', 'Lisa', 'Brian']],
//   [8, ['Furball']],
//   [10, []],
// }
const group: ArrayGroup<number, string[]> = ArrayMap.fromMap(map);
```

### ArrayMap.fromMapByRef

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance from a Map of arrays.

Holds the reference of the provided Map instance and may mutate it.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance from a Map of arrays
   *
   * The new ArrayMap instance holds the reference to the provided map and may
   * mutate it
   *
   * @param map   map of entries (key-values pairs) to use for the new
   *              ArrayMap instance
   * @returns     new ArrayMap instance
   */
  static fromMapByRef<K, V>(map: Map<K, V[]>): ArrayMap<K, V> {

  // ...
}
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

// [ArrayMap] {
//   [0, ['Nick', 'John']],
//   [2, ['James', 'Oliver', 'Rudolph']],
//   [4, ['Steve']],
//   [6, ['Irene', 'Lisa', 'Brian']],
//   [8, ['Furball']],
//   [10, []],
// }
const group: ArrayGroup<number, string[]> = ArrayMap.fromMapByRef(map);

// true
console.log(group.getMapRef() === map);

map.set(0, ['Joe']);

// [ArrayMap] {
//   [0, ['Joe']],
//   [2, ['James', 'Oliver', 'Rudolph']],
//   [4, ['Steve']],
//   [6, ['Irene', 'Lisa', 'Brian']],
//   [8, ['Furball']],
//   [10, []],
// }
console.log(group);
```

### ArrayMap.fromEntries

[⬆️ Table of Contents](#table-of-contents)

Create an ArrayMap instance from an array of entries (key-values pairs).

Groups together like keys and concatenates their values.

Clones the array values in the process.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create an ArrayMap instance from an array of entries (key-values pairs) by
   * grouping and concatenating the values of duplicate keys
   *
   * Clones the array values
   *
   * @param entries   array of entries (key-values pairs)
   * @returns         new ArrayMap instance
   */
  static fromEntries<K, V>(entries: readonly ROKeyValues<K, V>[]): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const entries: [string, number[]] = [
  ['a', [1, 2]],
  ['a', [3]],
  ['b', 4],
];

//  [ArrayMap] {
//    ['a', [1, 2, 3]],
//    ['b', [4]],
//  }
const group: ArrayMap<string, number> = ArrayMap.fromEntries(entries);
```

### ArrayMap.fromTuples

[⬆️ Table of Contents](#table-of-contents)

Create an ArrayMap instance from an array of tuples (key-value pairs).

Groups together like keys and concatenates their values.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create an ArrayMap instance from an array of tuples (key-value pairs) by
   * grouping and concatenating the values of duplicate keys
   *
   * @param array   array of tuples (key-value pairs)
   * @returns       new ArrayMap instance
   */
  static fromTuples<K, V>(array: readonly ROKeyValue<K, V>[]): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map';

const tuples: [string, number] = [
  ['a', 1],
  ['a', 2],
  ['b', 3],
];

//  [ArrayMap] {
//    ['a', [1, 2]],
//    ['b', [3]],
//  }
const group: ArrayMap<string, number> = ArrayMap.fromTuples(tuples);
```

### ArrayMap.new

[⬆️ Table of Contents](#table-of-contents)

Create an ArrayMap instance from a Map of entries (key-values pairs).

The ArrayMap instance holds a reference to its provided Map and may mutate it.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance
   *
   * The ArrayMap instance holds the reference to the provided map and may
   * mutate it
   *
   * @param map reference to the underlying map
   */
  constructor(map?: Map<K, V[]> | null) {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const map = Map<number, string[]>([
  [0, ['Nick', 'John']],
  [2, ['James', 'Oliver', 'Rudolph']],
  [4, ['Steve']],
  [6, ['Irene', 'Lisa', 'Brian']],
  [8, ['Furball']],
  [10, []],
]);

// [ArrayMap] {
//   [0, ['Nick', 'John']],
//   [2, ['James', 'Oliver', 'Rudolph']],
//   [4, ['Steve']],
//   [6, ['Irene', 'Lisa', 'Brian']],
//   [8, ['Furball']],
//   [10, []],
// }
const group: ArrayGroup<number, string[]> = new ArrayMap(map);

// true
console.log(group.getMapRef() === map);

map.set(0, ['Joe']);

// [ArrayMap] {
//   [0, ['Joe']],
//   [2, ['James', 'Oliver', 'Rudolph']],
//   [4, ['Steve']],
//   [6, ['Irene', 'Lisa', 'Brian']],
//   [8, ['Furball']],
//   [10, []],
// }
console.log(group);
```

### ArrayMap.prototype.size

[⬆️ Table of Contents](#table-of-contents)

Get the number of keys / entries in the ArrayMap instance.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Number of keys in the ArrayMap instance
   */
  get size(): number;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.size); // 3
```

### ArrayMap.prototype.clone

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance by cloning an existing ArrayMap instance. The new ArrayMap instance's internal map and values are shallow cloned from the original ArrayMap instance.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by cloning this ArrayMap instance
   *
   * Clones the internal Map instance used by the ArrayMap instance and the
   * array-values
   *
   * @returns   shallowly cloned ArrayMap instance
   */
  clone(): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);
console.log(group.getMapRef() === languages); // true

const cloned = group.clone();
console.log(clone.getMapRef() === languages); // false
```

### ArrayMap.prototype.has

[⬆️ Table of Contents](#table-of-contents)

Does the ArrayMap instance have the given key?

Similar to `Map.prototype.has`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Does the key exist?
   *
   * @param key         target key
   * @returns           whether the key exists
   *
   * @see {@link Map.prototype.has}
   */
  has(key: K): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
]);

const group = new ArrayMap(languages);

console.log(group.has('interpreted')); // true;
console.log(group.has('compiled')); // false;
```

### ArrayMap.prototype.hasAt

[⬆️ Table of Contents](#table-of-contents)

Does the ArrayMap instance have a value at the given key and index?

Supports negative indexes.

Similar to `Map.prototype.has` and `Array.prototype.at`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Does the values-array at the key have the element?
   *
   * @param key           target key
   * @param index         zero based (or -ve) target index
   * @returns             whether the key exists in the map
   *
   * @see {@link Map.prototype.has}
   */
  hasAt(key: K, index: number): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
]);

const group = new ArrayMap(languages);

console.log(group.hasAt('interpreted', 0)); // true;
console.log(group.hasAt('interpreted', 1)); // true;
console.log(group.hasAt('interpreted', 2)); // false;
console.log(group.hasAt('compiled', 0)); // false;
```

### ArrayMap.prototype.get

[⬆️ Table of Contents](#table-of-contents)

Get the values-array at the ArrayMap's key.

Similar to `Map.prototype.get`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get the values-array at the key
   *
   * @param key         target key
   * @param index       zero-based (or -ve) target index
   * @returns           values-array if it exists
   *
   * @see {@link Map.prototype.get}
   */
  getAt(key: K, index: number): undefined | V {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
]);

const group = new ArrayMap(languages);


console.log(group.get('interpreted')); // ['JavaScript', 'Python']
console.log(group.get('compiled')); // undefined
```

Get the ArrayMay's values at the given key.

### ArrayMap.prototype.getAt

[⬆️ Table of Contents](#table-of-contents)

Get the value at the ArrayMap instance's key and index.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get the values-array at the key
   *
   * @param key         target key
   * @param index       zero-based (or -ve) target index
   * @returns           values-array if it exists
   *
   * @see {@link Map.prototype.get}
   */
  getAt(key: K, index: number): undefined | V;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.getAt('interpreted', 0)); // JavaScript
console.log(group.getAt('interpreted', 1)); // Python
console.log(group.getAt('interpreted', 2)); // undefined
console.log(group.getAt('compiled', 0)); // undefined
```

### ArrayMap.prototype.set

[⬆️ Table of Contents](#table-of-contents)

Set the array-values at the ArrayMap instance's key.

Similar to `Map.prototype.set`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Set the values-array at the key
   *
   * @param key     target key
   * @param value   values-array
   *
   * @see {@link Map.prototype.set}
   */
  set(key: K, values: V[]): void;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
]);

const group = new ArrayMap(languages);

group.set('compiled', ['C', 'C++', 'Golang']);

console.log(group.get('compiled')); // ['C', 'C++', 'Golang']
```

### ArrayMap.prototype.setAt

[⬆️ Table of Contents](#table-of-contents)

Set the value at the ArrayMap instance's key and index.

Throws if the key does not exist.

Similar to `Map.prototype.set`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Set the value at the key at the index
   *
   * @param key         target key
   * @param index       target index
   * @param value       target value
   *
   * @throws            if the key does not exist
   *
   * @see {@link Map.prototype.set}
   */
  setAt(key: K, index: number, value: V): void;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++']],
]);

const group = new ArrayMap(languages);

group.setAt('compiled', 2,  'Golang');

console.log(group.getAt('compiled', 2)); // 'Golang'
```

### ArrayMap.prototype.delete

[⬆️ Table of Contents](#table-of-contents)

Delete a key from the ArrayMap instance.

Similar to `Map.prototype.delete`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Delete the key
   *
   * @param key         target key
   * @returns           whether they key existed
   *
   * @see {@link Map.prototype.delete}
   */
  delete(key: K): boolean

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++']],
]);

const group = new ArrayMap(languages);

group.delete('compiled');

console.log(group.get('compiled')); // undefined
```

### ArrayMap.prototype.clear

[⬆️ Table of Contents](#table-of-contents)

Delete all keys from the ArrayMap instance.

Similar to `Map.prototype.clear`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Delete all keys
   *
   * @see {@link Map.prototype.clear}
   */
  clear(): void;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java', 'C#']],
  ['compiled', ['C', 'C++']],
]);

const group = new ArrayMap(languages);

group.clear();

console.log(group.size); // 0
```

### ArrayMap.prototype.vacuum

[⬆️ Table of Contents](#table-of-contents)

Delete keys from the ArrayMap instance that have no values.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Delete keys whose value-arrays have length zero
   */
  vacuum(): this;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', []],
  ['compiled', []],
]);

const group = new ArrayMap(languages);

group.vacuum();

console.log(group.size); // 1
console.log(group.get('interpreted')); // ['JavaScript', 'Python']
console.log(group.get('vm')); // undefined
console.log(group.get('compiled')); // undefined
```

### ArrayMap.prototype.length

[⬆️ Table of Contents](#table-of-contents)

Get the length of the values-array of an ArrayMap instance at the given key.

Similar to `Array.prototype.length`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get the length of the array at the key
   *
   * Returns undefined if the key does not exist
   *
   * @param key     target key
   * @returns       length of the values-array if it exists
   *
   * @see {@link Array.prototype.length}
   */
  length(key: K): undefined | number {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', []],
]);

const group = new ArrayMap(languages);

console.log(group.size); // 3
console.log(group.length('interpreted')); // 2
console.log(group.length('vm')); // 1
console.log(group.length('compiled')); // 0
console.log(group.length('other')); // undefined
```

### ArrayMap.prototype.pop

[⬆️ Table of Contents](#table-of-contents)

Remove and return the last element of the values-array at the given key in the ArrayMap instance.

Similar to `Array.prototype.pop`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Pop the last element off the array at the key
   *
   * @param key     target key
   * @returns       value if it exists
   *
   * @see {@link Array.prototype.push}
   */
  pop(key: K): V | undefined;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.length('interpreted')); // 2
console.log(group.pop('interpreted')); // 'Python'
console.log(group.pop('interpreted')); // 'JavaScript'
console.log(group.pop('interpreted')); // undefined
console.log(group.length('interpreted')); // 0

console.log(group.length('other')); // undefined
```

### ArrayMap.prototype.popVacuum

[⬆️ Table of Contents](#table-of-contents)

Remove and return the last element of the values-array at the given key in the ArrayMap instance.

Delete the key if its values-array then has length 0.

Similar to `Array.prototype.pop`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Pop the last element off the array at the key
   *
   * Delete the key if it now has no elements
   *
   * @param key     target key
   * @returns       value if it exists
   *
   * @see {@link Array.prototype.push}
   */
  popVacuum(key: K): V | undefined;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.length('interpreted')); // 2
console.log(group.popVacuum('interpreted')); // 'Python'
console.log(group.popVacuum('interpreted')); // 'JavaScript'
console.log(group.popVacuum('interpreted')); // undefined
console.log(group.length('interpreted')); // undefined
```

### ArrayMap.prototype.push

[⬆️ Table of Contents](#table-of-contents)

Append values to the end of the values-array at the given key of the ArrayMap instance.

Creates the key if the doesn't exist.

Similar to `Array.prototype.push`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Append values to the end of values-array at the key
   *
   * Creates the key if it didn't exist
   *
   * @param key       target key
   * @param values    values to append
   * @returns         number of values inserted
   *
   * @see {@link Array.prototype.push}
   */
  push(key: K, ...values: V[]): number;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

group.push('interpreted', 'Python');
console.log(group.get('interpreted')); // ['JavaScript', 'Python']

console.log(group.get('compiled')); // undefined
group.push('compiled', 'C', 'C++', 'Golang');
console.log(group.get('compiled')); // ['C', 'C++', 'Golang']
```

### ArrayMap.prototype.concat

[⬆️ Table of Contents](#table-of-contents)

Concatenate given arrays with the values-array at the given key of the ArrayMap instance, if it exists, or with an empty array.

Does not mutate the values-array at the given key.

Does not create the key if it does not exist.

Similar to `Array.prototype.concat`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Concatenate the given arrays with the array at the key
   *
   * Does not mutate or rereference the value at the key
   *
   * Concatenates the values with an empty array if the key did not exist
   *
   * @param key       target key
   * @param values    values to concatenate
   * @returns         concatenation result
   *
   * @see {@link Array.prototype.concat}
   */
  concat(key: K, ...values: readonly ConcatArray<V>[]): V[];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C',]],
]);

const group = new ArrayMap(languages);

console.log(group.get('compiled')); // ['C']

// ['C', 'C++', 'Golang', 'Rust']
console.log(group.concat('compiled', ['C++', 'Golang'], ['Rust']]));
```

### ArrayMap.prototype.reverseValues

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance and reverse its values.

Does not mutate the original ArrayMap instance.

similar to `Array.prototype.reverse`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance and sort its values
   *
   * @param key       target key
   * @returns         new ArrayMap instance with the values reversed
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseValues(): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python']],
  ['vm', ['Java']],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

const reversed = group.reverseValues();

// the original ArrayMap instance is unaffected
console.log(reversed !== group); // true

// keys are remain in the same order but value arrays are reversed
// [
//    ['interpreted', [,'Python', 'JavaScript']],
//    ['vm', ['Java']],
//    ['compiled', ['Golang', 'C++', 'C']],
// ]
console.log(reversed.toEntries());
```

### ArrayMap.prototype.reverseValuesMut

[⬆️ Table of Contents](#table-of-contents)

Sort the ArrayMap instance's values in-place without creating a new ArrayMap instance.

Similar to `Array.prototype.sort`.


```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Reverse each values-array
   *
   * Mutates this ArrayMap instance in-place
   *
   * @param key     target key
   * @returns       the mutated ArrayMap instance
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseValuesMut(): this;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']

group.reverseValuesMut();

// the origial ArrayMap instance is mutated such that the order of its values
// are reversed
// [
//    ['interpreted', [,'Python', 'JavaScript']],
//    ['vm', ['Java']],
//    ['compiled', ['Golang', 'C++', 'C']],
// ]
console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']
```

### ArrayMap.prototype.reverseKeys

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance and reverse its keys.

Does not mutate the original ArrayMap instance.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance and reverse the order of its keys
   *
   * @param key       target get
   * @returns         new ArrayMap instance with keys reversed
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseKeys(): ArrayMap<K, V> {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']

const reversed = group.reverseKeys();

console.log(reversed !== group); // true

// the original ArrayMap instance is unchanged
console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']

// keys of the reversed ArrayMap instance are reversed
console.log(reversed.toKeys()); // ['compiled', 'vm', 'interpreted']
```

### ArrayMap.prototype.reverseKeysMut

[⬆️ Table of Contents](#table-of-contents)

Sort the ArrayMap instance's keys in-place without creating a new ArrayMap instance.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Reverse the order of the keys
   *
   * Mutates this ArrayMap instance in-place
   *
   * @param key       target key
   * @returns         the mutated ArrayMap instance
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseKeysMut(): this {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']

group.reverseKeysMut();

// the origial ArrayMap instance is mutated such that the order of its keys are
// reversed
console.log(group.toKeys()); // ['interpreted', 'vm', 'compiled']
```

### ArrayMap.prototype.shift

[⬆️ Table of Contents](#table-of-contents)

Remove the first element of the array at the key of the ArrayMap instance.

Similar to `Array.prototype.shift`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Remove and return the first element of the values-array at the key if it
   * exists
   *
   * @param key     target key
   * @returns       value if it exists
   *
   * @see {@link Array.prototype.shift}
   */
  shift(key: K): V | undefined;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.length('interpreted')); // 2
console.log(group.shift('interpreted')); // 'JavaScript'

console.log(group.length('interpreted')); // 1
console.log(group.shift('interpreted')); // 'Python'

console.log(group.length('interpreted')); // 0
console.log(group.shift('interpreted')); // undefined
```

### ArrayMap.prototype.shiftVacuum

[⬆️ Table of Contents](#table-of-contents)

Remove and return the first element of the array at the key in the ArrayMap instance.

Delete the key if its array has length 0.

Similar to `Array.prototype.shift`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Remove and return the first element of the values-array at the key if it
   * exists
   *
   * Delete the key if it's values-array has length zero
   *
   * @param key     target key
   * @param key     value if it exists
   *
   * @see {@link Array.prototype.shift}
   */
  shiftVacuum(key: K): V | undefined;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang']],
]);

const group = new ArrayMap(languages);

console.log(group.length('interpreted')); // 2
console.log(group.shiftVacuum('interpreted')); // 'JavaScript'

console.log(group.length('interpreted')); // 1
console.log(group.shiftVacuum('interpreted')); // 'Python'

console.log(group.length('interpreted')); // undefined
console.log(group.shiftVacuum('interpreted')); // undefined
```

### ArrayMap.prototype.unshift

[⬆️ Table of Contents](#table-of-contents)

Unshift values onto the start of the values-array at the key's of the ArrayMap instance.

Creates the key if the doesn't exist.

Similar to `Array.prototype.unshift`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Unshift elements to the start of the values-array at the key
   *
   * Create the key if it does not exit
   *
   * @param key       target key
   * @param values    values to insert
   * @returns         the number of items inserted
   *
   * @see {@link Array.prototype.unshift}
   */
  unshift(key: K, ...values: V[]): number;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

console.log(group.length('compiled')); // undefined

console.log(group.unshift('compiled', 'C++', 'Golang')); // 2
console.log(group.length('compiled')); // 2

console.log(group.unshift('compiled', 'C')); // 1
console.log(group.length('compiled')); // 3

console.log(group.get('compiled')); // ['C', 'C++', 'Golang']
```

### ArrayMap.prototype.indexOf

[⬆️ Table of Contents](#table-of-contents)

Get the first index of a refentially equal element at the key in the ArrayMap instance, if it exists.

If the key exists and the value is not found, returns -1.

If the key does not exist, returns -1.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Return the first index of the element in the array at the key
   *
   * If the value is not found, returns -1
   *
   * If the key does not exist, returns -1
   *
   * @param key             target key
   * @param searchElement   value to search for
   * @param fromIndex       starting index to search from
   * @returns               index of the element if found or -1
   *
   * @see {@link Array.prototype.indexOf}
   */
  indexOf(key: K, searchElement: V, fromIndex?: number): number;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.indexOf('compiled', 'C++')); // 1
console.log(group.indexOf('compiled', 'Rust')); // -1
console.log(group.indexOf('interpreted', 'JavaScript')); // -1
```

### ArrayMap.prototype.lastIndexOf

[⬆️ Table of Contents](#table-of-contents)

Get the last index of a refentially equal element at the key in the ArrayMap instance, if it exists.

If the key exists and the value is not found, returns -1.

If the key does not exist, returns -1.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Return the last index of the element in the array at the key
   *
   * If the value is not found, returns -1
   *
   * If the key does not exist, returns -1
   *
   * @param key             target key
   * @param searchElement   value to search for
   * @param fromIndex       ending index to start searching from
   * @returns               index of the element if found or -1
   *
   * @see {@link Array.prototype.lastIndexOf}
   */
  lastIndexOf(key: K, searchElement: V, fromIndex?: number): number {

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.indexOf('compiled', 'C++')); // 3
console.log(group.indexOf('compiled', 'Rust')); // -1
console.log(group.indexOf('interpreted', 'JavaScript')); // -1
```

### ArrayMap.prototype.everyEntry

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for every entry (key-values pair) in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do all entries (key-values pairs) resolve true for the predicate?
   *
   * @param predicate       test to execute on tuples
   * @param thisArg         this value for the predicate fn
   * @returns               true iff every entry resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyEntry<U extends V>(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => entry is KeyValues<K, U>,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyEntry(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.everyEntry(([key, values]) => values.length === 2)); // false
console.log(group.everyEntry(([key, values]) => values.length !== 0)); // true
```

### ArrayMap.prototype.everyTuple

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for every tuple (key-value pair) in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do all tuples (key-value pairs) resolve true for the predicate?
   *
   * @param predicate       test to execute on tuples
   * @param thisArg         this value for the predicate fn
   * @returns               true iff every tuple resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyTuple<U extends V>(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => tuple is KeyValue<K, U>,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyTuple(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.everyTuple(([key, value]) => value === 'JavaScript')); // false
console.log(group.everyTuple(([key, value]) => typeof value === 'string')); // true
```

### ArrayMap.prototype.everyValue

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for every value in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do all values resolve true for the predicate?
   *
   * @param predicate       test to execute on values
   * @param thisArg         this value for the predicate fn
   * @returns               true iff every value resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyValue<U extends V>(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => value is U,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyValue(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.everyValue((value) => value === 'JavaScript')); // false
console.log(group.everyValue((value) => typeof value === 'string')); // true
```

### ArrayMap.prototype.everyKey

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for every key in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do all keys resolve true for the predicate?
   *
   * @param predicate       test to execute on keys
   * @param thisArg         this value for the predicate fn
   * @returns               true iff every key resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyKey<L extends K>(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => key is L,
    thisArg?: any
  ): this is ArrayMap<L, K>;
  everyKey(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang', 'C++']],
]);

const group = new ArrayMap(languages);

console.log(group.everyKey((value) => value.length >= 3)); // false
console.log(group.everyKey((value) => value.length >= 2)); // true
```

### ArrayMap.prototype.someEntry

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for any entry (key-values pair) in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do any of the entries (key-values pairs) resolve true for the predicate?
   *
   * @param predicate     test to execute on entries
   * @param thisArg       this value for the predicate fn
   * @returns             true iff any entry resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someEntry<U extends V>(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => entry is KeyValues<K, U>,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someEntry(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

console.log(group.someEntry(([key, values]) => key === 'interpreted')); // true
console.log(group.someEntry(([key, values]) => values.includes('JavaScript'))); // true
console.log(group.someEntry(([key, values]) => key === 'compiled')); // false
```

### ArrayMap.prototype.someTuple

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for any tuple (key-value pair) in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do any of the tuples (key-value pairs) resolve true for the predicate?
   *
   * @param predicate     test to execute on tuples
   * @param thisArg       this value for the predicate fn
   * @returns             true iff any tuple resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someTuple<U extends V>(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => tuple is KeyValue<K, U>,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someTuple(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

console.log(group.someTuple(([key, value]) => key === 'interpreted')); // true
console.log(group.someTuple(([key, value]) => values === 'JavaScript')); // true
console.log(group.someTuple(([key, value]) => key === 'compiled')); // false
```

### ArrayMap.prototype.someValue

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for any tuple value in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do any of the values resolve true for the given function?
   *
   * @param predicate     test to execute on values
   * @param thisArg       this value for the predicate fn
   * @returns             true iff any value resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someValue<U extends V>(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => value is U,
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someValue(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

console.log(group.someValue((value) => value === 'interpreted')); // false
console.log(group.someValue((value) => value === 'JavaScript')); // true
```

### ArrayMap.prototype.someKey

[⬆️ Table of Contents](#table-of-contents)

Returns true if the predicate returns true for any tuple key in the ArrayMap instance.

Similar to `Array.prototype.every`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Do any of the keys resolve true for the given function?
   *
   * @param predicate     test to execute on keys
   * @param thisArg       this value for the predicate fn
   * @returns             true iff any key resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someKey<L extends K>(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => key is L,
    thisArg?: any
  ): this is ArrayMap<L, K>;
  someKey(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
]);

const group = new ArrayMap(languages);

console.log(group.someValue((value) => value === 'interpreted')); // true
console.log(group.someValue((value) => value === 'JavaScript')); // false
```

### ArrayMap.prototype.mapEntries

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by mapping entries (key-values pairs) from the calling ArrayMap instance.

Similar to `Array.prototype.map`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by mapping each entry (key-values pair) to
   * a new entry which are collected and combined into the new ArrayMap instance
   *
   * @param callbackfn    mapper to execute on entries
   * @param thisArg       this value for the mapper fn
   * @returns             new ArrayMap instance
   *
   * @see {@link Array.prototype.map}
   */
  mapEntries<L, U>(
    callbackfn: (
      value: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => ROKeyValues<L, U>,
    thisArg?: any
  ): ArrayMap<L, U>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//   ['interpreted', ['javascript', 'python'],],
//   ['inbetween', ['java'],],
//   ['compiled', ['c', 'c++', 'golang'],],
// ]
const mapped = group.mapEntries(([key, values]) => {
  const newValues = Array.from(values).map(value => value.toLowerCase());
  if (key === 'vm') return ['inbetween', newValues];
  return [key, newValues];
});
```

### ArrayMap.prototype.mapTuples

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by mapping tuples (key-value pairs) from the calling ArrayMap instance.

Similar to `Array.prototype.map`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by mapping each tuple (key-value pair) to a
   * new tuple which are collected and combined into the new ArrayMap instance
   *
   * @param callbackfn    mapper to execute on tuples
   * @param thisArg       this value for the mapper fn
   * @returns             new ArrayMap instance
   *
   * @see {@link Array.prototype.map}
   */
  mapTuples<L, U>(
    callbackfn: (
      value: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => ROKeyValue<L, U>,
    thisArg?: any
  ): ArrayMap<L, U>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//   ['interpreted', ['javascript', 'python'],],
//   ['inbetween', ['java'],],
//   ['compiled', ['c', 'c++', 'golang'],],
// ]
const mapped = group.mapTuples(([key, value]) => [
  key === 'vm' ? 'inbetween',
  value.toLowerCase(),
]);
```

### ArrayMap.prototype.mapValues

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by mapping values from the calling ArrayMap instance.

Similar to `Array.prototype.map`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by mapping each value to a new value which
   * to replace it on the new ArrayMap instance
   *
   * @param callbackfn    mapper to execute on values
   * @param thisArg       this value for the mapper fn
   * @returns             new ArrayMap instance
   *
   * @see {@link Array.prototype.map}
   */
  mapValues<U>(
    callbackfn: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => U,
    thisArg?: any,
  ): ArrayMap<K, U>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//   ['interpreted', ['javascript', 'python'],],
//   ['vm', ['java'],],
//   ['compiled', ['c', 'c++', 'golang'],],
// ]
const mapped = group.mapValues((value) => value.toLowerCase());
```

### ArrayMap.prototype.mapKeys

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by mapping keys from the calling ArrayMap instance.

Similar to `Array.prototype.map`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by mapping each key to a new key to be
   * collected and combined into the new ArrayMap instance
   *
   *
   * @param callbackfn    mapper to execute on keys
   * @param thisArg       this value for the mapper fn
   * @returns             new ArrayMap instance
   *
   * @see {@link Array.prototype.map}
   */
  mapKeys<L>(
    callbackfn: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => L,
    thisArg?: any
  ): ArrayMap<L, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//   ['interpreted', ['JavaScript', 'Python'],],
//   ['inbetween', ['Java'],],
//   ['compiled', ['C', 'C++', 'Golang'],],
// ]
const mapped = group.mapKeys((key) => key === 'vm' ? 'inbetween' : key);
```

### ArrayMap.prototype.filterEntries

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by keeping only entries (key-values pairs) which return truthy.

Similar to `Array.prototype.filter`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by keeping only entries (key-values pairs)
   * that when called with the predicate fn return true
   *
   * @param predicate     predicate fn to check against entries
   * @param thisArg       this value for the predicate fn
   * @returns             new ArrayMap instance with remaining entries
   *
   * @see {@link Array.prototype.filter}
   */
  filterEntries<U extends V>(
    predicate: (
      entry: (KeyValues<K, V>),
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => entry is KeyValues<K, U>,
    thisArg?: any
  ): ArrayMap<K, U>;
  filterEntries(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//    ['compiled', ['C', 'C++', 'Golang'],],
// ]
const filtered = group.filterEntries(([key, values]) => {
  if (key === 'vm') return false;
  if (values.length === 2) return false;
  return true;
});
```

Creates a new ArrayMap instance by keeping only tuples (key-value pairs) which return truthy.

Similar to `Array.prototype.filter`.

### ArrayMap.prototype.filterTuples

[⬆️ Table of Contents](#table-of-contents)

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by keeping only tuples (key-value pairs)
   * that when called with the predicate fn return true
   *
   * @param predicate     predicate fn to check against tuples
   * @param thisArg       this value for the predicate fn
   * @returns             new ArrayMap instance with remaining tuples
   *
   * @see {@link Array.prototype.filter}
   */
  filterTuples<U extends V>(
    predicate: (
      tuple: (KeyValue<K, V>),
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => tuple is KeyValue<K, U>,
    thisArg?: any
  ): ArrayMap<K, U>;
  filterTuples(
    predicate: (
      tuple: (KeyValue<K, V>),
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['C#', 'Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//    ['interpreted', ['JavaScript', 'Python'],],
//    ['compiled', ['Golang'],],
// ]
const filtered = group.filterTuples(([key, value]) => {
  if (key === 'vm') return false;
  if (value.startsWith('C')) return false;
  return true;
});
```

### ArrayMap.prototype.filterValues

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by keeping only values which return truthy.

Similar to `Array.prototype.filter`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by keeping only values who that when called
   * with the predicate fn return true
   *
   * @param predicate     predicate fn to check against values
   * @param thisArg       this value for the predicate fn
   * @returns             new ArrayMap instance with remaining values
   *
   * @see {@link Array.prototype.filter}
   */
  filterValues<U extends V>(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => value is U,
    thisArg?: any
  ): ArrayMap<K, U>;
  filterValues(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['C#', 'Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//    ['interpreted', ['JavaScript', 'Python'],],
//    ['vm', ['Java'],],
//    ['compiled', ['Golang'],],
// ]
const filtered = group.filterValues((value) => {
  if (value.startsWith('C')) return false;
  return true;
});
```

### ArrayMap.prototype.filterKeys

[⬆️ Table of Contents](#table-of-contents)

Creates a new ArrayMap instance by keeping only keys which return truthy.

Similar to `Array.prototype.filter`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance by keeping only keys who that when called
   * with the predicate fn return true
   *
   * @param predicate     predicate fn to check against keys
   * @param thisArg       this value for the predicate fn
   * @returns             new ArrayMap instance with remaining keys
   *
   * @see {@link Array.prototype.filter}
   */
  filterKeys<L extends K>(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<L, V>;
  filterKeys(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const languages = Map<number, string[]>([
  ['interpreted', ['JavaScript', 'Python'],],
  ['vm', ['C#', 'Java'],],
  ['compiled', ['C', 'C++', 'Golang'],],
]);

const group = new ArrayMap(languages);

// [
//    ['interpreted', ['JavaScript', 'Python'],],
//    ['compiled', ['C', 'C++', 'Golang'],],
// ]
const filtered = group.filterKeys((key) => {
  if (key === 'vm') return false;
  return true;
});
```

### ArrayMap.prototype.sortValues

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance and sort its values.

Does not mutate the original ArrayMap.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance and sort its values
   *
   * @param compareFn       sorting fn
   * @param thisArg         this value for the sorting fn
   * @returns               new ArrayMap instance with sorted values
   *
   * @see {@link Array.prototype.sort}
   */
  sortValues(
    compareFn?: (a: V, b: V, key: K) => number,
    thisArg?: any
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const scores = Map<number, string[]>([
  [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
  [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
  [2, [{ name: 'Furball', score: 10 }]],
]);

const group = new ArrayMap(scores);

// [
//    [0, [{ name: 'Jack', score: 8 }, { name: 'Nick', score: 1 }]],
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [2, [{ name: 'Furball', score: 10 }]],
// ]
// scores numerically descending
const sorted = group.sortValues((valueA, valueB) => -valueB + valueA);
```

### ArrayMap.prototype.sortValuesMut

[⬆️ Table of Contents](#table-of-contents)

Sort the ArrayMap instance's values.

Mutates the ArrayMap instance in-place.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Sort the value-arrays
   *
   * Mutates this ArrayMap instance in-place
   *
   * @param compareFn       sorting fn
   * @param thisArg         this value for the sorting fn
   * @returns               new ArrayMap instance with sorted values
   *
   * @see {@link Array.prototype.sort}
   */
  sortValuesMut(
    compareFn?: (a: V, b: V, key: K) => number,
    thisArg?: any
  ): this;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const scores = Map<number, string[]>([
  [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
  [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
  [2, [{ name: 'Furball', score: 10 }]],
]);

const group = new ArrayMap(scores);

// [
//    [0, [{ name: 'Jack', score: 8 }, { name: 'Nick', score: 1 }]],
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [2, [{ name: 'Furball', score: 10 }]],
// ]
// scores numerically descending
group.sortValuesMut((valueA, valueB) => -valueB + valueA);
```

### ArrayMap.prototype.sortKeys

[⬆️ Table of Contents](#table-of-contents)

Create a new ArrayMap instance and sort its keys.

Does not mutate the original ArrayMap.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create a new ArrayMap instance and sort its keys
   *
   * @param compareFn       sorting fn
   * @param thisArg         this value for the sorting fn
   * @returns               new ArrayMap instance with sorted keys
   *
   * @see {@link Array.prototype.sort}
   */
  sortKeys(
    compareFn?: (a: K, b: K, aValues: V[], bValues: V[]) => number,
    thisArg?: any,
  ): ArrayMap<K, V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const scores = Map<number, string[]>([
  [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
  [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
  [2, [{ name: 'Furball', score: 10 }]],
]);

const group = new ArrayMap(scores);

// [
//    [2, [{ name: 'Furball', score: 10 }]],
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
// ]
// keys numerically descending
const keysDescending = group.sortKeys((keyA, keyB) => -keyB + keyA);

// [
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [2, [{ name: 'Furball', score: 10 }]],
//    [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
// ]
// sum of scores numerically descending
const scoresDescending = group.sortKeys((keyA, keyB, valuesA, valuesB) => 
  -valuesA.reduce((player, score) => score + player.score, 0)
  +valuesB.reduce((player, score) => score + player.score, 0)
);
```

### ArrayMap.prototype.sortKeysMut

[⬆️ Table of Contents](#table-of-contents)

Sort the ArrayMap instance's keys.

Mutates the ArrayMap instance in-place.

Similar to `Array.prototype.sort`.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Sort the keys
   *
   * Mutates this ArrayMap instance in-place
   *
   * @param compareFn       sorting fn
   * @param thisArg         this value for the sorting fn
   * @returns               new ArrayMap instance with sorted keys
   *
   * @see {@link Array.prototype.sort}
   */
  sortKeysMut(
    compareFn?: (a: K, b: K, aValues: V[], bValues: V[]) => number,
    thisArg?: any,
  ): this;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const scores = Map<number, string[]>([
  [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
  [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
  [2, [{ name: 'Furball', score: 10 }]],
]);

const group = new ArrayMap(scores);

// [
//    [2, [{ name: 'Furball', score: 10 }]],
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
// ]
// keys numerically descending
group.sortKeysMut((keyA, keyB) => -keyB + keyA);

// [
//    [1, [{ name: 'Lisa', score: 7 }, { name: 'Elizabeth', score: 4 }]],
//    [2, [{ name: 'Furball', score: 10 }]],
//    [0, [{ name: 'Nick', score: 1 }, { name: 'Jack', score: 8 }]],
// ]
// sum of scores numerically descending
group.sortKeysMut((keyA, keyB, valuesA, valuesB) => 
  -valuesA.reduce((player, score) => score + player.score, 0)
  +valuesB.reduce((player, score) => score + player.score, 0)
);
```

### ArrayMap.prototype.entries

[⬆️ Table of Contents](#table-of-contents)

Get an iterator of the ArrayMap instance's entries (key-values pairs).

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get an iterator for entries (key-values pairs)
   */
  entries(): IterableIterator<KeyValues<K, V>>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//   [0, ['Nick', 'Jack']],
//   [1, ['Lisa', 'Elizabeth']],
//   [2, ['Furball']],
// }
console.log(group.entries());
```

### ArrayMap.prototype.tuples

[⬆️ Table of Contents](#table-of-contents)

Get an iterator of the ArrayMap instance's tuples (key-value pairs).

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get an iterator for tuples (key-value pairs)
   */
  * tuples(): IterableIterator<KeyValue<K, V>>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//   [0, 'Nick'],
//   [0, 'Jack'],
//   [1, 'Lisa'],
//   [1, 'Elizabeth'],
//   [2, 'Furball'],
// }
console.log(group.tuples());
```

### ArrayMap.prototype.arrays

[⬆️ Table of Contents](#table-of-contents)

Get an iterator of the ArrayMap instance's value-arrays.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get an iterator for the values-arrays
   */
  arrays(): IterableIterator<V[]>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//   ['Nick', 'Jack'],
//   ['Lisa', 'Elizabeth'],
//   ['Furball'],
// }
console.log(group.arrays());
```

### ArrayMap.prototype.values

[⬆️ Table of Contents](#table-of-contents)

Get an iterator of the ArrayMap instance's keys values.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get an iterator for the values
   */
  * values(): IterableIterator<V>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//    'Nick',
//    'Jack',
//    'Lisa',
//    'Elizabeth',
//    'Furball',
// }
```

### ArrayMap.prototype.keys

[⬆️ Table of Contents](#table-of-contents)

Get an iterator of the ArrayMap instance's keys (key-value pairs).

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get an iterator for the keys
   */
  keys(): IterableIterator<K>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//    0,
//    1,
//    2,
// }
```

### ArrayMap.prototype.toEntries

[⬆️ Table of Contents](#table-of-contents)

Get an array of the ArrayMap instance's entries (key-values pairs).

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return a new Array instance of the entries (key-values pairs)
   *
   * Clones the entry values-arrays
   *
   * @returns     new instance Array of entries
   */
  toEntries(): KeyValues<K, V>[];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [
//   [0, ['Nick', 'Jack']],
//   [1, ['Lisa', 'Elizabeth']],
//   [2, ['Furball']],
// ]
console.log(group.entries());
```

### ArrayMap.prototype.toTuples

[⬆️ Table of Contents](#table-of-contents)

Get an array of the ArrayMap instance's entries (key-value pairs).

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return an Array of the tuples (key-value pairs)
   *
   * @returns     new instance Array of tuples pairs
   */
  toTuples(): KeyValue<K, V>[];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [
//   [0, 'Nick'],
//   [0, 'Jack'],
//   [1, 'Lisa'],
//   [1, 'Elizabeth'],
//   [2, 'Furball'],
// ]
console.log(group.tuples());
```

### ArrayMap.prototype.toArrays

[⬆️ Table of Contents](#table-of-contents)

Get an array of the ArrayMap instance's value-arrays.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return a new Array instance of the values-arrays
   *
   * @returns     new instance Array of values-arrays
   */
  toArrays(): V[][];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [IterableIterator] {
//   ['Nick', 'Jack'],
//   ['Lisa', 'Elizabeth'],
//   ['Furball'],
// }
console.log(group.arrays());
```

### ArrayMap.prototype.toValues

[⬆️ Table of Contents](#table-of-contents)

Get an array of the ArrayMap instance's values.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return a new Array instance of the values
   *
   * @returns     new instance Array of the values
   */
  toValues(): V[];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [
//    'Nick',
//    'Jack',
//    'Lisa',
//    'Elizabeth',
//    'Furball',
// ]
```

### ArrayMap.prototype.toKeys

[⬆️ Table of Contents](#table-of-contents)

Get an array of the ArrayMap instance's keys.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return a new Array instance of the keys
   *
   * @returns     new instance Array of the keys
   */
  toKeys(): K[];

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [
//    0,
//    1,
//    2,
// ]
```

### ArrayMap.prototype.toMap

[⬆️ Table of Contents](#table-of-contents)

Create and return a new Map instance of the ArrayMap instance's internal entries.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Create and return a new Map instance of the entries (key-values pairs)
   *
   * Clones the ArrayMap instance's underlying map values-arrays
   *
   * @returns     new Map instance of entries
   */
  toMap(): Map<K, V[]>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [Map] {
//   [0, ['Nick', 'Jack']],
//   [1, ['Lisa', 'Elizabeth']],
//   [2, ['Furball']],
// }
console.log(group.toMap());
```

### ArrayMap.prototype.getMapRef

[⬆️ Table of Contents](#table-of-contents)

Get a reference to the underlying ArrayMap instance's map.

```ts
// interface

export class ArrayMap<K, V> {
  // ...

  /**
   * Get a reference to the underlying map
   */
  getMapRef(): Map<K, V[]>;

  // ...
}
```

```ts
// example

import { ArrayMap } from '@nkp/array-map');

const players = Map<number, string[]>([
  [0, ['Nick', 'Jack']],
  [1, ['Lisa', 'Elizabeth']],
  [2, ['Furball']],
]);

const group = new ArrayMap(players);

// [Map] {
//   [0, ['Nick', 'Jack']],
//   [1, ['Lisa', 'Elizabeth']],
//   [2, ['Furball']],
// }
const map = group.toMapRef();

map.set(0, ['Brian']);

// [ArrayMap] {
//   [0, ['Brian']],
//   [1, ['Lisa', 'Elizabeth']],
//   [2, ['Furball']],
// }
console.log(group);
```

## Updating dependencies

To update dependencies run one of

```sh
# if npm
# update package.json
npx npm-check-updates -u
# install
npm install

# if yarn
# update package.json
yarn create npm-check-updates -u
# install
yarn

# if pnpm
# update package.json
pnpx npm-check-updates -u
# install
pnpm install
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
