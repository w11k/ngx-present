import { inject, TestBed } from '@angular/core/testing';

import { ActivatedSlide } from './slide.service';

describe('ActivatedSlide', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivatedSlide]
    });
  });

  it('should be created', inject([ActivatedSlide], (service: ActivatedSlide) => {
    expect(service).toBeTruthy();
  }));
});
