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
  public currentSlide: Slide | undefined;

  @Input()
  public nextSlide: Slide | undefined;

  @Input()
  public nextSection: Slide | undefined;

  public speakerNoteProviders: StaticProvider[] = [
    { provide: SpeakerNotesTarget, useValue: this }
  ];

  @ViewChild('speakerNotes', { read: ViewContainerRef })
  private container: ViewContainerRef | undefined;

  constructor(private readonly service: SlideBySlideService) {}

  attach(template: TemplateRef<any>) {
    if (this.container === undefined) {
      throw new Error(`Couldn't find child speaker notes. Check template to expose it`);
    }

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
