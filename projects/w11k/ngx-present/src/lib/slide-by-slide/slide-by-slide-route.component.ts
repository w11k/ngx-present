import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../core/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Coordinates, Slide } from '../core/presentation.types';
import { delay, distinctUntilChanged, map, take } from 'rxjs/operators';
import { SlideBySlideService } from './slide-by-slide.service';
import { coordinatesToString, routeParamsToCoordinate } from './slide-by-slide.functions';
import { AdvancedTitleService } from '../core/title.service';

@Component({
  selector: 'ngx-present-slide-by-slide-route',
  templateUrl: './slide-by-slide-route.component.html',
  styleUrls: ['./slide-by-slide-route.component.scss']
})
export class SlideBySlideRouteComponent implements OnInit, OnDestroy {

  public slide$: Observable<Slide>;
  public coordinates$: Observable<Coordinates>;

  constructor(private readonly events: EventService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly title: AdvancedTitleService,
              private readonly service: SlideBySlideService) { }

  ngOnInit() {
    this.service.selectNonNil(state => state.currentSlide)
      .bounded(toAngularComponent(this))
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(slide => {
        this.router.navigate(['slide', ...slide.coordinates]);
      });

    this.route.params
      .pipe(
        take(1),
        map(params => routeParamsToCoordinate(params)),
      )
      .subscribe(coordinates => {
        this.service.navigateTo(coordinates);
      });

    this.slide$ = this.service.select(state => state.currentSlide)
      .bounded(toAngularComponent(this));

    this.slide$
      .pipe(
        delay(10) // wait for navigation to happen
      )
      .subscribe(slide => {
        if (slide !== null) {
          return this.title.prefixTitle(coordinatesToString(slide.coordinates));
        }
      });

    this.coordinates$ = this.service
      .select(state => state.currentSlide && state.currentSlide.coordinates)
      .bounded(toAngularComponent(this));
  }

  ngOnDestroy(): void {
  }

}
