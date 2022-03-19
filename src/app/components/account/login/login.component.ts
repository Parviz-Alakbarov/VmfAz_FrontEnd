import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) { }

  ngOnInit(): void {
    this.loadScripts();
  }


  private loadScripts() {
    this.dynamicScriptLoader.load('loginpage').then(data => {
      console.log('script loaded ', data);
  }).catch(error => console.log(error));
  }

}
