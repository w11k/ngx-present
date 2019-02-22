import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { SlideBySlideService } from './slide-by-slide.service';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { notNil } from '@w11k/rx-ninja';
import { filter } from 'rxjs/operators';

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
      .select((state => state.currentSlide))
      .pipe(
        filter(notNil),
        untilComponentDestroyed(this),
      );

    this.title.setupTitleSync('Slide');
  }

  ngOnDestroy(): void {}
}
