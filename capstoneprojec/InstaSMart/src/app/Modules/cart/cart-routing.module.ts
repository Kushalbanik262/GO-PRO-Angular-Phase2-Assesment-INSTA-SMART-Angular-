import { PurchesesComponent } from './../../Components/purcheses/purcheses.component';
import { PaymentComponent } from './../../Components/payment/payment.component';
import { ShowCartComponent } from './../../Components/show-cart/show-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:ShowCartComponent
  },
  {
    path:"purchases",
    component:PurchesesComponent
  },
  {
    path:"paymentWay",
    pathMatch:"prefix",
    loadChildren:()=>import("../auth-security/auth-security.module").then(x=>x.AuthSecurityModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
