import { Injectable, OnDestroy } from '@angular/core';
import { PresentationService } from '../core/presentation.service';
import { SlideBySlideService } from './slide-by-slide.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { combineLatest } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { coordinatesToString } from './slide-by-slide.functions';
import { skipNil } from '../core/rx-utils';
import { AdvancedTitleService } from '../core/title.service';

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideTitleService {
  constructor(private readonly title: AdvancedTitleService,
              private readonly presentation: PresentationService,
              private readonly slideBySlide: SlideBySlideService) {}

  setupTitleSync(prefix: string, terminator: OnDestroy) {
    const config$ = this.presentation.select(state => state.config)
      .bounded(toAngularComponent(terminator));

    const slide$ = this.slideBySlide.select(state => state.currentSlide)
      .pipe(skipNil)
      .bounded(toAngularComponent(terminator));

    combineLatest(slide$, config$)
      .pipe(
        delay(10), // wait for navigation to happen
        map(([slide, config]) => coordinatesToString(slide.coordinates, config.coordinates.separator)),
        map(coordinates => `${prefix} ${coordinates}`)
      )
      .subscribe(title => this.title.prefixTitle(title));
  }
}
