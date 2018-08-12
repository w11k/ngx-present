import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value === undefined) {
      return undefined;
    }

    return value.trim();
  }
}
