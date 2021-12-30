import { ArrayMap, Entry, Tuple } from '.';

describe('ArrayMap', () => {
  type TestObject = Record<string, undefined | string>;
  let testObjects: TestObject[];

  type TestEntry = Entry<string | undefined, TestObject>;
  let testEntries: TestEntry[];

  type TestTuple = Tuple<string | undefined, TestObject>;
  let testTuples: TestTuple[];

  type TestMap = Map<string | undefined, TestObject[]>;
  let testMap: TestMap;

  beforeEach(() => {
    testObjects = [
      { a: 't', }, { a: 'u', }, { a: 't', }, { a: 'v', },
      { b: 'w', }, { b: 'w', }, { b: 'x', },
      { b: 'y', }, { b: 'x', }, { b: 'z', },
    ];
    testEntries = [
      ['t', [ { a: 't', }, { a: 'u', }, ],],
      ['u', [ { a: 'u', }, ],],
      ['v', [ { a: 'v', }, ],],
      [undefined, [
        { b: 'w', }, { b: 'w', }, { b: 'x', },
        { b: 'y', }, { b: 'x', }, { b: 'z', },
      ],],
    ];
    testTuples = [
      ['t', { a: 't', },],
      ['t', { a: 'u', },],
      ['u', { a: 'u', },],
      ['v', { a: 'v', },],
      [undefined, { b: 'w', },],
      [undefined, { b: 'w', },],
      [undefined, { b: 'x', },],
      [undefined, { b: 'y', },],
      [undefined, { b: 'x', },],
      [undefined, { b: 'z', },],
    ];
    testMap = new Map(testEntries);
  });


  describe('static', () => {
    describe('uniq', () => {
      it('should create a new array with only unique items from the source array', () => {
        const array = ['a', 'a', 'b', 'c', 'c', 'd',];
        const uniq = ArrayMap.uniq(array);
        expect(uniq.length).toBe(4);
        expect(uniq[0]).toBe('a');
        expect(uniq[1]).toBe('b');
        expect(uniq[2]).toBe('c');
        expect(uniq[3]).toBe('d');
        expect(uniq[4]).toBe(undefined);
      });
    });

    describe('getArrayEntriesPolyfill', () => {
      it('should create an iterator for array values', () => {
        const array = ['a', 'b', 'c', 'd',];
        const iterator = ArrayMap.getArrayEntriesPolyfill(array);
        expect(typeof iterator.next).toBe('function');
        expect(iterator.next().value).toEqual([0, 'a',]);
        expect(iterator.next().value).toEqual([1, 'b',]);
        expect(iterator.next().value).toEqual([2, 'c',]);
        expect(iterator.next().value).toEqual([3, 'd',]);
        expect(iterator.next().value).toEqual(undefined);
      });
    });

    describe('getMapEntriesPolyfill', () => {
      it('should create an iterator for map values', () => {
        const map = new Map([['a', 0,], ['b', 1,], ['c', 2,], ['d', 3,],]);
        const iterator = ArrayMap.getMapEntriesPolyfill(map);
        expect(typeof iterator.next).toBe('function');
        expect(iterator.next().value).toEqual(['a', 0,]);
        expect(iterator.next().value).toEqual(['b', 1,]);
        expect(iterator.next().value).toEqual(['c', 2,]);
        expect(iterator.next().value).toEqual(['d', 3,]);
        expect(iterator.next().value).toEqual(undefined);
      });
    });

    describe('calculateaIndex', () => {
      it('should calclate forward indexes', () => {
        expect(ArrayMap.calculateIndex(4, 0)).toBe(0);
        expect(ArrayMap.calculateIndex(4, 1)).toBe(1);
        expect(ArrayMap.calculateIndex(4, 2)).toBe(2);
        expect(ArrayMap.calculateIndex(4, 3)).toBe(3);
        expect(ArrayMap.calculateIndex(4, 4)).toBe(4);
      });

      it('should calculate reverse indexes', () => {
        expect(ArrayMap.calculateIndex(4, -1)).toBe(3);
        expect(ArrayMap.calculateIndex(4, -2)).toBe(2);
        expect(ArrayMap.calculateIndex(4, -3)).toBe(1);
        expect(ArrayMap.calculateIndex(4, -4)).toBe(0);
        expect(ArrayMap.calculateIndex(4, -5)).toBe(-1);
      });
    });

    describe('at', () => {
      it('should forward index array elements', () => {
        const array = ['a', 'b', 'c', 'd',];
        expect(ArrayMap.at(array, 0)).toBe('a');
        expect(ArrayMap.at(array, 1)).toBe('b');
        expect(ArrayMap.at(array, 2)).toBe('c');
        expect(ArrayMap.at(array, 3)).toBe('d');
        expect(ArrayMap.at(array, 4)).toBe(undefined);
      });

      it('should reverse index array elements', () => {
        const array = ['a', 'b', 'c', 'd',];
        expect(ArrayMap.at(array, -1)).toBe('d');
        expect(ArrayMap.at(array, -2)).toBe('c');
        expect(ArrayMap.at(array, -3)).toBe('b');
        expect(ArrayMap.at(array, -4)).toBe('a');
        expect(ArrayMap.at(array, -5)).toBe(undefined);
      });
    });

    describe('cloneEntry', () => {
      it('should clone an entry', () => {
        const entry = testEntries[0]!;
        const clone = ArrayMap.cloneEntry(entry);
        expect(clone).not.toBe(entry);
        expect(clone).toEqual(entry);
      });
    });

    describe('cloneEntries', () => {
      it('should clone array values', () => {
        const clonedEntries = ArrayMap.cloneEntries(testEntries);
        expect(clonedEntries.length).toBe(testEntries.length);
        expect(clonedEntries).not.toBe(testEntries);
        expect(clonedEntries).toEqual(testEntries);
        for (let i = 0; i < clonedEntries.length; i += 1) {
          expect(clonedEntries[i]).not.toBe(testEntries[i]);
          expect(clonedEntries[i]).toEqual(testEntries[i]);
        }
      });
    });

    describe('cloneMap', () => {
      it('should clone map values', () => {
        const clonedMap = ArrayMap.cloneMap(testMap);
        expect(clonedMap.size).toBe(testMap.size);
        expect(clonedMap).not.toBe(testMap);
        expect(clonedMap).toEqual(testMap);
        for (const [clonedKey, clonedValue,] of clonedMap) {
          expect(testMap.has(clonedKey)).toBe(true);
          expect(testMap.get(clonedKey)).not.toBe(clonedValue);
          expect(testMap.get(clonedKey)).toEqual(clonedValue);
        }
      });
    });

    describe('groupBy', () => {
      it('should group by a property key\'s values', () => {
        const key = Object.keys(testObjects)[0]!;
        const group = ArrayMap.groupBy(testObjects, key);

        const expectedKeys = Array.from(new Set(testObjects.map((to) => to[key])));
        const actualKeys = Array.from(group.keys());

        // verify keys are strictly similar
        expect(expectedKeys.length).toEqual(actualKeys.length);
        expect(expectedKeys).toEqual(actualKeys);

        // verify values are strictly similar
        for (const expectedKey of expectedKeys) {
          const expectedValues = testObjects.filter(obj => obj[key] === expectedKey);
          expect(expectedValues.length).not.toBe(0);
          expect(expectedValues).toEqual(group.get(expectedKey));
        }
      });

      it('should group by function result', () => {
        const key = (value: Record<string, string | undefined>): number => Array
          .from(Object.keys(value).join('_'))
          .reduce((a, n) => a + n.charCodeAt(0), 0);

        const group = ArrayMap.groupBy(testObjects, key);

        const expectedKeys = Array.from(new Set(testObjects.map(key)));
        const actualKeys = Array.from(group.keys());

        // verify keys are strictly similar
        expect(expectedKeys.length).toEqual(actualKeys.length);
        expect(expectedKeys).toEqual(actualKeys);

        // verify values are strictly similar
        for (const expectedKey of expectedKeys) {
          const expectedValues = testObjects.filter(obj => key(obj) === expectedKey);
          expect(expectedValues.length).not.toBe(0);
          expect(expectedValues).toEqual(group.get(expectedKey));
        }
      });
    });

    describe('fromMap', () => {
      it('should create an ArrayMap by cloning a Map', () => {
        const group = ArrayMap.fromMap(testMap);
        const groupMap = group.getMapRef();
        expect(groupMap).not.toBe(testMap);

        // expect keys and values to remain similar
        const expectedKeys = Array.from(testMap.keys());
        const actualKeys = Array.from(groupMap.keys());

        const expectedValues = Array.from(testMap.values());
        const actualValues = Array.from(groupMap.values());

        expect(actualKeys).toEqual(expectedKeys);
        expect(actualValues).toEqual(expectedValues);

        // expect all array values to be deeply equal but referentially unequal
        for (const expectedKey of expectedKeys) {
          const expectedValue = testMap.get(expectedKey)!;
          const actualValue = groupMap.get(expectedKey)!;
          expect(actualValue).not.toBe(expectedValue);
          expect(actualValue).toEqual(expectedValue);
        }
      });
    });

    describe('fromMapByRef', () => {
      it('should create an ArrayMap by referencing a Map', () => {
        const group = ArrayMap.fromMapByRef(testMap);
        const groupMap = group.getMapRef();
        expect(groupMap).toBe(testMap);

        // expect keys and values to remain similar
        const expectedKeys = Array.from(testMap.keys());
        const actualKeys = Array.from(groupMap.keys());
        expect(actualKeys).toEqual(expectedKeys);

        // expect all array values to be referentially unequal
        for (const expectedKey of expectedKeys) {
          const expectedValue = testMap.get(expectedKey)!;
          const actualValue = groupMap.get(expectedKey)!;
          expect(actualValue).toBe(expectedValue);
        }
      });
    });

    describe('fromTuples', () => {
      it('should create an ArrayMap from Tuples', () => {
        const group = ArrayMap.fromTuples(testTuples);

        for (const tuple of testTuples) {
          const [expectedKey, expectedValue,] = tuple;
          expect(group.has(expectedKey)).toBeTruthy();
          expect(group.get(expectedKey)!.includes(expectedValue)).toBeTruthy();
        }
      });
    });

    describe('fromEntries', () => {
      it('should create an ArrayMap by cloning Entries', () => {
        const group = ArrayMap.fromEntries(testEntries);

        for (const entry of testEntries) {
          const [expectedKey, expectedValues,] = entry;
          expect(group.has(expectedKey)).toBeTruthy();
          // expect refential inequality but deep equality
          expect(group.get(expectedKey)).not.toBe(expectedValues);
          expect(group.get(expectedKey)).toEqual(expectedValues);
        }
      });
    });

    describe('fromEntriesByRef', () => {
      it('should create an ArrayMap by referencing Entries', () => {
        const group = ArrayMap.fromEntriesByRef(testEntries);

        for (const entry of testEntries) {
          const [expectedKey, expectedValues,] = entry;
          expect(group.has(expectedKey)).toBeTruthy();
          // expect refential equality
          expect(group.get(expectedKey)!).toBe(expectedValues);
        }
      });
    });
  });

  describe('prototype', () => {
    describe('[Symbol.iterator]()', () => {
      it('returns an iterator of the entries in the ArrayMap', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let i = -1;
        for (const entry of group) {
          i += 1;
          expect(entry).toEqual(testEntries[i]);
        }
      });
    });

    describe('size', () => {
      it('should get the correct size', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const size: number = group.size;
        expect(size).toBe(testEntries.length);
      });
    });

    describe('clone', () => {
      it('should clone the internal map and array values', () => {
        const groupA = ArrayMap.fromEntries(testEntries);
        const groupB = groupA.clone();
        expect(groupA).not.toBe(groupB);
        expect(groupA).toEqual(groupB);
        for (const [key, value,] of groupA) {
          // expect referential inequality but deep equality
          expect(value).not.toBe(groupB.get(key));
          expect(value).toEqual(groupB.get(key));
        }
      });
    });

    describe('has', () => {
      it('should match with existing keys', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key,] = entry;
          expect(group.has(key)).toBeTruthy();
        }
        expect(group.has('__key_doesnt_exist__')).toBeFalsy();
      });
    });

    describe('hasAt', () => {
      it('should determine whether the key and value index exists', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key,values,] = entry;

          // forward index
          let i = -1;
          while ((i += 1) < values.length) { expect(group.hasAt(key, i)).toBeTruthy(); }
          expect(group.hasAt(key, i)).toBeFalsy();

          // negative index
          i = 0;
          while ((i -= 1) >= -values.length) { expect(group.hasAt(key, i)).toBeTruthy(); }
          expect(group.hasAt(key, i)).toBeFalsy();
        }
        expect(group.hasAt('__key_doesnt_exist__', 0)).toBeFalsy();
      });
    });

    describe('get', () => {
      it('should get the values at the key', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key,values,] = entry;
          expect(group.get(key)).toEqual(values);
        }
        expect(group.get('__key_doesnt_exist__')).toBeUndefined();
      });
    });

    describe('getAt', () => {
      it('should get the value at the key and values index', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key,values,] = entry;

          // forward index
          let i = -1;
          while ((i += 1) < values.length) { expect(group.getAt(key, i)).toEqual(values[i]); }
          expect(group.getAt(key, i)).toBeUndefined();

          // negative index
          i = 0;
          while ((i -= 1) >= -values.length) { expect(group.getAt(key, i)).toEqual(ArrayMap.at(values, i)); }
          expect(group.getAt(key, i)).toBeUndefined();
        }
        expect(group.getAt('__key_doesnt_exist__', 0)).toBeUndefined();
      });
    });

    describe('set', () => {
      it('should set the value at the key', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__new_key__';
        const object = [{ hello: 'world', },];
        group.set(key, object);
        expect(group.get(key)).toBe(object);
      });
    });

    describe('setAt', () => {
      it('should set the value of the key at the array index', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__new_key__';
        const object0 = { hello: 'world', };
        const object1 = { world: 'hello', };

        group.set(key, []);
        expect(group.hasAt(key, 0)).toBeFalsy();

        group.setAt(key, 0, object0);
        expect(group.getAt(key, 0)).toBe(object0);
        expect(group.hasAt(key, 1)).toBeFalsy();

        group.setAt(key, 1, object1);
        expect(group.getAt(key, 1)).toBe(object1);
      });
    });

    describe('delete', () => {
      it('shold delete the key from the ArrayMap', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const [key,] = testEntries[0]!;
        expect(group.has(key)).toBeTruthy();
        group.delete(key);
        expect(group.has(key)).toBeFalsy();
      });
    });

    describe('clear', () => {
      it('should remove all keys from the ArrayMap', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const [key,] = testEntries[0]!;
        expect(group.has(key)).toBeTruthy();
        expect(group.size).toBe(testEntries.length);
        group.clear();
        expect(group.has(key)).toBeFalsy();
        expect(group.size).toBe(0);
      });
    });

    describe('vacuum', () => {
      it('should remove keys with zero values from the ArrayMap', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let prevSize = group.size;
        for (const entry of group) {
          const [key, values,] = entry;
          // slice everything from values
          values.splice(0);
          group.vacuum();
          expect(group.size).toBe(prevSize - 1);
          expect(group.has(key)).toBeFalsy();
          prevSize = group.size;
        }
      });
    });

    describe('length', () => {
      it('should find the length of the array of values at a key', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of group) {
          const [key, values,] = entry;
          expect(group.length(key)).toBe(values.length);
        }
      });
    });

    describe('pop', () => {
      it('should extract the last item from the array of values at the key', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key, values,] = entry;
          for (let i = values.length - 1; i >= 0; i -= 1) {
            expect(group.pop(key)).toEqual(values[i]);
          }
          expect(group.length(key)).toBe(0);
        }
      });
      it('should return undefined if they key does not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.pop('__key_does_not_exist__')).toBeUndefined();
      });
    });

    describe('push', () => {
      it('should push values to the end of the key and index', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key, preValues,] = entry;
        const pushed = [{ this: 'is', }, { a: 'test', },];
        const out = group.push(key, ...pushed);
        expect(group.get(key)).toEqual([...preValues, ...pushed,]);
        expect(out).toBe(preValues.length + pushed.length);
      });

      it('should create and push to the key if it did not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__does_not_exist__';
        const pushed = [{ this: 'is', }, { a: 'test', },];
        expect(group.has(key)).toBeFalsy();
        const out = group.push(key, ...pushed);
        expect(group.has(key)).toBeTruthy();
        expect(group.get(key)).toEqual(pushed);
        expect(out).toBe(pushed.length);
      });
    });

    describe('concat', () => {
      it('shoud concatenate an existing values with the provided values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key, preValues,] = entry;
        const concatenating = [{ this: 'is', }, { a: 'test', },];
        expect(group.concat(key, concatenating)).toEqual([...preValues, ...concatenating,]);
        // does not modify the values
        expect(group.get(key)).toEqual(preValues);
      });

      it('should concatenate with an empty array if the key did not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__does_not_exist__';
        const concatenating = [{ this: 'is', }, { a: 'test', },];
        expect(group.has(key)).toBeFalsy();
        expect(group.concat(key, concatenating)).toEqual(concatenating);
        expect(group.has(key)).toBeFalsy();
      });
    });

    describe('reverseKeys', () => {
      it('should create a new ArrayMap with the keys in reverse order', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const reversed = group.reverseKeys();
        const reversedKeys = Array.from(reversed.keys());
        expect(reversedKeys.reverse()).toEqual(testEntries.map(([k,]) => k));
      });
    });

    describe('reverseValues', () => {
      it('should mutate the ArrayMap in place, reversing all values orderds', () => {
        const group = ArrayMap.fromEntries(testEntries);
        group.reverseValues();
        for (const entry of testEntries) {
          const [key, values,] = entry;
          expect(group.get(key)!.reverse()).toEqual(values);
        }
      });
    });

    describe('shift', () => {
      it('should extract a value from the beginning of a key\'s array', () => {
        const group = ArrayMap.fromEntries(testEntries);
        for (const entry of testEntries) {
          const [key, values,] = entry;
          for (let i = 0; i < values.length; i += 1) {
            expect(group.shift(key)).toEqual(values[i]);
          }
          expect(group.length(key)).toBe(0);
        }
      });
      it('should return undefined if used on a key that does not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.pop('__key_does_not_exist__')).toBeUndefined();
      });
    });

    describe('unshift', () => {
      it('should unshift values to the beginning of the key\'s values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key, preValues,] = entry;
        const unshifted = [{ this: 'is', }, { a: 'test', },];
        const out = group.unshift(key, ...unshifted);
        expect(group.get(key)).toEqual([ ...unshifted,...preValues,]);
        expect(out).toBe(unshifted.length + preValues.length);
      });

      it('should create and unshift to the key if it did not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__does_not_exist__';
        const unshifted = [{ this: 'is', }, { a: 'test', },];
        expect(group.has(key)).toBeFalsy();
        const out = group.unshift(key, ...unshifted);
        expect(group.has(key)).toBeTruthy();
        expect(group.get(key)).toEqual(unshifted);
        expect(out).toBe(unshifted.length);
      });
    });

    describe('indexOf', () => {
      it('should find the index of the value in the key\'s values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key, values,] = entry;
        const seen = new Set<any>();
        for (let i = 0; i < values.length; i += 1) {
          if (seen.has(values[i])) continue;
          expect(group.indexOf(key, values[i]!)).toBe(i);
          seen.add(values[i]);
        }
      });

      it('should return -1 if the value does not exist in the key\'s values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key,] = entry;
        expect(group.indexOf(key, { doesNot: 'exist', })).toBe(-1);
      });

      it('should return -1 if the key does not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__does_not_exist__';
        expect(group.indexOf(key, { doesNot: 'exist', })).toBe(-1);
      });
    });

    describe('lastIndexOf', () => {
      it('should find (from back-to-front) the index of the value in the key\'s values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key, values,] = entry;
        const seen = new Set<any>();
        for (let i = values.length - 1; i >= 0; i -= 1) {
          if (seen.has(values[i])) continue;
          console.log({ key, v: values[i], g1: group.getAt(key, i), g2: group.get(key), });
          expect(group.lastIndexOf(key, values[i]!)).toBe(i);
          seen.add(values[i]);
        }
      });

      it('should (from back-to-front) return -1 if the value does not exist in the key\'s values', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const entry = testEntries[0]!;
        const [key,] = entry;
        expect(group.lastIndexOf(key, { doesNot: 'exist', })).toBe(-1);
      });

      it('should (from back-to-front) return -1 if the key does not exist', () => {
        const group = ArrayMap.fromEntries(testEntries);
        const key = '__does_not_exist__';
        expect(group.lastIndexOf(key, { doesNot: 'exist', })).toBe(-1);
      });
    });

    describe('everyEntry', () => {
      it('should resolve true all resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.everyEntry(() => true)).toBeTruthy();
      });

      it('should resolve false if any resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.everyEntry(() => {
          if (first) {
            first = false;
            return false;
          }
          return true;
        })).toBeFalsy();
      });

      it('should check over every entry if truthy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.everyEntry((entry, entryIndex, entries) => {
          expect(entries).toEqual(testEntries);
          const expectedEntry = testEntries[entryIndex];
          expect(entry).toEqual(expectedEntry);
          lastEntryIndex = entryIndex;
          return true;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('everyTuple', () => {
      it('should resolve true all resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.everyTuple(() => true)).toBeTruthy();
      });

      it('should resolve false if any resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.everyTuple(() => {
          if (first) {
            first = false;
            return false;
          }
          return true;
        })).toBeFalsy();
      });

      it('should check over every tuple if truthy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.everyTuple((tuple, entryIndex, valueIndex, entries) => {
          const [actualKey, actualValue,] = tuple;
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;
          const expectedValue = expectedValues[valueIndex]!;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValue).toEqual(expectedValue);

          lastEntryIndex = entryIndex;
          return true;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('everyValue', () => {
      it('should resolve true all resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.everyValue(() => true)).toBeTruthy();
      });

      it('should resolve false if any resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.everyValue(() => {
          if (first) {
            first = false;
            return false;
          }
          return true;
        })).toBeFalsy();
      });

      it('should check over every value if truthy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.everyValue((actualValue, actualKey, entryIndex, valueIndex, entries) => {
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;
          const expectedValue = expectedValues[valueIndex]!;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValue).toEqual(expectedValue);

          lastEntryIndex = entryIndex;
          return true;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('everyKey', () => {
      it('should resolve true all resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.everyKey(() => true)).toBeTruthy();
      });

      it('should resolve false if any resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.everyKey(() => {
          if (first) {
            first = false;
            return false;
          }
          return true;
        })).toBeFalsy();
      });

      it('should check over every key if truthy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.everyKey((actualKey, actualValues, entryIndex, entries) => {
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValues).toEqual(expectedValues);

          lastEntryIndex = entryIndex;
          return true;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('someEntry', () => {
      it('should resolve false all resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.someEntry(() => false)).toBeFalsy();
      });

      it('should resolve true if any resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.someEntry(() => {
          if (first) {
            first = false;
            return true;
          }
          return false;
        })).toBeTruthy();
      });

      it('should check over every entry if falsy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.someEntry((entry, entryIndex, entries) => {
          expect(entries).toEqual(testEntries);
          const expectedEntry = testEntries[entryIndex];
          expect(entry).toEqual(expectedEntry);
          lastEntryIndex = entryIndex;
          return false;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('someTuple', () => {
      it('should resolve false all resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.someTuple(() => false)).toBeFalsy();
      });

      it('should resolve true if any resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.someTuple(() => {
          if (first) {
            first = false;
            return true;
          }
          return false;
        })).toBeTruthy();
      });

      it('should check over every tuple if falsy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.someTuple((tuple, entryIndex, valueIndex, entries) => {
          const [actualKey, actualValue,] = tuple;
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;
          const expectedValue = expectedValues[valueIndex]!;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValue).toEqual(expectedValue);

          lastEntryIndex = entryIndex;
          return false;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('someValue', () => {
      it('should resolve false all resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.someValue(() => false)).toBeFalsy();
      });

      it('should resolve true if any resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.someValue(() => {
          if (first) {
            first = false;
            return true;
          }
          return false;
        })).toBeTruthy();
      });

      it('should check over every value if falsy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.someValue((actualValue, actualKey, entryIndex, valueIndex, entries) => {
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;
          const expectedValue = expectedValues[valueIndex]!;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValue).toEqual(expectedValue);

          lastEntryIndex = entryIndex;
          return false;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('someKey', () => {
      it('should resolve false all resolve false', () => {
        const group = ArrayMap.fromEntries(testEntries);
        expect(group.someKey(() => false)).toBeFalsy();
      });

      it('should resolve true if any resolve true', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let first = true;
        expect(group.someKey(() => {
          if (first) {
            first = false;
            return true;
          }
          return false;
        })).toBeTruthy();
      });

      it('should check over every key if falsy', () => {
        const group = ArrayMap.fromEntries(testEntries);
        let lastEntryIndex = 0;
        group.someKey((actualKey, actualValues, entryIndex, entries) => {
          expect(entries).toEqual(testEntries);

          const expectedEntry = testEntries[entryIndex]!;
          const [expectedKey, expectedValues,] = expectedEntry;

          expect(actualKey).toEqual(expectedKey);
          expect(actualValues).toEqual(expectedValues);

          lastEntryIndex = entryIndex;
          return false;
        });
        expect(lastEntryIndex).toBe(testEntries.length - 1);
        expect(lastEntryIndex).toBe(group.size - 1);
      });
    });

    describe('mapEntries', () => {
      // TODO
    });

    describe('mapTuples', () => {
      // TODO
    });

    describe('mapValues', () => {
      // TODO
    });

    describe('mapKeys', () => {
      // TODO
    });

    describe('filterEntries', () => {
      // TODO
    });

    describe('filterTuples', () => {
      // TODO
    });

    describe('filterValues', () => {
      // TODO
    });

    describe('filterKeys', () => {
      // TODO
    });

    describe('sortValues', () => {
      // TODO
    });

    describe('sortKeys', () => {
      // TODO
    });

    describe('entries', () => {
      // TODO
    });

    describe('tuples', () => {
      // TODO
    });

    describe('keys', () => {
      // TODO
    });

    describe('arrays', () => {
      // TODO
    });

    describe('toEntries', () => {
      // TODO
    });

    describe('toTuples', () => {
      // TODO
    });

    describe('toKeys', () => {
      // TODO
    });

    describe('toArrays', () => {
      // TODO
    });

    describe('toValues', () => {
      // TODO
    });

    describe('toMap', () => {
      // TODO
    });

    describe('getMapRef', () => {
      // TODO
    });
  });
});
