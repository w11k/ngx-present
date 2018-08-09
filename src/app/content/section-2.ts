import { Component } from '@angular/core';
import { TableOfContentEntry } from '@w11k/ngx-present';

@TableOfContentEntry({
  linkName: DataBindingContentTitleComponent.headline
})
@Component({
  template: `<tcc-master-section-title [headline]="headline"></tcc-master-section-title>`
})
export class DataBindingContentTitleComponent {
  static headline = 'Data-Binding Content';
  headline = DataBindingContentTitleComponent.headline;
}

const sharedCodeExample = `
@Component({
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit, OnDestroy {
  @Input()
  public prop: string;
  
  constructor(private readonly service: AService) {}
  
  ngOnInit() {
    const foobar = \`\`;
  }
  
  ngOnDestroy() {} 
}
`;

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
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit, OnDestroy {
  @Input()
  public prop: string;
  
  constructor(private readonly service: AService) {}
  
  ngOnInit() {
    const foobar = \`\`;
  }
  
  ngOnDestroy() {} 
}
`;
}


@Component({
  template: `
    <tcc-master-regular headline="List and Code Snippet" info="TypeScript" class="align-items-center">
      <markdown ngPreserveWhitespaces>
        * First is very important
        * Second too of course
        * Third maybe less important
        * Fourth is unimportant
        * Fifth is the last because it is so important
      </markdown>

      <div>
        <tcc-code language="typescript" [code]="codeTs" headline="./example.component.ts"></tcc-code>
        <tcc-code language="typescript" [code]="codeHtml" headline="./example.component.html"></tcc-code>
      </div>
    </tcc-master-regular>
  `
})
export class ListAndCodeSnippetComponent {
  public codeTs = sharedCodeExample;
  public codeHtml = `<div>{{prop}}</div>`;
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
  ListAndCodeSnippetComponent,
  MarkdownComponent,
];
