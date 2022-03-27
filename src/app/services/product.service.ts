import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Product } from '../models/entities/product';
import { environment } from '../../environments/environment';
import { ProductGetDto } from '../models/dtos/productGetDto';
import { ProductDetailDto } from '../models/dtos/productDetailDto';
import { SingleResponseModel } from './../models/responses/singleResponseModel';
import { HttpParams } from '@angular/common/http';
import { PaginationResponseModel } from './../models/responses/paginationResponseModel';

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

  getPaginatedProducts(page?:number,itemsPerPage?:number){
    let params = new HttpParams();

    if (page!=null && itemsPerPage!=null) {
      params = params.append("pageNumber",page.toString());
      params = params.append("pageSize",itemsPerPage.toString());
    }
    let newUrl = this.baseUrl+"api/products/getpaginatedlist";

    return this.httpClient.get<PaginationResponseModel<ProductGetDto>>(newUrl,{observe:'response',params});
  }

  getProdcutsInGetDto():Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+"api/products/";
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getProductDetail(productId:number):Observable<SingleResponseModel<ProductDetailDto>>{
    let newUrl = this.baseUrl+"api/products/getProductDetail/"+productId;
    return this.httpClient.get<SingleResponseModel<ProductDetailDto>>(newUrl);
  }

  getProductsByBrand(brandId:number):Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+"api/products/getbybrand"+brandId;
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getBestSellers(count:number):Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+"api/products/getbestseller";
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getBrandBestSellers(brandId:number,count:number):Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+`api/products/getbrandbestseller?brandId=${brandId}&count=${count}`;
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getDiscountedProdcuts(){
    let newUrl = this.baseUrl+"api/products/getdiscountedproducts";
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getRelatedProducts(productId:number):Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+`api/products/getrelatedproducts/${productId}`;
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getProductImagePath(){
    return this.baseUrl+"images/products/";
  }
}
