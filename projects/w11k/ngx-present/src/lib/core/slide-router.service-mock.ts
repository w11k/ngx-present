import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideRouterService } from './slide-router.service';

@Injectable()
export class SlideRouterServiceMock implements Partial<SlideRouterService> {

  constructor() {
  }

  syncActivatedRouteAndCurrentSlide(routePrefix: string, route: ActivatedRoute, terminator: OnDestroy) {

  }

}
