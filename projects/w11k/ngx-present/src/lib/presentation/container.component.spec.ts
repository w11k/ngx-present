import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { EventService } from '../core/event.service';
import { EventServiceMock } from '../core/event.service.mock';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';

import { ContainerComponent } from './container.component';
import { SideBarContentComponent } from './side-bar-content.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let presentationServiceMock: PresentationServiceMock;
  let eventServiceMock: EventServiceMock;

  beforeEach(async(() => {
    presentationServiceMock = new PresentationServiceMock(new PresentationState());
    eventServiceMock = new EventServiceMock();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        ContainerComponent,
        MockComponent(MatSidenav),
        MockComponent(MatSidenavContent),
        MockComponent(MatSidenavContainer),
        MockComponent(SideBarContentComponent)
      ],
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock },
        { provide: EventService, useValue: eventServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
