import { Component, OnInit } from '@angular/core';
import { SettingService } from './../../services/setting.service';
import { Setting } from '../../models/entities/setting';
import { environment } from 'src/environments/environment';
import { ProductService } from './../../services/product.service';
import { ProductGetDto } from 'src/app/models/dtos/productGetDto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { TokenRespoinseModel } from 'src/app/models/auth/tokenResponseModel';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  settings:Setting[]=[];
  searchProducts:ProductGetDto[]=[];

  private currentUserSource = new ReplaySubject<TokenRespoinseModel>(1);
  currentUser$ = this.currentUserSource.asObservable(); 

  constructor(
    private settingService:SettingService,
    private productService:ProductService,
    private localStorageService:LocalStorageService,
    private authService:AuthService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.settingService.getSettings().subscribe(response=>{
      this.settings = response.data;
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
    console.log(event.target.value)
    this.productService.searchProducts(event.target.value).subscribe(response=>{
      this.searchProducts=response.data;
      console.log(this.searchProducts)
    })
  }

  logout(){
    this.authService.logout().subscribe(response=>{
      this.localStorageService.remove('token')
      this.localStorageService.remove('accessToken')
      this.toastrService.success("Hesabdan çıxış olundu.","Success")
    },errorResponse=>{
      console.log(errorResponse);
      this.toastrService.error("Hesabdan çıxış olunarkən xəta baş verdi","Error");
    })
  }

}
