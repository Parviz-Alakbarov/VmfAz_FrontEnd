import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
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
    let loginModel  =  Object.assign({}, this.loginForm.value)
  }

}
