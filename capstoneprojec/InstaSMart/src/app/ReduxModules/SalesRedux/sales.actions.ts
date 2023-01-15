import { createAction, props } from '@ngrx/store';
import { sales } from 'src/app/Entities/sales';

export const SalesLoading = createAction(
  "[Sales] Loading"
);

export const SalesLoadingSuccess = createAction(
  "[Sales] Loading Success",
  props<{sales:sales[]}>()
);

export const SalesLoadingError = createAction(
  "[Sales] Loading Error",
  props<{error:string}>()
);
