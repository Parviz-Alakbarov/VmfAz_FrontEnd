import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Product } from '../models/entities/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.BASE_URL;

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>>{
    let newUrl = this.baseUrl+"api/products/getall";
    return this.httpClient.get<ListResponseModel<Product>>(newUrl);
  }


  getProductsByBrand(brandId:number):Observable<ListResponseModel<Product>>{
    let newUrl = this.baseUrl+"api/products/getbybrand"+brandId;
    return this.httpClient.get<ListResponseModel<Product>>(newUrl);
  }
  
}
