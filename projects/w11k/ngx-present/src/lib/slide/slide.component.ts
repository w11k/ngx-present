import { Component, Input, OnChanges, SimpleChanges, StaticProvider } from '@angular/core';
import { ActivatedSlide, ActivatedSlideImpl } from './slide.service';
import { Slide } from '../core/presentation.types';

@Component({
  selector: 'ngx-present-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnChanges {

  @Input() slide: Slide;

  private activatedSlide = new ActivatedSlideImpl();
  public providers: StaticProvider[] = [{
    provide: ActivatedSlide, useValue: this.activatedSlide
  }];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.slide && this.slide) {
      this.activatedSlide.slide.next(this.slide);
    }
  }

}
