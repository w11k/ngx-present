import { inject, TestBed } from '@angular/core/testing';
import { PresentationService } from './presentation.service';
import { routeParamsToCoordinate, routerParamsCoordinatePrefix } from '../slide-by-slide/slide-by-slide.functions';


describe('PresentationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresentationService]
    });
  });

  it('should be created', inject([PresentationService], (service: PresentationService) => {
    expect(service).toBeTruthy();
  }));
});

describe('function routeParamsToCoordinate', () => {

  it('should collect coordinate params', () => {
    const coordinates = routeParamsToCoordinate({
      [routerParamsCoordinatePrefix + '1']: '1',
      [routerParamsCoordinatePrefix + '2']: '2',
      [routerParamsCoordinatePrefix + '3']: '3',
      'something': 'false',
    });

    expect(coordinates).toEqual([1, 2, 3]);
  });
});
