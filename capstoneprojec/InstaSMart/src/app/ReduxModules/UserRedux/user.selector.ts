import { UserState } from "./user.reducer";
import { UserAppState } from "./UserAppState";
import {createSelector} from "@ngrx/store";

export const selectUsers = (state:UserAppState)=>state.users;


export const selectAllUsers:any = createSelector(
  selectUsers,
  (state:UserState)=>state.users
)
