import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/entities/slider';
import { SliderService } from './../../services/slider.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from './../../services/product.service';
import { ProductGetDto } from 'src/app/models/dtos/productGetDto';
import { SettingService } from 'src/app/services/setting.service';
import { Setting } from 'src/app/models/entities/setting';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliders:Slider[]=[];
  bestSellers:ProductGetDto[]=[];
  settings:Setting[]=[];


  constructor(
    private sliderService:SliderService,
    private productService:ProductService,
    private settingService:SettingService
    ) { }

  ngOnInit(): void {
    this.getSliders();
    this.getBestSellers();
    this.getSettings();
  }

  getSliders(){
    this.sliderService.getSliders().subscribe(response=>{
      this.sliders = response.data;
    })
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
    })
  }

  getBestSellers(){
    this.productService.getBestSellers(5).subscribe(response=>{
      this.bestSellers = response.data;
    })
  }

  getSliderImagePath(imageName: string){
    return this.sliderService.getSliderImagePath()+imageName
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }


  getSettingImage(key:string){
    let imageName = this.settings.find(x=>x.key==key)?.value;
    let path = this.settingService.getSettingImagePath();
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

  bestSellerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:false,
    autoplayTimeout:3000,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin:40,
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
