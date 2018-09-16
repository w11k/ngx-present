import { inject, TestBed } from '@angular/core/testing';

import { AdvancedTitleService } from './title.service';
import { PresentationService } from './presentation.service';
import { PresentationServiceMock } from './presentation.service.mock';
import { PresentationState } from './presentation.types';
import { resetTydux } from '@w11k/tydux/dist/global-state';

describe('AdvancedTitleService', () => {
  let presentationServiceMock;

  beforeEach(() => {
    resetTydux();

    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock },
        AdvancedTitleService
      ]
    });
  });

  it('should be created', inject([AdvancedTitleService], (service: AdvancedTitleService) => {
    expect(service).toBeTruthy();
  }));
});
