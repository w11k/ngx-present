import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PresentationService } from './presentation.service';

@Injectable({
  providedIn: 'root'
})
export class AdvancedTitleService {
  private lastReturnedUnset: (() => any) | undefined;
  private readonly original: string;

  constructor(private readonly title: Title,
              private readonly presentation: PresentationService) {
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

  prefixTitle(prefix: string, separator = this.presentation.state.config.title.separator): (() => void) {
    return this.setTitle(prefix + separator + this.original);
  }
}
