import { PaymentComponent } from './../../Components/payment/payment.component';
import { AdminPRComponent } from './../../Components/admin-pr/admin-pr.component';
import { LoginComponent } from './../../Components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"payment/:price",
    component:PaymentComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthSecurityRoutingModule { }
