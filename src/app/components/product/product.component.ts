import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { ProductService } from './../../services/product.service';
import { BrandWithOnlyNameDto } from './../../models/dtos/brandDtos/brandWithOnlyNameDto';
import { BrandService } from './../../services/brand.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { ProductGetDto } from './../../models/dtos/productGetDto';
import { Pagination, PaginationResult } from 'src/app/models/entities/pagination';
import { ProductEntryDto } from '../../models/dtos/productFeatureDtos/productEntryDto';
import { NgxSpinnerService } from "ngx-spinner";
import { UserParams } from '../../models/entities/userParams';
import { Gender } from 'src/app/models/entities/gender';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products:ProductGetDto[] = [];
  pagination:Pagination;

  brands:BrandWithOnlyNameDto[]=[];
  productFunctionalities:ProductEntryDto[];
  genders:Gender[] =[];

  headBannerImagePath:string;
  
  // paginatedResult:PaginationResult<ProductGetDto> = new PaginationResult<ProductGetDto>();
  userParams:UserParams = new UserParams();
  
  dataLoaded:boolean = false;

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private settingService:SettingService,
    private brandService:BrandService,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private spinner: NgxSpinnerService,

    ) { }

  ngOnInit(): void {
    this.loadScripts();

    this.activatedRoute.params.subscribe(params=>{
      if (params['gender']=='man') {
        this.userParams = new UserParams();
        this.userParams.genderIds.push(1);
      }
      else if(params['gender']=='woman') {
        this.userParams = new UserParams();
        this.userParams.genderIds.push(2);
      }
      else if (params['gender']=='child') {
        this.userParams = new UserParams();
        this.userParams.genderIds.push(3);
      }
      this.getPaginatedProduct()
    })

    this.getBrands();
    this.getProductFunctionalities();
    this.getGenders();
    this.getHeadBannerFromSetting('pageHeadBanner');
  }

  getPaginatedProduct(){
    this.spinner.show();
    this.productService.getPaginatedProducts(this.userParams).subscribe(response=>{
      this.products = response.body.data; 
      if (response.headers.get('Pagination') !== null) {
        this.pagination = JSON.parse(response.headers.get('Pagination'))  
      }
      console.log(this.pagination)
      this.dataLoaded = true;
      this.spinner.hide();
    },errorResponse=>{
      console.log(errorResponse);
    })
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('shoppage').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
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

  getGenders(){
    this.settingService.getGenders().subscribe(response=>{
      this.genders = response.data;
    })
  }

  getProductFunctionalities(){
    this.settingService.getProductFuntionalities().subscribe(response=>{
      this.productFunctionalities= response.data;
    });
  }
  
  addBrandToQueryParams(id:number){
    if (this.userParams.brandIds.includes(id)) {
      this.userParams.brandIds = this.userParams.brandIds.filter(x=>x!=id)
    }
    else{
      this.userParams.brandIds.push(id)
    } 
    this.userParams.pageNumber=1;
    this.getPaginatedProduct();
  }

  addGenderToQueryParams(id:number){
    if (this.userParams.genderIds.includes(id)) {
      this.userParams.genderIds = this.userParams.genderIds.filter(x=>x!=id)
    }
    else{
      this.userParams.genderIds.push(id)
    } 
    this.userParams.pageNumber=1;
    this.getPaginatedProduct();
  }

  pageChanged(pageNumber:number){
    this.userParams.pageNumber=pageNumber;
    window.scroll(0,180);
    this.getPaginatedProduct();
  }
  counter(i: number) {
    return new Array(i);
  }
}
