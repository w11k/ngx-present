/// <reference path="./types.d.ts" />


/*
 * Public API Surface of @w11k/ngx-present
 */

export * from './lib/ngx-present.module';
export * from './lib/ngx-present.routes';
export * from './lib/core/event.service';
export * from './lib/core/page-title.directive';
export * from './lib/core/presentation.service';
export * from './lib/core/presentation.types';
export * from './lib/core/title.service';
export * from './lib/core/utils';
export * from './lib/slide/slide.service';
export * from './lib/slide-by-slide/slide-by-slide.functions';
export * from './lib/slide-by-slide/slide-by-slide.service';
export { TableOfContentEntry } from './lib/theming/table-of-content';
export { MenuToggleIconComponent } from './lib/theming/menu-toggle-icon.component';
export { HelpDialogIconComponent } from './lib/theming/help-dialog-icon.component';
export { SlideIndexComponent } from './lib/theming/slide-index.component';
export { ContainerComponent } from './lib/presentation/container.component';
export { SlideLinkDirective } from './lib/core/slide-link.directive';
export { TrimPipe } from './lib/core/trim.pipe';
export { TableOfContentComponent } from './lib/theming/table-of-content.component';
export { SpeakerNotesDirective } from './lib/speaker-notes/speaker-notes.directive';

// TODO: move to testing.ts and find a way to build testing.ts as additional entryPoint
export { StoreMock} from './test.utils';
