import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';
import { UserLoading, UserLoadingSuccess, UserLoadingFailiure } from './user.actions';
import { UserService } from './../../Services/User.service';
import {Injectable} from "@angular/core";
import { Actions, ofType,createEffect } from "@ngrx/effects";
import { mergeMap } from 'rxjs';

/**
 * All The Effects Related to the user
 */

@Injectable({
  providedIn:"root"
})
export class UserEffects{
  /**
   *
   * @param service The User Service for user Related HTTP operations
   * @param actions$ The Actions For getting the store dispatches
   */
  constructor(private service:UserService,private actions$:Actions){}

  /**
   * The Load User Effects
   */
  loadUsers$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(UserLoading),
      mergeMap(()=>
        this.service.getAllUsers().pipe(
          tap((data)=>{console.warn(data);}),
          map((users)=>UserLoadingSuccess({users})),
          catchError((error)=>of(UserLoadingFailiure({error})))
        )
      )
    );
  });


}
