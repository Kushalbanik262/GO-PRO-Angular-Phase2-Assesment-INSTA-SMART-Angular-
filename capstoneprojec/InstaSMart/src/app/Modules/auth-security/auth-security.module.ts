import { AppSharedModule } from './../app-shared/app-shared.module';
import { UserEffects } from './../../ReduxModules/UserRedux/user.effects';

import { UserReducer } from './../../ReduxModules/UserRedux/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

/**
 * This Module is Used For All Secure Operations
 * Like Payment and Login
 */

@NgModule({
  declarations: [
    LoginComponent, //The Login Component
    AdminPRComponent, //Admin ControlComponent
    PaymentComponent,// The Payment Component
  ],
  imports: [
    CommonModule,
    AuthSecurityRoutingModule,
    HttpClientModule,//For Http Operations
    MaterialModuleModule, //The Module For Using MaterialModules
    FormsModule,//For Template Driven Forms
    StoreModule.forFeature("users",UserReducer), //Giving The Features For User Reducer as This is Loading in this Module Component
    EffectsModule.forFeature([UserEffects]),//Giving The Features For User Effects
    AppSharedModule,
    ReactiveFormsModule //Using Reactive Forms Here

  ]
})
export class AuthSecurityModule { }
