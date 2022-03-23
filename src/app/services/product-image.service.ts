import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from './../models/responses/listResponseModel';
import { ProductImage } from './../models/entities/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  
  private baseUrl = environment.BASE_URL;

  constructor(private httpClient:HttpClient) { }




  getProductImages(productId:number):Observable<ListResponseModel<ProductImage>>{
    let newUrl = this.baseUrl+"api/ProductImages/getproductimages/"+productId;
    return this.httpClient.get<ListResponseModel<ProductImage>>(newUrl);
  }

}
