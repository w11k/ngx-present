import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedSlide } from '../slide/slide.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Coordinates } from '../core/presentation.types';

@Component({
  selector: 'ngx-present-slide-index',
  template: `{{coordinates$ | async}}`
})
export class SlideIndexComponent implements OnInit, OnDestroy {
  public coordinates$: Observable<string>;

  constructor(private readonly slide: ActivatedSlide) { }

  ngOnInit() {
    this.coordinates$ = this.slide.coordinates.pipe(
      map((coordinates: Coordinates) => coordinates.join(' / ')),
      untilComponentDestroyed(this)
    );
  }

  ngOnDestroy(): void {
    // has to be there for componentDestroyed
  }
}
