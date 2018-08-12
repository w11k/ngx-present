import { routeParamsToCoordinate, routerParamsCoordinatePrefix } from './slide-by-slide.functions';

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
