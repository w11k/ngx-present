import { TestBed } from '@angular/core/testing';
import { NGX_PRESENT_CONFIG, PresentationService, SLIDES } from './presentation.service';


describe('PresentationService', () => {
  let service: PresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PresentationService,
        { provide: SLIDES, useValue: []},
        { provide: NGX_PRESENT_CONFIG, useValue: {}},
      ]
    });

    service = TestBed.get(PresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
