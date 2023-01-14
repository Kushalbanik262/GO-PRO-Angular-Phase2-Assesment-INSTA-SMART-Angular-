import { Cart } from './../../Entities/cart';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';


export const CartLoading = createAction(
  "[Cart] Loading"
);

export const CartLoadingSuccessful = createAction(
  "[Cart] Loading Successful",
  props<{carts:Cart[]}>()
);


export const CartLoadingFail = createAction(
  "[Cart] Loading Failed",
  props<{error:string}>()
);

export const CartUpdation = createAction(
  "[Cart] Updation",
  props<{cart:Cart}>()
);


export const CartUpdationSuccess = createAction(
  "[Cart] Updation Successful",
  props<{cart:Cart}>()
);


export const CartUpdationFail = createAction(
  "[Cart] Updation Failed",
  props<{error:string}>()
)


export const CartDeletion = createAction(
  "[Cart] Deletion SuccessFul",
  props<{cartId:number}>()
)


export const CartSave = createAction(
  "[Cart] Saving Successful",
  props<{cart:Cart}>()
)
