import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Store } from '@w11k/tydux';
import { componentsToSlideTree } from './presentation.functions';
import { PresentationMutator, PresentationState, SlideComponents, Slides, } from './presentation.types';


export const SLIDES = new InjectionToken<any[]>('SLIDES');

@Injectable({
  providedIn: 'root'
})
export class PresentationService extends Store<PresentationMutator, PresentationState> {


  constructor(injector: Injector) {
    super('Presentation', new PresentationMutator(), new PresentationState([], false));

    const slideComponents: SlideComponents = injector.get(SLIDES);

    const slides: Slides = componentsToSlideTree(slideComponents);
    this.mutate.setSlides(slides);

  }

  // make mutate public
  dispatch = this.mutate;
}

