import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/entities/slider';
import { SliderService } from './../../services/slider.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from './../../services/product.service';
import { ProductGetDto } from 'src/app/models/dtos/productGetDto';
import { SettingService } from 'src/app/services/setting.service';
import { Setting } from 'src/app/models/entities/setting';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from './../../services/brand.service';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliders:Slider[]=[];
  bestSellers:ProductGetDto[]=[];
  bestSellersByBrand:ProductGetDto[]=[];
  discountedProducts:ProductGetDto[]=[];
  settings:Setting[]=[];
  brands:Brand[]=[];
  dataLoaded:boolean = false;

 
  constructor(
    private sliderService:SliderService,
    private productService:ProductService,
    private settingService:SettingService,
    private brandService:BrandService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getSettings();
    this.getSliders();
    this.getBestSellers();
    this.getBrandBestSeller(2);
    this.getDiscountedProducts();
    this.getBrands();  
    setTimeout(() => {
      this.spinner.hide();
      this.dataLoaded= true;
    }, 800);
  }

  getSliders(){
    // this.dataLoaded= false;
    this.sliderService.getSliders().subscribe(response=>{
      this.sliders = response.data;
      // this.dataLoaded= true;
    })
  }

  getSettings(){
    // this.dataLoaded= false;
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
      // this.dataLoaded= true;
    })
  }

  getDiscountedProducts(){
    // this.dataLoaded= false;
    this.productService.getDiscountedProdcuts().subscribe(response=>{
      this.discountedProducts = response.data;
      // this.dataLoaded= true;
    })
    // this.dataLoaded = true;
  }

  getBestSellers(){
    // this.dataLoaded= false;
    this.productService.getBestSellers(5).subscribe(response=>{
      this.bestSellers = response.data;
      // this.dataLoaded= true;
    })
  }

  getBrandBestSeller(brandId:number){
    // this.dataLoaded= false;
    this.productService.getBrandBestSellers(2,5).subscribe(response=>{
      this.bestSellersByBrand = response.data;
      // this.dataLoaded= true;
    })
  }

  getBrands(){
    // this.dataLoaded= false;
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      // this.dataLoaded= true;
    })
  }

  getSliderImagePath(imageName: string){
    return this.sliderService.getSliderImagePath()+imageName
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }

  getBrandImagePath(imageName:string){
    return this.brandService.getBrandImagePath()+imageName
  }

  getSettingImage(key:string):string{
    let imageName = this.settings.find(x=>x.key==key)?.value;
    let path = this.settingService.getSettingImagePath();
    // console.log(path+"asdfasdf"+imageName);
    return path+imageName
  }





  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
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

  bestSellerSlider2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:false,
    autoplayTimeout:3000,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    // margin:40,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
