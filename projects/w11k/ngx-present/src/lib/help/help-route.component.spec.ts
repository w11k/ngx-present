import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRouteComponent } from './help-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { MatIcon, MatToolbar } from '@angular/material';
import { HelpContentComponent } from './help-content.component';
import { MenuToggleIconComponent } from '../theming/menu-toggle-icon.component';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { resetTydux } from '@w11k/tydux/dist/global-state';

describe('HelpRouteComponent', () => {
  let component: HelpRouteComponent;
  let fixture: ComponentFixture<HelpRouteComponent>;
  let presentationServiceMock;

  beforeEach(async(() => {
    resetTydux();

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
        MockComponent(MenuToggleIconComponent),
      ],
      providers: [
        { provide: PresentationService, userValue: presentationServiceMock}
      ]
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
