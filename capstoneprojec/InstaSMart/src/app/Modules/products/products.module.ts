import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from '../../Components/home/home.component';
import { SpecProdComponent } from '../../Components/spec-prod/spec-prod.component';
import { CategoryProdComponent } from '../../Components/category-prod/category-prod.component';
import { ReviewProdComponent } from '../../Components/review-prod/review-prod.component';
import { CUProductsComponent } from '../../Components/cuproducts/cuproducts.component';
import { SalesOFTDComponent } from '../../Components/sales-oftd/sales-oftd.component';


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
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
