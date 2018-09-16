import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TccMasterSectionTitleComponent } from './tcc-master-section-title.component';
import { MockComponent } from 'ng-mocks';
import { HelpDialogIconComponent, MenuToggleIconComponent } from '@w11k/ngx-present';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('TccMasterSectionTitleComponent', () => {
  let component: TccMasterSectionTitleComponent;
  let fixture: ComponentFixture<TccMasterSectionTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TccMasterSectionTitleComponent,
        MockComponent(MenuToggleIconComponent),
        MockComponent(HelpDialogIconComponent),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccMasterSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
