import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBySlideRouteComponent } from './slide-by-slide-route.component';
import { MockComponent } from 'ng-mocks';
import { SlideComponent } from '../slide/slide.component';
import { SlideBySlideService, SlideBySlideState } from './slide-by-slide.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SlideBySlideServiceMock } from './slide-by-slide.service.mock';
// import { resetTydux } from '@w11k/tydux/dist/global-state';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';
import { SlideBySlideTitleServiceMock } from './slide-by-slide-title.service-mock';

describe('SlideBySlideRouteComponent', () => {
  let component: SlideBySlideRouteComponent;
  let fixture: ComponentFixture<SlideBySlideRouteComponent>;
  let slideBySlideServiceMock: SlideBySlideServiceMock;

  beforeEach(async(() => {
    // resetTydux();

    slideBySlideServiceMock = new SlideBySlideServiceMock(new SlideBySlideState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SlideBySlideRouteComponent,
        MockComponent(SlideComponent)
      ],
      providers: [
        { provide: SlideBySlideService, useValue: slideBySlideServiceMock },
        { provide: SlideBySlideTitleService, useClass: SlideBySlideTitleServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBySlideRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
