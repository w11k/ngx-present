import { Observable } from 'rxjs';

export function maxDepth<T>(list: ListOfRecursiveArraysOrValues<T>): number {
  if (list.length === 0) {
    return 0;
  }

  function recursive(value: ListOfRecursiveArraysOrValues<T>, currentDepth: number): number {
    return value.reduce((depth, val) => {
      if (Array.isArray(val)) {
        const newDepth = recursive(val, currentDepth + 1);
        return max(newDepth, depth);
      }

      return depth;
    }, currentDepth + 1);
  }

  return recursive(list, 0);
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

export function mapDeep<T, U>(level0: ListOfRecursiveArraysOrValues<T>, mapper: (x: T) => U): ListOfRecursiveArraysOrValues<U> {
  return level0.map(level1 => {
    if (Array.isArray(level1)) {
      return mapDeep(level1, mapper);
    } else {
      return mapper(level1);
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

export function flattenDelayedWithAnimationFrame<T>(list: ListOfRecursiveArraysOrValues<T>): Observable<T[]> {
  const flatList = flattenDeep(list);

  const observable = new Observable<T[]>((subscriber) => {
    const k = 5;
    let i = k;

    const next = () => {
      subscriber.next(flatList.slice(0, i));
      i = i + k;

      if (i > flatList.length) {
        cancelAnimationFrame(frame);
        subscriber.complete();
      } else {
        frame = requestAnimationFrame(next);
      }
    };

    let frame = requestAnimationFrame(next);
  });

  return observable;
}

export function limitDepth<T>(list: ListOfRecursiveArraysOrValues<T>, depth: number | undefined): ListOfRecursiveArraysOrValues<T> {
  if (depth === undefined || depth < 0) {
    return list;
  }

  return recursive(list, depth);

  function recursive(value: ListOfRecursiveArraysOrValues<T>, depth_: number): ListOfRecursiveArraysOrValues<T> {
    if (depth_ === 0) {
      return [];
    }

    return value
      .map(x => {
        if (Array.isArray(x)) {
          return recursive(x, depth_ - 1);
        }

        return x;
      })
      .filter(x => (Array.isArray(x) && x.length === 0) === false);
  }
}
