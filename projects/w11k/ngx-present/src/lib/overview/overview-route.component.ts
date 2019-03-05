import { Component, OnDestroy, OnInit } from '@angular/core';

import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { switchMap } from 'rxjs/operators';
import { Slide } from '../core/presentation.types';
import { OverviewService, OverviewState } from './overview.service';
import { PresentationService } from '../core/presentation.service';
import { flattenDelayedWithAnimationFrame } from '../core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-present-overview-route',
  templateUrl: './overview-route.component.html',
  styleUrls: ['./overview-route.component.scss']
})
export class OverviewRouteComponent implements OnInit, OnDestroy {
  public slides: Slide[] | undefined;
  public zoomFactor: number;
  public view: OverviewState | undefined;

  constructor(private readonly service: OverviewService,
              private readonly router: Router,
              private readonly presentation: PresentationService) {

    this.zoomFactor = service.state.defaultZoom;
  }

  ngOnInit() {
    this.presentation
      .select(state => state.slides)
      .pipe(
        switchMap(slides => flattenDelayedWithAnimationFrame(slides)),
        untilComponentDestroyed(this),
      )
      .subscribe(slides => this.slides = slides);

    this.service
      .select(x => x)
      .pipe(
        untilComponentDestroyed(this)
      )
      .subscribe(view => {
        this.view = view;
        this.zoomFactor = (100 - (view.zoom + 1)) / view.zoom;
      });
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

  navigate(event: MouseEvent, slide: Slide) {
    if (event.altKey) {
      event.preventDefault();
      this.router.navigate(['presenter', ...slide.coordinates]);
    }
  }

  toggleBreak() {
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

  ngOnDestroy() {}

}
