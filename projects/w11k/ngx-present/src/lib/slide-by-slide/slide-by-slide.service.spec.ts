import { TestBed } from '@angular/core/testing';
// import { resetTydux } from '@w11k/tydux/dist/global-state';
import { SlideBySlideService } from './slide-by-slide.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationService } from '../core/presentation.service';
import { PresentationState } from '../core/presentation.types';
import { RouterTestingModule } from '@angular/router/testing';
import { createTyduxStore, TyduxStore } from '@w11k/tydux';


describe('SlideBySlideService', () => {
  let service: SlideBySlideService;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(() => {
    // resetTydux();
    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        SlideBySlideService,
        { provide: TyduxStore, useValue: createTyduxStore({}) },
        { provide: PresentationService, useValue: presentationServiceMock},
      ]
    });

    service = TestBed.get(SlideBySlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
