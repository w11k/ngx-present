import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccMasterRegularComponent } from './tcc-master-regular.component';
import { MockComponent } from 'ng-mocks';
import { HelpDialogIconComponent, MenuToggleIconComponent, SlideIndexComponent } from '@w11k/ngx-present';

describe('TccMasterRegularComponent', () => {
  let component: TccMasterRegularComponent;
  let fixture: ComponentFixture<TccMasterRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TccMasterRegularComponent,
        MockComponent(MenuToggleIconComponent),
        MockComponent(HelpDialogIconComponent),
        MockComponent(SlideIndexComponent),
      ]
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
