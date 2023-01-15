import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  {
    path:"",
    loadChildren:()=>import("../app/Modules/products/products.module").then(x=>x.ProductsModule)
  },

  {
    path:"contactUs",
    component:ContactUsComponent
  },
  {
    path:"aboutUs",
    component:AboutUSComponent
  },

  {
    path:"login",
    loadChildren:()=>import("../app/Modules/auth-security/auth-security.module").then(x=>x.AuthSecurityModule)
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
