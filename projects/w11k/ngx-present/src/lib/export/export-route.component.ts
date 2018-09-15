import { Component, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../core/presentation.types';
import { map } from 'rxjs/operators';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { PresentationService } from '../core/presentation.service';
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
      .bounded(toAngularComponent(this))
      .pipe(
        map(slides => flattenDeep(slides))
      )
      .subscribe(slides => this.slides = slides);
  }

  ngOnDestroy() {}
}
