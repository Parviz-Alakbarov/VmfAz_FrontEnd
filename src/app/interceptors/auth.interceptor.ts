import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, retry } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenRespoinseModel } from '../models/auth/tokenResponseModel';
import { AuthService } from './../services/auth.service';
import { RefreshTokenModel } from './../models/auth/refreshTokenModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = "";
  refresh:boolean = false;
  private baseUrl = environment.BASE_URL;


  constructor(
    private localStorageService:LocalStorageService,
    private authService:AuthService,
    private http:HttpClient
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const newRequest  = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.localStorageService.getToken()}`
      }
    })
    return next.handle(newRequest).pipe(catchError(( err:HttpErrorResponse )=>{

      if (err.status == 401 && !this.refresh) {
        this.refresh = true;
        let refreshToken : RefreshTokenModel = { refreshToken :this.localStorageService.getRefreshToken()};

        return this.http.post(this.baseUrl+'api/auth/refresh',refreshToken,{withCredentials:true}).pipe(
          switchMap((response:any)=>{
          this.localStorageService.setToken(response.data.accessToken.token);
          this.localStorageService.setRefreshToken(response.data.refreshToken.token);
            return next.handle(request.clone({
              setHeaders:{
                Authorization : `Bearer ${this.localStorageService.getToken()}`
              }
            }))
          })
        )
      }
      this.refresh = false;
      return throwError(()=>err);
    }));
  }
}
