import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Coordinates, Slide } from '../core/presentation.types';

@Injectable()
export abstract class ActivatedSlide {
  slide: Observable<Slide>;
}

export class ActivatedSlideImpl implements ActivatedSlide {
  slide = new ReplaySubject<Slide>(1);
}

