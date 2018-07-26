import { Component, Input } from '@angular/core';

@Component({
  selector: 'tcc-master-regular',
  templateUrl: './tcc-master-regular.component.html',
  styleUrls: ['./tcc-master-regular.component.scss']
})
export class TccMasterRegularComponent {
  @Input()
  public headline: string;

  @Input()
  public info: string | null;
}

@Component({
  template: `
    <tcc-master-regular [headline]="headline" [info]="info">
      <markdown [data]="content"></markdown>
    </tcc-master-regular>
  `
})
export class RegularSlideWithMarkdownComponent {
  public headline: string;
  public info: string | undefined = undefined;
  public content: string;
}
