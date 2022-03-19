import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService

  ) { }

  ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('registerpage').then(data => {
      console.log('script loaded ', data);
  }).catch(error => console.log(error));
  }

}
