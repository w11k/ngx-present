import { TestBed } from '@angular/core/testing';

import { EventService, KEYBOARD_EVENT_PROCESSOR_TOKEN, KeyboardEventProcessor } from './event.service';
import { Observable } from 'rxjs';

class MockEventProcessor implements KeyboardEventProcessor {
  init(events$: Observable<KeyboardEvent>): void {}
}

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: KEYBOARD_EVENT_PROCESSOR_TOKEN, useClass: MockEventProcessor}
      ]
    });

    service = TestBed.get(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
