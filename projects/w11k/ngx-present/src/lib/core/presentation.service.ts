import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Store } from '@w11k/tydux';
import { componentsToSlideTree } from './presentation.functions';
import { NgxPresentConfig, PresentationMutator, PresentationState, SlideComponents, Slides, } from './presentation.types';


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
export class PresentationService extends Store<PresentationMutator, PresentationState> {


  constructor(injector: Injector) {
    super('Presentation', new PresentationMutator(), new PresentationState());

    const slideComponents: SlideComponents = injector.get(SLIDES);
    const config: RecursivePartial<NgxPresentConfig> = injector.get(NGX_PRESENT_CONFIG);

    const slides: Slides = componentsToSlideTree(slideComponents);
    this.mutate.setSlides(slides);
    this.mutate.mergeConfig(config);
  }

  // make mutate public
  dispatch = this.mutate;

  toggleSideBar(event: KeyboardEvent | MouseEvent) {
    if (event.altKey) {
      this.mutate.enableSideBarExpertMode();
    }
    this.mutate.toggleSideBar();
  }
}

