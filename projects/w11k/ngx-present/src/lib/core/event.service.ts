import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { filter } from 'rxjs/operators';
import { PresentationService } from './presentation.service';


export function nonNavigationEvent (event: KeyboardEvent): boolean {
  return noModifierPressed(event) && isNotEditable(event);
}

export function isNotEditable(event: KeyboardEvent): boolean {
  const srcElement = event.srcElement;

  if (srcElement instanceof HTMLElement) {
    const tagName = srcElement.tagName;

    if (tagName === 'INPUT' || tagName === 'TEXTAREA' || srcElement.isContentEditable) {
      return false;
    }
  }

  return true;
}

export function noModifierPressed(event: KeyboardEvent): boolean {
  if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
    return false;
  }

  return true;
}

export abstract class KeyboardEventProcessor {
  abstract init(events$: Observable<KeyboardEvent>): void;
}

@Injectable()
export class ToggleSideNav implements KeyboardEventProcessor {
  constructor(private readonly service: PresentationService) {}

  init(events$: Observable<KeyboardEvent>) {
    events$
      .pipe(
        filter(isNotEditable),
        filter(event => !(event.ctrlKey || event.metaKey || event.shiftKey)),
        // letter m
        filter(event => event.keyCode === 77)
      )
      .subscribe(event => {
        event.preventDefault();
        this.service.toggleSideBar(event);
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
