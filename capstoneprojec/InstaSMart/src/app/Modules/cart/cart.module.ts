import { PaymentComponent } from './../../Components/payment/payment.component';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShowCartComponent } from '../../Components/show-cart/show-cart.component';
import { PurchesesComponent } from '../../Components/purcheses/purcheses.component';
import { AppSharedModule } from '../app-shared/app-shared.module';

/**
 * The Cart Module For Cart Related Components
 */
@NgModule({
  declarations: [
    /**
     * These Two Components Are There For Showing the cart Items and Purchasing Items
     */
    ShowCartComponent,
    PurchesesComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    AppSharedModule, //For Common Shared Module
    MaterialModuleModule//For Material UI Features
  ]
})
export class CartModule { }
