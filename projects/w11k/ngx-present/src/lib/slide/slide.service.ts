import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Slide } from '../core/presentation.types';

@Injectable()
export abstract class ActivatedSlide {
  // will never be instantiated, assignment only to avoid undefined in type signature
  slide: Observable<Slide> = new ReplaySubject<Slide>(1);
}

export class ActivatedSlideImpl implements ActivatedSlide {
  slide = new ReplaySubject<Slide>(1);
}

