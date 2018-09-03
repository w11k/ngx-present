import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, skip, skipUntil } from 'rxjs/operators';
import { equalCoordinates, routeParamsToCoordinate } from '../slide-by-slide/slide-by-slide.functions';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';

@Injectable({
  providedIn: 'root'
})
export class SlideRouterService {

  constructor(private readonly router: Router,
              private readonly service: SlideBySlideService) {
  }

  syncActivatedRouteAndCurrentSlide(routePrefix: string, route: ActivatedRoute, terminator: OnDestroy) {
    const coordinatesFromRoute$ = route.params
      .pipe(
        untilComponentDestroyed(terminator),
        map(params => routeParamsToCoordinate(params)),
        distinctUntilChanged((a, b) => equalCoordinates(a, b))
      );

    coordinatesFromRoute$.subscribe(x => {
      this.service.navigateAbsolute(x);
    });

    const currentSlide$ = this.service
      .selectNonNil(state => state.currentSlide)
      .bounded(toAngularComponent(terminator))
      .pipe(
        distinctUntilChanged(),
        skip(1),
        skipUntil(coordinatesFromRoute$),
      );

    currentSlide$.subscribe(x => {
      this.router.navigate([routePrefix, ...x.coordinates], { queryParamsHandling: 'merge' });
    });
  }

}
