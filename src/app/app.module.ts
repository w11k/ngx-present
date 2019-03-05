import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { slides } from './slides';
import { TccNgxPresentThemeModule } from '@thecodecampus/ngx-present-theme';
import { NgxPresentModule } from '@w11k/ngx-present';
import { TyduxConfiguration, TyduxModule } from '@w11k/tydux-angular'
import { TableOfContentComponent } from './intro/table-of-content.component';
import { environment } from '../environments/environment';
import { composeWithDevTools } from 'redux-devtools-extension';

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
  entryComponents: [
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
    storeEnhancer: environment.production ? undefined : composeWithDevTools()
  }
}
