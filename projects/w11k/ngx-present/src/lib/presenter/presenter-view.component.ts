import { Component, Input, StaticProvider, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { Slide } from '../core/presentation.types';
import { SpeakerNotesTarget } from '../speaker-notes/speaker-notes.directive';

@Component({
  selector: 'ngx-present-presenter-view',
  templateUrl: './presenter-view.component.html',
  styleUrls: ['./presenter-view.component.scss']
})
export class PresenterViewComponent implements SpeakerNotesTarget {
  @Input()
  public currentSlide: Slide;

  @Input()
  public nextSlide: Slide;

  @Input()
  public nextSection: Slide;

  public speakerNoteProviders: StaticProvider[] = [
    { provide: SpeakerNotesTarget, useValue: this }
  ];

  @ViewChild('speakerNotes', { read: ViewContainerRef })
  private container: ViewContainerRef;

  constructor(private readonly service: SlideBySlideService) {}

  attach(template: TemplateRef<any>) {
    const embeddedViewRef = this.container.createEmbeddedView(template);

    return () => {
      embeddedViewRef.destroy();
    };
  }

  goToNextSlide() {
    this.service.navigateToNext(-1);
  }

  goToNextSection() {
    this.service.navigateToNext(-2);
  }
}
