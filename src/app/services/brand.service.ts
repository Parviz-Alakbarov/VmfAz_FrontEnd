import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Brand } from './../models/entities/brand';
import { environment } from 'src/environments/environment';
import { BrandWithOnlyNameDto } from './../models/dtos/brandDtos/brandWithOnlyNameDto';
import { BrandWithImageDto } from './../models/dtos/brandDtos/brandWithImageDto';
import { SingleResponseModel } from './../models/responses/singleResponseModel';
import { BrandDetailDto } from './../models/dtos/brandDtos/brandDetailDto';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = environment.BASE_URL;

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.baseUrl+"api/brands"
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  getBrandImagePath(){
    return this.baseUrl+"images/brands/";
  }

  getBrandsWithOnlyName():Observable<ListResponseModel<BrandWithOnlyNameDto>>{
    let newUrl = this.baseUrl+"api/brands/getbrandsonlywithname"
    return this.httpClient.get<ListResponseModel<BrandWithOnlyNameDto>>(newUrl);
  }

  getBrandsWithImage():Observable<ListResponseModel<BrandWithImageDto>>{
    let newUrl = this.baseUrl+"api/brands/getbrandswithimage"
    return this.httpClient.get<ListResponseModel<BrandWithImageDto>>(newUrl);
  }

  getBrandDetail(brandId:number):Observable<SingleResponseModel<BrandDetailDto>>{
    let newUrl = this.baseUrl+`api/brands/getbrandDetail/${brandId}`
    return this.httpClient.get<SingleResponseModel<BrandDetailDto>>(newUrl);
  }
  
}
