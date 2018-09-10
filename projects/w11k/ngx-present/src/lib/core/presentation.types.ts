import { Type } from '@angular/core';
import { Mutator } from '@w11k/tydux';
import { mergeDeep } from './utils';

export type SlideComponents = ListOfRecursiveArraysOrValues<Type<any>>;

export type Coordinates = number[];

export type Slides = ListOfRecursiveArraysOrValues<Slide>;

export class Slide {
  constructor(public readonly component: Type<any>,
              public readonly coordinates: Coordinates,
              public readonly index: number) {
  }
}

export const ngxPresentDefaultConfig = {
  sidebar: {
    tableOfContent: {
      enabled: true,
      showCoordinates: undefined as boolean | undefined,
      separator: undefined as string | undefined,
      depth: undefined as number | undefined
    }
  },
  tableOfContent: {
    showCoordinates: false,
    separator: ')',
    depth: undefined as number | undefined,
  },
  coordinates: {
    separator: '.'
  },
  title: {
    separator: ' / '
  }
};

export type NgxPresentConfig = typeof ngxPresentDefaultConfig;

export class PresentationState {

  public id: string;
  public config: NgxPresentConfig = ngxPresentDefaultConfig;
  public slides: Slides = [];
  public sideNavOpen = false;

  constructor() {
    const id = Math.random().toString(36).substr(2, 9);
    const chunks = id.match(/.{1,3}/g);

    if (!chunks) {
      throw new Error(`ID generation failed. Couldn't generate chunks from random string`);
    }

    this.id = chunks.join('-');
  }
}

export class PresentationMutator extends Mutator<PresentationState> {

  constructor() {
    super();
  }

  setSlides(slides: Slides) {
    this.state.slides = slides;
  }

  mergeConfig(config: RecursivePartial<NgxPresentConfig>) {
    this.state.config = mergeDeep(this.state.config, config);
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

  setId(id: string) {
    this.state.id = id;
  }
}


