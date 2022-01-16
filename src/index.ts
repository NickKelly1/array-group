export type KeyValues<K, V> = readonly [key: K, values: V[]];
export type KeyValue<K, V> = [key: K, value: V];

export type ROKeyValues<K, V> = readonly [key: K, values: readonly V[]];
export type ROKeyValue<K, V> = readonly [key: K, value: V];

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
  static uniq<T>(array: readonly T[]): T[] {
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
  static getArrayEntries<T>(array: readonly T[]): IterableIterator<[number, T]> {
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
  static * getArrayEntriesPolyfill<T>(array: readonly T[]): IterableIterator<[number, T]> {
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
  static at<T>(array: readonly T[], index: number): undefined | T {
    return array[ArrayMap.calculateIndex(array.length, index)];
  }


  /**
   * Create a shallow clone of the entry (key-values pair)
   *
   * The entry array itself and the values-arrays are cloned
   *
   * @param ref   ArrayMap instance to clone
   * @returns     new ArrayMap instance
   */
  static cloneEntry<K, V>(entry: ROKeyValues<K, V>): KeyValues<K, V> {
    const [key, values,] = entry;
    const clone: KeyValues<K, V> = [key, Array.from(values),];
    return clone;
  }


  /**
   * Clone the entries (key-values pairs)
   *
   * The array of entries (key-values pairs), each entry and the values-arrays
   * of each entry are cloned
   *
   * @param ref   entries (key-values pairs) to clone
   * @returns     shallow clone of the entries
   */
  static cloneEntries<K, V>(ref: readonly KeyValues<K, V>[]): KeyValues<K, V>[] {
    const clone: KeyValues<K, V>[] = ref.map(ArrayMap.cloneEntry);
    return clone;
  }


  /**
   * Create a new Map instance of entries (key-values pairs) by cloning an
   * existing Map instance of entries
   *
   * @param ref     Map instance of entries (key-values pairs) to clone
   * @returns       new Map instance with cloned values-arrays
   */
  static cloneMap<K, V>(ref: Map<K, V[]>): Map<K, V[]> {
    const entriesRef = Array.from(ArrayMap.getMapEntries(ref));
    const entriesCloned: KeyValues<K, V>[] = ArrayMap.cloneEntries(entriesRef);
    const mapCloned = new Map(entriesCloned);
    return mapCloned;
  }


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
  static groupBy<K, V>(array: readonly V[], by: K | ((value: V) => K)): ArrayMap<K, V> {
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
   * Create a new ArrayMap instance from a Map of arrays
   *
   * Clones the map and all its array values
   *
   * @param map   map of entries (key-values pairs) to clone and use in the
   *              ArrayMap
   * @returns     new ArrayMap instance
   */
  static fromMap<K, V>(map: Map<K, V[]>): ArrayMap<K, V> {
    return new ArrayMap(this.cloneMap(map));
  }


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
    return new ArrayMap(map);
  }


  /**
   * Create an ArrayMap instance from an array of entries (key-values pairs) by
   * grouping and concatenating the values of duplicate keys
   *
   * Clones the array values
   *
   * @param entries   array of entries (key-values pairs)
   * @returns         new ArrayMap instance
   */
  static fromEntries<K, V>(entries: readonly ROKeyValues<K, V>[]): ArrayMap<K, V> {
    const map: Map<K, V[]> = new Map();
    for (const [key, values,] of entries) {
      if (map.has(key)) map.get(key)!.push(...values);
      else map.set(key, Array.from(values));
    }
    return new ArrayMap<K, V>(map);
  }


  /**
   * Create an ArrayMap instance from an array of tuples (key-value pairs) by
   * grouping and concatenating the values of duplicate keys
   *
   * @param array   array of tuples (key-value pairs)
   * @returns       new ArrayMap instance
   */
  static fromTuples<K, V>(array: readonly ROKeyValue<K, V>[]): ArrayMap<K, V> {
    const map: Map<K, V[]> = new Map();
    for (const [key, value,] of array) {
      if (map.has(key)) map.get(key)!.push(value);
      else map.set(key, [value,]);
    }
    return new ArrayMap<K, V>(map);
  }


  /**
   * Create a new ArrayMap instance
   *
   * The ArrayMap instance holds the reference to the provided map and may
   * mutate it
   *
   * @param map reference to the underlying map
   */
  constructor(map?: Map<K, V[]> | null) {
    this._map = map ?? new Map<K, V[]>();
  }


  /**
   * Number of keys in the ArrayMap instance
   */
  get size(): number {
    return this._map.size;
  }

  /**
   * Create a new ArrayMap instance by cloning this ArrayMap instance
   *
   * Clones the internal Map instance used by the ArrayMap instance and the
   * values-arrays
   *
   * @returns   shallowly cloned ArrayMap instance
   */
  clone(): ArrayMap<K, V> {
    const clone = ArrayMap.fromEntries(Array.from(this.entries()));
    return clone;
  }


  /**
   * Return an iterator for the entries
   *
   * @returns
   */
  [Symbol.iterator](): IterableIterator<KeyValues<K, V>> {
    return this.entries();
  }


  /**
   * Does the key exist?
   *
   * @param key         target key
   * @returns           whether the key exists
   *
   * @see {@link Map.prototype.has}
   */
  has(key: K): boolean {
    return this._map.has(key);
  }


  /**
   * Does the values-array at the key have the element?
   *
   * @param key           target key
   * @param index         zero based (or -ve) target index
   * @returns             whether the key exists in the map
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
   * Get the values-array at the key
   *
   * @param key         target key
   * @returns           values-array
   *
   * @see {@link Map.prototype.get}
   */
  get(key: K): undefined | V[] {
    return this._map.get(key);
  }


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
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    return ArrayMap.at(gotten, index);
  }


  /**
   * Set the values-array at the key
   *
   * @param key     target key
   * @param value   values-array
   *
   * @see {@link Map.prototype.set}
   */
  set(key: K, values: V[]): void {
    this._map.set(key, values);
  }


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
  setAt(key: K, index: number, value: V): void {
    this._map.get(key)![index] = value;
  }


  /**
   * Delete the key
   *
   * @param key         target key
   * @returns           whether the key existed
   *
   * @see {@link Map.prototype.delete}
   */
  delete(key: K): boolean {
    return this._map.delete(key);
  }


  /**
   * Delete all keys
   *
   * @see {@link Map.prototype.clear}
   */
  clear(): void {
    return this._map.clear();
  }


  /**
   * Delete keys whose value-arrays have length zero
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
   * Returns undefined if the key does not exist
   *
   * @param key     target key
   * @returns       length of the values-array if it exists
   *
   * @see {@link Array.prototype.length}
   */
  length(key: K): undefined | number {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    return gotten.length;
  }


  /**
   * Pop the last element off the array at the key
   *
   * @param key     target key
   * @returns       value if it exists
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
   * Pop the last element off the array at the key
   *
   * Delete the key if it now has no elements
   *
   * @param key     target key
   * @returns       value if it exists
   *
   * @see {@link Array.prototype.push}
   */
  popVacuum(key: K): V | undefined {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    const popped = gotten.pop();
    if (!gotten.length) this._map.delete(key);
    return popped;
  }


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
  concat(key: K, ...values: readonly ConcatArray<V>[]): V[] {
    const gotten = this._map.get(key);
    if (!gotten) return ([] as V[]).concat(...values);
    return gotten.concat(...values);
  }


  /**
   * Create a new ArrayMap instance and reverse the order of its keys
   *
   * @param key       target get
   * @returns         new ArrayMap instance with keys reversed
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseKeys(): ArrayMap<K, V> {
    const reversedEntries = Array
      .from(this._map.keys())
      .reverse()
      .map(key => [key, this._map.get(key)!,] as KeyValues<K, V>);
    const reversedMap: Map<K, V[]> = new Map(reversedEntries);
    return new ArrayMap<K, V>(reversedMap);
  }


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
    const keys = this.toKeys().reverse();
    // delete and re-insert the maps keys in reversed order
    keys.forEach(key => {
      const values = this._map.get(key)!;
      this._map.delete(key);
      this._map.set(key, values);
    });
    return this;
  }


  /**
   * Create a new ArrayMap instance and sort its values
   *
   * @param key       target key
   * @returns         new ArrayMap instance with the values reversed
   *
   * @see {@link Array.prototype.reverse}
   */
  reverseValues(): ArrayMap<K, V> {
    const reversed = new Map<K, V[]>();
    for (const [key, values,] of this._map.entries()) {
      reversed.set(key, Array.from(values).reverse());
    }
    return new ArrayMap(reversed);
  }


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
  reverseValuesMut(): this {
    for (const values of this._map.values()) {
      values.reverse();
    }
    return this;
  }


  /**
   * Remove and return the first element of the values-array at the key if it
   * exists
   *
   * @param key     target key
   * @returns       value if it exists
   *
   * @see {@link Array.prototype.shift}
   */
  shift(key: K): V | undefined {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    const shifted = gotten.shift();
    return shifted;
  }


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
  shiftVacuum(key: K): V | undefined {
    const gotten = this._map.get(key);
    if (!gotten) return undefined;
    const shifted = gotten.shift();
    if (gotten.length === 0) this._map.delete(key);
    return shifted;
  }


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
  unshift(key: K, ...values: V[]): number {
    const gotten = this._map.get(key);
    if (gotten) return gotten.unshift(...values);
    this._map.set(key, values);
    return values.length;
  }


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
  indexOf(key: K, searchElement: V, fromIndex?: number): number {
    const gotten = this._map.get(key);
    if (!gotten) return -1;
    // indexOf may act differently given an undefined last argument...
    if (arguments.length === 2) return gotten?.indexOf(searchElement);
    else return gotten.indexOf(searchElement, fromIndex);
  }


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
    const gotten = this._map.get(key);
    if (!gotten) return -1;
    // lastIndexOf acts differently given an undefined last argument...
    if (arguments.length === 2) return gotten.lastIndexOf(searchElement);
    else return gotten.lastIndexOf(searchElement, fromIndex);
  }


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
  everyEntry(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .every((entry, entryIndex) => predicate
        .call(thisArg, entry, entryIndex, entries));
    return out;
  }


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
  everyTuple(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
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
  everyValue(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
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
  everyKey(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .every(([key, values,], entryIndex) => predicate
        .call(thisArg, key, values, entryIndex, entries));
    return out;
  }


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
  someEntry(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .some((entry, entryIndex) => predicate
        .call(thisArg, entry, entryIndex, entries));
    return out;
  }


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
  someTuple(
    predicate: (
      tuple: KeyValue<K, V>,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
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
  someValue(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
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
  someKey(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): boolean {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    const out = entries
      .some(([key, values,], entryIndex) => predicate
        .call(thisArg, key, values, entryIndex, entries));
    return out;
  }


  // /** @inheritdoc */
  // forEach(key: K, callbackfn: (value: V, index: number, map: V[]) => void, thisArg?: any): void {
  //   this._map.get(key)?.forEach(key, callbackfn);
  // }


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
  ): ArrayMap<L, U> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: ROKeyValues<L, U>[] = source
      .map((item, entryIndex) => callbackfn
        .call(thisArg, item, entryIndex, source));
    return ArrayMap.fromEntries(output);
  }


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
  ): ArrayMap<L, U> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    // flatMap is not available in all environments
    const output: ROKeyValue<L, U>[] = [];
    source
      .forEach(([key, values,], entryIndex) => values
        .forEach((value, valueIndex) => output
          .push(callbackfn.call(
            thisArg,
            [key, value,],
            entryIndex,
            valueIndex,
            source
          ))));
    return ArrayMap.fromTuples(output);
  }


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
  filterEntries(
    predicate: (
      entry: KeyValues<K, V>,
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: [K, V[]][] = source
      .filter((entry, entryIndex) => predicate
        .call(thisArg, entry, entryIndex, source));
    return ArrayMap.fromEntries(output);
  }


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
  filterTuples(
    predicate: (
      tuple: (KeyValue<K, V>),
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: KeyValue<K, V>[] = [];
    source
      .forEach(([key, values,], entryIndex) => values
        .forEach((value, valueIndex) => {
          const tuple: KeyValue<K, V> = [key, value,];
          if (predicate.call(thisArg, tuple, entryIndex, valueIndex, source)) {
            output.push(tuple);
          }
        }));
    return ArrayMap.fromTuples(output);
  }


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
  filterValues(
    predicate: (
      value: V,
      key: K,
      entryIndex: number,
      valueIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any,
  ): ArrayMap<K, V> {
    const source = Array.from(ArrayMap.getMapEntries(this._map));
    const output: KeyValue<K, V>[] = [];
    source.forEach(([key, values,], entryIndex) => values
      .forEach((value, valueIndex) => {
        const tuple: [K, V] = [key, value,];
        if (predicate.call(
          thisArg,
          value,
          key,
          entryIndex,
          valueIndex,
          source
        )) {
          output.push(tuple);
        }
      }));
    return ArrayMap.fromTuples(output);
  }


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
  filterKeys(
    predicate: (
      key: K,
      values: V[],
      entryIndex: number,
      entries: KeyValues<K, V>[]
    ) => boolean,
    thisArg?: any
  ): ArrayMap<K, V> {
    const source: KeyValues<K, V>[] = Array.from(ArrayMap.getMapEntries(this._map));
    const output: KeyValues<K, V>[] = source
      .filter(([key, values,], entryIndex) => predicate
        .call(thisArg, key, values, entryIndex, source));
    return ArrayMap.fromEntries(output);
  }


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
  ): ArrayMap<K, V> {
    const map = new Map<K, V[]>();
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    for (const [key, values,] of entries) {
      map.set(key, compareFn
        ? Array
          .from(values)
          .sort((a, b) => compareFn.call(thisArg, a, b, key))
        : Array
          .from(values)
          .sort()
      );
    }
    return new ArrayMap<K, V>(map);
  }


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
  ): this {
    const entries = Array.from(ArrayMap.getMapEntries(this._map));
    for (const [key, values,] of entries) {
      if (compareFn) values.sort((a, b) => compareFn.call(thisArg, a, b, key));
      else values.sort();
    }
    return this;
  }


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
  ): ArrayMap<K, V> {
    const keys = Array.from(this.keys());
    if (compareFn) keys
      .sort((a, b) => compareFn
        .call(thisArg, a, b, this.get(a)!, this.get(b)!));
    else keys.sort();
    const map = new Map(keys.map((key) => [key, this._map.get(key)!,]));
    return new ArrayMap(map);
  }


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
  ): this {
    const keys = Array.from(this.keys());
    if (compareFn) keys
      .sort((a, b) => compareFn
        .call(thisArg, a, b, this.get(a)!, this.get(b)!));
    else keys.sort();
    // reorder the arrays keys by deleting where they are and re-inserting at
    // the end, in the sorted order
    keys.forEach(key => {
      const values = this._map.get(key)!;
      this._map.delete(key);
      this._map.set(key, values);
    });
    return this;
  }


  /**
   * Get an iterator for entries (key-values pairs)
   */
  entries(): IterableIterator<KeyValues<K, V>> {
    return ArrayMap.getMapEntries(this._map);
  }


  /**
   * Get an iterator for tuples (key-value pairs)
   */
  * tuples(): IterableIterator<KeyValue<K, V>> {
    for (const [key, values,] of ArrayMap.getMapEntries(this._map)) {
      for (const value of values) {
        yield [key, value,];
      }
    }
  }


  /**
   * Get an iterator for the values-arrays
   */
  arrays(): IterableIterator<V[]> {
    return this._map.values();
  }


  /**
   * Get an iterator for the values
   */
  * values(): IterableIterator<V> {
    for (const values of this._map.values()) {
      for (const value of values) {
        yield value;
      }
    }
  }


  /**
   * Get an iterator for the keys
   */
  keys(): IterableIterator<K> {
    return this._map.keys();
  }


  /**
   * Create and return a new Array instance of the entries (key-values pairs)
   *
   * Clones the entry values-arrays
   *
   * @returns     new Array instance of entries
   */
  toEntries(): KeyValues<K, V>[] {
    return Array.from(this.entries()).map(ArrayMap.cloneEntry);
  }


  /**
   * Create and return an Array of the tuples (key-value pairs)
   *
   * @returns     new Array instance of tuples pairs
   */
  toTuples(): KeyValue<K, V>[] {
    return Array.from(this.tuples());
  }


  /**
   * Create and return a new Array instance of the values-arrays
   *
   * @returns     new Array instance of values-arrays
   */
  toArrays(): V[][] {
    return Array.from(this.arrays());
  }


  /**
   * Create and return a new Array instance of the values
   *
   * @returns     new Array instance of the values
   */
  toValues(): V[] {
    return Array.from(this.values());
  }


  /**
   * Create and return a new Array instance of the keys
   *
   * @returns     new Array instance of the keys
   */
  toKeys(): K[] {
    return Array.from(this.keys());
  }


  /**
   * Create and return a new Map instance of the entries (key-values pairs)
   *
   * Clones the ArrayMap instance's underlying map values-arrays
   *
   * @returns     new Map instance of entries
   */
  toMap(): Map<K, V[]> {
    return ArrayMap.cloneMap(this._map);
  }


  /**
   * Get a reference to the underlying map
   */
  getMapRef(): Map<K, V[]> {
    return this._map;
  }
}