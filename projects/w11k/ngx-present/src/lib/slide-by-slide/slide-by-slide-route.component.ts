import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { SlideBySlideService } from './slide-by-slide.service';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'ngx-present-slide-by-slide-route',
  templateUrl: './slide-by-slide-route.component.html',
  styleUrls: ['./slide-by-slide-route.component.scss']
})
export class SlideBySlideRouteComponent implements OnDestroy {

  public slide$: Observable<Slide>;

  constructor(private readonly route: ActivatedRoute,
              private readonly service: SlideBySlideService,
              private readonly title: SlideBySlideTitleService) {

    this.slide$ = this.service
      .selectNonNil(state => state.currentSlide)
      .pipe(
        untilComponentDestroyed(this),
      );

    this.title.setupTitleSync('Slide');
  }

  ngOnDestroy(): void {}
}
