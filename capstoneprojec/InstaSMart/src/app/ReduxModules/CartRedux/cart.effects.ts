import { Injectable } from '@angular/core';
import { CartState } from './cart.reducer';
import { Store } from '@ngrx/store';
import { concatMap, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs';
import { mergeMap } from 'rxjs';
import { CartDeletion, CartLoading, CartLoadingFail, CartLoadingSuccessful, CartSave, CartUpdation, CartUpdationFail, CartUpdationSuccess } from './cart.actions';
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


  cartAdd$ = createEffect(()=>
    this.action$.pipe(
      ofType(CartSave),
      concatMap(action=>
        this.service.saveCart(action.cart)
        .pipe(
          map(cart=>CartSave({cart}))
        )
      )
    ),
    {dispatch:false}
  );

  updateCart$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(CartUpdation),
      concatMap(action=>
        this.service.updateCart(action.cart)
        .pipe(
          map(cart=>CartUpdationSuccess({cart})),
          catchError(error=>of(CartUpdationFail(error)))
        )
      )
    );
  });

  deleteCart$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(CartDeletion),
      concatMap(action=>
        this.service.deleteCart(action.cartId).pipe(
          tap(c=>{console.log("Deleting with cartID [from effects]:",action.cartId)}),
          map(()=>CartDeletion({cartId:action.cartId}))
        )
      )
    );
  }, {dispatch:false});

}
