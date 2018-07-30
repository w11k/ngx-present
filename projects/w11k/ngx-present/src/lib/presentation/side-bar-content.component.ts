import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresentationService } from '../core/presentation.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';

@Component({
  selector: 'ngx-present-sidebar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss']
})
export class SideBarContentComponent implements OnInit, OnDestroy {
  public id = '';

  constructor(private readonly presentation: PresentationService) {}

  closeSideNav() {
    setTimeout(() => {
      this.presentation.toggleSideNav();
    }, 250);
  }

  ngOnInit(): void {
    this.presentation.select(state => state.id)
      .bounded(toAngularComponent(this))
      .subscribe(id => this.id = id);
  }

  startP2P() {

  }

  ngOnDestroy(): void {}
}
