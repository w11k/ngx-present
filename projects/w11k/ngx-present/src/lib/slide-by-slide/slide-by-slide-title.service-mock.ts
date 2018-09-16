import { Injectable, OnDestroy } from '@angular/core';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';

@Injectable({
  providedIn: 'root'
})
export class SlideBySlideTitleServiceMock implements Partial<SlideBySlideTitleService> {
  constructor() {}

  setupTitleSync(prefix: string, terminator: OnDestroy) {

  }
}
