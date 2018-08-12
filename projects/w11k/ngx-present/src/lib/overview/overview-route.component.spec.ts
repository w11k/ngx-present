import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRouteComponent } from './overview-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { SideBarContentComponent } from '../presentation/side-bar-content.component';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { MatCard, MatCardContent, MatIcon, MatToolbar } from '@angular/material';
import { SlideComponent } from '../slide/slide.component';
import { OverviewService } from './overview.service';
import { OverviewServiceMock } from './overview.service.mock';

describe('OverviewRouteComponent', () => {
  let component: OverviewRouteComponent;
  let fixture: ComponentFixture<OverviewRouteComponent>;

  beforeEach(async(() => {
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
      ],
      providers: [
        { provide: PresentationService, useClass: PresentationServiceMock },
        { provide: OverviewService, useClass: OverviewServiceMock },
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
