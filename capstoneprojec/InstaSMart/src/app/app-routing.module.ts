import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [ //These Are The Routes For Parent Part
  {
    path:"", //For Home Page  Loading The Products Module For Displaying The Products at first glance
    loadChildren:()=>import("../app/Modules/products/products.module").then(x=>x.ProductsModule) //Lazily Loaded
  },

  {
    path:"contactUs", //Contact Us Page URL
    component:ContactUsComponent //Contact US Component
  },
  {
    path:"aboutUs", //About Us Url
    component:AboutUSComponent //About Us Component
  },

  {
    path:"login", //Login  Url
    loadChildren:()=>import("../app/Modules/auth-security/auth-security.module").then(x=>x.AuthSecurityModule) //Lazily Loaded Auth Security Module
  },
  {
    path:"**", //For Any Invalid Paths
    component:NotFoundComponent //Will Be Redirected To NotFound Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //These Are FOr Root Routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
