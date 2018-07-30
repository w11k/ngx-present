import { Component, OnDestroy, OnInit } from '@angular/core';

import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { concatMap, delay, scan, switchMap } from 'rxjs/operators';
import { Slide, Slides } from '../core/presentation.types';
import { OverviewService, OverviewState } from './overview.service';
import { PresentationService } from '../core/presentation.service';
import { flattenDeep } from '../core/utils';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-present-overview-route',
  templateUrl: './overview-route.component.html',
  styleUrls: ['./overview-route.component.scss']
})
export class OverviewRouteComponent implements OnInit, OnDestroy {
  public slides: Slide[];
  public zoomFactor: number;
  public view: OverviewState;

  constructor(private readonly service: OverviewService,
              private readonly presentation: PresentationService) { }

  ngOnInit() {
    this.presentation
      .select(state => state.slides)
      .bounded(toAngularComponent(this))
      .pipe(
        // map(slides => flattenDeep(slides))
        switchMap(slides => this.flatten(slides))
      )
      .subscribe(slides => this.slides = slides);

    this.service
      .select()
      .bounded(toAngularComponent(this))
      .subscribe(view => {
        this.view = view;
        this.zoomFactor = (100 - (view.zoom + 1)) / view.zoom;
      });
  }

  private flatten(slides: Slides): Observable<Slide[]> {
    return from(slides)
      .pipe(
        scan((acc, lvl1) => {
          return [...acc, ...flattenDeep(lvl1)];
        }, []),
        // delay each event
        concatMap( x => of(x).pipe(delay(x.length))),
      );
  }

  ngOnDestroy() {
    // has to be there fore componentDestroyed
  }

  toggleSideNav() {
    this.presentation.toggleSideNav();
  }

  zoomIn() {
    this.service.zoomIn();
  }

  resetZoom() {
    this.service.resetZoom();
  }

  zoomOut() {
    this.service.zoomOut();
  }

  getRouterLink(slide: Slide) {
    return ['/slide', ...slide.coordinates];
  }

  toogleBreak() {
    this.service.toggleLineBreakOnFirstLevel();
  }

  shouldBreak(slide: Slide): boolean {
    if (!this.service.state.lineBreakOnFirstLevel) {
      return false;
    }

    const subCoordinates = slide.coordinates.slice(1);

    for (const coordinate of subCoordinates) {
      if (coordinate !== 1) {
        return false;
      }
    }

    return true;
  }

}
