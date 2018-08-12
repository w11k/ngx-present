import { Directive, OnDestroy, Optional, TemplateRef } from '@angular/core';

export abstract class SpeakerNotesTarget {
  abstract attach(template: TemplateRef<any>): () => void;
}

@Directive({
  selector: '[ngxPresentSpeakerNotes]',
})
export class SpeakerNotesDirective implements OnDestroy {

  private detach: (() => void) | undefined;

  constructor(private readonly template: TemplateRef<any>,
              @Optional() private readonly target: SpeakerNotesTarget) {
    if (target) {
      setTimeout(() => {
        this.detach = target.attach(template);
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.detach) {
      this.detach();
      this.detach = undefined;
    }
  }
}
