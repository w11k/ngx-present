import { Component, Input, OnChanges, SimpleChanges, StaticProvider } from '@angular/core';
import { ActivatedSlide, ActivatedSlideImpl } from './slide.service';
import { Slide } from '../core/presentation.types';

@Component({
  selector: 'ngx-present-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnChanges {

  @Input() slide: Slide | undefined;

  @Input() set providers(externalProviders: StaticProvider[]) {
    this.providersCombined = [
      ...externalProviders,
      ...this.internalProviders
    ];
  }

  private activatedSlide = new ActivatedSlideImpl();
  private readonly internalProviders: StaticProvider[] = [{
    provide: ActivatedSlide, useValue: this.activatedSlide
  }];

  public providersCombined: StaticProvider[] = [...this.internalProviders];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.slide && this.slide) {
      this.activatedSlide.slide.next(this.slide);
    }
  }

}
