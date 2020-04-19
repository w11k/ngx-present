import { Injectable } from '@angular/core';
import { OverviewService } from './overview.service';

@Injectable()
export class OverviewServiceMock extends OverviewService {
  constructor() {
    super();
  }
}
