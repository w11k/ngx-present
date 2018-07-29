import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tcc-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TccCodeComponent {
  @Input()
  public language: string;

  @Input()
  public code: string;

  @Input()
  public headline: string | undefined;
}
