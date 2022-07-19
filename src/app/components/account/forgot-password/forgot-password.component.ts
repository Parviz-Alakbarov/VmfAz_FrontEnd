import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';
import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataShareService } from '../../../services/shared/data-share.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordEmailForm:FormGroup;
  validationErrors:ValidationErrorResponseModel[] = [];

  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private share:DataShareService,
  ) { }

  ngOnInit(): void {
    this.createEmailForm();
  }

  createEmailForm(){
    this.forgotPasswordEmailForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]]
    })
  }

  forgotPassword(){
    if (this.forgotPasswordEmailForm.valid) {
      this.spinner.show();
      let forgotPasswordModel = Object.assign({}, this.forgotPasswordEmailForm.value)
      this.authService.forgotPasswordEmail(forgotPasswordModel).subscribe(response=>{
        this.share.setStringData(forgotPasswordModel.email);
        this.toastrService.warning("Parolu yeniləmək üçün email hesabınızı yoxlayın.","Diqqət");
        this.router.navigateByUrl("/account/forgotPasswordVerification");
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
