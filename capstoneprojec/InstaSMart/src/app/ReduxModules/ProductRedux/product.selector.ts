import { ProductState } from './product.reducer';
import { createSelector } from '@ngrx/store';
import { ProductAppState } from './product.state';



/**
 *
 * @param state the product App State
 * @returns the products in that state
 */
export const SelectProducts = (state:ProductAppState)=>state.products;


export const SelectAllProducts:any = createSelector(
  SelectProducts,
  /**
   *
   * @param state the main product state
   * @returns the products in that state
   */
  (state:ProductState)=>state.products
)
