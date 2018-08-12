import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tcc-master-regular',
  templateUrl: './tcc-master-regular.component.html',
  styleUrls: ['./tcc-master-regular.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TccMasterRegularComponent {
  @Input()
  public headline: string | undefined;

  @Input()
  public info: string | undefined;
}
