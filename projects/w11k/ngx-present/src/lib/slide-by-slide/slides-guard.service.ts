import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationStart, Router } from '@angular/router';
import { routeParamsToCoordinate } from './slide-by-slide.functions';
import { SlideBySlideService } from './slide-by-slide.service';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlidesGuardService implements CanActivate {

  constructor(private readonly service: SlideBySlideService,
              private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const coordinates = routeParamsToCoordinate(route.params);

    const isValid = this.service.isValidCoordinate(coordinates)
      .unbounded()
      .pipe(take(1));

    isValid
      .pipe(
        filter(x => !x),
        switchMap(() => {
          if (this.service.state.currentSlide) {
            return of(this.service.state.currentSlide);
          } else {
            return this.service.firstSlide().unbounded().pipe(take(1));
          }
        })
      )
      .subscribe(x => {
          console.info(`slide with coordinate ${JSON.stringify(coordinates)} does not exist, going to navigate to first slide`);

          let prefix = 'slide';

          const firstSegment = route.url[0];
          if (firstSegment !== undefined && firstSegment.path !== undefined) {
            prefix = firstSegment.path;
          }

          this.router.navigate([prefix, ...x.coordinates], { queryParamsHandling: 'merge' });
      });


    return isValid;
  }
}
