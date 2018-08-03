import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../core/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Coordinates, Slide } from '../core/presentation.types';
import { delay, distinctUntilChanged, map, skip, skipUntil } from 'rxjs/operators';
import { SlideBySlideService } from './slide-by-slide.service';
import { coordinatesToString, equalCoordinates, routeParamsToCoordinate } from './slide-by-slide.functions';
import { AdvancedTitleService } from '../core/title.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';


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

    const coordinatesFromRoute$ = this.route.params
      .pipe(
        untilComponentDestroyed(this),
        map(params => routeParamsToCoordinate(params)),
        distinctUntilChanged((a, b) => equalCoordinates(a, b))
      );

    coordinatesFromRoute$.subscribe(x => {
      this.service.navigateTo(x);
    });

    const currentSlide$ = this.service
      .selectNonNil(state => state.currentSlide)
      .bounded(toAngularComponent(this))
      .pipe(
        distinctUntilChanged(),
        skip(1),
        skipUntil(coordinatesFromRoute$),
      );

    currentSlide$.subscribe(x => {
      this.router.navigate(['slide', ...x.coordinates]);
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
