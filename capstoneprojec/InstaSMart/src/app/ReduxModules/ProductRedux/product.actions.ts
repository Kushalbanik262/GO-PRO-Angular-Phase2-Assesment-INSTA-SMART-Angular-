import { Products } from './../../Entities/products';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';

/**
 * All The Redux Product Actions
 */


/**
 * For Loading The Products
 */
export const ProductLoad = createAction(
  "[Product] Loading Products",
);


/**
 * For Product Loading is Successful
 */
export const ProductLoadingSuccess = createAction(
  "[Product] Loading Success",
  props<{products:Products[]}>()
);


/**
 * For Loading of the product is failed
 */
export const ProductLoadingFailed = createAction(
  "[Product] Loading Failed",
  props<{error:string}>()
);

/**
 * For Product Saving
 */
export const ProductSave = createAction(
  "[Product] Saving Success",
  props<{product:Products}>()
);


/**
 * For Product Deletion
 */
export const ProductDelete = createAction(
  "[Product] Deletion Success",
  props<{pid:number}>()
);


/**
 * For Updating The Product
 */
export const ProductUpdate = createAction(
  "[Product] Updation",
  props<{product:Products}>()
);

/**
 * For Product Updation Success
 */
export const ProductUpdateSuccess = createAction(
  "[Product] Updation Success",
  props<{product:Products}>()
);

/**
 * For Product Updation Failiure
 */
export const ProductUpdateFailed = createAction(
  "[Product] Updation Failed",
  props<{error:string}>()
);






