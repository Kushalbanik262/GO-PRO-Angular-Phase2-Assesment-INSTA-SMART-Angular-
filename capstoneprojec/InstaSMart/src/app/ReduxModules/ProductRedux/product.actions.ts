import { Products } from './../../Entities/products';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';



export const ProductLoad = createAction(
  "[Product] Loading Products",
);


export const ProductLoadingSuccess = createAction(
  "[Product] Loading Success",
  props<{products:Products[]}>()
);



export const ProductLoadingFailed = createAction(
  "[Product] Loading Failed",
  props<{error:string}>()
);

export const ProductSave = createAction(
  "[Product] Saving Success",
  props<{product:Products}>()
);

export const ProductDelete = createAction(
  "[Product] Deletion Success",
  props<{pid:number}>()
)
