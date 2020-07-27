import { Type } from '@angular/core';
import { Commands } from '@w11k/tydux';
import { ListOfRecursiveArraysOrValues, RecursivePartial } from '../types';
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
      coordinatesToKeep: undefined as number | undefined
    },
    preview2: {
      move: 2,
      coordinatesToKeep: undefined as number | undefined
    }
  },
  code: {
    theme: 'dark' as 'dark' | 'light'
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
    settings: false
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

export class PresentationCommands extends Commands<PresentationState> {

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
      expert: true,
      settings: true
    };
  }

  setId(id: string) {
    this.state.id = id;
  }

  setCodeTheme(theme: 'light' | 'dark') {
    this.state.config = {
      ...this.state.config,
      code: {
        ...this.state.config.code,
        theme: theme,
      }
    };
  }
}


