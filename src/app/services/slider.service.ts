import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slider } from '../models/entities/slider';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SliderService {


  private baseUrl = environment.BASE_URL;
  

  constructor(private httpClient:HttpClient) { }

  getSliders():Observable<ListResponseModel<Slider>>{
    let newUrl = this.baseUrl+"api/sliders";
    return this.httpClient.get<ListResponseModel<Slider>>(newUrl);
  }

  getSliderImagePath(){
    return this.baseUrl+`images/sliders/`;
  }
  
}
