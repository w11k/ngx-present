import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresentationService } from '../core/presentation.service';

@Component({
  selector: 'ngx-present-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.scss']
})
export class HelpContentComponent implements OnInit, OnDestroy {

  constructor(private readonly presentation: PresentationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // has to be there fore componentDestroyed
  }

  toggleSideNav() {
    this.presentation.toggleSideNav();
  }

}
