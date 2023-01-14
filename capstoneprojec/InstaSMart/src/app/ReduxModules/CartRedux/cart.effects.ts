import { Injectable } from '@angular/core';
import { CartState } from './cart.reducer';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs';
import { mergeMap } from 'rxjs';
import { CartLoading, CartLoadingFail, CartLoadingSuccessful } from './cart.actions';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { CartCrudService } from './../../Services/CartCrud.service';
import { Actions } from '@ngrx/effects';


@Injectable(
  {
    providedIn:"root"
  }
)
export class CartEffects{
  constructor(private action$:Actions,private service:CartCrudService,private store:Store<CartState>){}
  loadCarts$ = createEffect(()=>{ //Loading Products
    return this.action$.pipe(
      ofType(CartLoading),
      mergeMap(()=>
        this.service.getCart().pipe(
          tap((data)=>{console.log("Data Coming From Cart Effects",data);}),
          map(carts=>CartLoadingSuccessful({carts})),
          catchError(error=>of(CartLoadingFail(error)))
        )
      )
    );
  });
}
