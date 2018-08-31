import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContentComponent } from './help-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { MatIcon } from '@angular/material';
import { resetTydux } from '@w11k/tydux/dist/global-state';
import { PresentationState } from '../core/presentation.types';


describe('HelpContentComponent', () => {
  let component: HelpContentComponent;
  let fixture: ComponentFixture<HelpContentComponent>;
  let presentation: PresentationServiceMock;

  beforeEach(async(() => {
    resetTydux();

    presentation = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HelpContentComponent,
        MockComponent(MatIcon),
      ],
      providers: [
        { provide: PresentationService, useValue: presentation},
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
