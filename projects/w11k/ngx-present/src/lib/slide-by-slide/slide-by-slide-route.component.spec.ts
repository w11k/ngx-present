import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBySlideRouteComponent } from './slide-by-slide-route.component';
import { MockComponent } from 'ng-mocks';
import { SlideComponent } from '../slide/slide.component';
import { EventService } from '../core/event.service';
import { AdvancedTitleService } from '../core/title.service';
import { SlideBySlideService } from './slide-by-slide.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EventServiceMock } from '../core/event.service.mock';
import { AdvancedTitleServiceMock } from '../core/title.service.mock';
import { SlideBySlideServiceMock } from './slide-by-slide.service.mock';

describe('SlideBySlideRouteComponent', () => {
  let component: SlideBySlideRouteComponent;
  let fixture: ComponentFixture<SlideBySlideRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SlideBySlideRouteComponent,
        MockComponent(SlideComponent)
      ],
      providers: [
        { provide: EventService, useClass: EventServiceMock },
        { provide: AdvancedTitleService, useClass: AdvancedTitleServiceMock },
        { provide: SlideBySlideService, useClass: SlideBySlideServiceMock },
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
