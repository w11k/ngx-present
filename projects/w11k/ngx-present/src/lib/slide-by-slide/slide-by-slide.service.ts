import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { skipNil, skipPropertyNil } from '@w11k/rx-ninja';
import { Commands, Facade } from '@w11k/tydux';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { isNotEditable, KeyboardEventProcessor, nonNavigationEvent } from '../core/event.service';
import { PresentationService } from '../core/presentation.service';
import { Coordinates, Slide, Slides } from '../core/presentation.types';
import { flattenDeep, maxDepth } from '../core/utils';
import { tableOfContentSlides } from '../theming/table-of-content';
import {
  calculateCoordinates,
  compareCoordinates,
  coordinateToSlideMap,
  equalCoordinates,
  isValidCoordinate,
  routeParamsToCoordinate,
} from './slide-by-slide.functions';

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
              private readonly presentation: PresentationService,
              private readonly router: Router) {
    super('SlideBySlide', new SlideBySlideState(), new SlideBySlideMutator());

    this.presentation.select(state => state.slides)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(slides => this.commands.setSlides(slides));
  }

  navigateToNext(coordinatesToKeep: number | undefined, mode?: string) {
    this.nextSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, mode));
  }

  navigateToPrevious(coordinatesToKeep: number | undefined, mode?: string) {
    this.previousSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, mode));
  }

  previousSlide(coordinatesToKeep: number | undefined, prefix?: string): Observable<Slide | undefined> {
    return this.navigateRelative(-1, coordinatesToKeep);
  }

  nextSlide(coordinatesToKeep: number | undefined): Observable<Slide | undefined> {
    return this.navigateRelative(1, coordinatesToKeep);
  }

  navigateToNextToc(mode?: string) {
    this.nextToc('forward')
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, mode));
  }

  navigateToPreviousToc(mode?: string) {
    this.nextToc('backward')
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide, mode));
  }

  nextToc(direction: 'forward' | 'backward'): Observable<Slide | undefined> {
    const currentSlide$ = this.select(state => state.currentSlide)
      .pipe(
        skipNil(),
      );

    const tocSlides$ = this.select(state => state.slides)
      .pipe(
        skipNil(),
        filter(x => x.length !== 0),
        map(tableOfContentSlides),
      );

    return combineLatest(currentSlide$, tocSlides$)
      .pipe(
        map(([currentSlide, tocSlides]) => {
          if (direction === 'forward') {
            return tocSlides.find(tocSlide => {
              return compareCoordinates(tocSlide.coordinates, currentSlide.coordinates) === 1;
            });
          } else {
            return tocSlides.slice().reverse().find(tocSlide => {
              return compareCoordinates(tocSlide.coordinates, currentSlide.coordinates) === -1;
            });
          }
        }),
      );
  }

  navigateRelative(move: number, coordinatesToKeep: number | undefined): Observable<Slide | undefined> {
    const currentSlide$ = this.select(state => state.currentSlide)
      .pipe(
        skipNil()
      );

    const slides$ = this.select(state => state.slides)
      .pipe(
        skipNil(),
        filter(x => x.length !== 0),
      );

    const depth$ = this.select(state => state.coordinatesMaxDepth)
      .pipe(
        skipNil()
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
      .pipe(
        take(1),
        takeUntil(this.onDestroy$),
      )
      .subscribe(slide => this.navigateAbsolute(slide, prefix));
  }

  firstSlide(): Observable<Slide> {
    return this.select(state => state.slides)
      .pipe(
        skipNil(),
        filter(slides => slides.length > 0),
        map(slides => slides[0])
      );
  }

  isValidCoordinate(coordinates: Coordinates): Observable<boolean> {
    return this.presentation.select(state => state.slides)
      .pipe(
        skipNil(),
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

  private readonly onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

@Injectable()
export class NavigateSectionForward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(isNotEditable),
        // arrow down + alt || arrow right + alt
        filter(event => {
          if (event.keyCode === 40 && event.altKey) {
            return true;
          } else if (event.keyCode === 39 && event.altKey) {
            return true;
          }

          return false;
        }),
      )
      .subscribe(() => {
        this.service.navigateToNextToc();
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
        // arrow down, arrow right, or page down
        filter(event => event.keyCode === 40 || event.keyCode === 39 || event.keyCode === 34)
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
        filter(isNotEditable),
        // arrow up + alt || arrow left + alt
        filter(event => {
          if (event.keyCode === 38 && event.altKey) {
            return true;
          } else if (event.keyCode === 37 && event.altKey) {
            return true;
          }

          return false;
        }),
      )
      .subscribe(() => {
        this.service.navigateToPreviousToc();
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
        // arrow up, arrow left or page up
        filter(event => event.keyCode === 38 || event.keyCode === 37 || event.keyCode === 33)
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

    const config$ = this.presentation.select(state => state.config.navigation.overview)
      .pipe(
        skipPropertyNil('component')
      );

    const slide$ = this.service.select()
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

    const slide$ = this.service.select();

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
