import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/auth/loginModel';
import { RefreshTokenModel } from '../models/auth/refreshTokenModel';
import { RegisterModel } from '../models/auth/registerModel';
import { TokenRespoinseModel } from '../models/auth/tokenResponseModel';
import { UserGetDto } from '../models/dtos/userDtos/userGetDto';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from './../models/responses/responseModel';
import { ChangePasswordModel } from './../models/auth/changePasswordModel';
import { UpdateProfileModel } from '../models/auth/updateProfileModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASE_URL;

  private currentUserSource = new ReplaySubject<TokenRespoinseModel>(1);
  currentUser$ = this.currentUserSource.asObservable(); 

  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel):Observable<SingleResponseModel<TokenRespoinseModel>>{
    let newPath = this.baseUrl+"api/auth/login";
    return  this.httpClient.post<SingleResponseModel<TokenRespoinseModel>>(newPath,user);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<UserGetDto>>{
    let newPath = this.baseUrl+"api/auth/register";
    return this.httpClient.post<SingleResponseModel<UserGetDto>>(newPath,registerModel);
  }

  changePassword(changePasswordModel:ChangePasswordModel){
    let newPath = this.baseUrl+"api/auth/changePassword";
    return this.httpClient.post<SingleResponseModel<TokenRespoinseModel>>(newPath,changePasswordModel);
  }

  updateProfile(updateProfile:UpdateProfileModel):Observable<ResponseModel>{
    let newPath = this.baseUrl+"api/auth/update";
    return this.httpClient.post<ResponseModel>(newPath,updateProfile);
  }

  logout():Observable<ResponseModel>{
    let newPath = this.baseUrl+"api/auth/logout";
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  getUserProfile():Observable<SingleResponseModel<UserGetDto>>{
    let newPath = this.baseUrl+"api/auth/profile";
    return this.httpClient.get<SingleResponseModel<UserGetDto>>(newPath);
  }

  refresh(refreshToken:RefreshTokenModel):Observable<SingleResponseModel<TokenRespoinseModel>>{
    let newPath = this.baseUrl+"api/auth/refresh";
    return this.httpClient.post<SingleResponseModel<TokenRespoinseModel>>(newPath,refreshToken);
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }
}