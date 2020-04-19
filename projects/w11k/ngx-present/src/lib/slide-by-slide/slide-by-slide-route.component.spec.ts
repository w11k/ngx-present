import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { SlideComponent } from '../slide/slide.component';

import { SlideBySlideRouteComponent } from './slide-by-slide-route.component';
import { SlideBySlideTitleService } from './slide-by-slide-title.service';
import { SlideBySlideTitleServiceMock } from './slide-by-slide-title.service-mock';
import { SlideBySlideService, SlideBySlideState } from './slide-by-slide.service';
import { SlideBySlideServiceMock } from './slide-by-slide.service.mock';

describe('SlideBySlideRouteComponent', () => {
  let component: SlideBySlideRouteComponent;
  let fixture: ComponentFixture<SlideBySlideRouteComponent>;
  let slideBySlideServiceMock: SlideBySlideServiceMock;

  beforeEach(async(() => {
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
