
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

interface ListOfRecursiveArraysOrValues<T> extends Array<T | RecursiveArray<T>> {}

type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
};

interface Array<T> {
  isArray(x: any): x is RecursiveArray<T>;
}
