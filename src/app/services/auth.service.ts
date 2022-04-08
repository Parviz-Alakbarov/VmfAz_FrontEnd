import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/auth/loginModel';
import { RegisterModel } from '../models/auth/registerModel';
import { TokenRespoinseModel } from '../models/auth/tokenResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASE_URL;

  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel):Observable<SingleResponseModel<TokenRespoinseModel>>{
    let newPath = this.baseUrl+"api/auth/login";
    return  this.httpClient.post<SingleResponseModel<TokenRespoinseModel>>(newPath,user);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenRespoinseModel>>{
    let newPath = this.baseUrl+"api/auth/register";
    return this.httpClient.post<SingleResponseModel<TokenRespoinseModel>>(newPath,registerModel);
  }

  logout(){
    let newPath = this.baseUrl+"api/auth/logout";
    return this.httpClient.delete(newPath);
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }

  }


}
