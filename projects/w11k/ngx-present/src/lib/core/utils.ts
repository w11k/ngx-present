import { from, Observable, of } from 'rxjs';
import { concatMap, delay as rxDelay, scan } from 'rxjs/operators';

export function maxDepth<T>(value: ListOfRecursiveArraysOrValues<T>, currentDepth = -1): number {
  return value.reduce((depth, val) => {
    if (Array.isArray(val)) {
      const newDepth = maxDepth(val, currentDepth + 1);
      return max(newDepth, depth);
    }

    return depth;
  }, currentDepth + 1);
}

export function min(a: number, b: number, ...c: number[]): number {
  const values = [a, b, ...c];
  return values.reduce((x, y) => x > y ? y : x);
}

export function max(a: number, b: number, ...c: number[]): number {
  const values = [a, b, ...c];
  return values.reduce((x, y) => x > y ? x : y);
}

export function flattenDeep<T>(value: ListOfRecursiveArraysOrValues<T>, result: T[] = []): T[] {
  for (const element of value) {
    if (Array.isArray(element)) {
      flattenDeep(element, result);
    } else {
      result.push(element);
    }
  }

  return result;
}

export function mapDeep<T, U>(value: ListOfRecursiveArraysOrValues<T>, mapper: (x: T) => U): ListOfRecursiveArraysOrValues<U> {
  return value.map(lvl1 => {
    if (Array.isArray(lvl1)) {
      return mapDeep(lvl1, mapper);
    } else {
      return mapper(lvl1);
    }
  });
}

export function filterDeep<T>(list: ListOfRecursiveArraysOrValues<T>, predicate: (x: T) => boolean): ListOfRecursiveArraysOrValues<T> {
  const filtered: ListOfRecursiveArraysOrValues<T> = [];

  list.forEach(entry => {
    if (Array.isArray(entry)) {
      const nestedFiltered = filterDeep(entry, predicate);

      if (nestedFiltered.length > 0) {
        filtered.push(nestedFiltered);
      }
    } else if (predicate(entry)) {
      filtered.push(entry);
    }
  });

  return filtered;
}

export function mergeDeep<S1 extends { [key: string]: any }, S2 extends { [key: string]: any }>(s1: S1, ...sources: S2[]): S1 & S2 {
  const target: any = {};

  const s1AndSources = [s1, ...sources];

  for (const source of s1AndSources) {
    if (source === undefined) {
      continue;
    }

    const keys = Object.keys(source);
    for (const key of keys) {
      const sourceVal = source[key];
      const targetVal = target[key];

      const targetIsObj = typeof targetVal === 'object' && Array.isArray(targetVal) === false;
      const sourceIsObj = typeof sourceVal === 'object' && Array.isArray(sourceVal) === false;

      if (targetIsObj && sourceIsObj) {
        const merged = mergeDeep(targetVal, sourceVal);
        target[key] = merged;
      } else if (source.hasOwnProperty(key)) {
        target[key] = sourceVal;
      }
    }
  }

  return target;
}

/**
 * Deep flattens a list or recursive arrays or values. For each element in the top level list (parameter list)
 * the resulting observable will emit a new value with all previous values and the current one. Between each emit
 * there will be a delay (parameter delay).
 *
 * Example 1:
 * list: [1, 2, 3]
 * delay: 1000
 *
 * marble diagram of return value:
 * - equals 1 second
 * [1]-[1,2]-[1,2,3]|
 *
 * Example 2:
 * list: [1, [2, 3, 4], [5, 6, 7]]
 * delay: 1000
 *
 * marble diagram of return value:
 * - equals 1 second
 * [1]-[1,2,3,4]-[1,2,3,4,5,6,7]|
 *
 *
 * @param list list of nested values to flatten
 * @param delay milliseconds to wait before publish next value, default: array.length
 */
export function flattenDeepWithDelay<T>(list: ListOfRecursiveArraysOrValues<T>, delay?: number): Observable<T[]> {
  return from(list)
    .pipe(
      scan((acc, lvl1) => {
        return [...acc, ...flattenDeep(lvl1)];
      }, [] as T[]),
      // delay each event
      concatMap( x => of(x).pipe(rxDelay(delay || x.length))),
    );
}
