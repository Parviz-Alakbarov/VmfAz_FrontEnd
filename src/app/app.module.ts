import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { BrandComponent } from './components/brand/brand.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader-service.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShopsComponent } from './components/shops/shops.component';
import { CartComponent } from './components/cart/cart.component';

import { RedZoomModule } from 'ngx-red-zoom';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    ProductComponent,
    HomeComponent,
    BrandComponent,
    LoginComponent,
    RegisterComponent,
    AccountLayoutComponent,
    ProductDetailComponent,
    ShopsComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,  
    ReactiveFormsModule,
    RedZoomModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      progressBar:true,
      progressAnimation:'increasing',
      maxOpened:5,
      autoDismiss:true,
      closeButton:true,
    }),
  ],
  providers: [
    DynamicScriptLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
