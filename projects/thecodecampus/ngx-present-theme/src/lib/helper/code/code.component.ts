import { Component, Input, ViewEncapsulation } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PresentationService } from '@w11k/ngx-present';

@Component({
  selector: 'tcc-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TccCodeComponent extends OnDestroyMixin {
  @Input()
  public language: string | undefined;

  @Input()
  public code: string | undefined;

  @Input()
  public headline: string | undefined;

  public prismTheme: string | undefined;

  constructor(private readonly presentation: PresentationService) {
    super();

    this.presentation
      .select(state => state.config.code.theme)
      .pipe(
        untilComponentDestroyed(this),
      )
      .subscribe(theme => this.prismTheme = theme);
  }
}
