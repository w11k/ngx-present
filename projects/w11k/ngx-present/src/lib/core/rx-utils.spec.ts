import { of } from 'rxjs';
import {
  skipNil,
  skipNull,
  skipPropertyNil,
  skipPropertyNull,
  skipPropertyUndefined,
  skipSomePropertyNil,
  skipUndefined
} from './rx-utils';
import { tap } from 'rxjs/operators';

// -----
// right now these are just compile time tests
// -----

const testValue = 'x' as string | undefined | null;

const testValue$ = of(testValue);

testValue$
  .pipe(skipNull)
  .pipe(skipUndefined)
  .pipe(tap(x => x.charAt(0)))
;

testValue$
  .pipe(skipNil)
  .pipe(tap(x => x.charAt(0)))
;

const testObj = {
  a: 'a' as string | null,
  b: 'b' as string | undefined,
  c: 'c' as string | undefined | null,
  d: 'd' as string,
  // d: 'd' as string | undefined,
};

const testObj$ = of(testObj);

testObj$
  .pipe(skipPropertyNull('a'))
  .pipe(skipPropertyUndefined('b'))
  .pipe(skipPropertyNil('c'))
  .pipe(tap(x => x.a.charAt(0)))
  .pipe(tap(x => x.b.charAt(0)))
  .pipe(tap(x => x.c.charAt(0)))
  .pipe(tap(x => x.d.charAt(0)))
;

testObj$
  .pipe(skipSomePropertyNil)
  .pipe(tap(x => x.a.charAt(0)))
  .pipe(tap(x => x.b.charAt(0)))
  .pipe(tap(x => x.c.charAt(0)))
  .pipe(tap(x => x.d.charAt(0)))
;
