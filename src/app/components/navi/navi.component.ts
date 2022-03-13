import { Component, OnInit } from '@angular/core';
import { SettingService } from './../../services/setting.service';
import { Setting } from '../../models/entities/setting';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  settings:Setting[]=[];

  tempPath:string = "sdf"

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

  

}
