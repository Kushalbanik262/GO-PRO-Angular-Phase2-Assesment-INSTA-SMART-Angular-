import { ProductLoad, ProductLoadingSuccess, ProductLoadingFailed, ProductSave, ProductDelete, ProductUpdateSuccess, ProductUpdateFailed } from './product.actions';
import { createReducer, on } from '@ngrx/store';
import { Products } from './../../Entities/products';


/**
 * The Interface For Product State management
 */
export interface ProductState{
  products:Products[],
  isLoaded:boolean,
  isLoading:boolean,
  error:string,
  updated:string
}

/**
 *
 * @returns The Current Time in String Format
 */
function getCurrentTime(){
  return new Date().toLocaleTimeString();
}

/**
 * The Initial Product State
 */
export const ProductInitState:ProductState = {
  products:[],
  isLoaded:false,
  isLoading:false,
  error:"",
  updated:getCurrentTime()
}

/**
 * The Main Product Reducer
 */
export const ProductReducer = createReducer(
ProductInitState,

/**
 * During The Product Load
 */
on(ProductLoad,(state)=>({
  ...state,
  isLoading:true,
  isLoaded:false,
  updated:getCurrentTime()
})),

/**
 * During The Product Load Success
 */
on(ProductLoadingSuccess,(state,action)=>({
  ...state,
  products:action.products,
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),


/**
 * During The Product Load Failed
 */
on(ProductLoadingFailed,(state,action)=>({
  ...state,
  error:action.error
})),



/**
 * During The Product Saving
 */
on(ProductSave,(state,action)=>({
  ...state,
  products:[...state.products,action.product],
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),

/**
 * During The Product Deletion
 */
on(ProductDelete,(state,action)=>({
  ...state,
  products:state.products.filter(x=>x.id!==action.pid),
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),


/**
 * During The Product Updation
 */
on(ProductUpdateSuccess,(state,action)=>({
  ...state,
  products:state.products.map(p=> (p?.id == action.product?.id ? action.product : p)),
  isLoaded:true,
  isLoading:false,
  updated:getCurrentTime()
})),


/**
 * During The Product Updation Failed
 */
on(ProductUpdateFailed,(state,action)=>({
  ...state,
  products:[],
  isLoaded:false,
  isLoading:false
}))


);


