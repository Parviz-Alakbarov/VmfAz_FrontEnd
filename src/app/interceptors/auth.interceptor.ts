import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenRespoinseModel } from '../models/auth/tokenResponseModel';
import { AuthService } from './../services/auth.service';
import { RefreshTokenModel } from './../models/auth/refreshTokenModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = "";
  private baseUrl=environment.BASE_URL;

  constructor(
    private localStorageService:LocalStorageService,
    private httpClient:HttpClient,
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorageService.getItem('token');
    let newRequest : HttpRequest<any> ;
    newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    });
    
    return next.handle(newRequest).pipe(catchError(( err:HttpErrorResponse )=>{

      if (err.status ===401 ) {
        let refreshToken : RefreshTokenModel={ refreshToken :this.localStorageService.getItem('refreshToken')};
        refreshToken.refreshToken = this.localStorageService.getItem('refreshToken');

        this.authService.refresh(refreshToken).subscribe(response=>{

          this.localStorageService.add("token",response.data.accessToken.token);
          this.localStorageService.add("refreshToken",response.data.refreshToken.token);

          token = this.localStorageService.getItem('token');

          newRequest = request.clone({
            headers:request.headers.set("Authorization","Bearer "+token)
          });
          console.log("error =-----=-dddddddddddddddddddd-0-=-=-=");

          return next.handle(newRequest);

        })
      }
      console.log("error =-----=--0-=-=-=");
      
      return throwError(()=>err);
    }));
  }
}
