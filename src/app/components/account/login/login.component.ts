import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
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
        console.log(response.data.accessToken.token); 
        console.log(response.data.accessToken.expirationDate); 
        
        this.toastrService.success("Daxil olundu!","Success")
      },responseError=>{
        console.log(responseError);
        
      });
    }
    else{
      this.toastrService.error("Form Düzgün deyil!","Error")
    }
  }

}
