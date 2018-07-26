import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { routeParamsToCoordinate } from './slide-by-slide.functions';
import { SlideBySlideService } from './slide-by-slide.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlidesGuardService implements CanActivate {

  constructor(private readonly service: SlideBySlideService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const coordinates = routeParamsToCoordinate(route.params);

    const isValid = this.service.isValidCoordinate(coordinates);

    isValid.subscribe(isValid => {
      if (!isValid) {
        console.warn(`slide with coordinate ${JSON.stringify(coordinates)} does not exist, going to navigate to first slide`);
        this.service.navigateToFirst();
      }
    });

    return isValid;
  }
}
