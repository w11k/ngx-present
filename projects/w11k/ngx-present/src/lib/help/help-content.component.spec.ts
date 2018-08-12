import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContentComponent } from './help-content.component';
import { RouterTestingModule } from '../../../../../../node_modules/@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { MatIcon } from '@angular/material';

describe('HelpContentComponent', () => {
  let component: HelpContentComponent;
  let fixture: ComponentFixture<HelpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HelpContentComponent,
        MockComponent(MatIcon),
      ],
      providers: [
        { provide: PresentationService, useClass: PresentationServiceMock },
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
