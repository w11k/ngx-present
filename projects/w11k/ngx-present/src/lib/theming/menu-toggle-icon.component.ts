import { Component } from '@angular/core';
import { PresentationService } from '../core/presentation.service';

@Component({
  selector: 'ngx-present-menu-toggle-icon',
  template: `
    <button mat-icon-button (click)="toggleSideNav($event)">
      <mat-icon>menu</mat-icon>
    </button>
  `
})
export class MenuToggleIconComponent {
  constructor(private readonly presentation: PresentationService) {}

  toggleSideNav(event: MouseEvent) {
    this.presentation.toggleSideBar(event);
  }
}
