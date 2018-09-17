import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentationService } from '../core/presentation.service';
import { componentDestroyed, toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { SlideAndModeResolver } from '../core/slide-and-mode-resolver.service';
import { SlideBySlideTitleService } from '../slide-by-slide/slide-by-slide-title.service';

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

    this.currentSlide$ = this.slides.selectNonNil(state => state.currentSlide)
      .bounded(toAngularComponent(this));

    this.preview1$ = this.presentation
      .select(state => state.config.presenter.preview1)
      .pipe(
        switchMap(config => this.slides.navigateRelative(config.move, config.coordinatesToKeep))
      )
      .bounded(toAngularComponent(this));

    this.preview2$ = this.presentation
      .select(state => state.config.presenter.preview2)
      .pipe(
        switchMap(config => this.slides.navigateRelative(config.move, config.coordinatesToKeep))
      )
      .bounded(toAngularComponent(this));

    this.title.setupTitleSync('Presenter', this);
  }

  ngOnInit() {

    // TODO: move somewhere else
    this.route.queryParamMap
      .pipe(
        map(params => params.get('id')),
        takeUntil(componentDestroyed(this))
      )
      .subscribe(id => {
        if (id !== null) {
          this.presentation.dispatch.setId(id);
        }
      });
  }

  ngOnDestroy(): void {}
}
