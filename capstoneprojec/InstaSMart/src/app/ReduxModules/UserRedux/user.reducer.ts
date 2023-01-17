import { UserLoading, UserLoadingSuccess, UserLoadingFailiure } from './user.actions';
import { createReducer, on } from '@ngrx/store';
import { Users } from './../../Entities/users';

/**
 * The User State
 */
export interface UserState{
  users:Users[],
  error:string,
  payload:{
    IsLoading:boolean,
    IsLoaded:boolean,
    updated:string
  }
}

/**
 * The Initial User State
 */
let initState:UserState ={
  users:[],
  error:"",
  payload:{
    IsLoaded:false,
    IsLoading:false,
    updated:new Date().toUTCString()
  }
}

/**
 * The User Reducer
 */
export const UserReducer = createReducer(
  initState,

  /**
   * When The State is Loading
   */
  on(UserLoading,(state)=>({
    ...state,
    payload:{
      IsLoaded:false,
      IsLoading:true,
      updated:new Date().toUTCString()
    }
  })),

  /**
   * When The State is Loading Success
   */
  on(UserLoadingSuccess,(state,action)=>({
    ...state,
    users:action.users,
    payload:{
      IsLoaded:true,
      IsLoading:false,
      updated:new Date().toUTCString()
    }
  })),

  /**
   * When The State is Loading Failed
   */
  on(UserLoadingFailiure,(state,{error})=>({
    ...state,
    error:error,
    payload:{
      ...state.payload,
      updated:new Date().toUTCString()
    }
  }))

)
