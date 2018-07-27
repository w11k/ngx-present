import { Component } from '@angular/core';

@Component({
  template: `<tcc-master-section-title [headline]="headline"></tcc-master-section-title>`
})
export class DataBindingContentTitleComponent {
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

@Component({
  template: `
    <tcc-master-regular [headline]="headline">
      <markdown [data]="content"></markdown>
    </tcc-master-regular>
  `
})
export class MarkdownComponent {
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
    <!-- and html without escaping -->
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
