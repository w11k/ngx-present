import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
// import { resetTydux } from '@w11k/tydux/dist/global-state';
import { PresentationService } from '../core/presentation.service';
import { PresentationServiceMock } from '../core/presentation.service.mock';
import { PresentationState } from '../core/presentation.types';
import { TableOfContentComponent } from '../theming/table-of-content.component';

import { SideBarContentComponent } from './side-bar-content.component';

describe('SideBarContentComponent', () => {
  let component: SideBarContentComponent;
  let fixture: ComponentFixture<SideBarContentComponent>;
  let presentationServiceMock: PresentationServiceMock;

  beforeEach(async(() => {
    // resetTydux();

    presentationServiceMock = new PresentationServiceMock(new PresentationState());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SideBarContentComponent,
        MockComponent(MatNavList),
        MockComponent(MatListItem),
        MockComponent(MatDivider),
        MockComponent(MatSlideToggle),
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
