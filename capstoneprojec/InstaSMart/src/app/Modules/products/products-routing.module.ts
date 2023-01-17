import { CustomerGuardGuard } from './../../AuthGuards/customer-guard.guard';
import { AccessDeniedComponent } from './../../Components/access-denied/access-denied.component';
import { AdminGuardGuard } from './../../AuthGuards/admin-guard.guard';
import { AdminPRComponent } from './../../Components/admin-pr/admin-pr.component';
import { SpecProdComponent } from './../../Components/spec-prod/spec-prod.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';

/**
 * The Clild Routes For All The Product Modules
 */
const routes: Routes = [
  {
    path:"", //Default Rendering The Home Component
    component:HomeComponent
  },
  {
    path:"product_details/:id", //For The Specific Product View Node Passing ID as parameter
    component:SpecProdComponent
  },
  {
    path:"admin",//This is the specific Admin Page
    canActivate:[AdminGuardGuard],//Protecting using The Admin part with Admin Guard
    component:AdminPRComponent

  },
  {
    path:"showcart", //Node for Showing All The Carts
    canActivate:[CustomerGuardGuard], //Protecting Fpr The Valid Logged In Users Only Through The Customer Guard
    loadChildren:()=>import("../cart/cart.module").then(x=>x.CartModule) //Lazily Loaded Module
  },
  {
    path:"denied", //The Access Denied Node
    component:AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //Configuring For Routes Only
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
