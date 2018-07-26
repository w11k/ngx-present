import { Injectable, InjectionToken, Injector } from '@angular/core';
import { PresentationService } from './presentation.service';
import { Observable, Subject } from 'rxjs';

import { filter } from 'rxjs/operators';


export function filterNonNavigationEvent (event: KeyboardEvent): boolean {
  if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
    return false;
  }

  const srcElement: Element | null = event.srcElement;

  if (srcElement instanceof HTMLElement) {
    const tagName = srcElement.tagName;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA' || srcElement.isContentEditable) {
      return false;
    }
  }

  return true;
}

export abstract class KeyboardEventProcessor {
  abstract init(events$: Observable<KeyboardEvent>);
}

@Injectable()
export class ToggleSideNav implements KeyboardEventProcessor {
  constructor(private readonly service: PresentationService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(filterNonNavigationEvent),
        // letter m
        filter(event => event.keyCode === 77)
      )
      .subscribe(() => {
        this.service.toggleSideNav();
      });
  }
}

export const KEYBOARD_EVENT_PROCESSOR_TOKEN = new InjectionToken<KeyboardEventProcessor[]>('KEYBOARD_EVENT_PROCESSORS');

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private keyboardEvents$ = new Subject<KeyboardEvent>();

  constructor(injector: Injector) {
    const keyboardEventProcessors = injector.get(KEYBOARD_EVENT_PROCESSOR_TOKEN);

    for (const processor of keyboardEventProcessors) {
      processor.init(this.keyboardEvents$);
    }
  }

  processKeyboardEvent(event: KeyboardEvent) {
    // console.debug('EventService: emit keyboard event');
    this.keyboardEvents$.next(event);
  }

}
