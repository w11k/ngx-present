import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccHelpComponent } from './help.component';

describe('TccHelpComponent', () => {
  let component: TccHelpComponent;
  let fixture: ComponentFixture<TccHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
