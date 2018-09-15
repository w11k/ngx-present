import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NGX_PRESENT_CONFIG, SLIDES } from './core/presentation.service';
import { KEYBOARD_EVENT_PROCESSOR_TOKEN, ToggleSideNav } from './core/event.service';
import { OverviewRouteComponent } from './overview/overview-route.component';
import { ExportRouteComponent } from './export/export-route.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { ContainerComponent } from './presentation/container.component';
import { HelpContentComponent } from './help/help-content.component';
import { PageTitleDirective } from './core/page-title.directive';
import { NgxPresentConfig, SlideComponents } from './core/presentation.types';
import { SlideBySlideRouteComponent } from './slide-by-slide/slide-by-slide-route.component';
import {
  NavigateSectionBackward,
  NavigateSectionForward,
  NavigateSlideBackward,
  NavigateSlideForward,
  NavigateToFirstSlide, NavigateToOverview
} from './slide-by-slide/slide-by-slide.service';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SlideComponent } from './slide/slide.component';
import { HelpRouteComponent } from './help/help-route.component';
import { SideBarContentComponent } from './presentation/side-bar-content.component';
import { HelpDialogComponent } from './help/help-dialog.component';
import { SlideLinkDirective } from './core/slide-link.directive';
import { TrimPipe } from './core/trim.pipe';
import { MenuToggleIconComponent } from './theming/menu-toggle-icon.component';
import { SlideIndexComponent } from './theming/slide-index.component';
import { HelpDialogIconComponent } from './theming/help-dialog-icon.component';
import { PresenterRouteComponent } from './presenter/presenter-route.component';
import { PresenterViewComponent } from './presenter/presenter-view.component';
import { TableOfContentComponent } from './theming/table-of-content.component';
import { SpeakerNotesDirective } from './speaker-notes/speaker-notes.directive';
import { TableOfContentViewComponent } from './theming/table-of-content-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    SlideBySlideRouteComponent,
    DynamicComponent,
    OverviewRouteComponent,
    ExportRouteComponent,
    SlideComponent,
    ContainerComponent,
    HelpContentComponent,
    HelpRouteComponent,
    PageTitleDirective,
    SideBarContentComponent,
    HelpDialogComponent,
    SlideLinkDirective,
    TrimPipe,
    MenuToggleIconComponent,
    SlideIndexComponent,
    HelpDialogIconComponent,
    PresenterRouteComponent,
    PresenterViewComponent,
    TableOfContentComponent,
    TableOfContentViewComponent,
    SpeakerNotesDirective,
  ],
  entryComponents: [
    HelpDialogComponent,
  ],
  exports: [
    ContainerComponent,
    SlideLinkDirective,
    TrimPipe,
    MenuToggleIconComponent,
    SlideIndexComponent,
    HelpDialogIconComponent,
    TableOfContentComponent,
    SpeakerNotesDirective,
  ]
})
export class NgxPresentModule {
  static withSlides(slides: SlideComponents, config: RecursivePartial<NgxPresentConfig> = {}): ModuleWithProviders {
    return {
      ngModule: NgxPresentModule,
      providers: [
        { provide: NGX_PRESENT_CONFIG, useValue: config},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSectionForward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSlideForward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSectionBackward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateSlideBackward, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateToFirstSlide, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: ToggleSideNav, multi: true},
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: NavigateToOverview, multi: true},
        { provide: SLIDES, useValue: slides}
      ]
    };
  }
}
