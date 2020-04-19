import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { SideBarContentComponent } from '../presentation/side-bar-content.component';
import { SlideComponent } from '../slide/slide.component';
import { MenuToggleIconComponent } from '../theming/menu-toggle-icon.component';

import { OverviewRouteComponent } from './overview-route.component';
import { OverviewService } from './overview.service';
import { OverviewServiceMock } from './overview.service.mock';

describe('OverviewRouteComponent', () => {
  let component: OverviewRouteComponent;
  let fixture: ComponentFixture<OverviewRouteComponent>;
  let presentationServiceMock: PresentationServiceMock;
  let overviewServiceMock: OverviewServiceMock;

  beforeEach(async(() => {
    presentationServiceMock = new PresentationServiceMock(new PresentationState());
    overviewServiceMock = new OverviewServiceMock();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        OverviewRouteComponent,
        MockComponent(MatIcon),
        MockComponent(MatToolbar),
        MockComponent(MatCard),
        MockComponent(MatIcon),
        MockComponent(MatCardContent),
        MockComponent(SideBarContentComponent),
        MockComponent(SlideComponent),
        MockComponent(MenuToggleIconComponent),
      ],
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock },
        { provide: OverviewService, useValue: overviewServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
