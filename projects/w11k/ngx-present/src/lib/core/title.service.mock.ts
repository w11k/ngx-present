import { Injectable } from '@angular/core';
import { AdvancedTitleService } from './title.service';

@Injectable()
export class AdvancedTitleServiceMock implements Partial<AdvancedTitleService> {

  setTitle(newTitle: string): (() => void) {
    return () => {};
  }

  prefixTitle(prefix: string, separator = ' - '): (() => void) {
    return () => {};
  }
}
