import { Params } from '@angular/router';
import { Coordinates, Slide, Slides } from '../core/presentation.types';
import { max, min } from '../core/utils';
import { RecursiveArray } from '../types';

export function calculateCoordinates(slides: Slide[],
                                     currentSlide: Slide,
                                     move: number,
                                     coordinatesToKeep: number | undefined,
                                     coordinatesMaxDepth: number): Slide | undefined {
  if (move === 0) {
    return currentSlide;
  }

  if (coordinatesToKeep === undefined) {
    return slides[currentSlide.index + move];
  }

  const currentCoordinates = currentSlide.coordinates;

  const coordinatesToKeepAbs: number = coordinatesToKeepAbsolute(currentCoordinates, coordinatesToKeep);

  const newCoordinates: Coordinates = currentCoordinates.slice(0, coordinatesToKeepAbs);

  if (move > 0 && coordinatesToKeepAbs < currentCoordinates.length) {
    newCoordinates.push(currentCoordinates[coordinatesToKeepAbs] + move);
  } else if (move > 0) {
    newCoordinates.push(move);
  } else if (move < 0 && currentCoordinates[coordinatesToKeepAbs + 1] !== undefined && currentCoordinates[coordinatesToKeepAbs + 1] > 1) {
    newCoordinates.push(currentCoordinates[coordinatesToKeepAbs] + move + 1);
  } else if (move < 0 && coordinatesToKeepAbs < currentCoordinates.length) {
    newCoordinates.push(max(1, currentCoordinates[coordinatesToKeepAbs] + move));
  } else if (move < 0) {
    newCoordinates.push(1);
  }

  if (move < 0) {
    while (newCoordinates.length <= coordinatesMaxDepth) {
      newCoordinates.push(1);
    }
  }

  let arrayToSearchIn: Slide[];
  if (move >= 0) {
    arrayToSearchIn = slides.slice(currentSlide.index + 1);
  } else {
    arrayToSearchIn = slides.slice(0, currentSlide.index).reverse();
  }

  const nextSlide = arrayToSearchIn.find(slide => {
    const compared = compareCoordinates(slide.coordinates, newCoordinates);

    if (move < 0) {
      return compared <= 0;
    } else {
      return compared >= 0;
    }
  });

  return nextSlide;
}

export function coordinatesToKeepAbsolute(coordinates: Coordinates, coordinatesToKeepRelative: number): number {
  if (coordinatesToKeepRelative >= 0) {
    return min(coordinatesToKeepRelative, coordinates.length);
  }

  return max(coordinates.length + coordinatesToKeepRelative, 0);
}

export const routerParamsCoordinatePrefix = 'coordinate-';

export function routeParamsToCoordinate(routeParams: Params): number[] {
  const keys = Object.keys(routeParams);

  const coordinates = keys
    .filter(key => key.startsWith(routerParamsCoordinatePrefix))
    .map(key => {
      const keyNumber = parseInt(key.substr(routerParamsCoordinatePrefix.length), 10);

      return { key, keyNumber };
    })
    .sort((a, b) => compareNumber(a.keyNumber, b.keyNumber))
    .map(key => parseInt(routeParams[key.key], 10));

  return coordinates;
}

function compareNumber(a: number | undefined, b: number | undefined): -1 | 0 | 1 {
  if (a !== undefined && b === undefined) {
    return 1;
  }

  if (a === undefined && b !== undefined) {
    return -1;
  }

  if (a === undefined && b === undefined) {
    return 0;
  }

  if (a !== undefined && b !== undefined && a > b) {
    return 1;
  }

  if (a !== undefined && b !== undefined && a < b) {
    return -1;
  }

  return 0;
}

export function equalCoordinates(c1: Coordinates | null | undefined, c2: Coordinates | null | undefined): boolean {
  return compareCoordinates(c1, c2) === 0;
}

export function compareCoordinates(c1: Coordinates | null | undefined, c2: Coordinates | null | undefined): -1 | 0 | 1 {
  if (c1 === c2) {
    return 0;
  }

  if (c1 === null || c1 === undefined) {
    return -1;
  }


  if (c2 === null || c2 === undefined) {
    return 1;
  }

  const maxLength = max(c1.length, c2.length);

  for (let i = 0; i < maxLength; i++) {
    const c1i = c1[i];
    const c2i = c2[i];

    const iResult = compareNumber(c1i, c2i);

    if (iResult !== 0) {
      return iResult;
    }
  }

  return 0;
}

export function isValidCoordinate(slides: Slides, coordinates: Coordinates): boolean {
  if (coordinates.length === 0) {
    return false;
  }

  let current: RecursiveArray<Slide> = slides;

  for (const coordinate of coordinates) {
    const tooLow = coordinate < 1;
    const tooHigh = Array.isArray(current) && coordinate - 1 >= current.length;

    if (tooLow || tooHigh) {
      return false;
    }

    const next = current[coordinate - 1];
    if (Array.isArray(next)) {
      current = next;
    } else {
      current = [];
    }
  }

  return true;
}

export function coordinatesToString(coordinates: Coordinates, separator: string, length?: number): string {
  return coordinates.slice(0, length).join(separator);
}

export function coordinateToSlideMap(slides: Slide[]): { [key: string]: Slide } {
  const map: { [key: string]: Slide } = {};

  for (const slide of slides) {
    const index = coordinatesToString(slide.coordinates, '.');
    map[index] = slide;
  }

  return map;
}
