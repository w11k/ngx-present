import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { delay, first } from 'rxjs/operators';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideAndModeResolver implements Resolve<void> {

  constructor(private readonly router: Router,
              private readonly service: SlideBySlideService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<void> {
    this.service.setCurrentModeAndSlide(route);

    // TODO: improve by ask tydux for completion of mutation
    return of(null).pipe(delay(0), first());
  }



}
