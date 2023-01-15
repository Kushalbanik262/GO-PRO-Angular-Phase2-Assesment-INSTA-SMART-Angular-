import { SalesLoading, SalesLoadingSuccess, SalesLoadingError } from './sales.actions';
import { createReducer, on } from '@ngrx/store';
import { sales } from '../../Entities/sales';

export interface SaleState{
  error:string,
  update:string,
  sales:sales[],
  processing:boolean
}


export const initSaleState:SaleState = {
  error:"",
  processing:false,
  sales:[],
  update:new Date().toLocaleTimeString()
}


export const SalesReducer = createReducer(
initSaleState,
on(SalesLoading,(state)=>({
  ...state,
  processing:true,
  update:new Date().toLocaleTimeString()
})),

on(SalesLoadingSuccess,(state,action)=>({
  ...state,
  sales:action.sales,
  update:new Date().toLocaleTimeString(),
  processing:false
})),


on(SalesLoadingError,(state,action)=>({
  ...state,
  error:action.error,
  processing:false,
  update:new Date().toLocaleTimeString()
}))

)


