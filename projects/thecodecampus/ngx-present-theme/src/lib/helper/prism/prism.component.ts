import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SecurityContext, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var Prism: any;

@Component({
  selector: 'tcc-prism',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './prism.component.html'
})
export class TccPrismComponent implements OnChanges {
  @ViewChild('codeElement', { static: true, read: ElementRef })
  codeElementRef: ElementRef | undefined;

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  @Input()
  public code: string | undefined;

  @Input()
  public language: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.codeElementRef === undefined) {
      console.log(`Couldn't find code element in template`);
      return;
    }

    const element: HTMLElement = this.codeElementRef.nativeElement;

    if (this.code === undefined) {
      element.innerHTML = '';
      return;
    }

    const sanitizedCode = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(this.code));

    if (sanitizedCode !== null) {
      const languageChange = changes['language'];
      if (languageChange !== undefined) {
        element.classList.remove(`language-${languageChange.previousValue}`);
        element.classList.add(`language-${languageChange.currentValue}`);
      }
      element.innerHTML = sanitizedCode;
    }

    Prism.highlightElement(element);
  }

  private escapeHtml(unsafe: string) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

}
