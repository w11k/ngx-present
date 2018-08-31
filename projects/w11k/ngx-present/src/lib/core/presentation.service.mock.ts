import { StoreMock } from '../../test.utils';
import { PresentationState } from './presentation.types';

export class PresentationServiceMock extends StoreMock<PresentationState> {
  constructor(state: PresentationState) {
    super(state);
  }
}
