import { Coordinates, Slide, Slides } from '../core/presentation.types';
import { Mutator, ObservableSelection, Store } from '@w11k/tydux';
import { filter, map, take } from 'rxjs/operators';
import { calculateCoordinates, equalCoordinates, isValidCoordinate } from './slide-by-slide.functions';
import { combineLatest, Observable } from 'rxjs';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { filterNonNavigationEvent, KeyboardEventProcessor } from '../core/event.service';
import { PresentationService } from '../core/presentation.service';
import { flattenDeep, maxDepth } from '../core/utils';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';

export class SlideBySlideState {
  public coordinatesMaxDepth = 0;
  public slides: Slide[] = [];
  public currentSlide: Slide | undefined;

  constructor() {}
}

export class SlideBySlideMutator extends Mutator<SlideBySlideState> {

  constructor() {
    super();
  }

  setCurrentSlide(slide: Slide) {
    this.state.currentSlide = slide;
  }

  setSlides(slides: Slides) {
    this.state.coordinatesMaxDepth = maxDepth(slides);
    this.state.slides = flattenDeep(slides);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideService extends Store<SlideBySlideMutator, SlideBySlideState> implements OnDestroy {

  constructor(injector: Injector, private readonly presentation: PresentationService) {
    super('SlideBySlide', new SlideBySlideMutator(), new SlideBySlideState());

    this.presentation.select(state => state.slides)
      .bounded(toAngularComponent(this))
      .subscribe(slides => this.mutate.setSlides(slides));

    // this.mutatorEvents$.subscribe(event => event.action);
    // this.dispatchMutatorAction(action);
  }

  init() {
    if (!this.state.currentSlide) {
      this.navigateToFirst();
    }
  }

  navigateToNext(coordinatesToKeep: number) {
    this.nextSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide));
  }

  navigateToPrevious(coordinatesToKeep: number) {
    this.previousSlide(coordinatesToKeep)
      .pipe(take(1))
      .subscribe(slide => this.navigateAbsolute(slide));
  }

  previousSlide(coordinatesToKeep: number): Observable<Slide | undefined> {
    return this.navigateRelative(-1, coordinatesToKeep);
  }

  nextSlide(coordinatesToKeep: number): Observable<Slide | undefined> {
    return this.navigateRelative(1, coordinatesToKeep);
  }

  navigateRelative(move: number, coordinatesToKeep: number): Observable<Slide | undefined> {
    const currentSlide$ = this
      .selectNonNil(state => state.currentSlide)
      .unbounded();

    const slides$ = this
      .selectNonNil(state => state.slides)
      .pipe(
        filter(x => x.length !== 0),
      )
      .unbounded();

    const depth$ = this
      .selectNonNil(state => state.coordinatesMaxDepth)
      .unbounded();


    return combineLatest(slides$, currentSlide$, depth$)
      .pipe(
        map(([slides, current, depth]) => calculateCoordinates(slides, current, move, coordinatesToKeep, depth)),
      );
  }

  navigateAbsolute(target: Coordinates | Slide | undefined): boolean {
    let slide: Slide | undefined;

    if (target instanceof Slide) {
      slide = target;
    } else {
      slide = this.state.slides.find(x => equalCoordinates(target, x.coordinates));
    }

    if (slide) {
      this.mutate.setCurrentSlide(slide);
      return true;
    }

    return false;
  }

  navigateToFirst() {
    this.firstSlide()
      .unbounded()
      .pipe(take(1))
      .subscribe(slide => this.mutate.setCurrentSlide(slide));
  }

  firstSlide(): ObservableSelection<Slide> {
    return this.selectNonNil(state => state.slides)
      .pipe(
        filter(slides => slides.length > 0),
        map(slides => slides[0])
      );
  }

  isValidCoordinate(coordinates: Coordinates): ObservableSelection<boolean> {
    return this.presentation.selectNonNil(state => state.slides)
      .pipe(
        filter(slides => slides.length > 0),
        map(slides => isValidCoordinate(slides, coordinates))
      );
  }

  ngOnDestroy(): void {}
}

@Injectable()
export class NavigateSectionForward implements KeyboardEventProcessor {
  constructor(private readonly service: SlideBySlideService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(filterNonNavigationEvent),
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
        filter(filterNonNavigationEvent),
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
        filter(filterNonNavigationEvent),
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
        filter(filterNonNavigationEvent),
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
        filter(filterNonNavigationEvent),
        // pos 1
        filter(event => event.keyCode === 36)
      )
      .subscribe(() => {
        this.service.navigateToFirst();
      });
  }
}
