import { Directive, ElementRef } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PresentationService } from '@w11k/ngx-present';

/**
 * Adds class with the prefix ```prism-theme``` and the name of the currently selected theme to the element the directive is applied to.
 *
 * Mainly needed to apply the class on a higher level than a code-component instance which also adds these classes.
 * Markdown with inlined code does not use the code-component but also needs the class on a higher element.
 */
@Directive({
  selector: '[tccPrismTheme]'
})
export class TccPrismThemeDirective extends OnDestroyMixin {

  private appliedTheme: string | undefined;

  constructor(private readonly element: ElementRef,
              private readonly presentation: PresentationService) {
    super();

    this.presentation
      .select(state => state.config.code.theme)
      .pipe(
        untilComponentDestroyed(this),
      )
      .subscribe(theme => {
        const element = this.element.nativeElement as HTMLElement;

        if (this.appliedTheme !== undefined) {
          element.classList.remove(`prism-theme-${this.appliedTheme}`);
        }

        element.classList.add(`prism-theme-${theme}`);
        this.appliedTheme = theme;
      });
  }
}
