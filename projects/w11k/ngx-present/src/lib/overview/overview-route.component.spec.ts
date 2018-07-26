import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRouteComponent } from './overview-route.component';

describe('OverviewRouteComponent', () => {
  let component: OverviewRouteComponent;
  let fixture: ComponentFixture<OverviewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
