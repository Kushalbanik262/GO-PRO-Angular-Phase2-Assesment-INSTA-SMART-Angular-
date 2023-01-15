import { PaymentComponent } from './../../Components/payment/payment.component';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShowCartComponent } from '../../Components/show-cart/show-cart.component';
import { PurchesesComponent } from '../../Components/purcheses/purcheses.component';
import { AppSharedModule } from '../app-shared/app-shared.module';


@NgModule({
  declarations: [
    ShowCartComponent,
    PurchesesComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    AppSharedModule,
    MaterialModuleModule
  ]
})
export class CartModule { }
