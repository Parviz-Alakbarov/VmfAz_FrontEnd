import { Component, OnInit } from '@angular/core';
import { SettingService } from './../../services/setting.service';
import { Setting } from '../../models/entities/setting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  settings:Setting[]=[];

  constructor(
    private settingService:SettingService
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
    })
  }

  getSettingImage(key:string){
    let imageName = this.settings.find(x=>x.key==key)?.value;
    let path = this.settingService.getSettingImagePath();
    return path+imageName
  }

  onChangeEvent(event: any){
    
  }

}
