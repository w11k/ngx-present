import { Type } from '@angular/core';
import { Mutator } from '@w11k/tydux';

// copied from lodash
export interface RecursiveArray<T> extends Array<T|RecursiveArray<T>> {}
export interface ListOfRecursiveArraysOrValues<T> extends Array<T|RecursiveArray<T>> {}

export type SlideComponents = ListOfRecursiveArraysOrValues<Type<any>>;

export type Coordinates = number[];

export type Slides = ListOfRecursiveArraysOrValues<Slide>;

export class Slide {
  constructor(public readonly component: Type<any>,
              public readonly coordinates: Coordinates,
              public readonly index: number) {
  }
}

export class PresentationState {
  constructor(public slides: Slides,
              public sideNavOpen = false) {
  }
}

export class PresentationMutator extends Mutator<PresentationState> {

  constructor() {
    super();
  }

  setSlides(slides: Slides) {
    this.state.slides = slides;
  }

  toggleSideNav() {
    this.state.sideNavOpen = !this.state.sideNavOpen;
  }

  closeSideNav() {
    this.state.sideNavOpen = false;
  }

  openSideNav() {
    this.state.sideNavOpen = true;
  }
}


