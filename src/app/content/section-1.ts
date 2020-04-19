import { Component } from '@angular/core';
import { TableOfContentEntry } from '@w11k/ngx-present';

@TableOfContentEntry({
  linkName: 'Inline Content'
})
@Component({
  template: `
    <tcc-master-section-title>
      Inline Content
    </tcc-master-section-title>

    <tcc-speaker-notes *ngxPresentSpeakerNotes>
      <pre markdown>
        * Note 1
        * Note 2
      </pre>
    </tcc-speaker-notes>
  `,
})
export class InlineContentTitleComponent {}

@Component({
  template: `
    <tcc-master-regular headline="Inline HTML Content">
      <ul class="as-headlines">
        <li>Headline 1
          <ul>
            <li>Content 1</li>
            <li>Content 2</li>
          </ul>
        </li>
        <li>Headline 2
          <ul>
            <li>Content 1</li>
            <li>Content 2</li>
          </ul>
        </li>
      </ul>

      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </tcc-master-regular>
  `
})
export class InlineHtmlComponent {}

@Component({
  template: `
    <tcc-master-regular headline="Inline Markdown Content">
      <div class="headline-list">
        <pre markdown>
          * Headline 1
            * Content 1
            * Content 2
          * Headline 2
            * Content 1
            * Content 2
        </pre>
      </div>

      <pre markdown>
        * First
          * Sub 1
          * Sub 2
        * Second
          * **bold**
        * Third
      </pre>
    </tcc-master-regular>
  `
})
export class InlineMarkdownComponent {}

@TableOfContentEntry({
  linkName: 'Sub Section'
})
@Component({
  template: `
    <tcc-master-section-title>
      Sub Section
    </tcc-master-section-title>
  `,
})
export class SubSectionTitleComponent {}

export const section1 = [
  InlineContentTitleComponent,
  InlineHtmlComponent,
  InlineMarkdownComponent,
  [SubSectionTitleComponent],
];
