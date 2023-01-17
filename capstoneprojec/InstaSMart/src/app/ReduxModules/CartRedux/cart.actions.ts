import { Cart } from './../../Entities/cart';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';

/**
 * The Actions Which Are Related to cart
 */

export const CartLoading = createAction( //For Loading
  "[Cart] Loading"
);

export const CartLoadingSuccessful = createAction( //For Loading Success
  "[Cart] Loading Successful",
  props<{carts:Cart[]}>()//Loading Properites are carts
);


export const CartLoadingFail = createAction( //For Loading Failed
  "[Cart] Loading Failed",
  props<{error:string}>() //Errors when Loading failed
);

export const CartUpdation = createAction( //For Cart Updation
  "[Cart] Updation",
  props<{cart:Cart}>()//Cart When The Updation is called
);


export const CartUpdationSuccess = createAction( //For Cart Updation Success
  "[Cart] Updation Successful",
  props<{cart:Cart}>()//Cart when Cart Updation Successful
);


export const CartUpdationFail = createAction(//For Cart Updation Failed
  "[Cart] Updation Failed",
  props<{error:string}>()//Cart Updation Failed Errors
)


export const CartDeletion = createAction(// For Cart Deletion Success
  "[Cart] Deletion SuccessFul",
  props<{cartId:number}>()//The The CartId Need to be deleted
)


export const CartSave = createAction(
  "[Cart] Saving Successful",
  props<{cart:Cart}>() //The Cart which Is needed for saving
)
