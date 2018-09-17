import { calculateCoordinates, routeParamsToCoordinate, routerParamsCoordinatePrefix } from './slide-by-slide.functions';
import { Slide } from '../core/presentation.types';

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

describe('function calculateCoordinates', () => {

  it('should move 2 slides forward, flat', () => {
    const slides: Slide[] = [
      { component: undefined as any, coordinates: [1], index: 1 },
      { component: undefined as any, coordinates: [2], index: 2 },
      { component: undefined as any, coordinates: [3], index: 3 },
    ];

    const slide = calculateCoordinates(slides, slides[0], 2, -1, 2);

    expect(slide).toBeDefined();

    if (slide !== undefined) {
      expect(slide.index).toEqual(3);
    }
  });
});

describe('function calculateCoordinates', () => {

  it('should move 2 slides forward, flat', () => {
    const slides: Slide[] = [
      { component: undefined as any, coordinates: [1, 1], index: 1 },
      { component: undefined as any, coordinates: [1, 2], index: 2 },
      { component: undefined as any, coordinates: [1, 3], index: 3 },
      { component: undefined as any, coordinates: [2, 1], index: 4 },
      { component: undefined as any, coordinates: [2, 2], index: 5 },
      { component: undefined as any, coordinates: [2, 3], index: 6 },
    ];

    const slide = calculateCoordinates(slides, slides[1], 2, -1, 2);

    expect(slide).toBeDefined();

    if (slide !== undefined) {
      expect(slide.index).toEqual(4);
    }
  });
});
