import {Routes} from '@angular/router';
import { ngxPresentRoutes } from '@w11k/ngx-present';

export const routes: Routes = [
  ...ngxPresentRoutes,
  { path: '**', redirectTo: 'slide'}
];
