import { UserLoading, UserLoadingSuccess, UserLoadingFailiure } from './user.actions';
import { createReducer, on } from '@ngrx/store/src';
import { Users } from './../../Entities/users';
export interface UserState{
  users:Users[],
  error:string,
  payload:{
    IsLoading:boolean,
    IsLoaded:boolean,
    updated:string
  }
}


let initState:UserState ={
  users:[],
  error:"",
  payload:{
    IsLoaded:false,
    IsLoading:false,
    updated:new Date().toUTCString()
  }
}

export const UserReducer = createReducer(
  initState,
  on(UserLoading,(state)=>({
    ...state,
    payload:{
      IsLoaded:false,
      IsLoading:true,
      updated:new Date().toUTCString()
    }
  })),

  on(UserLoadingSuccess,(state,action)=>({
    ...state,
    users:action.users,
    payload:{
      IsLoaded:true,
      IsLoading:false,
      updated:new Date().toUTCString()
    }
  })),

  on(UserLoadingFailiure,(state,{error})=>({
    ...state,
    error:error,
    payload:{
      ...state.payload,
      updated:new Date().toUTCString()
    }
  }))

)
