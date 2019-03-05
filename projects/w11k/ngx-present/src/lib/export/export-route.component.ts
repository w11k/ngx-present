import { Component, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../core/presentation.types';
import { map } from 'rxjs/operators';
import { PresentationService } from '../core/presentation.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { flattenDeep } from '../core/utils';

@Component({
  selector: 'ngx-present-export-route',
  templateUrl: './export-route.component.html',
  styleUrls: ['./export-route.component.scss']
})
export class ExportRouteComponent implements OnInit, OnDestroy {

  public slides: Slide[] | undefined;

  constructor(private readonly presentation: PresentationService) { }

  ngOnInit() {
    this.presentation
      .select(state => state.slides)
      .pipe(
        map(slides => flattenDeep(slides)),
        untilComponentDestroyed(this),
      )
      .subscribe(slides => this.slides = slides);
  }

  ngOnDestroy() {}
}
