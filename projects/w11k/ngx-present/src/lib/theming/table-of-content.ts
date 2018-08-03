import { Component, Input, OnDestroy, Type } from '@angular/core';
import { map } from 'rxjs/operators';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { PresentationService } from '../core/presentation.service';
import { filterDeep, mapDeep} from '../core/utils';
import { coordinatesToString } from '../slide-by-slide/slide-by-slide.functions';
import { BehaviorSubject, combineLatest } from 'rxjs';

const metadataKey = Symbol('TableOfContentEntry');

export interface DecoratorMetadata {
  linkName: string;
}

export function TableOfContentEntry(config: DecoratorMetadata): ClassDecorator {
  return function(constructor: any) {
    (Reflect as any).defineMetadata(metadataKey, config, constructor);
  };
}

interface UIEntry {
  component: Type<any>;
  name: string;
}

@Component({
  selector: 'ngx-present-table-of-content-view',
  template: `
    <ul>
      <li *ngFor="let x of entries">
        <ng-container *ngIf="isFlat(x);else nested">
          <a routerLink [ngxPresentSlideLink]="x.component">
            {{x.name}}
          </a>
        </ng-container>

        <ng-template #nested>
          <a routerLink [ngxPresentSlideLink]="x[0].component">
            {{x[0].name}}
          </a>
          <ng-container *ngIf="x.length > 1">
            <ngx-present-table-of-content-view [entries]="x.slice(1)">
            </ngx-present-table-of-content-view>
          </ng-container>
        </ng-template>
      </li>
    </ul>
  `
})
export class TableOfContentViewComponent {
  @Input()
  public entries: ListOfRecursiveArraysOrValues<UIEntry>;

  isFlat(x: RecursiveArray<UIEntry> | UIEntry): x is UIEntry {
    return !Array.isArray(x);
  }
}


@Component({
  selector: 'ngx-present-table-of-content',
  template: `
    <ngx-present-table-of-content-view [entries]="entries"></ngx-present-table-of-content-view>
  `
})
export class TableOfContentComponent implements OnDestroy {

  private readonly showCoordinates$ = new BehaviorSubject<boolean>(false);
  @Input()
  public set showCoordinates(val: boolean) {
    this.showCoordinates$.next(val);
  }

  private readonly coordinatesSeparator$ = new BehaviorSubject<string>(')');
  @Input()
  public set coordinatesSeparator(val: string) {
    this.coordinatesSeparator$.next(val);
  }

  public entries: ListOfRecursiveArraysOrValues<UIEntry>;

  constructor(private readonly service: PresentationService) {


    const slides$ = this.service.select(state => state.slides)
      .bounded(toAngularComponent(this));

    combineLatest(slides$, this.showCoordinates$, this.coordinatesSeparator$)
      .pipe(
        map(([slides, showCoordinates, coordinatesSeparator]) => {
            const mapped = mapDeep(slides, x => {
              const config: DecoratorMetadata = (Reflect as any).getMetadata(metadataKey, x.component);

              if (config) {
                let linkName = config.linkName;

                if (showCoordinates) {
                  const coorinates = coordinatesToString(x.coordinates, -1);
                  linkName = `${coorinates}${coordinatesSeparator} ${linkName}`;
                }

                return { component: x.component, name: linkName };
              } else {
                return undefined;
              }
            });

            const filtered = filterDeep(mapped, x => x !== undefined);

            return filtered;
          }
        )
      )
      .subscribe(links => this.entries = links);
  }

  ngOnDestroy(): void {}
}
