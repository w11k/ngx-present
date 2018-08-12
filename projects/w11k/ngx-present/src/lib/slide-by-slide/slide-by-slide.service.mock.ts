import { Coordinates } from '../core/presentation.types';
import { ObservableSelection } from '@w11k/tydux';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SlideBySlideService } from './slide-by-slide.service';
import { StateMock } from '../../test.utils';

@Injectable()
class SlideBySlideServiceWithoutState implements Partial<SlideBySlideService> {

  init() {}

  navigateToNext(coordinatesToKeep: number) {}

  navigateToPrevious(coordinatesToKeep: number) {}

  navigateToFirst() {}

  isValidCoordinate(coordinates: Coordinates): ObservableSelection<boolean> {
    return new ObservableSelection(of(true));
  }
}

export const SlideBySlideServiceMock = StateMock(SlideBySlideServiceWithoutState);
