import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Facade, TyduxStore } from '@w11k/tydux';
import { componentsToSlideTree } from './presentation.functions';
import {
  NgxPresentConfig,
  PresentationCommands,
  PresentationState,
  SlideComponents,
  Slides,
} from './presentation.types';


// causing a strange compiler error: generates invalid d.ts file
// export const NGX_PRESENT_CONFIG = new InjectionToken<RecursivePartial<NgxPresentConfig>>('NgxPresentConfig');
// workaround: use any here and explicit typing when getting the value from the injector
export const NGX_PRESENT_CONFIG = new InjectionToken<any>('NgxPresentConfig');

// causing a strange compiler error: generates invalid d.ts file
// export const SLIDES = new InjectionToken<SlideComponents>('SLIDES');
// workaround: use any here and explicit typing when getting the value from the injector
export const SLIDES = new InjectionToken<any>('SLIDES');

@Injectable({
  providedIn: 'root'
})
export class PresentationService extends Facade<PresentationState, PresentationCommands> {


  constructor(tydux: TyduxStore, injector: Injector) {
    super(tydux, 'Presentation', new PresentationCommands(), new PresentationState());

    const slideComponents: SlideComponents = injector.get(SLIDES);
    const config: RecursivePartial<NgxPresentConfig> = injector.get(NGX_PRESENT_CONFIG);

    const slides: Slides = componentsToSlideTree(slideComponents);
    this.commands.setSlides(slides);
    this.commands.mergeConfig(config);
  }

  // make mutate public
  dispatch = this.commands;

  toggleSideBar(event: KeyboardEvent | MouseEvent) {
    if (event.altKey) {
      this.commands.enableSideBarExpertMode();
    }
    this.commands.toggleSideBar();
  }
}

