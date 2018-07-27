import { Component, Input } from '@angular/core';
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
export class TccMasterSectionTitleComponent {
  @Input()
  public headline: string | undefined;

  @Input()
  public subHeadline: string | undefined;
}
