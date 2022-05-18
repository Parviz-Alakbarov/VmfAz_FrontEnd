import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Setting } from 'src/app/models/entities/setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  dataLoaded: boolean = false;
  settings:Setting[]=[];

  @ViewChild('scroll') scroll:ElementRef;

  constructor(private settingService:SettingService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
      this.dataLoaded = true;
    })
  }

  getSettingImage(key:string):string{
    let imageName = this.settings.find(x=>x.key==key)?.value;
    let path = this.settingService.getSettingImagePath();
    // console.log(path+"asdfasdf"+imageName);
    return path+imageName
  }

  getValueOfKey(key:string){
    return this.settings.find(x=>x.key == key)?.value;
  }

  scrollToTop(){
    window.scroll(0,0);
  }





}
