import { CustomerGuardGuard } from './../../AuthGuards/customer-guard.guard';
import { AccessDeniedComponent } from './../../Components/access-denied/access-denied.component';
import { AdminGuardGuard } from './../../AuthGuards/admin-guard.guard';
import { AdminPRComponent } from './../../Components/admin-pr/admin-pr.component';
import { SpecProdComponent } from './../../Components/spec-prod/spec-prod.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"product_details/:id",
    component:SpecProdComponent
  },
  {
    path:"admin",
    canActivate:[AdminGuardGuard],
    component:AdminPRComponent

  },
  {
    path:"showcart",
    canActivate:[CustomerGuardGuard],
    loadChildren:()=>import("../cart/cart.module").then(x=>x.CartModule)
  },
  {
    path:"denied",
    component:AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
