import { AfterViewInit, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { PresentationService } from '../core/presentation.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { EventService } from '../core/event.service';

@Component({
  selector: 'ngx-present-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav)
  private sideNav: MatSidenav;

  constructor(private readonly presentation: PresentationService,
              private readonly events: EventService) {
  }

  ngAfterViewInit(): void {
    this.presentation
      .select(state => state.sideNavOpen)
      .bounded(toAngularComponent(this))
      .subscribe(status => {
        if (status) {
          this.sideNav.open();
        }
        else {
          this.sideNav.close();
        }
      });
  }

  onSideNavClose(opened: boolean) {
    if (!opened) {
      this.presentation.dispatch.closeSideNav();
    }
  }

  ngOnDestroy(): void {}

  @HostListener('document:keydown', ['$event'])
  onKeyPressed(event: KeyboardEvent) {
    this.events.processKeyboardEvent(event);
  }

}
