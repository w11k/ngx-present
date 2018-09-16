import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Slide } from '../core/presentation.types';
import { SlideBySlideService } from './slide-by-slide.service';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';

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
      .bounded(toAngularComponent(this));

    this.title.setupTitleSync('Slide', this);
  }

  ngOnDestroy(): void {}
}
