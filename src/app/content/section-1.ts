import { Component } from '@angular/core';

@Component({
  template: `
    <tcc-master-section-title>
      Inline Content
    </tcc-master-section-title>
  `,
})
export class InlineContentTitleComponent {}

@Component({
  template: `
    <tcc-master-regular headline="Inline HTML Content">
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
      <markdown ngPreserveWhitespaces>
        * First
          * Sub 1
          * Sub 2
        * Second
          * **bold**
        * Third
      </markdown>
    </tcc-master-regular>
  `
})
export class InlineMarkdownComponent {}

@Component({
  template: `
    <tcc-master-regular headline="Inline Code Snippet">
      <tcc-code language="typescript" ngPreserveWhitespaces>const foo = 'bar';

// limitations:
// 1) angular template compiler has a problem with single curly brackets
//    therefore we can not define complex code snippets inline
// 2) if we want to highlight html we have to escape html-special-characters
//
// therefor most of the time it is easier to define the code in a property 
// of the component class and use data-binding</tcc-code>
    </tcc-master-regular>
  `
})
export class InlineCodeSnippetComponent {}

export const section1 = [
  InlineContentTitleComponent,
  InlineHtmlComponent,
  InlineMarkdownComponent,
  InlineCodeSnippetComponent,
];
