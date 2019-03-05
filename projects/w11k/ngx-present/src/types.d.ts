// referencing the declaration file does not work
// because of file copy to higher level during angular lib build
// -> copy the declaration here

import { Facade } from '@w11k/tydux';

declare global {
  namespace tydux_types {

    export type ViewTreeState<T> = {
      [K in keyof T]
      : T[K] extends Facade<infer S, any> ? S
        : T[K] extends object ? ViewTreeState<T[K]>
          : never;
    };

  }

  interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

  interface ListOfRecursiveArraysOrValues<T> extends Array<T | RecursiveArray<T>> {}

  type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
      T[P] extends object ? RecursivePartial<T[P]> :
        T[P];
  };
}

