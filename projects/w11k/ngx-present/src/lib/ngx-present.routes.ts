import { Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { OverviewRouteComponent } from './overview/overview-route.component';
import { ExportRouteComponent } from './export/export-route.component';
import { routerParamsCoordinatePrefix } from './slide-by-slide/slide-by-slide.functions';
import { Component } from '@angular/core';
import { SlidesGuardService } from './slide-by-slide/slides-guard.service';
import { SlideGuardService } from './slide-by-slide/slide-guard.service';
import { SlideBySlideRouteComponent } from './slide-by-slide/slide-by-slide-route.component';
import { HelpRouteComponent } from './help/help-route.component';


export function SlideUrlMatcher(segments: UrlSegment[]): UrlMatchResult {

  if (segments.length === 0) {
    return null;
  }

  const coordinateSegments = segments.slice();
  const slidePrefix = coordinateSegments.shift();

  if (slidePrefix.path === 'slide' && coordinateSegments.length > 0) {
    const result: UrlMatchResult = {
      consumed: [slidePrefix],
      posParams: {}
    };

    for (let i = 0; i < coordinateSegments.length; i++) {
      const segment = coordinateSegments[i];
      const coordinateNumber = parseInt(segment.path, 10);

      if (Number.isNaN(coordinateNumber) === false) {
        result.consumed.push(segment);
        result.posParams[routerParamsCoordinatePrefix + i] = segment;
      } else {
        break;
      }
    }

    return result;
  }

  return null;
}

@Component({ template: ''})
export class EmptyComponent{}

export const ngxPresentRoutes: Routes = [
  { path: 'slide', pathMatch: 'full', component: EmptyComponent, canActivate: [SlideGuardService] },
  { matcher: SlideUrlMatcher, component: SlideBySlideRouteComponent, canActivate: [SlidesGuardService] },
  { path: 'overview', component: OverviewRouteComponent },
  { path: 'export', component: ExportRouteComponent },
  { path: 'help', component: HelpRouteComponent }
];
