import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AdvancedTitleService {
  private lastReturnedUnset: () => any;
  private original: string;

  constructor(private readonly title: Title) {
    this.original = title.getTitle();
  }

  setTitle(newTitle: string): (() => void) {
    const oldTitle = this.title.getTitle();

    this.title.setTitle(newTitle);

    this.lastReturnedUnset = (() => {
      const unset = () => {
        if (this.lastReturnedUnset === unset) {
          this.title.setTitle(oldTitle);
        }
      };
      return unset;
    })();

    return this.lastReturnedUnset;
  }

  prefixTitle(prefix: string, separator = ' - '): (() => void) {
    return this.setTitle(prefix + separator + this.original);
  }
}
