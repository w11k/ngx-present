import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PresentationService } from '../core/presentation.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-present-sidebar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarContentComponent implements OnInit, OnDestroy {
  public id = '';
  public showTableOfContent$: Observable<boolean>;
  public showCoordinates$: Observable<boolean>;

  constructor(private readonly presentation: PresentationService) {}

  closeSideNav() {
    setTimeout(() => {
      this.presentation.dispatch.toggleSideNav();
    }, 25);
  }

  ngOnInit(): void {
    this.presentation.select(state => state.id)
      .bounded(toAngularComponent(this))
      .subscribe(id => this.id = id);

    this.showCoordinates$ = this.presentation
      .select(state => state.config.sidebar.tableOfContent.showCoordinates)
      .bounded(toAngularComponent(this));

    this.showTableOfContent$ = this.presentation
      .select(state => state.config.sidebar.tableOfContent.enabled)
      .bounded(toAngularComponent(this));
  }

  startP2P() {

  }

  ngOnDestroy(): void {}
}
