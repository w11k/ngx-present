import { Coordinates } from '../core/presentation.types';
// import { ObservableSelection } from '@w11k/tydux';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SlideBySlideState } from './slide-by-slide.service';
import { StoreMock } from '../../test.utils';

@Injectable()
export class SlideBySlideServiceMock extends StoreMock<SlideBySlideState> {
  init() {}

  navigateToNext(coordinatesToKeep: number | undefined) {}

  navigateToPrevious(coordinatesToKeep: number | undefined) {}

  navigateToFirst() {}

  isValidCoordinate(coordinates: Coordinates): Observable<boolean> {
    return of(true);
  }
}
