import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router:Router,
    private toastrService:ToastrService
    
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if (error) {
          switch (error.status) {
            case 400:
              if (!error.ValidationErrors) {
                const modelStateError = []
                for(const key in error.ValidationErrors){
                  if (error.ValidationErrors[key]) {
                    modelStateError.push(error.ValidationErrors[key]);
                  }
                }
                throw modelStateError;
              }else{
                this.toastrService.error(error.error.ValidationErrors[0].ErrorMessage,error.status);
              }
              break;

            // case 401:
            //   this.toastrService.error("Qeydiyyatdan keçin və ya hesabınıza daxil olmalısınız!",`Error ${error.status}`);
            //   break;
          
            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras:NavigationExtras = {state: {error:error.error.error} }
              this.router.navigateByUrl('/server-error');
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}
