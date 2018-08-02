import { ListOfRecursiveArraysOrValues } from './presentation.types';

export function maxDepth<T>(value: ListOfRecursiveArraysOrValues<T>, currentDepth = 0): number {
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

