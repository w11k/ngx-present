import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PresentationService } from '@w11k/ngx-present';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'tcc-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TccCodeComponent implements OnDestroy {
  @Input()
  public language: string | undefined;

  @Input()
  public code: string | undefined;

  @Input()
  public headline: string | undefined;

  public prismTheme: string | undefined;

  constructor(private readonly presentation: PresentationService) {
    this.presentation
      .select(state => state.config.code.theme)
      .pipe(
        untilComponentDestroyed(this),)
      .subscribe(theme => this.prismTheme = theme);
  }

  ngOnDestroy() {}
}
