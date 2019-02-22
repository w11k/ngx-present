import { Coordinates, Slide, Slides } from '../core/presentation.types';
import { Commands, Facade, TyduxStore } from '@w11k/tydux';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import {
  calculateCoordinates,
  coordinateToSlideMap,
  equalCoordinates,
  isValidCoordinate,
  routeParamsToCoordinate
} from './slide-by-slide.functions';
import { combineLatest, Observable } from 'rxjs';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { isNotEditable, KeyboardEventProcessor, nonNavigationEvent } from '../core/event.service';
import { PresentationService } from '../core/presentation.service';
import { flattenDeep, maxDepth } from '../core/utils';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed'
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { notNil, skipPropertyNil } from '@w11k/rx-ninja';

export type Mode = 'slide' | 'presenter';

export class SlideBySlideState {
  public coordinatesMaxDepth = 0;
  public slides: Slide[] = [];
  public slideMap: { [key: string]: Slide } = {};
  public currentSlide: Slide | undefined;
  public currentMode: Mode | undefined;

  constructor() {}
}

export class SlideBySlideMutator extends Commands<SlideBySlideState> {

  constructor() {
    super();
  }

  setCurrentSlide(slide: Slide) {
    this.state.currentSlide = slide;
  }

  setCurrentMode(mode: Mode) {
    this.state.currentMode = mode;
  }

  setSlides(slides: Slides) {
    this.state.coordinatesMaxDepth = maxDepth(slides);
    this.state.slides = flattenDeep(slides);
    this.state.slideMap = coordinateToSlideMap(this.state.slides);
  }

}

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideService extends Facade<SlideBySlideState, SlideBySlideMutator> implements OnDestroy {

  constructor(injector: Injector,
              tydux: TyduxStore,
              private readonly presentation: PresentationService,
              private readonly router: Router) {
    super(tydux, 'SlideBySlide', new SlideBySlideMutator(), new SlideBySlideState());

    this.presentation.select(state => state.slides)
      .pipe(untilComponentDestroyed(this))
      .subscribe(slides => this.commands.setSlides(slides));
  }

  navigateToNext(coordinatesToKeep: number | undefined, prefix?: string) {
    this.nextSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, prefix));
  }

  navigateToPrevious(coordinatesToKeep: number | undefined, prefix?: string) {
    this.previousSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, prefix));
  }

  previousSlide(coordinatesToKeep: number | undefined, prefix?: string): Observable<Slide | undefined> {
    return this.navigateRelative(-1, coordinatesToKeep);
  }

  nextSlide(coordinatesToKeep: number | undefined): Observable<Slide | undefined> {
    return this.navigateRelative(1, coordinatesToKeep);
  }

  navigateRelative(move: number, coordinatesToKeep: number | undefined): Observable<Slide | undefined> {
    const currentSlide$ = this
      .select((state => state.currentSlide))
      .pipe(
        filter(notNil)
      );

    const slides$ = this
      .select((state => state.slides))
      .pipe(
        filter(notNil),
        filter(x => x.length !== 0),
      );

    const depth$ = this
      .select((state => state.coordinatesMaxDepth))
      .pipe(
        filter(notNil)
      );

    return combineLatest(slides$, currentSlide$, depth$)
      .pipe(
        map(([slides, current, depth]) => calculateCoordinates(slides, current, move, coordinatesToKeep, depth)),
      );
  }

  navigateAbsolute(target: Coordinates | Slide | undefined, mode?: string) {
    let slide: Slide | undefined;

    if (target instanceof Slide) {
      slide = target;
    } else {
      slide = this.state.slides.find(x => equalCoordinates(target, x.coordinates));
    }

    if (slide === undefined) {
      return;
    }

    let modeWithFallback: string | undefined;

    if (mode !== undefined) {
      modeWithFallback = mode;
    } else if (this.state.currentMode !== undefined) {
      modeWithFallback = this.state.currentMode;
    } else {
      modeWithFallback = 'slide';
    }

    const link = [ `/${modeWithFallback}`, ...slide.coordinates ];

    return this.router.navigate(link, { queryParamsHandling: 'merge' });
  }

  navigateToFirst(prefix?: string) {
    this.firstSlide()
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, prefix));
  }

  firstSlide(): Observable<Slide> {
    return this.select((state => state.slides))
      .pipe(
        filter(notNil),
        filter(slides => slides.length > 0),
        map(slides => slides[0])
      );
  }

  isValidCoordinate(coordinates: Coordinates): Observable<boolean> {
    return this.presentation.select((state => state.slides))
      .pipe(filter(notNil))
      .pipe(
        filter(slides => slides.length > 0),
        map(slides => isValidCoordinate(slides, coordinates))
      );
  }

  private coordinatesToSlide(coordinates: Coordinates): Slide {
    return this.state.slideMap[coordinates.join('.')];
  }

  setCurrentModeAndSlide(route: ActivatedRouteSnapshot) {
    const coordinates = routeParamsToCoordinate(route.params);
    const mode: Mode = route.url[0].path as Mode;
    const slide = this.coordinatesToSlide(coordinates);

    this.commands.setCurrentSlide(slide);
    this.commands.setCurrentMode(mode);
  }

  ngOnDestroy(): void {}
}

