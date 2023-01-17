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

/**
 * The Product Effect
 */
@Injectable(
  {
    providedIn:"root"
  }
)
export class ProductEffects{
  /**
   *
   * @param action$ The Action To listen store dispatches
   * @param service The Product Service To Interact with Http protocols
   * @param store The Store for state operations
   */
  constructor(private action$:Actions,private service:ProductService,private store:Store<ProductState>){}


  /**
   * Loading The Products effect
   */
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


  /**
   * Saving The Product Effects
   */
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


  /**
   * For The Product Deletion
   */
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


/**
 * For The Product Updation
 */
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
