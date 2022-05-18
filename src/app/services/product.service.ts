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
import { UserParams } from '../models/entities/userParams';

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

  getPaginatedProducts(userParams:UserParams){
    let params = this.getPaginationHeaders(userParams.pageNumber)
    console.log(userParams);
    
    if (userParams.genderIds.length>0) {
      for (let k = 0; k < userParams.genderIds.length; k++) {
        params = params.append('genderIds', userParams.genderIds[k].toString());
      }
    }

    if (userParams.brandIds.length>0) {
      for (let k = 0; k < userParams.brandIds.length; k++) {
        params = params.append('brandIds', userParams.brandIds[k].toString());
      }
    }

    if (userParams.minPrice) {
      params = params.append('minPrice',userParams.minPrice);
    }

    if (userParams.maxPrice) {
      params = params.append('maxPrice',userParams.maxPrice);
    }

    if (userParams.orderBy) {
      params = params.append('orderBy',userParams.orderBy);
    }

    let newUrl = this.baseUrl+"api/products/getpaginatedlist";

    return this.httpClient.get<PaginationResponseModel<ProductGetDto>>(newUrl,{observe:'response',params});
  }

  private getPaginationHeaders(pageNumber:number){
    let params = new HttpParams();
    params = params.append("pageNumber",pageNumber.toString());
    return params;
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

  searchProducts(text:string):Observable<ListResponseModel<ProductGetDto>>{
    let newUrl = this.baseUrl+`api/products/search/${text}`;
    return this.httpClient.get<ListResponseModel<ProductGetDto>>(newUrl);
  }

  getProductImagePath(){
    return this.baseUrl+"images/products/";
  }
}
