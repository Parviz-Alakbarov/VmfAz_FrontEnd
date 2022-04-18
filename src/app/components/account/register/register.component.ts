import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader-service.service';
import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorResponseModel } from './../../../models/responses/validationErrorResponseModel';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  validationErrors:ValidationErrorResponseModel[]=[];

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private storageService:LocalStorageService,
    private spinner:NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loadScripts();
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      phoneNumber:["",[Validators.required, Validators.minLength(9)]],
      countryId:["",Validators.required],
      cityId:["",Validators.required],
      address:["",Validators.required],
      password:["", 
      [  
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(25), 
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
      ]],
      confirmPassword: ["",[
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(25),
        this.matchValues('password')]
      ]
    }),
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo:string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control?.parent?.controls as any;
      return (forbidden) 
        ? (control?.value === forbidden[matchTo]?.value) ? null : {isMatching: true}
        : null;
    }
  }

  register(el: HTMLElement){

    if (this.registerForm.valid) {
      this.spinner.show();
      let registerModel  =  Object.assign({}, this.registerForm.value)
      
      this.authService.register(registerModel).subscribe(data=>{
        this.spinner.hide();
        this.toastrService.success('Qeydiyyatdan keçdiniz!', 'Success')
        this.router.navigateByUrl('/home')
      });
    }else{
      this.toastrService.error("Formu düzgün deyil!", 'Fail', { timeOut: 3000 })
      for (const key in this.registerForm.controls) {
        if (this.registerForm.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>this.registerForm.controls[key];
          control.markAsTouched();
        }
      }
      el.scrollIntoView({behavior: 'smooth'})
    }


  }





  private loadScripts() {
    this.dynamicScriptLoader.load('registerpage').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
