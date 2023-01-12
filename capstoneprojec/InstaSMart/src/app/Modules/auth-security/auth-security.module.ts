import { UserEffects } from './../../ReduxModules/UserRedux/user.effects';

import { UserReducer } from './../../ReduxModules/UserRedux/user.reducer';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSecurityRoutingModule } from './auth-security-routing.module';
import { LoginComponent } from '../../Components/login/login.component';
import { PaymentComponent } from '../../Components/payment/payment.component';
import { AdminPRComponent } from '../../Components/admin-pr/admin-pr.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    LoginComponent,
    PaymentComponent,
    AdminPRComponent
  ],
  imports: [
    CommonModule,
    AuthSecurityRoutingModule,
    HttpClientModule,
    MaterialModuleModule,
    FormsModule,
    StoreModule.forFeature("users",UserReducer),
    EffectsModule.forFeature([UserEffects])

  ]
})
export class AuthSecurityModule { }
