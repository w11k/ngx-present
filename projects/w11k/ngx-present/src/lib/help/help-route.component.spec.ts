import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRouteComponent } from './help-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationService } from '../core/presentation.service';
import { MatIcon, MatToolbar } from '@angular/material';
import { HelpContentComponent } from './help-content.component';
import { PresentationState } from '../core/presentation.types';

describe('HelpRouteComponent', () => {
  let component: HelpRouteComponent;
  let fixture: ComponentFixture<HelpRouteComponent>;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(async(() => {
    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HelpRouteComponent,
        MockComponent(MatToolbar),
        MockComponent(MatIcon),
        MockComponent(HelpContentComponent),
      ],
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock },
      ],
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
