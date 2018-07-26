import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../core/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Coordinates, Slide } from '../core/presentation.types';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { SlideBySlideService } from './slide-by-slide.service';
import { equalCoordinates, routeParamsToCoordinate } from './slide-by-slide.functions';
import { AdvancedTitleService } from '../core/title.service';


@Component({
  selector: 'ngp-slide-by-slide-route',
  templateUrl: './slide-by-slide-route.component.html',
  styleUrls: ['./slide-by-slide-route.component.scss']
})
export class SlideBySlideRouteComponent implements OnInit, OnDestroy {

  public slide$: Observable<Slide>;
  public coordinates$: Observable<Coordinates>;

  constructor(private eventProcessor: EventService,
              private route: ActivatedRoute,
              private router: Router,
              private title: AdvancedTitleService,
              private service: SlideBySlideService) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => routeParamsToCoordinate(params)),
        distinctUntilChanged((a, b) => equalCoordinates(a, b)),
        map(coordinates => this.service.navigateTo(coordinates)),
        untilComponentDestroyed(this)
      )
      .subscribe(navigated => {
        if (!navigated) {
          this.service.navigateToFirst();
        }
      });

    this.slide$ = this.service.select(state => state.currentSlide)
      .bounded(toAngularComponent(this));

    this.slide$
      .pipe(
        delay(10) // wait for navigation to happen
      )
      .subscribe(slide => {
        if (slide !== null) {
          return this.title.prefixTitle(slide.coordinates.join(' / '));
        }
      });

    this.coordinates$ = this.service
      .select(state => state.currentSlide && state.currentSlide.coordinates)
      .bounded(toAngularComponent(this));
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPressed(event: KeyboardEvent) {
    this.eventProcessor.processKeyboardEvent(event);
  }

  ngOnDestroy(): void {
  }

}
