import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { skipNil } from '@w11k/rx-ninja';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';
import { SlideBySlideService } from './slide-by-slide.service';

@Component({
  selector: 'ngx-present-slide-by-slide-route',
  templateUrl: './slide-by-slide-route.component.html',
  styleUrls: ['./slide-by-slide-route.component.scss']
})
export class SlideBySlideRouteComponent extends OnDestroyMixin {

  public slide$: Observable<Slide>;

  constructor(private readonly route: ActivatedRoute,
              private readonly service: SlideBySlideService,
              private readonly title: SlideBySlideTitleService) {
    super();

    this.slide$ = this.service
      .select((state => state.currentSlide))
      .pipe(
        skipNil(),
        untilComponentDestroyed(this),
      );

    this.title.setupTitleSync('Slide');
  }
}
