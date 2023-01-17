import { Users } from './../../Entities/users';
import { createAction, props } from "@ngrx/store";

/**
 * The User Redux Actions
 */



/**
 * For The UserLoading
 */
export const UserLoading = createAction(
  "[USER] Details Loading"
);

/**
 * For The User Loading Success
 */
export const UserLoadingSuccess = createAction(
  "[USER] Details Loading Success",
  props<{users:Users[]}>()
);

/**
 * For The User Loading Failed
 */
export const UserLoadingFailiure = createAction(
  "[USER] Loading Failed",
  props<{error:string}>()
);
