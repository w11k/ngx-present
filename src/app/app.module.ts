import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TccNgxPresentThemeModule } from '@thecodecampus/ngx-present-theme';
import { NgxPresentModule } from '@w11k/ngx-present';
import { TyduxConfiguration, TyduxModule } from '@w11k/tydux-angular';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TableOfContentComponent } from './intro/table-of-content.component';
import { slides } from './slides';

const config = {
  sidebar: {
    tableOfContent: {
      showCoordinates: false
    }
  },
  navigation: {
    overview: {
      component: TableOfContentComponent
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ...slides
  ],
  imports: [
    BrowserModule,
    NgxPresentModule.withSlides(slides, config),
    TccNgxPresentThemeModule,
    TyduxModule.forRootWithConfig(configFactory),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configFactory(): TyduxConfiguration {
  return {
    developmentMode: !environment.production,
    devToolsOptions: {
      trace: true,
      traceLimit: 10,
    }
  };
}
