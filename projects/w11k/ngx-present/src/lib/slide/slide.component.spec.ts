import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideComponent } from './slide.component';
import { MockComponent } from 'ng-mocks';
import { DynamicComponent } from '../dynamic/dynamic.component';

describe('SlideComponent', () => {
  let component: SlideComponent;
  let fixture: ComponentFixture<SlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SlideComponent,
        MockComponent(DynamicComponent),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
