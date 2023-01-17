import { createSelector } from '@ngrx/store';
import { SaleState } from './sales.reducer';
import { SalesAppState } from './sales.state';


/**
 *
 * @param state The App Sales State
 * @returns The Sales in that current app state
 */
export const AllSales = (state:SalesAppState)=>state.sales;

/**
 * The Main Sales Selector
 */
export const SalesSelector:any = createSelector(
  AllSales,
  /**
   *
   * @param state The Salestate
   * @returns the sales in that state
   */
  (state:SaleState)=>state.sales
)
