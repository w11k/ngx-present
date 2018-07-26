import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRouteComponent } from './help-route.component';

describe('HelpRouteComponent', () => {
  let component: HelpRouteComponent;
  let fixture: ComponentFixture<HelpRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
