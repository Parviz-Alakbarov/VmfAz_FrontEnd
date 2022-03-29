import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responses/listResponseModel';
import { Shop } from '../models/entities/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = environment.BASE_URL;
  
  constructor(private httpClient:HttpClient) { }

  getShopsByProduct(productId:number):Observable<ListResponseModel<Shop>>{
    let newUrl = this.baseUrl+"api/shops/getshopbyproduct/"+productId;
    return this.httpClient.get<ListResponseModel<Shop>>(newUrl);
  }

  getShops():Observable<ListResponseModel<Shop>>{
    let newUrl = this.baseUrl+"api/shops/";
    return this.httpClient.get<ListResponseModel<Shop>>(newUrl);
  }


}
