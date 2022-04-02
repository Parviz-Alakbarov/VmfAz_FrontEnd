import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private productService:ProductService,

  ) { }

  ngOnInit(): void {
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }

}
