import { SelectAllProducts } from './product.selector';
import { from, of, switchMap, withLatestFrom , concatMap } from 'rxjs';
import { tap, map, catchError } from 'rxjs';
import { mergeMap } from 'rxjs';
import { ProductLoad, ProductLoadingSuccess, ProductLoadingFailed, ProductSave, ProductDelete, ProductUpdate, ProductUpdateSuccess, ProductUpdateFailed } from './product.actions';
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
      concatMap(action=>
        this.service.saveProduct(action.product)
        .pipe(
          map(product=>ProductSave({product}))
        )
      )
    ),
    {dispatch:false}
  );


  deleteProduct$ = createEffect(()=>
  this.action$.pipe(
    ofType(ProductDelete),
    concatMap(action=>
      this.service.deleteProduct(action.pid)
      .pipe(
        map(()=>ProductDelete({pid:action.pid}))
      )
    )
  ),
  {dispatch:false}
);


  updateProduct$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(ProductUpdate),
      concatMap(action=>
        this.service.updateProduct(action.product)
        .pipe(
          map(product=>ProductUpdateSuccess({product})),
          catchError(error=>of(ProductUpdateFailed(error)))
        )
      )
    );
  });

}
