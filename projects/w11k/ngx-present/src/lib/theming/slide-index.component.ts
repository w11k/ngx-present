import { Component } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PresentationService } from '../core/presentation.service';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';
import { ActivatedSlide } from '../slide/slide.service';


@Component({
  selector: 'ngx-present-slide-index',
  template: `{{coordinates$ | async}}`
})
export class SlideIndexComponent extends OnDestroyMixin {
  public coordinates$: Observable<string>;

  constructor(private readonly activatedSlide: ActivatedSlide,
              private readonly presentation: PresentationService) {
    super();

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
}
