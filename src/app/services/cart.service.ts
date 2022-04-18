import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/entities/cartItem';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartStorageName:string = "VmfAz_Cart";
  private baseUrl = environment.BASE_URL;
  

  constructor(
    private httpClient:HttpClient,  
    private authService:AuthService,
    private localStorageService:LocalStorageService,
  ) { }

  addToCart(cartItem:CartItem){
    let temp = this.localStorageService.getItem(this.cartStorageName);
    console.log(temp);


  }

  removeFromCart(){

  }

  getCartItems() : Observable<ListResponseModel<CartItem>>{
    if (this.authService.isAuthenticated()) {
      let newUrl = this.baseUrl+"api/baskets/getall"
      
      return this.httpClient.get<ListResponseModel<CartItem>>(newUrl);
    }
    else{
      let temp = this.localStorageService.getItem(this.cartStorageName);
      console.log(temp);
    }
  }
}
