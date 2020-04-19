import { Component, Input } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { map } from 'rxjs/operators';
import { PresentationService } from '../core/presentation.service';
import { NgxPresentConfig, Slide } from '../core/presentation.types';
import { filterDeep, limitDepth, mapDeep } from '../core/utils';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';
import { DecoratorMetadata, tableOfContentMetadata } from './table-of-content';
import { UIEntry } from './table-of-content-view.component';

@Component({
  selector: 'ngx-present-table-of-content',
  template: `
    <ngx-present-table-of-content-view [entries]="entries"></ngx-present-table-of-content-view>
  `
})
export class TableOfContentComponent extends OnDestroyMixin {

  private readonly showCoordinates$ = new BehaviorSubject<boolean | undefined>(undefined);

  @Input()
  public set showCoordinates(val: boolean) {
    this.showCoordinates$.next(val);
  }

  private readonly coordinatesSeparator$ = new BehaviorSubject<string | undefined>(undefined);

  @Input()
  public set coordinatesSeparator(val: string) {
    this.coordinatesSeparator$.next(val);
  }

  private readonly depth$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(private readonly service: PresentationService) {
    super();

    const presentation$ = this.service.select(x => x)
      .pipe(
        untilComponentDestroyed(this),
      );

    combineLatest(presentation$, this.showCoordinates$, this.coordinatesSeparator$, this.depth$)
      .pipe(
        map(([presentation, showCoordinates, coordinatesSeparator, depth]) => {

          const leveled = limitDepth(presentation.slides, depth || presentation.config.tableOfContent.depth);

          const mapped = mapDeep(leveled, slideToUiEntryMapper(presentation.config, showCoordinates, coordinatesSeparator));

          const filtered = filterDeep(mapped, x => x !== undefined);

          return filtered;
        })
      )
      .subscribe(links => this.entries = links);
  }

  @Input()
  public set depth(val: number | undefined) {
    this.depth$.next(val);
  }

  public entries: ListOfRecursiveArraysOrValues<UIEntry | undefined> | undefined;
}

function slideToUiEntryMapper(config: NgxPresentConfig,
                              showCoordinatesInput: boolean | undefined,
                              coordinatesSeparatorInput: string | undefined) {
  return (slide: Slide): UIEntry | undefined => {
    const decoratorMetadata: DecoratorMetadata | undefined = tableOfContentMetadata(slide);

    if (decoratorMetadata !== undefined) {
      let linkName = decoratorMetadata.linkName;

      const showCoordinates = (showCoordinatesInput !== undefined && showCoordinatesInput) ||
        config.tableOfContent.showCoordinates;

      if (showCoordinates) {
        const coordinates = coordinatesToString(slide.coordinates, config.coordinates.separator, -1);
        const coordinatesSeparator = coordinatesSeparatorInput !== undefined ? coordinatesSeparatorInput : config.tableOfContent.separator;
        linkName = `${coordinates}${coordinatesSeparator} ${linkName}`;
      }

      return { component: slide.component, name: linkName };
    } else {
      return undefined;
    }
  };
}
