import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRouteComponent } from './export-route.component';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { MatIcon, MatToolbar } from '@angular/material';
import { MockComponent } from 'ng-mocks';
import { SlideComponent } from '../slide/slide.component';

describe('ExportRouteComponent', () => {
  let component: ExportRouteComponent;
  let fixture: ComponentFixture<ExportRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExportRouteComponent,
        MockComponent(SlideComponent),
        MockComponent(MatToolbar),
        MockComponent(MatIcon),
      ],
      providers: [
        { provide: PresentationService, useClass: PresentationServiceMock },
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
