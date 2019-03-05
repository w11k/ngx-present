import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { delay, first } from 'rxjs/operators';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Observable, ReplaySubject } from 'rxjs';

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
    const subject = new ReplaySubject<void>();
    subject.next();

    return subject.pipe(delay(0), first());
  }



}
