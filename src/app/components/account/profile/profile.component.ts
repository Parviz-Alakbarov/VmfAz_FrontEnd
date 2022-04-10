import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { UserGetDto } from './../../../models/dtos/userDtos/userGetDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:UserGetDto;

  constructor(
    private toastrService:ToastrService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this.authService.getUserProfile().subscribe(response=>{
      this.user = response.data;
    })
  }
}
