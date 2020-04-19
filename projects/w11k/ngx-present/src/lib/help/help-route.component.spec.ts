import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { MenuToggleIconComponent } from '../theming/menu-toggle-icon.component';
import { HelpContentComponent } from './help-content.component';

import { HelpRouteComponent } from './help-route.component';

describe('HelpRouteComponent', () => {
  let component: HelpRouteComponent;
  let fixture: ComponentFixture<HelpRouteComponent>;
  let presentationServiceMock;

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
