import { Coordinates, Slide, Slides } from '../core/presentation.types';
import { Mutator, Store } from '@w11k/tydux';
import { filter, first, map } from 'rxjs/operators';
import { calculateCoordinates, equalCoordinates, isValidCoordinate } from './slide-by-slide.functions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { filterNonNavigationEvent, KeyboardEventProcessor } from '../core/event.service';
import { PresentationService } from '../core/presentation.service';
import { flattenDeep, maxDepth } from '../core/utils';

export class SlideBySlideState {
  public coordinatesMaxDepth = 0;
  public slides: Slide[] = [];
  public currentSlide: Slide | null = null;

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
    this.state.coordinatesMaxDepth = maxDepth(slides, 0);
    this.state.slides = flattenDeep(slides);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideService extends Store<SlideBySlideMutator, SlideBySlideState> {

  constructor(injector: Injector, router: Router, private readonly presentation: PresentationService) {
    super('SlideBySlide', new SlideBySlideMutator(), new SlideBySlideState());

    this.presentation.select(state => state.slides)
      .unbounded()
      .subscribe(slides => this.mutate.setSlides(slides));

    this.selectNonNil(state => state.currentSlide)
      .unbounded()
      .subscribe(slide => {
        // console.debug('PresentationService: received new coordinate from store, going to navigate via router', slide.coordinates);
        router.navigate(['slide', ...slide.coordinates]);
      });
  }

  navigateToNext(coordinatesToKeep: number) {
    const next = calculateCoordinates(this.state.slides, this.state.currentSlide, 1, coordinatesToKeep, this.state.coordinatesMaxDepth);
    this.navigateTo(next);
  }

  navigateToPrevious(coordinatesToKeep: number) {
    const next = calculateCoordinates(this.state.slides, this.state.currentSlide, -1, coordinatesToKeep, this.state.coordinatesMaxDepth);
    this.navigateTo(next);
  }

  navigateTo(target: Coordinates | Slide): boolean {
    let slide: Slide;

    if (target instanceof Slide) {
      slide = target;
    } else {
      slide = this.state.slides.find(slide => equalCoordinates(target, slide.coordinates));
    }

    if (slide) {
      this.mutate.setCurrentSlide(slide);
      return true;
    }

    return false;
  }

  navigateToFirst() {
    this.selectNonNil(state => state.slides)
      .unbounded()
      .pipe(
        filter(slides => slides.length > 0),
        first()
      )
      .subscribe(slides => this.mutate.setCurrentSlide(slides[0]));
  }

  isValidCoordinate(coordinates: Coordinates): Observable<boolean> {
    return this.presentation.selectNonNil(state => state.slides)
      .unbounded()
      .pipe(
        filter(slides => slides.length > 0),
        map(slides => isValidCoordinate(slides, coordinates)),
        first()
      );
  }
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
