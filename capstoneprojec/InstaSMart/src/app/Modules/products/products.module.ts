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
import { CategoryProdComponent } from '../../Components/category-prod/category-prod.component';
import { ReviewProdComponent } from '../../Components/review-prod/review-prod.component';
import { CUProductsComponent } from '../../Components/cuproducts/cuproducts.component';
import { SalesOFTDComponent } from '../../Components/sales-oftd/sales-oftd.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { AppSharedModule } from '../app-shared/app-shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    SpecProdComponent,
    CategoryProdComponent,
    ReviewProdComponent,
    CUProductsComponent,
    SalesOFTDComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModuleModule,
    AppSharedModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature("products",ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
    AppSharedModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
