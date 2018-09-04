import { Component, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UIEntry } from './table-of-content-view.component';
import { PresentationService } from '../core/presentation.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { map } from 'rxjs/operators';
import { filterDeep, limitDepth, mapDeep } from '../core/utils';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';
import { DecoratorMetadata, tableOfContentMetadataKey } from './table-of-content';
import { NgxPresentConfig, Slide } from '../core/presentation.types';

@Component({
  selector: 'ngx-present-table-of-content',
  template: `
    <ngx-present-table-of-content-view [entries]="entries"></ngx-present-table-of-content-view>
  `
})
export class TableOfContentComponent implements OnDestroy {

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

    const presentation$ = this.service.select()
      .bounded(toAngularComponent(this));

    combineLatest(presentation$, this.showCoordinates$, this.coordinatesSeparator$, this.depth$)
      .pipe(
        map(([presentation, showCoordinates, coordinatesSeparator, depth]) => {

          const leveled = limitDepth(presentation.slides, depth);

          const mapped = mapDeep(leveled, slideToUiEntryMapper(presentation.config, showCoordinates, coordinatesSeparator));

          const filtered = filterDeep(mapped, x => x !== undefined);

          return filtered;
        })
      )
      .subscribe(links => this.entries = links);
  }

  public entries: ListOfRecursiveArraysOrValues<UIEntry | undefined> | undefined;

  @Input()
  public set depth(val: number) {
    this.depth$.next(val);
  }

  ngOnDestroy(): void {}
}

function slideToUiEntryMapper(config: NgxPresentConfig,
                                 showCoordinatesInput: boolean | undefined,
                                 coordinatesSeparatorInput: string | undefined) {
  return (slide: Slide): UIEntry | undefined => {
    // TODO: get rid of cast to any, include proper Reflect typings
    const decoratorMetadata: DecoratorMetadata = (Reflect as any).getMetadata(tableOfContentMetadataKey, slide.component);

    if (decoratorMetadata) {
      let linkName = decoratorMetadata.linkName;

      const showCoordinates = (showCoordinatesInput !== undefined && showCoordinatesInput) ||
        config.tableOfContent.showCoordinates;

      if (showCoordinates) {
        const coordinates = coordinatesToString(slide.coordinates, -1);
        const coordinatesSeparator = coordinatesSeparatorInput !== undefined ? coordinatesSeparatorInput : config.tableOfContent.separator;
        linkName = `${coordinates}${coordinatesSeparator} ${linkName}`;
      }

      return { component: slide.component, name: linkName };
    } else {
      return undefined;
    }
  };
}
