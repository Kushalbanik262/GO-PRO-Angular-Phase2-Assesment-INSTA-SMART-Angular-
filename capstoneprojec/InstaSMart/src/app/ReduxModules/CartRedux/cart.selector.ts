import { CartState } from './cart.reducer';
import { cartAppState } from './cart.state';
import { createSelector } from '@ngrx/store';


export const cartsAll = (cart:cartAppState)=>cart.carts;

export const cartSelector:any = createSelector(
cartsAll,
(cart:CartState)=>cart.carts
)
