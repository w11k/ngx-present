import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { slides } from './slides';
import { MatSidenavModule } from '@angular/material';
import { TccNgxPresentThemeModule } from '@thecodecampus/ngx-present-theme';
import { NgxPresentModule } from '@w11k/ngx-present';
import { MarkdownModule } from 'ngx-markdown';
import { PrismModule } from '@ngx-prism/core';

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
    NgxPresentModule.withSlides(slides),
    TccNgxPresentThemeModule,
    RouterModule.forRoot(routes),
    MatSidenavModule,
    MarkdownModule,
    PrismModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
