import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUSComponent } from './Components/about-us/about-us.component';

const routes: Routes = [
  {
    path:"contactUs",
    component:ContactUsComponent
  },
  {
    path:"aboutUs",
    component:AboutUSComponent
  },
  {
    path:"",
    loadChildren:()=>import("../app/Modules/products/products.module").then(x=>x.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
