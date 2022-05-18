import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, places:number=1): string {
    return value%1==0?value.toString():Number(value).toFixed(places);
  }

}
