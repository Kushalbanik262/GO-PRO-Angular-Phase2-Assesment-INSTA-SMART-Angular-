import { PaymentComponent } from './../../Components/payment/payment.component';
import { AdminPRComponent } from './../../Components/admin-pr/admin-pr.component';
import { LoginComponent } from './../../Components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/**
 * Child Routes For Auth Security module
 */
const routes: Routes = [
  {
    path:"", //Root Path For Login
    component:LoginComponent
  },
  {
    path:"payment/:price", //Payment With price in path parameter
    component:PaymentComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //This is Used For child Ruutes
  exports: [RouterModule]
})
export class AuthSecurityRoutingModule { }
