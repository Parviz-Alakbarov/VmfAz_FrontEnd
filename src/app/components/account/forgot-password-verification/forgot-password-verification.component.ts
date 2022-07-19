import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, MaxLengthValidator, FormGroup } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ValidationErrorResponseModel } from './../../../models/responses/validationErrorResponseModel';
import { DataShareService } from '../../../services/shared/data-share.service';
@Component({
  selector: 'app-forgot-password-verification',
  templateUrl: './forgot-password-verification.component.html',
  styleUrls: ['./forgot-password-verification.component.scss']
})
export class ForgotPasswordVerificationComponent implements OnInit {

  forgotPasswordVerifyForm : FormGroup;
  validationErrors:ValidationErrorResponseModel[]=[];

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private shareData:DataShareService,
  ) { }

  ngOnInit(): void {

    this.createForgotPasswordVerifyForm();
  }

  createForgotPasswordVerifyForm(){
    this.forgotPasswordVerifyForm= this.formBuilder.group({
      code:["",[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern("^[0-9]{6,6}$")
      ]],
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
    this.forgotPasswordVerifyForm.controls['password'].valueChanges.subscribe(() => {
      this.forgotPasswordVerifyForm.controls['confirmPassword'].updateValueAndValidity();
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

  forgotPasswordVerify(){
    if (this.forgotPasswordVerifyForm.valid) {
      let forgotpasswordChangeModel = Object.assign({},this.forgotPasswordVerifyForm.value);
      forgotpasswordChangeModel.email = this.shareData.getStringData();
      this.spinner.show();
      this.authService.forgotPasswordChange(forgotpasswordChangeModel).subscribe(response=>{
        this.toastrService.success("Şifrəniz dəyişdi. Yenidən daxil olun.","Success")
        this.router.navigateByUrl('account/login');
      },errorResponse=>{
        if (errorResponse.error.ValidationErrors) {
          this.validationErrors = errorResponse.error.ValidationErrors; 
        }
      },()=>{
        this.spinner.hide();
      })
    }
  }

}
