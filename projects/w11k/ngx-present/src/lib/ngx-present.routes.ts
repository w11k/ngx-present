import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { SlideAndModeResolver } from './core/slide-and-mode-resolver.service';
import { ExportRouteComponent } from './export/export-route.component';
import { HelpRouteComponent } from './help/help-route.component';
import { OverviewRouteComponent } from './overview/overview-route.component';
import { PresenterRouteComponent } from './presenter/presenter-route.component';
import { SlideBySlideRouteComponent } from './slide-by-slide/slide-by-slide-route.component';
import { routerParamsCoordinatePrefix } from './slide-by-slide/slide-by-slide.functions';
import { SlidesGuardService } from './slide-by-slide/slides-guard.service';

export function SlideUrlMatcher(segments: UrlSegment[]): UrlMatchResult {
  return CoordinatesUrlMatcher('slide', segments);
}
export function PresenterUrlMatcher(segments: UrlSegment[]): UrlMatchResult {
  return CoordinatesUrlMatcher('presenter', segments);
}

function CoordinatesUrlMatcher(prefix: string, segments: UrlSegment[]): UrlMatchResult {
  if (segments.length === 0) {
    return { consumed: [] };
  }

  const coordinateSegments = segments.slice();
  const slidePrefix = coordinateSegments.shift();

  if (slidePrefix && slidePrefix.path === prefix) {
    const result: Required<UrlMatchResult> = {
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

  return { consumed: [] };
}


export const ngxPresentRoutes: Routes = [
  { matcher: SlideUrlMatcher,
    component: SlideBySlideRouteComponent,
    canActivate: [SlidesGuardService],
    resolve: { slide: SlideAndModeResolver }
  },
  { matcher: PresenterUrlMatcher,
    component: PresenterRouteComponent,
    canActivate: [SlidesGuardService],
    resolve: { slide: SlideAndModeResolver }
  },
  { path: 'overview', component: OverviewRouteComponent },
  { path: 'export', component: ExportRouteComponent },
  { path: 'help', component: HelpRouteComponent },
];
