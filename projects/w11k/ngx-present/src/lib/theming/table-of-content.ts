import { Slide } from '../core/presentation.types';
import { notUndefined } from '../core/rx-utils';

export const tableOfContentMetadataKey = Symbol('TableOfContentEntry');

export interface DecoratorMetadata {
  linkName: string;
}

// Decorator
export function TableOfContentEntry(config: DecoratorMetadata): ClassDecorator {
  return function(constructor: any) {
    // TODO: get rid of cast to any, include proper Reflect typings
    (Reflect as any).defineMetadata(tableOfContentMetadataKey, config, constructor);
  };
}

export function tableOfContentMetadata(slide: Slide): DecoratorMetadata | undefined {
  const decoratorMetadata: DecoratorMetadata = (Reflect as any).getMetadata(tableOfContentMetadataKey, slide.component);

  return decoratorMetadata;
}

export function tableOfContentEntries(slides: Slide[]): DecoratorMetadata[] {
  return slides
    .map(tableOfContentMetadata)
    .filter(notUndefined);
}

export function tableOfContentSlides(slides: Slide[]): Slide[] {
  return slides.filter(slide => tableOfContentMetadata(slide) !== undefined);
}
