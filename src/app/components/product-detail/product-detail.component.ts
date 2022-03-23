import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailDto } from 'src/app/models/dtos/productDetailDto';
import { Shop } from 'src/app/models/entities/shop';
import { ShopService } from './../../services/shop.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductGetDto } from 'src/app/models/dtos/productGetDto';
import { ProductImage } from './../../models/entities/productImage';
import { ProductImageService } from './../../services/product-image.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetailDto:ProductDetailDto;
  dataLoaded:boolean = false;
  productShops:Shop[]=[];
  productImages:ProductImage[];
  relatedProducts:ProductGetDto[];


  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private shopService:ShopService,
    private productImageService:ProductImageService
  ) { }

  ngOnInit(): void {
    this.loadScripts();

    this.activatedRoute.params.subscribe(params=>{
      this.getProductDetail(params["productId"]);
      this.getProductShops(params["productId"]);
      this.getProductImages(params["productId"])
    })
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('detailpage').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  getProductDetail(productId:number){
    this.productService.getProductDetail(productId).subscribe(response=>{
      this.productDetailDto = response.data;
      this.dataLoaded = true;
    })
  }

  getProductShops(productId:number){
    this.shopService.getShopsByProduct(productId).subscribe(response=>{
      this.productShops = response.data;
      this.dataLoaded = true;
    })
  }

  getProductImages(productId:number){
    this.productImageService.getProductImages(productId).subscribe(response=>{
      this.productImages = response.data;
      this.dataLoaded = true;
    })
  }


  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }





  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:false,
    autoplayTimeout:3000,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
        margin:10 
      },
      768: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
