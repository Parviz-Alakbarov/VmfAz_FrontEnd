import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Setting } from '../models/entities/setting';
import { environment } from 'src/environments/environment';

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

  getImagePath(imagePath: any) {
    return this.baseUrl +"images/settings/"+ imagePath
  }

}
