import { Injectable } from '@angular/core';
import { OverviewService } from './overview.service';
import { createTyduxStore } from '@w11k/tydux';

@Injectable()
export class OverviewServiceMock extends OverviewService {

  constructor() {
    super(createTyduxStore({}));
  }
}
