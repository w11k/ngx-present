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

  const slides = [
    { component: undefined as any, coordinates: [1, 1], index: 0 },
    { component: undefined as any, coordinates: [1, 2], index: 2 },
    { component: undefined as any, coordinates: [1, 3], index: 2 },
    { component: undefined as any, coordinates: [2, 1], index: 3 },
    { component: undefined as any, coordinates: [2, 2], index: 4 },
    { component: undefined as any, coordinates: [2, 3], index: 5 },
  ];

  it('should move 2 slides forward, flat', () => {
    const slide = calculateCoordinates(slides, slides[0], 2, -1, 2);

    expect(slide).toBeDefined();

    if (slide !== undefined) {
      expect(slide.index).toEqual(2);
    }
  });

  it('should move 2 slides forward, across level', () => {

    const slide = calculateCoordinates(slides, slides[1], 2, -1, 2);

    expect(slide).toBeDefined();

    if (slide !== undefined) {
      expect(slide.index).toEqual(3);
    }
  });

  it('should move 2 slides forward, end of current nesting', () => {

    const slide = calculateCoordinates(slides, slides[2], 2, undefined, 2);

    expect(slide).toBeDefined();

    if (slide !== undefined) {
      expect(slide.index).toEqual(4);
    }
  });
});
