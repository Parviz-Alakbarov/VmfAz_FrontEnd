import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { BrandComponent } from './components/brand/brand.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ShopsComponent } from './components/shops/shops.component';

const routes: Routes = [
  { path : "" ,pathMatch:"full", component: HomeComponent },
  { path : "home" , component: HomeComponent },
  { 
    path : "products" , 
    component : ProductComponent ,
    children : [
      {path : "man", component : ProductComponent },
      {path : "woman", component : ProductComponent },
      {path : "child", component : ProductComponent },
    ]
      
  },
  { path:'shops', component:ShopsComponent},
  { 
    path:'cart',
    component:CartComponent
  },
  { path : "brands" , component: BrandComponent },
  { path : "productDetail/:productId" , component: ProductDetailComponent },
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      // { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
    ]
  },

  // { path : '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
