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
