import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { slides } from './slides';
import { TccNgxPresentThemeModule } from '@thecodecampus/ngx-present-theme';
import { NgxPresentModule } from '@w11k/ngx-present';
import { TableOfContentComponent } from './intro/table-of-content.component';

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
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
