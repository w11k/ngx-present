import { Component, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedSlide } from '../slide/slide.service';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';
import { PresentationService } from '../core/presentation.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';


@Component({
  selector: 'ngx-present-slide-index',
  template: `{{coordinates$ | async}}`
})
export class SlideIndexComponent implements OnDestroy {
  public coordinates$: Observable<string>;

  constructor(private readonly activatedSlide: ActivatedSlide,
              private readonly presentation: PresentationService) {

    const config$ = this.presentation.select(state => state.config)
      .pipe(
        untilComponentDestroyed(this),);

    const coordinates$ = this.activatedSlide.slide.pipe(
      map(slide => slide.coordinates),
    );

    this.coordinates$ = combineLatest(config$, coordinates$)
      .pipe(
        map(([config, coordinates]) => coordinatesToString(coordinates, config.coordinates.separator))
      );
  }

  ngOnDestroy(): void {}
}
