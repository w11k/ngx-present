import { Component, Input, Type } from '@angular/core';

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

  isNested(x: RecursiveArray<UIEntry> | UIEntry | undefined): x is UIEntry {
    return Array.isArray(x) && x !== undefined;
  }
}
