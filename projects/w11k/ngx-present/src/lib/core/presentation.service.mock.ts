import { PresentationService } from './presentation.service';
import { StateMock } from '../../test.utils';

export class PresentationServiceWithoutState implements Partial<PresentationService> {

}

export const PresentationServiceMock = StateMock(PresentationServiceWithoutState);
