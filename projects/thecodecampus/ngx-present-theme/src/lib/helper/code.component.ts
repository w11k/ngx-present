import { Component, Input } from '@angular/core';

@Component({
  selector: 'tcc-code',
  template: `
    <ngx-prism [language]="language" [code]="code | trim">
      <ng-content></ng-content>
    </ngx-prism>
  `
})
export class TccCodeComponent {
  @Input()
  public language: string;

  @Input()
  public code: string;
}
