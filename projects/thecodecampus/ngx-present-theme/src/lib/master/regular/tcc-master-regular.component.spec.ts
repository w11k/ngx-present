import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccMasterRegularComponent } from './tcc-master-regular.component';

describe('TccMasterRegularComponent', () => {
  let component: TccMasterRegularComponent;
  let fixture: ComponentFixture<TccMasterRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccMasterRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccMasterRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
