import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { ProductService } from './../../services/product.service';
import { BrandWithOnlyNameDto } from './../../models/dtos/brandDtos/brandWithOnlyNameDto';
import { BrandService } from './../../services/brand.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { ProductGetDto } from './../../models/dtos/productGetDto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:ProductGetDto[] = [];
  brands:BrandWithOnlyNameDto[]=[];
  dataLoaded:boolean = false;
  headBannerImagePath:string;
  queryBrandParams:number[]=[];

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private settingService:SettingService,
    private brandService:BrandService,
    private dynamicScriptLoader: DynamicScriptLoaderService,

    ) { }

  ngOnInit(): void {
    this.loadScripts();

    this.activatedRoute.params.subscribe(params=>{
      if (params['brandId']) {
        this.getProductsByBrand(params['brandId']);
      }else{
        this.getProductsInGetDto();
      }
    })
    this.getBrands();
    this.getHeadBannerFromSetting('pageHeadBanner');

  }


  private loadScripts() {
    this.dynamicScriptLoader.load('shoppage').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }


  getProductsInGetDto(){
    this.productService.getProdcutsInGetDto().subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByBrand(brandId:number){
    this.productService.getProductsByBrand(brandId).subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }


  getHeadBannerFromSetting(key:string){
    this.settingService.getSettingImageByKey(key).subscribe(response=>{
      this.headBannerImagePath=this.settingService.getSettingImagePath()+response.data.value;
    });
  }

  getBrands(){
    this.brandService.getBrandsWithOnlyName().subscribe(response=>{
      this.brands= response.data;
    });
  }

  addBrandToQueryParams(e:any,id:number){
    console.log(e.target);
    
  }
}
