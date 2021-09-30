import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from '../models/clothes';
import { ClothesDetail } from '../models/clothesDetail';
import { ClothesSize } from '../models/clothesSize';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44372/api/clothes';

  getAllClothes(): Observable<ListResponseModel<Clothes>> {
    return this.httpClient.get<ListResponseModel<Clothes>>(
      this.apiUrl + '/getall'
    );
  }
  addClothes(clothes: Clothes): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', clothes);
  }
  getClothesDetail(): Observable<ListResponseModel<ClothesDetail>> {
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(
      this.apiUrl + '/getclothesdetail'
    );
  }
  getClothesDetailById(
    Id: number
  ): Observable<ListResponseModel<ClothesDetail>> {
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(
      this.apiUrl + '/getclothesdetailbyid/?Id=' + Id
    );
  }
  getClothesSizesByClothesId(
    clothesId: number
  ): Observable<ListResponseModel<ClothesSize>> {
    return this.httpClient.get<ListResponseModel<ClothesSize>>(
      this.apiUrl + '/getsizesbyclothesid?Id=' + clothesId
    );
  }
  getClothesBySizeAndClothesId(
    clothesId: number,
    sizeId: number
  ): Observable<ListResponseModel<ClothesDetail>> {
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(
      this.apiUrl +
        '/getbysizeandclothesid?clothesId=' +
        clothesId +
        '&sizeId=' +
        sizeId
    );
  }
}
