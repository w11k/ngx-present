import { EventService } from './event.service';

export class EventServiceMock implements Partial<EventService> {
  processKeyboardEvent(event: KeyboardEvent) {}
}
