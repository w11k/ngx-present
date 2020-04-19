import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TyduxModule } from '@w11k/tydux-angular';
import { KEYBOARD_EVENT_PROCESSOR_TOKEN, ToggleSideNav } from './core/event.service';
import { PageTitleDirective } from './core/page-title.directive';
import { NGX_PRESENT_CONFIG, SLIDES } from './core/presentation.service';
import { NgxPresentConfig, SlideComponents } from './core/presentation.types';
import { SlideLinkDirective } from './core/slide-link.directive';
import { TrimPipe } from './core/trim.pipe';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ExportRouteComponent } from './export/export-route.component';
import { HelpContentComponent } from './help/help-content.component';
import { HelpDialogComponent } from './help/help-dialog.component';
import { HelpRouteComponent } from './help/help-route.component';
import { ngxPresentRoutes } from './ngx-present.routes';
import { OverviewRouteComponent } from './overview/overview-route.component';
import { ContainerComponent } from './presentation/container.component';
import { SideBarContentComponent } from './presentation/side-bar-content.component';
import { PresenterRouteComponent } from './presenter/presenter-route.component';
import { PresenterViewComponent } from './presenter/presenter-view.component';
import { SlideBySlideRouteComponent } from './slide-by-slide/slide-by-slide-route.component';
import {
  NavigateSectionBackward,
  NavigateSectionForward,
  NavigateSlideBackward,
  NavigateSlideForward,
  NavigateToFirstSlide,
  NavigateToOverview,
  TogglePresenter,
} from './slide-by-slide/slide-by-slide.service';
import { SlideComponent } from './slide/slide.component';
import { SpeakerNotesDirective } from './speaker-notes/speaker-notes.directive';
import { HelpDialogIconComponent } from './theming/help-dialog-icon.component';
import { MenuToggleIconComponent } from './theming/menu-toggle-icon.component';
import { SlideIndexComponent } from './theming/slide-index.component';
import { TableOfContentViewComponent } from './theming/table-of-content-view.component';
import { TableOfContentComponent } from './theming/table-of-content.component';

@NgModule({
  imports: [
    CommonModule,
    TyduxModule,
    RouterModule.forChild(ngxPresentRoutes),
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
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
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: TogglePresenter, multi: true},
        { provide: SLIDES, useValue: slides}
      ]
    };
  }
}
