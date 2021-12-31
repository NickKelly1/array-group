export type KeyValues<K, V> = [key: K, values: V[]];
export type KeyValue<K, V> = [key: K, value: V];

/**
 * Map of keys to arrays of values
 *
 * Represents a one-to-many relationship
 */
export class ArrayMap<K, V> implements ArrayMap<K, V> {
  protected readonly _map: Map<K, V[]>;


  /**
   * Return a array with only referentually unique items from the provided array
   *
   * @param array
   */
  static uniq<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }


  /**
   * Get an iterator for the Array's entries
   *
   * Falls forwards to {@link Array.prototype.entries}
   *
   * @param array
   * @returns
   */
  static getArrayEntries<T>(array: T[]): IterableIterator<[number, T]> {
    if (typeof Array.prototype.entries === 'function') {
      return array.entries();
    }
    return ArrayMap.getArrayEntriesPolyfill(array);
  }


  /**
   * Get an iterator for the Array's entries
   *
   * Polyfill for {@link Array.prototype.entries}
   *
   * @param array
   * @returns
   */
  static * getArrayEntriesPolyfill<T>(array: T[]): IterableIterator<[number, T]> {
    for (const key of array.keys()) {
      const value = array[key]!;
      yield [key, value,];
    }
  }


  /**
   * Get an iterator for the Map's entries
   *
   * Falls forwards to {@link Map.prototype.entries}
   *
   * @param array
   * @returns
   */
  static getMapEntries<K, V>(map: Map<K, V>): IterableIterator<[K, V]> {
    if (typeof Map.prototype.entries === 'function') {
      return map.entries();
    }
    return ArrayMap.getMapEntriesPolyfill(map);
  }


  /**
   * Get an iterator for the Map's entries
   *
   * Polyfill for {@link Map.prototype.entries}
   *
   * @param array
   * @returns
   */
  static * getMapEntriesPolyfill<K, V>(map: Map<K, V>): IterableIterator<[K, V]> {
    for (const key of map.keys()) {
      const value = map.get(key)!;
      yield [key, value,];
    }
  }


  /**
   * {@link Array.prototype.at}
   *
   * Calculate the positive index from a zero-based reverse indexable index
   *
   * @param length length of the list being indexed
   * @param index zero-based index to find
   * @returns strictly>0 index value
   */
  static calculateIndex(length: number, index: number): number {
    if (index >= 0) return index;
    return length + index;
  }


  /**
   * {@link Array.prototype.at}
   *
   * Get the element at the index
   *
   * Allows for negative indexing
   *
   * @param array array to search
   * @param index zero-based index to find
   * @returns resulting element
   */
  static at<T>(array: T[], index: number): undefined | T {
    return array[ArrayMap.calculateIndex(array.length, index)];
  }


  /**
   * Clone the entry
   *
   * @param ref   entry to clone
   * @returns     clone
   */
  static cloneEntry<K, V>(entry: KeyValues<K, V>): KeyValues<K, V> {
    const [key, values,] = entry;
    const clone: KeyValues<K, V> = [key, Array.from(values),];
    return clone;
  }


  /**
   * Clone the entries array
   *
   * @param ref   reference to entries
   * @returns     unreferenced clone of entries
   */
  static cloneEntries<K, V>(ref: KeyValues<K, V>[]): KeyValues<K, V>[] {
    const clone: KeyValues<K, V>[] = ref.map(ArrayMap.cloneEntry);
    return clone;
  }


  /**
   * Create a new Map by cloning a previous map and its array values
   *
   * @param ref
   */
  static cloneMap<K, V>(ref: Map<K, V[]>): Map<K, V[]> {
    const entriesRef = Array.from(ArrayMap.getMapEntries(ref));
    const entriesCloned: KeyValues<K, V>[] = ArrayMap.cloneEntries(entriesRef);
    const mapCloned = new Map(entriesCloned);
    return mapCloned;
  }


  /**
   * Create a new ArrayMap by grouping an array of objects by a key's
   * corresponding value and concatenating duplicates matches
   *
   * @param array
   * @param by
   * @returns
   */
  static groupBy<K extends keyof V, V>(array: V[], by: K): ArrayMap<V[K], V>;
  static groupBy<K, V>(array: V[], by: (value: V) => K): ArrayMap<K, V>;
  static groupBy<K, V>(array: V[], by: K | ((value: V) => K)): ArrayMap<K, V> {
    if (typeof by === 'function') {
      const map = new Map<K, V[]>();
      for (const value of array) {
        const key = (by as ((value: V) => K))(value);
        if (map.has(key)) map.get(key)!.push(value);
        else map.set(key, [value,]);
      }
      const arrayMap = new ArrayMap<K, V>(map);
      return arrayMap;
    }
    // by propertykey
    const map = new Map<V[keyof V], V[]>();
    for (const value of array) {
      const key = value[by as unknown as keyof V];
      if (map.has(key)) map.get(key)!.push(value);
      else map.set(key, [value,]);
    }
    const arrayMap = new ArrayMap<V[keyof V], V>(map);
    return arrayMap as unknown as ArrayMap<K, V>;
  }


  /**
   * Create a new ArrayMap from a Map
   *
   * Clones the map and all its array values
   *
   * @param map
   * @returns
   */
  static fromMap<K, V>(map: Map<K, V[]>): ArrayMap<K, V> {
    return new ArrayMap(this.cloneMap(map));
  }


  /**
   * Create a new ArrayMap from a Map
   *
   * Holds references from the provided map
   *
   * @param map
   * @returns
   */
  static fromMapByRef<K, V>(map: Map<K, V[]>): ArrayMap<K, V> {
    return new ArrayMap(map);
  }


  /**
   * Create an ArrayMap by grouping duplicate keys and concatenating values
   * of key-value tuples
   *
   * @param array array of key--value-array tuples
   * @returns array map
   */
  static fromTuples<K, V>(array: [K, V][]): ArrayMap<K, V> {
    const map: Map<K, V[]> = new Map();
    for (const [key, value,] of array) {
      if (map.has(key)) map.get(key)!.push(value);
      else map.set(key, [value,]);
    }
    return new ArrayMap<K, V>(map);
  }


  /**
   * Create a new ArrayMap by grouping duplicate keys and concatenating
   * array values of the entries
   *
   * Clones the array values
   *
   * @param entries
   * @returns
   */
  static fromEntries<K, V>(entries: [K, V[]][]): ArrayMap<K, V> {
    const map: Map<K, V[]> = new Map();
    for (const [key, values,] of entries) {
      if (map.has(key)) map.get(key)!.push(...values);
      else map.set(key, Array.from(values));
    }
    return new ArrayMap<K, V>(map);
  }


  /**
   * Create a new ArrayMap by grouping duplicate keys and concatenating
   * array values of the entries
   *
   * Holds reference from the provided array values
   *
   * @param entries
   * @returns
   */
  static fromEntriesByRef<K, V>(entries: [K, V[]][]): ArrayMap<K, V> {
    const map: Map<K, V[]> = new Map();
    for (const [key, values,] of entries) {
      if (map.has(key)) map.get(key)!.push(...values);
      else map.set(key, values);
    }
    return new ArrayMap<K, V>(map);
  }


  /**
   * Create a new ArrayMap
   *
   * @param map reference to the underlying map
   */
  constructor(map?: Map<K, V[]> | null) {
    this._map = map ?? new Map<K, V[]>();
  }


  /**
   * Number of keys in the array-map
   */
  get size(): number {
    return this._map.size;
  }

  /**
   * Clone a map's internal references, keys and values
   *
   * @returns unreferenced map
   */
  clone(): ArrayMap<K, V> {
    const clone = ArrayMap.fromEntries(Array.from(this.entries()));
    return clone;
  }


  /**
   * Return an iterator for the entries of the ArrayMap
   *
   * @returns
   */
  [Symbol.iterator](): IterableIterator<[K, V[]]> {
    return this.entries();
  }


  /**
   * Does the key have array values?
   *
   * @param key the key to search for
   * @returns whether the key exists in the map
   *
   * @see {@link Map.prototype.has}
   */
  has(key: K): boolean {
    return this._map.has(key);
  }


  /**
   * Does the array at the key have an item at the element?
   *
   * @param key the key to search for
   * @param valueIndex zero based index to find at
   * @returns whether the key exists in the map
   *
   * @see {@link Map.prototype.has}
   */
  hasAt(key: K, index: number): boolean {
    const gotten = this._map.get(key);
    if (!gotten) return false;
    // return false for array holes
    return ArrayMap.calculateIndex(gotten.length, index) in gotten;
  }


  /**
   * Get the array value at the key
   *
   * @param key the key whose value to get
   * @returns array at the key
   *
   * @see {@link Map.prototype.get}
   */
  get(key: K): undefined | V[] {
    return this._map.get(key);
  }


  /**
   * Get the array value at the key
   *
   * @param key the key whose value to get
   * @param valueIndex zero-based index to get, supports negative indexing
   * @returns value at the key and index
   *
   * @see {@link Map.prototype.get}
   */
  getAt(key: K, index: number): undefined | V {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    return ArrayMap.at(gotten, index);
  }


  /**
   * Set the array value at the key
   *
   * @param key the key whose value to set
   * @param value array of values to set
   *
   * @see {@link Map.prototype.set}
   */
  set(key: K, values: V[]): void {
    this._map.set(key, values);
  }


  /**
   * Set the array value at the key at the index
   *
   * @param key the key whose value to set
   * @param valueIndex the index to set
   * @param value array of values to set
   *
   * @see {@link Map.prototype.set}
   */
  setAt(key: K, index: number, value: V): void {
    this._map.get(key)![index] = value;
  }


  /**
   * Delete the key from the array-map
   *
   * @param key the key whose value to get
   * @returns whether items were deleted
   *
   * @see {@link Map.prototype.delete}
   */
  delete(key: K): boolean {
    return this._map.delete(key);
  }


  /**
   * Delete all items from the array-map
   *
   * @see {@link Map.prototype.clear}
   */
  clear(): void {
    return this._map.clear();
  }


  /**
   * Delete keys with zero length
   */
  vacuum(): this {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    for (const [key, values,] of entries) {
      if (!values.length) this._map.delete(key);
    }
    return this;
  }


  /**
   * Get the length of the array at the key
   *
   * @param key the key whose values to use
   *
   * @see {@link Array.prototype.length}
   */
  length(key: K): number {
    const gotten = this._map.get(key);
    if (!gotten) return 0;
    return gotten.length;
  }


  /**
   * Pop the last element off the array at the key
   *
   * @param key the key whose values to use
   * @returns popped off value
   *
   * @see {@link Array.prototype.push}
   */
  pop(key: K): V | undefined {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    const popped = gotten.pop();
    return popped;
  }


  /**
   * Append items to the array at the key
   * Mutates the value at the key
   *
   * Creates an entry for they key if non existed
   *
   * @param key the key whose values to use
   * @param values new elements to add to the array.
   *
   * @see {@link Array.prototype.push}
   */
  push(key: K, ...values: V[]): number {
    const gotten = this._map.get(key);
    if (!gotten) {
      this._map.set(key, values);
      return values.length;
    }
    return gotten.push(...values);
  }


  /**
   * Concatenate the given arrays with the array at the key
   * Does not mutate or rereference the value at the key
   *
   * @param key the key whose values to use
   * @param values additional arrays and/or items to add to the end of the array.
   *
   * @see {@link Array.prototype.concat}
   */
  concat(key: K, ...values: ConcatArray<V>[]): V[] {
    const gotten = this._map.get(key);
    if (!gotten) return ([] as V[]).concat(...values);
    return gotten.concat(...values);
  }


  /**
   * Reverse the order of all keys in the ArrayMap
   *
   * Returns a new ArrayMap with the new ordering
   *
   * @param key the key whose values to use
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseKeys(): ArrayMap<K, V> {
    return new ArrayMap(new Map(Array
      .from(this._map.keys())
      .reverse()
      .map(key => [key, this._map.get(key)!,])));
  }


  /**
   *
   * Reverse the order of all values in the ArrayMap
   *
   * Mutates array-values in-place
   *
   * Returns a reference to the original ArrayMap
   *
   * @param key the key whose values to use
   * @returns reference to this reversed array
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseValues(): this {
    for (const values of this._map.values()) {
      values.reverse();
    }
    return this;
  }


  /**
   * Remove the first element of the array at the key and return it
   *
   * @param key the key whose values to use
   *
   * @see {@link Array.prototype.shift}
   */
  shift(key: K): V | undefined {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    const shifted = gotten.shift();
    if (gotten.length === 0) this._map.delete(key);
    return shifted;
  }


  /**
   * Unshift elements to the start of the aarray at the key
   *
   * @param key the key whose value to get
   * @param values elements to insert at the start of the array.
   *
   * @see {@link Array.prototype.unshift}
   */
  unshift(key: K, ...values: V[]): number {
    const gotten = this._map.get(key);
    if (gotten) return gotten.unshift(...values);
    this._map.set(key, values);
    return values.length;
  }


  /**
   * Return the first index of the element in the array at the key
   *
   * @param key the key whose values to search
   * @param searchElement value to search for
   * @param fromIndex starting index to search from
   *
   * @see {@link Array.prototype.indexOf}
   */
  indexOf(key: K, searchElement: V, fromIndex?: number): number {
    const gotten = this._map.get(key);
    if (!gotten) return -1;
    // indexOf may act differently given an undefined last argument...
    if (arguments.length === 2) return gotten?.indexOf(searchElement);
    else return gotten.indexOf(searchElement, fromIndex);
  }


  /**
   *
   * Return the last index of the element in the array at the key
   *
   * @param key the key whose values to search
   * @param searchElement value to search for
   * @param fromIndex starting index to search from
   *
   * @see {@link Array.prototype.lastIndexOf}
   */
  lastIndexOf(key: K, searchElement: V, fromIndex?: number): number {
    const gotten = this._map.get(key);
    if (!gotten) return -1;
    // lastIndexOf acts differently given an undefined last argument...
    if (arguments.length === 2) return gotten.lastIndexOf(searchElement);
    else return gotten.lastIndexOf(searchElement, fromIndex);
  }


  /**
   * Do all entries resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if every entry resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyEntry<U extends V>(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => entry is KeyValues<K, U>),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyEntry(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  everyEntry(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries.every((entry, entryIndex) => predicate.call(thisArg, entry, entryIndex, entries));
    return out;
  }


  /**
   * Do all tuples resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if every tuple resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyTuple<U extends V>(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => tuple is KeyValue<K, U>),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyTuple(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  everyTuple(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .every(([key, values,], entryIndex) => values
        .every((value, valueIndex) => predicate
          .call(thisArg, [key, value,], entryIndex, valueIndex, entries)));
    return out;
  }


  /**
   * Do all values resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if every value resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyValue<U extends V>(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => value is U),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  everyValue(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  everyValue(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .every(([key, values,], entryIndex) => values
        .every((value, valueIndex) => predicate
          .call(thisArg, value, key, entryIndex, valueIndex, entries)));
    return out;
  }


  /**
   * Do all keys resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if every key resolves true
   *
   * @see {@link Array.prototype.every}
   */
  everyKey<L extends K>(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => key is L),
    thisArg?: any
  ): this is ArrayMap<L, K>;
  everyKey(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  everyKey(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .every(([key, values,], entryIndex) => predicate.call(thisArg, key, values, entryIndex, entries));
    return out;
  }


  /**
   * Do any of the entries resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if some entry resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someEntry<U extends V>(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => entry is KeyValues<K, U>),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someEntry(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  someEntry(
    predicate: ((entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries.some((entry, entryIndex) => predicate.call(thisArg, entry, entryIndex, entries));
    return out;
  }


  /**
   * Do any of tuples resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if some tuple resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someTuple<U extends V>(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => tuple is KeyValue<K, U>),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someTuple(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  someTuple(
    predicate: ((tuple: KeyValue<K, V>, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .some(([key, values,], entryIndex) => values
        .some((value, valueIndex) => predicate
          .call(thisArg, [key, value,], entryIndex, valueIndex, entries)));
    return out;
  }


  /**
   * Do any of values resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if some value resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someValue<U extends V>(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => value is U),
    thisArg?: any
  ): this is ArrayMap<K, U>;
  someValue(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  someValue(
    predicate: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .some(([key, values,], entryIndex) => values
        .some((value, valueIndex) => predicate
          .call(thisArg, value, key, entryIndex, valueIndex, entries)));
    return out;
  }


  /**
   * Do any of the keys resolve true for the given function?
   *
   * @param predicate testing function
   * @param thisArg this value for the testing function
   * @returns true if some key resolves true
   *
   * @see {@link Array.prototype.some}
   */
  someKey<L extends K>(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => key is L),
    thisArg?: any
  ): this is ArrayMap<L, K>;
  someKey(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean;
  someKey(
    predicate: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .some(([key, values,], entryIndex) => predicate.call(thisArg, key, values, entryIndex, entries));
    return out;
  }


  // /** @inheritdoc */
  // forEach(key: K, callbackfn: (value: V, index: number, map: V[]) => void, thisArg?: any): void {
  //   this._map.get(key)?.forEach(key, callbackfn);
  // }


  /**
   * Create a new ArrayMap by mapping key--value-array tuples to new key--value-array tuples
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.map}
   */
  mapEntries<L, U>(
    callbackfn: (( value: (KeyValues<K, V>), entryIndex: number, entries: KeyValues<K, V>[]) => KeyValues<L, U>),
    thisArg?: any
  ): ArrayMap<L, U> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [L, U[]][] = source
      .map((item, entryIndex) => callbackfn
        .call(thisArg, item, entryIndex, source));
    return ArrayMap.fromEntries(output);
  }


  /**
   * Create a new ArrayMap by mapping flattened key-value tuples to new key-value tuples
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.map}
   */
  mapTuples<L, U>(
    callbackfn: (( value: (KeyValue<K, V>), entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => KeyValue<L, U>),
    thisArg?: any
  ): ArrayMap<L, U> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    // flatMap is not available in all environments
    const output: [L, U][] = [];
    source
      .forEach(([key, values,], entryIndex) => values
        .forEach((value, valueIndex) => output
          .push(callbackfn.call(thisArg, [key, value,], entryIndex, valueIndex, source))));
    return ArrayMap.fromTuples(output);
  }


  /**
   * Create a new ArrayMap by mapping flattened values
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.map}
   */
  mapValues<U>(
    callbackfn: (value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => U,
    thisArg?: any,
  ): ArrayMap<K, U> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    // flatMap is not available in all environments
    const output: [K, U][] = [];
    source
      .forEach(([key, values,], i) => values
        .forEach((value, j) => output
          .push([key, callbackfn.call(thisArg, value, key, i, j, source),])));
    return ArrayMap.fromTuples(output);
  }


  /**
   * Create a new ArrayMap by mapping keys
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.map}
   */
  mapKeys<L>(
    callbackfn: (key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => L,
    thisArg?: any
  ): ArrayMap<L, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [L, V[]][] = source
      .map(([key, values,], i) => [
        callbackfn.call(thisArg, key, values, i, source),
        values,
      ]);
    return ArrayMap.fromEntries(output);
  }


  /**
   * Create a new ArrayMap by filtering key--value-array tuples
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.filter}
   */
  filterEntries<U extends V>(
    callbackfn: ((entry: (KeyValues<K, V>), entryIndex: number, entries: KeyValues<K, V>[]) => entry is KeyValues<K, U>),
    thisArg?: any
  ): ArrayMap<K, U>;
  filterEntries(
    callbackfn: (entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean,
    thisArg?: any
  ): ArrayMap<K, V>
  filterEntries(
    callbackfn: (entry: KeyValues<K, V>, entryIndex: number, entries: KeyValues<K, V>[]) => boolean,
    thisArg?: any
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [K, V[]][] = source
      .filter((entry, entryIndex) => callbackfn
        .call(thisArg, entry, entryIndex, source));
    return ArrayMap.fromEntries(output);
  }


  /**
   * Create a new ArrayMap by filtering flattened key-value tuples
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.filter}
   */
  filterTuples<U extends V>(
    callbackfn: ((tuple: (KeyValue<K, V>), entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => tuple is KeyValue<K, U>),
    thisArg?: any
  ): ArrayMap<K, U>;
  filterTuples(
    callbackfn: ((tuple: (KeyValue<K, V>), entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<K, V>;
  filterTuples(
    callbackfn: ((tuple: (KeyValue<K, V>), entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [K, V][] = [];
    source.forEach(([key, values,], entryIndex) => values.forEach((value, valueIndex) => {
      const tuple: [K, V] = [key, value,];
      if (callbackfn.call(thisArg, tuple, entryIndex, valueIndex, source)) {
        output.push(tuple);
      }
    }));
    return ArrayMap.fromTuples(output);
  }


  /**
   * Create a new ArrayMap by filtering flattened values
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.filter}
   */
  filterValues<U extends V>(
    callbackfn: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => value is U),
    thisArg?: any
  ): ArrayMap<K, U>;
  filterValues(
    callbackfn: ((value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<K, V>;
  filterValues(
    callbackfn: (value: V, key: K, entryIndex: number, valueIndex: number, entries: KeyValues<K, V>[]) => boolean,
    thisArg?: any,
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [K, V][] = [];
    source.forEach(([key, values,], entryIndex) => values.forEach((value, valueIndex) => {
      const tuple: [K, V] = [key, value,];
      if (callbackfn.call(thisArg, value, key, entryIndex, valueIndex, source)) {
        output.push(tuple);
      }
    }));
    return ArrayMap.fromTuples(output);
  }


  /**
   * Create a new ArrayMap by filtering keys
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.filter}
   */
  filterKeys<L extends K>(
    callbackfn: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<L, V>;
  filterKeys(
    callbackfn: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<K, V>;
  filterKeys(
    callbackfn: ((key: K, values: V[], entryIndex: number, entries: KeyValues<K, V>[]) => boolean),
    thisArg?: any
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [K, V][] = [];
    source.filter(([key, values,], entryIndex) =>  callbackfn.call(thisArg, key, values, entryIndex, source));
    return ArrayMap.fromTuples(output);
  }


  /**
   * Mutate the ArrayMap by sorting keys in-place
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.sort}
   */
  sortValues(
    compareFn?: (a: V, b: V, key: K) => number,
    thisArg?: any
  ): this {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    for (const [key, values,] of entries) {
      if (compareFn) values.sort((a, b) => compareFn.call(thisArg, a, b, key));
      else values.sort();
    }
    return this;
  }


  /**
   * Create a new ArrayMap by sorting keys
   *
   * @param callbackfn transformation function
   * @param thisArg `this` callback
   * @returns new ArrayMap
   *
   * @see {@link Array.prototype.sort}
   */
  sortKeys(
    compareFn?: (a: K, b: K, aValues: V[], bValues: V[]) => number,
    thisArg?: any,
  ): ArrayMap<K, V> {
    const keys = Array.from(this.keys());
    if (compareFn) keys.sort((a, b) => compareFn.call(thisArg, a, b, this.get(a)!, this.get(b)!));
    else keys.sort();
    const map = new Map(keys.map((key) => [key, this._map.get(key)!,]));
    return new ArrayMap(map);
  }


  /**
   * Returns an iterator for entries in the map
   */
  entries(): IterableIterator<[K, V[]]> {
    return ArrayMap.getMapEntries(this._map);
  }

  /**
   * Returns an iterator for tuples in the map
   */
  * tuples(): IterableIterator<[K, V]> {
    for (const [key, values,] of ArrayMap.getMapEntries(this._map)) {
      for (const value of values) {
        yield [key, value,];
      }
    }
  }

  /**
   * Returns an iterator for the keys in the map
   */
  keys(): IterableIterator<K> {
    return this._map.keys();
  }

  /**
   * Returns an iterator for the array-values in the map
   */
  arrays(): IterableIterator<V[]> {
    return this._map.values();
  }

  /**
   * Returns an iterator for the values in the map (flattened)
   */
  * values(): IterableIterator<V> {
    for (const values of this._map.values()) {
      for (const value of values) {
        yield value;
      }
    }
  }


  /**
   * Transform to entries
   *
   * Clones the entry value arrays
   *
   * @returns entries
   */
  toEntries(): KeyValues<K, V>[] {
    return Array.from(this.entries()).map(ArrayMap.cloneEntry);
  }


  /**
   * Transform to tuples
   *
   * @returns tuples
   */
  toTuples(): KeyValue<K, V>[] {
    return Array.from(this.tuples());
  }


  /**
   * Transform to keys
   *
   * @returns keys
   */
  toKeys(): V[][] {
    return Array.from(this.arrays());
  }


  /**
   * Transform to tuples
   *
   * @returns array of arrays
   */
  toArrays(): V[][] {
    return Array.from(this.arrays());
  }


  /**
   * Transform to tuples
   *
   * @returns values
   */
  toValues(): V[] {
    return Array.from(this.values());
  }


  /**
   * Return the underlying map of the ARrayMap
   *
   * Clones the map and its entry arrays
   *
   * @returns map of entries
   */
  toMap(): Map<K, V[]> {
    return ArrayMap.cloneMap(this._map);
  }


  /**
   * Return the underlying map of the ARrayMap
   */
  getMapRef(): Map<K, V[]> {
    return this._map;
  }
}