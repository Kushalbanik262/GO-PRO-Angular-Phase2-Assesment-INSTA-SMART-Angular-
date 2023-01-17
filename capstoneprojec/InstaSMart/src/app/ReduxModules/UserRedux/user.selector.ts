import { UserState } from "./user.reducer";
import { UserAppState } from "./UserAppState";
import {createSelector} from "@ngrx/store";

/**
 *
 * @param state The App User State
 * @returns the current users in that state
 */
export const selectUsers = (state:UserAppState)=>state.users;

/**
 * The User Selector
 */
export const selectAllUsers:any = createSelector(
  selectUsers,
  /**
   *
   * @param state The Main Use rState
   * @returns All The Users in that state
   */
  (state:UserState)=>state.users
)
