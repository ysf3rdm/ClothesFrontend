import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothesImage } from '../models/clothesImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ClothesImageService {
  apiUrl = 'https://localhost:44372/api/clothesimages/';
  constructor(private httpClient: HttpClient) {}
  getImagesByClothesId(
    Id: number
  ): Observable<ListResponseModel<ClothesImage>> {
    return this.httpClient.get<ListResponseModel<ClothesImage>>(
      this.apiUrl + 'getbyclothesid/?clothesId=' + Id
    );
  }
}
