import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { ValidationErrorResponseModel } from './../../../models/responses/validationErrorResponseModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  validationErrors:ValidationErrorResponseModel[] = []; 

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private storageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", [Validators.required,Validators.email]],
      password:["", 
        [  
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(25), 
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
        ]
      ]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel  =  Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Hesabiniza daxil olundu!","Success");
        this.storageService.add('token',response.data.accessToken.token);
        this.storageService.add('refreshToken',response.data.refreshToken.token);
        this.router.navigateByUrl('/')
      },responseError=>{
        this.validationErrors = responseError.error.ValidationErrors; 
      });
    }
    else{
      this.toastrService.error("Form Düzgün deyil!","Error")
    }
  }

}
