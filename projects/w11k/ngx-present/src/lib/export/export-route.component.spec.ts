import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MockComponent } from 'ng-mocks';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { SlideComponent } from '../slide/slide.component';
import { MenuToggleIconComponent } from '../theming/menu-toggle-icon.component';

import { ExportRouteComponent } from './export-route.component';

describe('ExportRouteComponent', () => {
  let component: ExportRouteComponent;
  let fixture: ComponentFixture<ExportRouteComponent>;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(async(() => {
    presentationServiceMock = new PresentationServiceMock(new PresentationState());
    TestBed.configureTestingModule({
      declarations: [
        ExportRouteComponent,
        MockComponent(SlideComponent),
        MockComponent(MatToolbar),
        MockComponent(MatIcon),
        MockComponent(MenuToggleIconComponent),

      ],
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
