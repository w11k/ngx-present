import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentationService } from '../core/presentation.service';
import { componentDestroyed, toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { map, takeUntil } from 'rxjs/operators';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Observable } from 'rxjs';
import { Slide } from '../core/presentation.types';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'ngx-present-presenter-view',
  templateUrl: './presenter-view.component.html',
  styleUrls: ['./presenter-view.component.scss']
})
export class PresenterViewComponent {
  @Input()
  public currentSlide: Slide;

  @Input()
  public nextSlide: Slide;

  @Input()
  public nextSection: Slide;

  constructor() {}
}
