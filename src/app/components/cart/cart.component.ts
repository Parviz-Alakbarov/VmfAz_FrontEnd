import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CartService } from './../../services/cart.service';
import { AuthService } from './../../services/auth.service';
import { CartItem } from 'src/app/models/entities/cartItem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dataLoaded:boolean = false;
  cartItems:CartItem[]=[];
  

  constructor(
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private cartService:CartService,
    private authService:AuthService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }

  getCartItems(){
    this.spinner.show();
    this.cartService.getCartItems().subscribe(response=>{
      this.cartItems = response.data;
      this.spinner.hide();
    },errorResponse=>{
      this.spinner.hide();
      this.toastrService.error("Xəta baş verdi!","Error")
    })
  }

}
