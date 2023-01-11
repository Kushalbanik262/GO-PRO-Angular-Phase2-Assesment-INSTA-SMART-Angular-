import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShowCartComponent } from '../../Components/show-cart/show-cart.component';
import { PurchesesComponent } from '../../Components/purcheses/purcheses.component';


@NgModule({
  declarations: [
    ShowCartComponent,
    PurchesesComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
