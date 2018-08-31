import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarContentComponent } from './side-bar-content.component';
import { MockComponent } from 'ng-mocks';
import { MatDivider, MatNavList } from '@angular/material';
import { TableOfContentComponent } from '../theming/table-of-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { resetTydux } from '@w11k/tydux/dist/global-state';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';

describe('SideBarContentComponent', () => {
  let component: SideBarContentComponent;
  let fixture: ComponentFixture<SideBarContentComponent>;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(async(() => {
    resetTydux();

    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SideBarContentComponent,
        MockComponent(MatNavList),
        MockComponent(MatDivider),
        MockComponent(TableOfContentComponent),
      ],
      providers: [
        { provide: PresentationService, useValue: presentationServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
