import { Pipe, PipeTransform } from '@angular/core';
import { ClothesDetail } from '../models/clothesDetail';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: ClothesDetail[], filterText: string): ClothesDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: ClothesDetail) =>
            c.clothesName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
