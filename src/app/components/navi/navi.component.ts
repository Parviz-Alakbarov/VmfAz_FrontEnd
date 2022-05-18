import { Component, OnInit } from '@angular/core';
import { SettingService } from './../../services/setting.service';
import { Setting } from '../../models/entities/setting';
import { environment } from 'src/environments/environment';
import { ProductService } from './../../services/product.service';
import { ProductGetDto } from 'src/app/models/dtos/productGetDto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  dataLoaded:boolean=false;
  settings:Setting[]=[];
  searchProducts:ProductGetDto[]=[];


  constructor(
    private settingService:SettingService,
    private productService:ProductService,
    private localStorageService:LocalStorageService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
      this.dataLoaded= true
    })
  }
  getSettingImage(key:string){
    let imageName = this.settings.find(x=>x.key==key)?.value;
    let path = this.settingService.getSettingImagePath();
    return path+imageName
  }

  getProductImagePath(imageName:string){
    return this.productService.getProductImagePath()+imageName
  }

  onChangeEvent(event: any){
    if (event.target.value.length>0) {
      this.productService.searchProducts(event.target.value).subscribe(response=>{
        this.searchProducts=response.data;
        console.log(this.searchProducts)
      })
    }
  }

  logout(){
    this.authService.logout().subscribe(response=>{
     this.localStorageService.remove('token')
     this.localStorageService.remove('refreshToken')
      this.toastrService.success("Hesabdan çıxış olundu.","Success")
      this.router.navigateByUrl("/")
    },errorResponse=>{
      console.log(errorResponse);
      this.toastrService.error("Hesabdan çıxış olunarkən xəta baş verdi","Error");
    })
  }

  checkAuth(){
    if (this.authService.isAuthenticated()) {
      return true;
    }else{
      return false;
    }
  }

}
