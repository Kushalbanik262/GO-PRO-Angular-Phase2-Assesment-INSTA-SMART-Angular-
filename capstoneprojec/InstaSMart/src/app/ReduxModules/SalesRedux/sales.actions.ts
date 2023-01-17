import { createAction, props } from '@ngrx/store';
import { sales } from 'src/app/Entities/sales';

/**
 * All The Actions Related To Sales
 */

/**
 * For Loading All The sales
 */
export const SalesLoading = createAction(
  "[Sales] Loading"
);


/**
 * For Sales Loading success
 */
export const SalesLoadingSuccess = createAction(
  "[Sales] Loading Success",
  props<{sales:sales[]}>()
);


/**
 * For Sales Loading Error
 */
export const SalesLoadingError = createAction(
  "[Sales] Loading Error",
  props<{error:string}>()
);
