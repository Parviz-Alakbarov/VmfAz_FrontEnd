import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Brand } from './../models/entities/brand';
import { environment } from 'src/environments/environment';

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
  
}
