import { ObservableSelection } from '@w11k/tydux';
import { of } from 'rxjs';
import { notNil } from './lib/core/rx-utils';
import { filter } from 'rxjs/operators';

export class StoreMock<S> {
  constructor(public state: S) {}

  select<R>(selector?: (state: Readonly<S>) => R): ObservableSelection<R> {
    let val: any;
    if (selector !== undefined && this.state !== undefined) {
      val = selector(this.state);
    } else {
      val = this.state;
    }

    return new ObservableSelection(of(val));
  }

  selectNonNil<R>(selector: (state: Readonly<S>) => R | null | undefined): ObservableSelection<R> {
    return this.select(selector).pipe(filter(notNil));
  }

}
