import { CartLoading, CartLoadingFail, CartUpdation, CartUpdationSuccess, CartUpdationFail, CartLoadingSuccessful } from './cart.actions';
import { Cart } from './../../Entities/cart';
import { createReducer, on } from '@ngrx/store';


export interface CartState{
  carts:Cart[],
  isLoaded:boolean,
  isLoading:boolean,
  updated:string,
  error:string
};


export const initCartState:CartState = {
  carts:[],
  isLoaded:false,
  isLoading:false,
  updated:getCurrent(),
  error:""
}

function getCurrent(){
  return new Date().toLocaleTimeString();
}


export const cartReducer = createReducer(
initCartState,
on(CartLoading,(state)=>({
  ...state,
  isLoaded:false,
  isLoading:true,
  error:"",
  updated:getCurrent()
})),


on(CartLoadingSuccessful,(state,action)=>({
  ...state,
  carts:action.carts,
  isLoaded:true,
  isLoading:false,
  updated:getCurrent()
})),

on(CartLoadingFail,(state,action)=>({
  ...state,
  error:action.error,
  isLoaded:false,
  isLoading:false,
  updated:getCurrent()
})),


on(CartUpdationSuccess,(state,action)=>({
  ...state,
  carts:state.carts.map(c=>(c.id == action.cart.id? action.cart : c)),
  isLoading:false,
  isLoaded:true,
  updated:getCurrent()
})),

on(CartUpdationFail,(state,action)=>({
  ...state,
  isLoaded:false,
  isLoading:false,
  error:action.error
}))

)
