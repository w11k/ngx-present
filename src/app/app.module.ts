import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TccNgxPresentThemeModule } from '@thecodecampus/ngx-present-theme';
import { NgxPresentRootModule } from '@w11k/ngx-present';

import { AppComponent } from './app.component';
import { TableOfContentComponent } from './intro/table-of-content.component';
import { slides } from './slides';

const config = {
  navigation: {
    overview: {
      component: TableOfContentComponent
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ...slides,
  ],
  imports: [
    BrowserModule,
    NgxPresentRootModule.forRoot(slides, config),
    TccNgxPresentThemeModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

