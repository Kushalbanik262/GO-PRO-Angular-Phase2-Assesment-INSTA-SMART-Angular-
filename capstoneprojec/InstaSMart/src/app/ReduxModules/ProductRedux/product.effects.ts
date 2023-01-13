import { SelectAllProducts } from './product.selector';
import { from, of, switchMap, withLatestFrom } from 'rxjs';
import { tap, map, catchError } from 'rxjs';
import { mergeMap } from 'rxjs';
import { ProductLoad, ProductLoadingSuccess, ProductLoadingFailed, ProductSave, ProductDelete } from './product.actions';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ProductState } from './product.reducer';
import { ProductService } from './../../Services/Products.service';

import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';


@Injectable(
  {
    providedIn:"root"
  }
)
export class ProductEffects{
  constructor(private action$:Actions,private service:ProductService,private store:Store<ProductState>){}

  loadProducts$ = createEffect(()=>{ //Loading Products
    return this.action$.pipe(
      ofType(ProductLoad),
      mergeMap(()=>
        this.service.loadProducts().pipe(
          tap((data)=>{console.log("Data Coming From Product Effects",data);}),
          map(products=>ProductLoadingSuccess({products})),
          catchError(error=>of(ProductLoadingFailed(error)))
        )
      )
    );
  });


  //Saving Products by Creating the effect
  saveProducts$ = createEffect(()=>
    this.action$.pipe(
      ofType(ProductSave),
      tap((data)=>{console.log("Trying to save Product In Product Create Effect",data)}),
      withLatestFrom(this.store.select(SelectAllProducts)),
      switchMap(([action,products]) => from(this.service.saveProduct(products[0])))
    ),
    {dispatch:false}
  );


  deleteProduct$ = createEffect(()=>
  this.action$.pipe(
    ofType(ProductDelete),
    tap((data)=>{console.log("Deleting Product In Product Create Effect",data)}),
    withLatestFrom(this.store.select(SelectAllProducts)),
    switchMap(([action,products]) => from(this.service.deleteProduct(products[0].id)))
  ),
  {dispatch:false}
);

}
