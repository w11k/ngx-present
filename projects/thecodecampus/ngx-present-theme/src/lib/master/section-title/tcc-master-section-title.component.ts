import { Component } from '@angular/core';
import { bounceIn } from 'ngx-animate/lib';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'tcc-master-section-title',
  templateUrl: './tcc-master-section-title.component.html',
  styleUrls: ['./tcc-master-section-title.component.scss'],
  animations: [
    trigger('animate', [
      transition(':enter', useAnimation(bounceIn))
    ])
  ]
})
export class TccMasterSectionTitleComponent {}

@Component({
  template: `
    <tcc-master-section-title>
      {{headline}}
      <ng-container *ngIf="subHeadline">
        <br><small>{{subHeadline}}</small>
      </ng-container>
    </tcc-master-section-title>
  `
})
export class SectionTitleSlideComponent {
  public headline: string;
  public subHeadline: string | undefined;
}
