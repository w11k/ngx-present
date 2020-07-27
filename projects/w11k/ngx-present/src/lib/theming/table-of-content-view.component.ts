import { Component, Input, Type } from '@angular/core';
import { ListOfRecursiveArraysOrValues, RecursiveArray } from '../types';

export interface UIEntry {
  component: Type<any>;
  name: string;
}

@Component({
  selector: 'ngx-present-table-of-content-view',
  templateUrl: './table-of-content-view.component.html'
})
export class TableOfContentViewComponent {
  @Input()
  public entries: ListOfRecursiveArraysOrValues<UIEntry | undefined> | undefined;

  isFlat(x: RecursiveArray<UIEntry> | UIEntry | undefined): x is UIEntry {
    return !Array.isArray(x) && x !== undefined;
  }

  isNested(x: RecursiveArray<UIEntry> | UIEntry | undefined): x is ListOfRecursiveArraysOrValues<UIEntry> {
    return Array.isArray(x) && x !== undefined;
  }

  first(x: RecursiveArray<UIEntry> | undefined): UIEntry | undefined {
    if (x !== undefined && !Array.isArray(x[0])) {
      return x[0];
    }
    else {
      return undefined;
    }
  }
}
