import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { UserGetDto } from './../../../models/dtos/userDtos/userGetDto';
import { SettingService } from './../../../services/setting.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from 'src/app/models/entities/country';
import { City } from 'src/app/models/entities/city';
import { ValidationErrorResponseModel } from 'src/app/models/responses/validationErrorResponseModel';
import { FormGroup, FormBuilder, FormControl, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changePasswordForm:FormGroup;
  updateProfileForm:FormGroup;
  changePasswordValidationErrors:ValidationErrorResponseModel[]=[];
  updateProfileValidationErrors:ValidationErrorResponseModel[]=[];
  dataLoaded:boolean=false;
  user:UserGetDto;
  countries:Country[]=[];
  cities:City[]=[];

  constructor(
    private toastrService:ToastrService,
    private authService:AuthService,
    private settingService:SettingService,
    private spinner:NgxSpinnerService,
    private formBuilder:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getCountries();

  }

  createChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      email:[this.user.email,[]],
      currentPassword:["", 
      [  
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(25), 
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
      ]],
    newPassword:["",[
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(25), 
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$')
    ]],
 
    confirmPassword: ["",[
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(25),
      this.matchValues('newPassword')]
    ]
  }),
  this.changePasswordForm.controls['newPassword'].valueChanges.subscribe(() => {
    this.changePasswordForm.controls['confirmPassword'].updateValueAndValidity();
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


createUpdateProfileForm(){
  this.updateProfileForm = this.formBuilder.group({
    firstName:[this.user.firstName,Validators.required],
    lastName:[this.user.lastName,Validators.required],
    email:[this.user.email,[Validators.required,Validators.email]],
    phoneNumber:[this.user.phoneNumber,[Validators.required, Validators.minLength(9)]],
    countryId:[this.user.countryId,Validators.required],
    cityId:[this.user.cityId,Validators.required],
    address:[this.user.address,Validators.required],
    
  })
}

updateProfile(el:HTMLElement){
  if (this.updateProfileForm.valid) {
    this.spinner.show();
    let registerModel  =  Object.assign({}, this.updateProfileForm.value)
    console.log(registerModel);
    
    this.authService.updateProfile(registerModel).subscribe(data=>{
      this.spinner.hide();
      this.toastrService.success('Passwordunuz yeniləndi!', 'Success')
      this.router.navigateByUrl('/account/profile')
    },error=>{
      this.updateProfileValidationErrors = error;
      console.log(error);
      this.spinner.hide();
      window.scroll(0,0);
      
    });
  }else{
    this.toastrService.error("Formu düzgün deyil!", 'Fail', { timeOut: 3000 })
    for (const key in this.updateProfileForm.controls) {
      if (this.updateProfileForm.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>this.updateProfileForm.controls[key];
        control.markAsTouched();
      }
    }
    el.scrollIntoView({behavior: 'smooth'})
  }
}

changePassword(el:HTMLElement){
  if (this.changePasswordForm.valid) {
    this.spinner.show();
    let changePasswordModel  =  Object.assign({}, this.changePasswordForm.value)
    this.authService.changePassword(changePasswordModel).subscribe(response =>{
      this.spinner.hide();
      this.toastrService.success('Profiliniz yeniləndi!', 'Success')
      this.router.navigateByUrl('/profile')
    },errorResponse=>{
      this.changePasswordValidationErrors = errorResponse;
      console.log(errorResponse);
      this.spinner.hide();
      window.scroll(0,0);
      
    });
  }else{
    this.toastrService.error("Formu düzgün deyil!", 'Fail', { timeOut: 3000 })
    for (const key in this.changePasswordForm.controls) {
      if (this.changePasswordForm.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>this.changePasswordForm.controls[key];
        control.markAsTouched();
      }
    }
    el.scrollIntoView({behavior: 'smooth'})
  }
}


  getUserProfile(){
    this.spinner.show();
    this.authService.getUserProfile().subscribe(response=>{
      this.user = response.data;
      this.createUpdateProfileForm();
      this.createChangePasswordForm();
      this.dataLoaded = true;
      
      this.settingService.getCities(response.data.countryId).subscribe(response=>{
        this.cities= response.data;
      });

      this.spinner.hide();
    },errorReponse=>{
      console.log(errorReponse);
      this.toastrService.error("Profile daxil olunarkən xəta baş verdi!","Xəta")
    })
  }

  getCountries(){
    this.settingService.getCountries().subscribe(response=>{
      this.countries = response.data;
    })
  }

}
