import { MatSnackBar } from '@angular/material/snack-bar';
import { CartSave, CartUpdation } from './../ReduxModules/CartRedux/cart.actions';
import { Products } from './../Entities/products';
import { LoginService } from 'src/app/Services/Login.service';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { Cart} from './../Entities/cart';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CartLoading } from '../ReduxModules/CartRedux/cart.actions';

@Injectable(
  {
    providedIn:"root"
  }
)

/**
 * The Cart Service For Cart Related Operations
 */
export class CartService{
//////////////////// Variables For Carts Storing,products and Subscription //////////////
 allCarts!:Cart[];
 subscribe!:Subscription;
 AllProducts:Set<number> = new Set<number>();
///////////////////////////////////////////////////////////////////////////////////////


/**
 *
 * @param store The Ngrx Store for Redux Operations
 * @param snack The SnackBar For PopUp Generation
 */
 constructor(private store:Store<any>,private snack:MatSnackBar){
  /**
   * Dispatching The CartLoading Action
   */
  this.store.dispatch(CartLoading());
  this.subscribe = this.store.subscribe( //Listning to That
    {
      next:((response:any)=>{console.log("Cart Response:",response.carts.carts); this.allCarts = response.carts.carts;}) //Assigning All The Values Which Are coming From The cart
    }
  )
 }


/**
 *
 * @param product Product to add in a cart
 * @returns boolean value if is already present or  not
 */
 addCurrentCart(product:Products):boolean{ //Adding To the Cart Also checking If it Exists Or not
  let allcarts = [...this.allCarts];
  let currentCart:Cart;
  if(this.AllProducts.has(product.id)){ //If Its Present
    for(let i=0;i<this.allCarts.length;i++){
      let cart = {...this.allCarts[i]};
      if(product.id == cart.id){
            cart.quantity ++;
            cart.updated = new Date().toLocaleTimeString();
            console.log("Updating The Cart",cart);
            this.store.dispatch(CartUpdation({cart: cart})); //Updating with increased Frequency for Already Saved one
            break;
      }
   }
    this.snack.open(`Already Added Product ${product.name} incremented Successfully`,"OK");
    return false;
  }
  else{ //If its a fresh new Product
   let cart:Cart = {id:product.id,quantity:1,updated:new Date().toLocaleTimeString()};
   console.log("Adding The Cart",cart);
   this.store.dispatch(CartSave({cart})); //Dispatching save for new One
   this.AllProducts.add(product.id);
   this.snack.open(`New Product ${product.name} Added Successfully`,"OK");
  }
  return true;
 }





}
