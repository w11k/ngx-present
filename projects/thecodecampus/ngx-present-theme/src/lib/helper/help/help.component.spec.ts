import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedSlide } from '@w11k/ngx-present';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { TccHelpComponent } from './help.component';
import { HelpService } from './help.service';
import { HelpServiceMock } from './help.service-mock';

describe('TccHelpComponent', () => {
  let component: TccHelpComponent;
  let fixture: ComponentFixture<TccHelpComponent>;

  beforeEach(async(() => {
    const activatedSlide: ActivatedSlide = {
      slide: of()
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TccHelpComponent,
        MockComponent(MatIcon)
      ],
      providers: [
        { provide: HelpService, useClass: HelpServiceMock },
        { provide: ActivatedSlide, useValue: activatedSlide}
      ]
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
