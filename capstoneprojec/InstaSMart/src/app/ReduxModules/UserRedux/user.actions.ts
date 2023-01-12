import { Users } from './../../Entities/users';
import { createAction, props } from "@ngrx/store";

export const UserLoading = createAction(
  "[USER] Details Loading"
);

export const UserLoadingSuccess = createAction(
  "[USER] Details Loading Success",
  props<{users:Users[]}>()
);


export const UserLoadingFailiure = createAction(
  "[USER] Loading Failed",
  props<{error:string}>()
);
