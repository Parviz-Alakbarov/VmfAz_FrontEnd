import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path : "" ,pathMatch:"full", component: HomeComponent },
  { path : "home" , component: HomeComponent },
  { path : "products" , component: ProductComponent },
  { path : "brands" , component: BrandComponent },
  // { path : '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
