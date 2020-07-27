import { isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TyduxConfiguration, TyduxModule } from '@w11k/tydux-angular';
import { KEYBOARD_EVENT_PROCESSOR_TOKEN, ToggleSideNav } from './core/event.service';
import { NGX_PRESENT_CONFIG, SLIDES } from './core/presentation.service';
import { NgxPresentConfig, SlideComponents } from './core/presentation.types';
import { NgxPresentModule } from './ngx-present.module';
import {
  NavigateSectionBackward,
  NavigateSectionForward,
  NavigateSlideBackward,
  NavigateSlideForward,
  NavigateToFirstSlide,
  NavigateToOverview,
  TogglePresenter
} from './slide-by-slide/slide-by-slide.service';
import { RecursivePartial } from './types';

export function configFactory(): TyduxConfiguration {
  return {
    developmentMode: isDevMode(),
    devToolsOptions: {
      trace: true,
      traceLimit: 10,
    }
  };
}

export const defaultAppRoutes: Routes = [
  { path: '**', redirectTo: 'slide' }
];

@NgModule({
  imports: [
    NgxPresentModule,
    TyduxModule.forRootWithConfig(configFactory),
    RouterModule.forRoot(defaultAppRoutes, { useHash: true }),
  ],
  exports: [
    NgxPresentModule,
  ],
})
export class NgxPresentRootModule {
  static forRoot(slides: SlideComponents, config: RecursivePartial<NgxPresentConfig> = {}): ModuleWithProviders<NgxPresentRootModule> {
    return {
      ngModule: NgxPresentRootModule,
      providers: [
        { provide: NGX_PRESENT_CONFIG, useValue: config},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSectionForward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSlideForward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSectionBackward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSlideBackward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateToFirstSlide, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: ToggleSideNav, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateToOverview, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: TogglePresenter, multi: true},
        { provide: SLIDES, useValue: slides}
      ]
    };
  }
}
