import { createEffect } from '@ngrx/effects';
import { tap,map ,catchError,of} from 'rxjs';
import { mergeMap } from 'rxjs';
import { SalesLoading, SalesLoadingSuccess, SalesLoadingError } from './sales.actions';
import { ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { SalesService } from 'src/app/Services/SalesService';



@Injectable({
  providedIn:"root"
})
export class SalesEffect{
  constructor(private actions$:Actions,private service:SalesService){}

    loadSales$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(SalesLoading),
      mergeMap(()=>
        this.service.getAllSales().pipe(
          tap((data)=>{console.warn(data);}),
          map((sales)=>SalesLoadingSuccess({sales})),
          catchError((error)=>of(SalesLoadingError({error})))
        )
      )
    );
  });

}
