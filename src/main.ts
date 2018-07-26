import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableTyduxDevelopmentMode } from '@w11k/tydux';

if (environment.production) {
  enableProdMode();
} else {
  enableTyduxDevelopmentMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
