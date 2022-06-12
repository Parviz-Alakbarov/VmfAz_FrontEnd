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
              console.log(error);
              const modelStateError = []
              if (error.error.ValidationErrors) {
                for(const key in error.error.ValidationErrors){
                  if (error.error.ValidationErrors[key]) {
                    modelStateError.push(error.error.ValidationErrors[key]);
                  }
                }
                console.log(modelStateError);
                throw modelStateError;
              }else if(error.error){
                console.log("-  2 - - -"+error.error);

                modelStateError.push({ErrorMessage:error.error,PropertyName:'Business'})
                console.log(modelStateError);

                throw modelStateError;
              }
              else{
                console.log("-  3 - - -"+error);
                this.toastrService.error(error.statusText, error.status)
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
