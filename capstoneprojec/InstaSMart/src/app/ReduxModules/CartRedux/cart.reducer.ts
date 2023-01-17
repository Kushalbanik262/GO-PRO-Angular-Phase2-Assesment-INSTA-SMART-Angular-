import { CartLoading, CartLoadingFail, CartUpdation, CartUpdationSuccess, CartUpdationFail, CartLoadingSuccessful, CartDeletion, CartSave } from './cart.actions';
import { Cart } from './../../Entities/cart';
import { createReducer, on } from '@ngrx/store';


//The Interface For Denoting The Cart State At any Instance
export interface CartState{
  carts:Cart[],
  isLoaded:boolean,
  isLoading:boolean,
  updated:string,
  error:string
};

//The Initial Cart State
export const initCartState:CartState = {
  carts:[],
  isLoaded:false,
  isLoading:false,
  updated:getCurrent(),
  error:""
}

/**
 * @returns the current time in string format
 */
function getCurrent(){
  return new Date().toLocaleTimeString();
}

/**
 * The Reducer For Changing the states
 */
export const cartReducer = createReducer(
initCartState,

/**
 * State Changing When The Loading Happens
 */
on(CartLoading,(state)=>({
  ...state,
  isLoaded:false,
  isLoading:true,
  error:"",
  updated:getCurrent()
})),

/**
 * State When The Loading Gets Successful
 */
on(CartLoadingSuccessful,(state,action)=>({
  ...state,
  carts:action.carts,
  isLoaded:true,
  isLoading:false,
  updated:getCurrent()
})),

/**
 * State When The Loading Gets Failed
 */
on(CartLoadingFail,(state,action)=>({
  ...state,
  error:action.error,
  isLoaded:false,
  isLoading:false,
  updated:getCurrent()
})),


/**
 * State When the Updation Is Successful
 */
on(CartUpdationSuccess,(state,action)=>({
  ...state,
  carts:state.carts.map(c=>(c.id == action.cart?.id? action.cart : c)),
  isLoading:false,
  isLoaded:true,
  updated:getCurrent()
})),

/**
 * State When the Cart Updation Gets failed
 */
on(CartUpdationFail,(state,action)=>({
  ...state,
  isLoaded:false,
  isLoading:false,
  error:action.error,
  updated:getCurrent()
})),


/**
 * State When The Cart Deletion is successful
 */
on(CartDeletion,(state,action)=>({
  ...state,
  carts:state.carts.filter(c=>c.id !== action.cartId),
  isLoaded:true,
  isLoading:false,
  updated:getCurrent()
})),


/**
 * State When the Cart Saving is Successful
 */
on(CartSave,(state,action)=>({
...state,
carts:[action.cart,...state.carts],
isLoaded:true,
isLoading:false,
updated:getCurrent()
}))

)
