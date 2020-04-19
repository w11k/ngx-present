import { Component, OnInit } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { map } from 'rxjs/operators';
import { PresentationService } from '../core/presentation.service';
import { Slide } from '../core/presentation.types';
import { flattenDeep } from '../core/utils';

@Component({
  selector: 'ngx-present-export-route',
  templateUrl: './export-route.component.html',
  styleUrls: ['./export-route.component.scss']
})
export class ExportRouteComponent extends OnDestroyMixin implements OnInit {

  public slides: Slide[] | undefined;

  constructor(private readonly presentation: PresentationService) {
    super();
  }

  ngOnInit() {
    this.presentation
      .select(state => state.slides)
      .pipe(
        map(slides => flattenDeep(slides)),
        untilComponentDestroyed(this),
      )
      .subscribe(slides => this.slides = slides);
  }
}
