import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeNonEnglishChar'
})
export class RemoveNonEnglishCharPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value=value.replace(/[\W_]+/g," ");
    return value;
  }
}
