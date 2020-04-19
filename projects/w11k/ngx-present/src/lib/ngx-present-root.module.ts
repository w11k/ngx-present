import { isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TyduxConfiguration, TyduxModule } from '@w11k/tydux-angular';
import { NGX_PRESENT_CONFIG, SLIDES } from './core/presentation.service';
import { NgxPresentConfig, SlideComponents } from './core/presentation.types';
import { NgxPresentModule } from './ngx-present.module';

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
  static forRoot(slides: SlideComponents, config: RecursivePartial<NgxPresentConfig> = {}): ModuleWithProviders {
    return {
      ngModule: NgxPresentRootModule,
      providers: [
        { provide: NGX_PRESENT_CONFIG, useValue: config},
        { provide: SLIDES, useValue: slides}
      ]
    };
  }
}
