import { ProductState } from './product.reducer';
import { createSelector } from '@ngrx/store';
import { ProductAppState } from './product.state';





export const SelectProducts = (state:ProductAppState)=>state.products;


export const SelectAllProducts:any = createSelector(
  SelectProducts,
  (state:ProductState)=>state.products
)
