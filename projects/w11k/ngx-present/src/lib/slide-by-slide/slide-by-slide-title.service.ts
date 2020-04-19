import { Injectable } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { skipNil } from '@w11k/rx-ninja';
import { combineLatest } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PresentationService } from '../core/presentation.service';
import { AdvancedTitleService } from '../core/title.service';
import { coordinatesToString } from './slide-by-slide.functions';
import { SlideBySlideService } from './slide-by-slide.service';

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideTitleService extends OnDestroyMixin {
  constructor(private readonly title: AdvancedTitleService,
              private readonly presentation: PresentationService,
              private readonly slideBySlide: SlideBySlideService) {
    super();
  }

  setupTitleSync(prefix: string) {
    const config$ = this.presentation.select(state => state.config)
      .pipe(
        untilComponentDestroyed(this),
      );

    const slide$ = this.slideBySlide.select(state => state.currentSlide)
      .pipe(
        skipNil(),
        untilComponentDestroyed(this)
      );

    combineLatest(slide$, config$)
      .pipe(
        delay(10), // wait for navigation to happen
        map(([slide, config]) => coordinatesToString(slide.coordinates, config.coordinates.separator)),
        map(coordinates => `${prefix} ${coordinates}`)
      )
      .subscribe(title => this.title.prefixTitle(title));
  }
}
