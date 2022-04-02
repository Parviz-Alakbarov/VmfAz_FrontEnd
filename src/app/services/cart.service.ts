import { Injectable } from '@angular/core';
import { CartItem } from '../models/entities/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartStorageName:string = "VmfAz_Cart";

  constructor() { }

  addToCart(cartItem:CartItem){

  }

  removeFromCart(){

  }

}
