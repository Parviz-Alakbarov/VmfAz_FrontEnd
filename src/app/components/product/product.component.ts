import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/entities/product';
import { SettingService } from 'src/app/services/setting.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  dataLoaded:boolean = false;
  headBannerImagePath:string;


  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private settingService:SettingService

    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if (params['brandId']) {
        this.getProductsByBrands(params['brandId']);
      }else{
        this.getProducts();
      }
    })

    this.getHeadBannerFromSetting('pageHeadBanner');

  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByBrands(brandId:number){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }


  getHeadBannerFromSetting(key:string){
    this.settingService.getSettingImageByKey(key).subscribe(response=>{
      this.headBannerImagePath=this.settingService.getSettingImagePath()+response.data.value;
    });
  }

}
