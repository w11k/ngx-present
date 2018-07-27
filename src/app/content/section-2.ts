import { Component } from '@angular/core';
import { RegularSlideWithMarkdownComponent, SectionTitleSlideComponent } from '@thecodecampus/ngx-present-theme';

export class DataBindingContentTitleComponent extends SectionTitleSlideComponent {
  headline = 'Data-Binding Content';
}

@Component({
  template: `
    <tcc-master-regular headline="Just Code Snippet" info="TypeScript">
      <tcc-code language="typescript" [code]="code"></tcc-code>
    </tcc-master-regular>
  `
})
export class CodeSnippetComponent {
  public code = `
@Component({
  templateUrl: './content-4.component.html'
})
export class Content4Component {}
`;
}

export class MarkdownComponent extends RegularSlideWithMarkdownComponent {
  headline = 'Complete Markdown Content';

  content = `
    * JavaScript
      \`\`\`javascript
      const inline = 'supported';
      \`\`\`
    * TypeScript
      \`\`\`typescript
      const inline: string = 'supported';
      \`\`\`
  
    \`\`\`typescript
    // markdown via data binding also supports curly brackets
    let foobar = function () {}
    \`\`\`
  
    \`\`\`html
    <!-- and html -->
    <div>
      <a href="https://foobar.com" target="_blank">Foobar</a>
    </div>
    \`\`\`
  `;
}

export const section2 = [
  DataBindingContentTitleComponent,
  CodeSnippetComponent,
  MarkdownComponent,
];
