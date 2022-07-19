import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { ForgotPasswordVerificationComponent } from './components/account/forgot-password-verification/forgot-password-verification.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { RegisterComponent } from './components/account/register/register.component';
import { BrandComponent } from './components/brand/brand.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { ShopsComponent } from './components/shops/shops.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path : "" ,pathMatch:"full", component: HomeComponent },
  // {
  //   path : "" ,
  //   runGuardsAndResolvers: 'always',
  //   canActivate:[LoginGuard],
  //   children : [
  //     { path : 'profile' ,  component : CartComponent},
  //   ]
  // },

  { path : "home" , component: HomeComponent },
  { path : "profile" , component: ProfileComponent ,canActivate: [LoginGuard]},
  // { 
  //   path : "products" , 
  //   component : ProductComponent ,
  //   children : [
  //     {path : ":man", component : ProductComponent },
  //     {path : ":woman", component : ProductComponent },
  //     {path : ":child", component : ProductComponent },
  //   ]
      
  // },
  { path : 'products',  component : ProductComponent},
  { path : 'products/:gender',  component : ProductComponent},
  { path : 'shops',  component : ShopsComponent},
  { path : 'cart' ,  component : CartComponent},
  { path : "brands" , component: BrandComponent },
  { path : "productDetail/:productId" , component: ProductDetailComponent },
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      { path: 'forgotPasswordVerification', component: ForgotPasswordVerificationComponent },
      // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      // { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
    ]
  },
  { path:'not-found', component:NotFoundComponent },
  { path:'server-error', component:ServerErrorComponent },
  { path : '**', component: NotFoundComponent, pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', //This configuration automatically displays the top of the page when the route changes.
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
