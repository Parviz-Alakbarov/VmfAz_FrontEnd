import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/app/models/entities/setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  settings:Setting[]=[];

  constructor(private settingService:SettingService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
    })
  }

  getImagePath(key: string) {
    let imagePath = this.settings.find(x=>x.key==key)?.value
    return this.settingService.getImagePath(imagePath)
  }

}
