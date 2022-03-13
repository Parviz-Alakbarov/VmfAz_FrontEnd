import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Setting } from '../models/entities/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  apiUrl = "https://localhost:44337/api/settings/";

  constructor(private httpClient:HttpClient) { }

  getSettings():Observable<ListResponseModel<Setting>>{
    return this.httpClient.get<ListResponseModel<Setting>>(this.apiUrl);
  }

}