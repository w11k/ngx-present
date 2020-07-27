import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Facade } from '@w11k/tydux';
import { RecursivePartial } from '../types';
import { componentsToSlideTree } from './presentation.functions';
import { NgxPresentConfig, PresentationCommands, PresentationState, SlideComponents } from './presentation.types';

export const NGX_PRESENT_CONFIG = new InjectionToken<RecursivePartial<NgxPresentConfig>>('NgxPresentConfig');
export const SLIDES = new InjectionToken<SlideComponents>('SLIDES');

@Injectable({
  providedIn: 'root'
})
export class PresentationService extends Facade<PresentationCommands> {

  constructor(injector: Injector) {
    super('Presentation', new PresentationState(), new PresentationCommands());

    const slideComponents: SlideComponents = injector.get(SLIDES);
    const config = injector.get(NGX_PRESENT_CONFIG);

    const slides = componentsToSlideTree(slideComponents);
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

