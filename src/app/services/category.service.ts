import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44372/api/categories';

  getAllCategories(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(
      this.apiUrl + '/getall'
    );
  }
  addCategory(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', category);
  }
  getCategoryDetail(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(
      this.apiUrl + '/getcategorydetail'
    );
  }
}
