import { Type } from '@angular/core';
import { Coordinates, RecursiveArray, Slide, SlideComponents, Slides } from './presentation.types';

export function componentToSlide(component: Type<any>, coordinates: Coordinates, index: number): Slide {
  return new Slide(component, coordinates, index);
}

export function componentsToSlidesRecursive(components: Type<any> | RecursiveArray<any>, coordinates: Coordinates, counter: { index: number }) {
  if (Array.isArray(components)) {
    return components.map((x, i) => {
      const newCoordinates = coordinates.slice();
      newCoordinates.push(i + 1);

      return componentsToSlidesRecursive(x, newCoordinates, counter);
    });
  }

  counter.index++;
  return componentToSlide(components, coordinates, counter.index);
}

export function componentsToSlideTree(slideComponents: SlideComponents): Slides {
  const counter = {
    index: -1
  };

  return slideComponents.map((x, i) => componentsToSlidesRecursive(x, [i + 1], counter));
}
