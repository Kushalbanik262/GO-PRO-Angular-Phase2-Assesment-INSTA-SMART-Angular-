import { createSelector } from '@ngrx/store';
import { SaleState } from './sales.reducer';
import { SalesAppState } from './sales.state';



export const AllSales = (state:SalesAppState)=>state.sales;

export const SalesSelector:any = createSelector(
  AllSales,
  (state:SaleState)=>state.sales
)
