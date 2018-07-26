import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SlideBySlideService } from './slide-by-slide.service';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideGuardService implements CanActivate {

  constructor(private readonly service: SlideBySlideService,
              private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.service.selectNonNil(state => state.slides)
      .unbounded()
      .pipe(
        filter(slides => slides.length > 0),
        first()
      )
      .subscribe(slides => {
        this.router.navigate(['slide', ...slides[0].coordinates], { replaceUrl: true});
      });

    return false;
  }
}
