import { inject, TestBed } from '@angular/core/testing';
import { PresentationService } from './presentation.service';
import { PresentationServiceMock } from './presentation.service.mock';
import { PresentationState } from './presentation.types';

import { AdvancedTitleService } from './title.service';

describe('AdvancedTitleService', () => {
  let presentationServiceMock;

  beforeEach(() => {
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
