import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from './../../services/brand.service';
import { SettingService } from './../../services/setting.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  headBannerImagePath:string;
  count:number=0;
  brands:Brand[]=[];
  dataLoaded:boolean = false;


  constructor(
    private brandService:BrandService,
    private settingService:SettingService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getHeadBannerFromSetting('pageHeadBanner');
  }
  
  getHeadBannerFromSetting(key:string){
    this.settingService.getSettingImageByKey(key).subscribe(response=>{
      this.headBannerImagePath=this.settingService.getSettingImagePath()+response.data.value;
    });
  }

  getBrands(){
    this.spinner.show();
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.dataLoaded = true;
      this.spinner.hide();
    })
  }

  getBrandImagePath(imageName:string){
    return this.brandService.getBrandImagePath()+imageName
  }
}
