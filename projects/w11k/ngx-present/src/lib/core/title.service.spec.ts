import { inject, TestBed } from '@angular/core/testing';

import { AdvancedTitleService } from './title.service';

describe('AdvancedTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvancedTitleService]
    });
  });

  it('should be created', inject([AdvancedTitleService], (service: AdvancedTitleService) => {
    expect(service).toBeTruthy();
  }));
});
