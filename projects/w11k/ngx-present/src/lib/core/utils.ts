import { ListOfRecursiveArraysOrValues } from './presentation.types';

export function maxDepth<T>(value: ListOfRecursiveArraysOrValues<T>, currentDepth): number {
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
  const result = values.reduce((x, y) => x > y ? y : x);
  return result;
}

export function max(a: number, b: number, ...c: number[]): number {
  const values = [a, b, ...c];
  const result = values.reduce((x, y) => x > y ? x : y);
  return result;
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

