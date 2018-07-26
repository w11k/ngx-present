import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresentationService } from '../core/presentation.service';

@Component({
  selector: 'app-help-route',
  templateUrl: './help-route.component.html',
  styleUrls: ['./help-route.component.scss']
})
export class HelpRouteComponent implements OnInit, OnDestroy {

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
