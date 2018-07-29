import { Component, Type } from '@angular/core';
import { InlineContentTitleComponent } from '../content/section-1';
import { DataBindingContentTitleComponent } from '../content/section-2';

interface SlideLink {
  component: Type<any>;
  name: string;
}

@Component({
  template: `
    <tcc-master-regular headline="Intro">
      <ul>
        <li *ngFor="let link of links">
          <a class="invisible" routerLink [ngxPresentSlideLink]="link.component">{{link.name}}</a>
        </li>
      </ul>
    </tcc-master-regular>
  `,
})
export class IntroComponent {
  public links: SlideLink[] = [
    { component: InlineContentTitleComponent, name: 'Inline Content'},
    { component: DataBindingContentTitleComponent, name: 'Data-Binding Content'},
  ];
}
