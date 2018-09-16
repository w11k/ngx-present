import { HelpService, HelpState } from './help.service';
import { Coordinates, StoreMock } from '@w11k/ngx-present';

export class HelpServiceMock extends StoreMock<HelpState> implements Partial<HelpService> {
  constructor() {
    super(new HelpState());
  }

  register(slideCoordinates: Coordinates): Coordinates {
    return [];
  }

  deregister(detailsCoordinates: Coordinates) {

  }
}
