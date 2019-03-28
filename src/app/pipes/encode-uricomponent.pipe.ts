import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeURIComponent'
})
export class EncodeURIComponentPipe implements PipeTransform {

  transform(input: any) {
    if (typeof input !== 'string') {
      return input;
    }
    return encodeURIComponent(input);
  }
}
