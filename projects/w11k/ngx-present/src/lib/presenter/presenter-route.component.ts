import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentationService } from '../core/presentation.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { SlideAndModeResolver } from '../core/slide-and-mode-resolver.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { SlideBySlideTitleService } from '../slide-by-slide/slide-by-slide-title.service';
import { notNil } from '@w11k/rx-ninja';

@Component({
  selector: 'ngx-present-presenter-route',
  templateUrl: './presenter-route.component.html'
})
export class PresenterRouteComponent implements OnInit, OnDestroy {
  public currentSlide$: Observable<Slide>;
  public preview1$: Observable<Slide | undefined>;
  public preview2$: Observable<Slide | undefined>;

  constructor(private readonly route: ActivatedRoute,
              private readonly slideRouter: SlideAndModeResolver,
              private readonly presentation: PresentationService,
              private readonly slides: SlideBySlideService,
              private readonly title: SlideBySlideTitleService) {

    this.currentSlide$ = this.slides.select((state => state.currentSlide))
      .pipe(
        filter(notNil),
        untilComponentDestroyed(this)
      );

    this.preview1$ = this.presentation
      .select(state => state.config.presenter.preview1)
      .pipe(
        switchMap(config => this.slides.navigateRelative(config.move, config.coordinatesToKeep)),
        untilComponentDestroyed(this),
      )
    ;

    this.preview2$ = this.presentation
      .select(state => state.config.presenter.preview2)
      .pipe(
        switchMap(config => this.slides.navigateRelative(config.move, config.coordinatesToKeep)),
        untilComponentDestroyed(this),
      );

    this.title.setupTitleSync('Presenter');
  }

  ngOnInit() {

    // TODO: move somewhere else
    this.route.queryParamMap
      .pipe(
        map(params => params.get('id')),
        untilComponentDestroyed(this),
      )
      .subscribe(id => {
        if (id !== null) {
          this.presentation.dispatch.setId(id);
        }
      });
  }

  ngOnDestroy(): void {}
}
