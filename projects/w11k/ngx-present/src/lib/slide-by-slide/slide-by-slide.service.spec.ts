import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { SlideBySlideService } from './slide-by-slide.service';


describe('SlideBySlideService', () => {
  let service: SlideBySlideService;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(() => {
    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        SlideBySlideService,
        { provide: PresentationService, useValue: presentationServiceMock },
      ]
    });

    service = TestBed.inject(SlideBySlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
