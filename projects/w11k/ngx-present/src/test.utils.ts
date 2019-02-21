import { Observable, of } from 'rxjs';
import { notNil } from './lib/core/rx-utils';
import { filter } from 'rxjs/operators';

export class StoreMock<S> {
  constructor(public state: S) {}

  select<R>(selector?: (state: Readonly<S>) => R): Observable<R> {
    let val: any;
    if (selector !== undefined && this.state !== undefined) {
      val = selector(this.state);
    } else {
      val = this.state;
    }

    return of(val);
  }

  selectNonNil<R>(selector: (state: Readonly<S>) => R | null | undefined): Observable<R> {
    return this.select(selector).pipe(filter(notNil));
  }

}
