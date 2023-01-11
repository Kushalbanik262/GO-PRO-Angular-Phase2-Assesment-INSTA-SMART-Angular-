import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSecurityRoutingModule } from './auth-security-routing.module';
import { LoginComponent } from '../../Components/login/login.component';
import { PaymentComponent } from '../../Components/payment/payment.component';
import { AdminPRComponent } from '../../Components/admin-pr/admin-pr.component';


@NgModule({
  declarations: [
    LoginComponent,
    PaymentComponent,
    AdminPRComponent
  ],
  imports: [
    CommonModule,
    AuthSecurityRoutingModule
  ]
})
export class AuthSecurityModule { }
