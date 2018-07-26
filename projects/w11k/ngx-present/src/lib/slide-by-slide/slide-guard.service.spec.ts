import { inject, TestBed } from '@angular/core/testing';

import { SlidesGuardService } from './slides-guard.service';

describe('SlidesGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlidesGuardService]
    });
  });

  it('should be created', inject([SlidesGuardService], (service: SlidesGuardService) => {
    expect(service).toBeTruthy();
  }));
});
