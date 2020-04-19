import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { HelpContentComponent } from './help-content.component';
// import { resetTydux } from '@w11k/tydux/dist/global-state';


describe('HelpContentComponent', () => {
  let component: HelpContentComponent;
  let fixture: ComponentFixture<HelpContentComponent>;

  beforeEach(async(() => {
    // resetTydux();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HelpContentComponent,
        MockComponent(MatIcon),
      ],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
