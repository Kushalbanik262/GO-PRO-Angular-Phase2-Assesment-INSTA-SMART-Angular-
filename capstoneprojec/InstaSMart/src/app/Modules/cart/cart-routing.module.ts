import { PurchesesComponent } from './../../Components/purcheses/purcheses.component';
import { PaymentComponent } from './../../Components/payment/payment.component';
import { ShowCartComponent } from './../../Components/show-cart/show-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * The Cart Routing Module to Load All Child Routes Of Cart
 */
const routes: Routes = [
  {
    path:"", //The Default Url will Render ShowCart Component
    component:ShowCartComponent
  },
  {
    path:"purchases",//The '/purchases' Will Render Purchases Component
    component:PurchesesComponent
  },
  {
    path:"paymentWay", // This Is a secure node specifically designed for payment gateway
    pathMatch:"prefix",
    loadChildren:()=>import("../auth-security/auth-security.module").then(x=>x.AuthSecurityModule)//Lazily Loaded Module
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],//For Child Routes
  exports: [RouterModule]
})
export class CartRoutingModule { }
