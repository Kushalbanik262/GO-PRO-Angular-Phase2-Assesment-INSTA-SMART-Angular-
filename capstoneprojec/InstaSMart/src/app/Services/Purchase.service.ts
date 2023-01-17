import { Products } from './../Entities/products';
import { CartDeletion, CartLoadingSuccessful } from './../ReduxModules/CartRedux/cart.actions';
import { Cart } from 'src/app/Entities/cart';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Purchases } from '../Entities/Purchases';

@Injectable({
  providedIn:"root"
})
/**
 * This is The service for Purchase Related Operations
 */
export class PurchaseService{
  ///////////////// Variables Of this Service for carts,products and purchase storing////////////////////
   carts!:Cart[]; //All The Carts
   products!:Products[]; //All The Products We Have
   purchases:Purchases = { //The Base Purchase
    products:[],
    updated:new Date().toLocaleTimeString()
   };
///////////////////////////////////////////////////////////////////////////////////////////////////////////

 /**
  *
  * @param store The Ngrx Store For Redux Related Operations
  */
  constructor(private store:Store<any>){

  }

  /**
   * For Loading From The Cart
   */
  loadFromCart(){ //Loading From the Cart
    let subscribe = this.store.select(CartLoadingSuccessful).subscribe( //Subscribing to the cart Loading Successful action
      {
        next:(response:any)=>{
          this.carts = response.carts.carts;
          this.products = response.products.products;
          console.log("All the carts",this.carts);
          console.log("All The Products",this.products);
          subscribe.unsubscribe();
        }
      }
    )
  }

  /**
   *
   * @param id The Id Of The Product
   * @returns The Specific products with the id [Here It is always One as here each Product has unique ID]
   */
  getProductById(id:number):Products[]{ //Getting The Product Which is on the cart
    return this.products.filter(x=>x.id === id);
  }


  /**
   * Adding To Purchase
   */
  addToPurchase(){ //Adding To purchase
    console.log("Adding to purchases All the Carts",this.carts);
    this.carts.forEach(
      (data)=>{
          this.purchases.products.push(this.getProductById(data.id)[0]); //Adding Products to The Purchase
          this.store.dispatch(CartDeletion({cartId:data.id})); //Also With the addition we are deleting the cart
      }
    );
      this.purchases.updated = new Date().toLocaleTimeString();//Setting Current time as updation time
      console.info("The Purchase is",this.purchases);
  }
}
