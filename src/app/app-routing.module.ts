import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

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
  { path : "products/man" , component: ProductComponent },
  { path : "brands" , component: BrandComponent },
  // {
  //   path: 'account', component: AccountLayoutComponent, children: [
  //     { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  //     { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
  //   ]
  // }
  // { path : '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
