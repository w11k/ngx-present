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
  },
  navigation: {
    overview: {
      component: undefined as Type<any> | undefined
    }
  },
  presenter: {
    preview1: {
      move: 1,
      coordinatesToKeep: -1
    },
    preview2: {
      move: 2,
      coordinatesToKeep: -1
    }
  }
};

export type NgxPresentConfig = typeof ngxPresentDefaultConfig;

export class PresentationState {

  public id: string;
  public config: NgxPresentConfig = ngxPresentDefaultConfig;
  public slides: Slides = [];
  public sideBar = {
    open: false,
    expert: false,
  };

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

  toggleSideBar() {
    this.state.sideBar = {
      ...this.state.sideBar,
      open: !this.state.sideBar.open,
    };
  }

  closeSideBar() {
    this.state.sideBar = {
      ...this.state.sideBar,
      open: false
    };
  }

  openSideBar() {
    this.state.sideBar = {
      ...this.state.sideBar,
      open: true,
    };
  }

  enableSideBarExpertMode() {
    this.state.sideBar = {
      ...this.state.sideBar,
      expert: true
    };
  }

  setId(id: string) {
    this.state.id = id;
  }
}


