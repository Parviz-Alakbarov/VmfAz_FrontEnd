import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Setting } from '../models/entities/setting';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ProductEntryDto } from '../models/dtos/productFeatureDtos/productEntryDto';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private baseUrl = environment.BASE_URL;

  constructor(private httpClient:HttpClient) { }

  getSettings():Observable<ListResponseModel<Setting>>{
    let newUrl = this.baseUrl+"api/settings";
    return this.httpClient.get<ListResponseModel<Setting>>(newUrl);
  }

  getSettingImageByKey(settingKey: any):Observable<SingleResponseModel<Setting>> {
    let newUrl = this.baseUrl+`api/settings/getbykey?key=${settingKey}`;
    return this.httpClient.get<SingleResponseModel<Setting>>(newUrl);
  }

  getSettingImagePath(){
    return this.baseUrl+"images/settings/"
  }
 
  getProductFuntionalities():Observable<ListResponseModel<ProductEntryDto>>{
    let newUrl = this.baseUrl+"api/settings/getproductfunctionality";
    return this.httpClient.get<ListResponseModel<ProductEntryDto>>(newUrl);
  }


}
