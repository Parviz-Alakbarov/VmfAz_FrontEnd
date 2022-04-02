import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private formBuilder:FormBuilder,

  ) { }

  ngOnInit(): void {
    this.loadScripts();
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      phoneNumber:["",Validators.required],
      countryId:["",Validators.required],
      cityId:["",Validators.required],
      address:["",Validators.required],
      password:["", 
      [  
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(25), 
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
      ]
      ],
    })
  }

  register(){

  }





  private loadScripts() {
    this.dynamicScriptLoader.load('registerpage').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
