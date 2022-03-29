import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/entities/shop';
import { SettingService } from 'src/app/services/setting.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops:Shop[];
  dataLoaded:boolean;
  headBannerImagePath:string;

  constructor(
    private shopService:ShopService,
    private settingService:SettingService
  ) { }

  ngOnInit(): void {
    this.getShops();
    this.getHeadBannerFromSetting('pageHeadBanner');
  }

  getShops(){
    this.shopService.getShops().subscribe(response=>{
      this.shops = response.data;
      this.dataLoaded = true;
    })
  }
  getHeadBannerFromSetting(key:string){
    this.settingService.getSettingImageByKey(key).subscribe(response=>{
      this.headBannerImagePath=this.settingService.getSettingImagePath()+response.data.value;
    });
  }

}
