import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPresentModule } from '@w11k/ngx-present';
import * as marked from 'marked';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import { TccCodeComponent } from './helper/code/code.component';
import { TccHelpComponent } from './helper/help/help.component';
import { TccPrismThemeDirective } from './helper/prism-theme.directive';
import { TccPrismComponent } from './helper/prism/prism.component';
import { TccSpeakerNotesComponent } from './helper/speaker-notes/speaker-notes.component';
import { TccMasterRegularComponent } from './master/regular/tcc-master-regular.component';
import { TccMasterSectionTitleComponent } from './master/section-title/tcc-master-section-title.component';
import { TccMasterTitleComponent } from './master/title/tcc-master-title.component';

// expose Prism as global variable for ngx-markdown
// using imports here instead of scripts in angular.json to be tree-shakable
(window as any).Prism = Prism;
(window as any).marked = marked;

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href: string, title: string, text: string) => {
    return `<a href="${href}" target="_blank" title="${title || ''}">${text}</a>`;
  };

  return {
    renderer: renderer
  };
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgxPresentModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  declarations: [
    TccMasterRegularComponent,
    TccMasterTitleComponent,
    TccMasterSectionTitleComponent,
    TccPrismComponent,
    TccCodeComponent,
    TccSpeakerNotesComponent,
    TccHelpComponent,
    TccPrismThemeDirective,
  ],
  exports: [
    MarkdownModule,

    TccMasterRegularComponent,
    TccMasterTitleComponent,
    TccMasterSectionTitleComponent,
    TccCodeComponent,
    TccPrismThemeDirective,
    TccSpeakerNotesComponent,
    TccHelpComponent,
  ]
})
export class TccNgxPresentThemeModule { }
