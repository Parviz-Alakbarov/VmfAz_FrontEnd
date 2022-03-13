import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../models/entities/slider';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  apiUrl = "https://localhost:44337/api/sliders/";

  constructor(private httpClient:HttpClient) { }

  getSliders():Observable<ListResponseModel<Slider>>{
    return this.httpClient.get<ListResponseModel<Slider>>(this.apiUrl);
  }
  
}
