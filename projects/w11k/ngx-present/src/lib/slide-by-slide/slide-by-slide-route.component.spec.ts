import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBySlideRouteComponent } from './slide-by-slide-route.component';

describe('SlideBySlideRouteComponent', () => {
  let component: SlideBySlideRouteComponent;
  let fixture: ComponentFixture<SlideBySlideRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideBySlideRouteComponent ]
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
