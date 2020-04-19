import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { skipNil } from '@w11k/rx-ninja';
import { Observable } from 'rxjs';
import { PresentationService } from '../core/presentation.service';

@Component({
  selector: 'ngx-present-sidebar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarContentComponent extends OnDestroyMixin implements OnInit {
  public id = '';
  public showTableOfContent$: Observable<boolean>;
  public showCoordinates$: Observable<boolean>;
  public coordinatesSeparator$: Observable<string>;
  public depth$: Observable<number | undefined>;
  public showExpertMenu$: Observable<boolean>;
  public showSettings$: Observable<boolean>;
  public themeLight$: Observable<boolean>;

  constructor(private readonly presentation: PresentationService) {
    super();

    this.presentation.select(state => state.id)
      .pipe(
        untilComponentDestroyed(this),)
      .subscribe(id => this.id = id);

    this.showCoordinates$ = this.presentation
      .select((state => state.config.sidebar.tableOfContent.showCoordinates))
      .pipe(
        skipNil(),
        untilComponentDestroyed(this),
      )
    ;

    this.showTableOfContent$ = this.presentation
      .select((state => state.config.sidebar.tableOfContent.enabled))
      .pipe(
        skipNil(),
        untilComponentDestroyed(this),
      )
    ;

    this.coordinatesSeparator$ = this.presentation
      .select((state => state.config.sidebar.tableOfContent.separator))
      .pipe(
        skipNil(),
        untilComponentDestroyed(this),
      )
    ;

    this.depth$ = this.presentation
      .select(state => state.config.sidebar.tableOfContent.depth)
      .pipe(
        untilComponentDestroyed(this),
      )
    ;

    this.showExpertMenu$ = this.presentation
      .select(state => state.sideBar.expert)
      .pipe(
        untilComponentDestroyed(this),
      )
    ;

    this.showSettings$ = this.presentation
      .select(state => state.sideBar.settings)
      .pipe(
        untilComponentDestroyed(this),
      )
    ;

    this.themeLight$ = this.presentation
      .select(state => state.config.code.theme === 'light')
      .pipe(
        untilComponentDestroyed(this),
      )
    ;
  }

  ngOnInit(): void {}

  closeSideNav() {
    setTimeout(() => {
      this.presentation.dispatch.closeSideBar();
    }, 25);
  }

  startP2P() {}

  setTheme(event: MatSlideToggleChange) {
    this.presentation.dispatch.setCodeTheme(event.checked ? 'light' : 'dark');
  }
}
