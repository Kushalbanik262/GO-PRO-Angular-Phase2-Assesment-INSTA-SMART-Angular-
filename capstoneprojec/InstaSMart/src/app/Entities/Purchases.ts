import { Products } from './products';

/**
 * Purchases Interface to get all the purchases
 */
export interface Purchases{
  products:Products[],
  updated:string
}
