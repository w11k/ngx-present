import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Coordinates, Slide } from '../core/presentation.types';
import { SlideBySlideService } from './slide-by-slide.service';
import { SlideRouterService } from '../core/slide-router.service';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';

@Component({
  selector: 'ngx-present-slide-by-slide-route',
  templateUrl: './slide-by-slide-route.component.html',
  styleUrls: ['./slide-by-slide-route.component.scss']
})
export class SlideBySlideRouteComponent implements OnInit, OnDestroy {

  public slide$: Observable<Slide>;
  public coordinates$: Observable<Coordinates>;

  constructor(private readonly route: ActivatedRoute,
              private readonly slideRouter: SlideRouterService,
              private readonly service: SlideBySlideService,
              private readonly title: SlideBySlideTitleService) {

    this.slide$ = this.service
      .selectNonNil(state => state.currentSlide)
      .bounded(toAngularComponent(this));

    this.coordinates$ = this.service
      .selectNonNil(state => state.currentSlide && state.currentSlide.coordinates)
      .bounded(toAngularComponent(this));

    this.title.setupTitleSync('Slide', this);
  }

  ngOnInit() {
    this.slideRouter.syncActivatedRouteAndCurrentSlide('slide', this.route, this);
  }

  ngOnDestroy(): void {}
}
