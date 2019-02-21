import { TestBed } from '@angular/core/testing';
import { NGX_PRESENT_CONFIG, PresentationService, SLIDES } from './presentation.service';
import { createTyduxStore, TyduxStore } from '@w11k/tydux';
// import { resetTydux } from '@w11k/tydux/dist/global-state';


describe('PresentationService', () => {
  let service: PresentationService;

  beforeEach(() => {
    // resetTydux();

    TestBed.configureTestingModule({
      providers: [
        PresentationService,
        { provide: TyduxStore, useValue: createTyduxStore({}) },
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
