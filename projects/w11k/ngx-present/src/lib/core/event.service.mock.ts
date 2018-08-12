import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable()
export class EventServiceMock implements Partial<EventService> {
  processKeyboardEvent(event: KeyboardEvent) {}
}
