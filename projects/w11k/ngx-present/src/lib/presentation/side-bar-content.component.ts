import { Component } from '@angular/core';
import { PresentationService } from '../core/presentation.service';

@Component({
  selector: 'ngx-present-sidebar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss']
})
export class SideBarContentComponent {
  constructor(private presentation: PresentationService) {}

  closeSideNav() {
    setTimeout(() => {
      this.presentation.toggleSideNav();
    }, 250)
  }
}
