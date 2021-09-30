import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryImage } from '../models/categoryImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryImageService {
  apiUrl = 'https://localhost:44372/api/categoryimages/';
  constructor(private httpClient: HttpClient) {}
  getImages(): Observable<ListResponseModel<CategoryImage>> {
    return this.httpClient.get<ListResponseModel<CategoryImage>>(
      this.apiUrl + 'getall'
    );
  }
  getImagesByCategoryId(
    categoryId: number
  ): Observable<ListResponseModel<CategoryImage>> {
    let newPath =
      this.apiUrl + 'categoryimages/getbycategoryid?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<CategoryImage>>(newPath);
  }
}
