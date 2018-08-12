import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedSlide } from '../slide/slide.service';
import { Coordinates } from '../core/presentation.types';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';

@Component({
  selector: 'ngx-present-slide-index',
  template: `{{coordinates$ | async}}`
})
export class SlideIndexComponent {
  public coordinates$: Observable<string>;

  constructor(private readonly activatedSlide: ActivatedSlide) {
    this.coordinates$ = this.activatedSlide.slide.pipe(
      map(slide => slide.coordinates),
      map((coordinates: Coordinates) => coordinatesToString(coordinates )),
    );
  }
}
