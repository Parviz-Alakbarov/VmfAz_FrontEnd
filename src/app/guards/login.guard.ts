import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './../services/local-storage.service';
import { RefreshTokenModel } from '../models/auth/refreshTokenModel';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private route:Router,
    private localStorageService:LocalStorageService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.isAuthenticated()) {
    //   return true;
    // }else{
    //   let userRefreshToken = this.localStorageService.getRefreshToken();
      
    //   if(userRefreshToken !== '' && userRefreshToken !== null){
        
    //     let refreshToken : RefreshTokenModel={ refreshToken : userRefreshToken};
    //     // refreshToken.refreshToken = this.localStorageService.getItem('refreshToken');
    //     let newLocation = window.location.href;
    //     this.authService.refresh(refreshToken).subscribe(response=>{
    //       this.localStorageService.add("token",response.data.accessToken.token);
    //       this.localStorageService.add("refreshToken",response.data.refreshToken.token);
    //       location.replace(newLocation);
    //       return true;
    //     },errorResponse=>{
    //       console.log(errorResponse);
    //       return false;
    //     })
    //   }else{
    //     this.toastrService.info("Hesabınıza daxil olmalısınız.")
    //     this.route.navigateByUrl('/account/login');
    //     return false;
    //   }
    // }
    return true;
  }
}
