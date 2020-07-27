
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

export interface ListOfRecursiveArraysOrValues<T> extends Array<T | RecursiveArray<T>> {}

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
};

// export interface ArrayConstructor<T> {
//   isArray(x: any): x is RecursiveArray<T>;
// }
