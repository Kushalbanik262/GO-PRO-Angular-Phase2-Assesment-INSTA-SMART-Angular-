import { ProductLoad, ProductLoadingSuccess, ProductLoadingFailed, ProductSave, ProductDelete, ProductUpdateSuccess, ProductUpdateFailed } from './product.actions';
import { createReducer, on } from '@ngrx/store';
import { Products } from './../../Entities/products';



export interface ProductState{
  products:Products[],
  isLoaded:boolean,
  isLoading:boolean,
  error:string,
  updated:string
}


function getCurrentTime(){
  return new Date().toLocaleTimeString();
}


export const ProductInitState:ProductState = {
  products:[],
  isLoaded:false,
  isLoading:false,
  error:"",
  updated:getCurrentTime()
}


export const ProductReducer = createReducer(
ProductInitState,
on(ProductLoad,(state)=>({
  ...state,
  isLoading:true,
  isLoaded:false,
  updated:getCurrentTime()
})),

on(ProductLoadingSuccess,(state,action)=>({
  ...state,
  products:action.products,
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),

on(ProductLoadingFailed,(state,action)=>({
  ...state,
  error:action.error
})),

on(ProductSave,(state,action)=>({
  ...state,
  products:[...state.products,action.product],
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),

on(ProductDelete,(state,action)=>({
  ...state,
  products:state.products.filter(x=>x.id!==action.pid),
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),

on(ProductUpdateSuccess,(state,action)=>({
  ...state,
  products:state.products.map(p=> (p?.id == action.product?.id ? action.product : p)),
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),

on(ProductUpdateFailed,(state,action)=>({
  ...state,
  products:[],
  isLoaded:false,
  isLoading:false
}))


);


