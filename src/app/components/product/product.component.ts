import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { ProductService } from './../../services/product.service';
import { BrandWithOnlyNameDto } from './../../models/dtos/brandDtos/brandWithOnlyNameDto';
import { BrandService } from './../../services/brand.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { ProductGetDto } from './../../models/dtos/productGetDto';
import { PaginationResult } from 'src/app/models/entities/pagination';

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
  paginatedResult:PaginationResult<ProductGetDto> = new PaginationResult<ProductGetDto>();

  pageNumber=1;
  pageSize=2;



  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private settingService:SettingService,
    private brandService:BrandService,
    private dynamicScriptLoader: DynamicScriptLoaderService,

    ) { }

  ngOnInit(): void {
    this.loadScripts();
    this.getPaginatedProduct()

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

  getPaginatedProduct(){
    this.productService.getPaginatedProducts(this.pageNumber,this.pageSize).subscribe(response=>{
      this.paginatedResult.result = response.body.data; 
      if (response.headers.get('Pagination') !== null) {
        this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))  
      }
      console.log(this.paginatedResult)
    })
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
    if (e.target.classList.contains('isChecked')) {
      this.queryBrandParams = this.queryBrandParams.filter(x=>x!=id)
    }
    else{
      this.queryBrandParams.push(id)
    }   
  }
}
