import { CartState } from './cart.reducer';
import { cartAppState } from './cart.state';
import { createSelector } from '@ngrx/store';

/**
 *
 * @param cart The Cart App State
 * @returns the carts available in that state
 */

export const cartsAll = (cart:cartAppState)=>cart.carts;

/**
 * The Selector for cart
 */
export const cartSelector:any = createSelector(
cartsAll,
/**
 *
 * @param cart The Main Cart State
 * @returns carts available in that state
 */
(cart:CartState)=>cart.carts
)
