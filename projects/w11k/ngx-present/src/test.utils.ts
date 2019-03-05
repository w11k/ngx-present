import { Observable, of } from 'rxjs';

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

}