@Injectable()
export class NavigateSectionForward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(nonNavigationEvent),
        // arrow right
        filter(event => event.keyCode === 39)
      )
      .subscribe(() => {
        this.service.navigateToNext(-2);
      });
  }
}

@Injectable()
export class NavigateSlideForward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(nonNavigationEvent),
        // arrow down or page down
        filter(event => event.keyCode === 40 || event.keyCode === 34)
      )
      .subscribe(() => {
        this.service.navigateToNext(-1);
      });
  }
}

@Injectable()
export class NavigateSectionBackward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(nonNavigationEvent),
        // arrow left
        filter(event => event.keyCode === 37)
      )
      .subscribe(() => {
        this.service.navigateToPrevious(-2);
      });
  }
}

@Injectable()
export class NavigateSlideBackward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(nonNavigationEvent),
        // arrow up or page up
        filter(event => event.keyCode === 38 || event.keyCode === 33)
      )
      .subscribe(() => {
        this.service.navigateToPrevious(-1);
      });
  }
}

@Injectable()
export class NavigateToFirstSlide implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(nonNavigationEvent),
        // pos 1
        filter(event => event.keyCode === 36)
      )
      .subscribe(() => {
        this.service.navigateToFirst();
      });
  }
}

@Injectable()
export class NavigateToOverview implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService,
              private readonly presentation: PresentationService) {}

  init(events$: Observable<KeyboardEvent>) {

    const config$ = this.presentation
      .select(state => state.config.navigation.overview)
      .pipe(
        skipPropertyNil('component')
      );

    const slide$ = this.service
      .select(x => x)
      .pipe(
        withLatestFrom(config$),
        map(([state, config]) => state.slides.find(slide => slide.component === config.component))
      );

    events$
      .pipe(
        filter(nonNavigationEvent),
        // pos 1
        filter(event => {
          // o
          return event.keyCode === 79;
        }),
        withLatestFrom(slide$)
      )
      .subscribe(([event, slide]) => {
        this.service.navigateAbsolute(slide);
      });
  }
}

@Injectable()
export class TogglePresenter implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService,
              private readonly router: Router) {}

  init(events$: Observable<KeyboardEvent>) {

    const slide$ = this.service
      .select(x => x);
    events$
      .pipe(
        filter(isNotEditable),
        // letter p
        filter(event => event.keyCode === 80 && event.altKey),
        withLatestFrom(slide$)
      )
      .subscribe(([event, state]) => {
        let mode: Mode;

        if (state.currentMode === 'presenter') {
          mode = 'slide';
        } else {
          mode = 'presenter';
        }

        let coordinates: Coordinates = [];

        if (state.currentSlide !== undefined) {
          coordinates = state.currentSlide.coordinates;
        }

        const link = [mode, ...coordinates];
        this.router.navigate(link, { queryParamsHandling: 'merge'});
      });
  }
}
