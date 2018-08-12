import { ObservableSelection } from '@w11k/tydux';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

type Constructor<T = {}> = new (...args: any[]) => T;

export function StateMock<S, Base extends Constructor>(base: Base) {
  @Injectable()
  class Mocked extends base {
    select(): ObservableSelection<Readonly<S>>;
    select<R>(selector: (state: Readonly<S>) => R): ObservableSelection<R>;

    select<R>(selector?: (state: Readonly<S>) => R) {
      const defined = base.prototype.hasOwnProperty('select');
      if (defined && selector !== undefined) {
        return (this as any).__proto__.select(selector);
      } else if (defined) {
        return (this as any).__proto__.select();
      }

      return new ObservableSelection(EMPTY);
    }

    selectNonNil<R>(selector: (state: Readonly<S>) => R | null | undefined): ObservableSelection<R> {
      const defined = base.prototype.hasOwnProperty('selectNonNil');
      if (defined) {
        return (this as any).__proto__.selectNonNil(selector);
      }

      return new ObservableSelection(EMPTY);
    }
  }

  return Mocked;
}
