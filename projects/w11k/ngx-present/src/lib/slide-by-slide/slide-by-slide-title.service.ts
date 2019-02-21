import { Injectable, OnDestroy } from '@angular/core';
import { PresentationService } from '../core/presentation.service';
import { SlideBySlideService } from './slide-by-slide.service';
import { combineLatest } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { coordinatesToString } from './slide-by-slide.functions';
import { skipNil } from '../core/rx-utils';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AdvancedTitleService } from '../core/title.service';

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideTitleService implements OnDestroy {
  constructor(private readonly title: AdvancedTitleService,
              private readonly presentation: PresentationService,
              private readonly slideBySlide: SlideBySlideService) {}

  setupTitleSync(prefix: string) {
    const config$ = this.presentation.select(state => state.config)
      .pipe(
        untilComponentDestroyed(this),
      );

    const slide$ = this.slideBySlide.select(state => state.currentSlide)
      .pipe(skipNil, untilComponentDestroyed(this));

    combineLatest(slide$, config$)
      .pipe(
        delay(10), // wait for navigation to happen
        map(([slide, config]) => coordinatesToString(slide.coordinates, config.coordinates.separator)),
        map(coordinates => `${prefix} ${coordinates}`)
      )
      .subscribe(title => this.title.prefixTitle(title));
  }

  ngOnDestroy(): void {
  }

}
