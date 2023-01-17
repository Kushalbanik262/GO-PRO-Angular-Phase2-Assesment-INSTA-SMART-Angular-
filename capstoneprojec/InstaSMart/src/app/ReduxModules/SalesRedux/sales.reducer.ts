import { SalesLoading, SalesLoadingSuccess, SalesLoadingError } from './sales.actions';
import { createReducer, on } from '@ngrx/store';
import { sales } from '../../Entities/sales';


/**
 * The Main Sale State
 */
export interface SaleState{
  error:string,
  update:string,
  sales:sales[],
  processing:boolean
}


/**
 * The Initial State For Sales
 */
export const initSaleState:SaleState = {
  error:"",
  processing:false,
  sales:[],
  update:new Date().toLocaleTimeString()
}


/**
 * The Main Sale Reducer
 */
export const SalesReducer = createReducer(
initSaleState,
/**
 * State Management when the sales Loading
 */
on(SalesLoading,(state)=>({
  ...state,
  processing:true,
  update:new Date().toLocaleTimeString()
})),

/**
 * State Management when the sales Loading success
 */
on(SalesLoadingSuccess,(state,action)=>({
  ...state,
  sales:action.sales,
  update:new Date().toLocaleTimeString(),
  processing:false
})),

/**
 * State Management when the sales loading has errors
 */
on(SalesLoadingError,(state,action)=>({
  ...state,
  error:action.error,
  processing:false,
  update:new Date().toLocaleTimeString()
}))

)


