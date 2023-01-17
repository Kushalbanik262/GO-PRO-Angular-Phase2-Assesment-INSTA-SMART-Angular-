import { SalesEffect } from './../../ReduxModules/SalesRedux/sales.effects';
import { SalesReducer } from '../../ReduxModules/SalesRedux/sales.reducer';
import { cartReducer } from './../../ReduxModules/CartRedux/cart.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEffects } from './../../ReduxModules/ProductRedux/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProductReducer } from './../../ReduxModules/ProductRedux/product.reducer';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from '../../Components/home/home.component';
import { SpecProdComponent } from '../../Components/spec-prod/spec-prod.component';
import { SalesOFTDComponent } from '../../Components/sales-oftd/sales-oftd.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { CartEffects } from 'src/app/ReduxModules/CartRedux/cart.effects';

/**
 * Product Module The Most Important Module Used For All The Operations
 */

@NgModule({
  declarations: [
    HomeComponent,//The Root Component For Showing All The Products
    SpecProdComponent,
    SalesOFTDComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModuleModule,//For Material UI Related Features
    AppSharedModule,//The Custom Shared Module
    HttpClientModule,//The HttpClient Module
    FormsModule,//The template Driven Forms Module
    StoreModule.forFeature("products",ProductReducer),//Featuring The Store Module for Product Reducers
    StoreModule.forFeature("carts",cartReducer), //Featuring The CartsModule For Cart Reducer
    StoreModule.forFeature("sales",SalesReducer),//Freaturing The Sales Module For Sales Reducer
    EffectsModule.forFeature([ProductEffects,CartEffects,SalesEffect]),//Declearing The Effects Array For Product,Cart and Sales
    AppSharedModule,
    ReactiveFormsModule//For Reactive Forms
  ]
})
export class ProductsModule { }
