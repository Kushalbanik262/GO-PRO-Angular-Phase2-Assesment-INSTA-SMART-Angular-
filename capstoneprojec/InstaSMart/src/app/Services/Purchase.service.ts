import { Products } from './../Entities/products';
import { CartDeletion, CartLoadingSuccessful } from './../ReduxModules/CartRedux/cart.actions';
import { Cart } from 'src/app/Entities/cart';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Purchases } from '../Entities/Purchases';

@Injectable({
  providedIn:"root"
})
export class PurchaseService{
   carts!:Cart[]; //All The Carts
   products!:Products[]; //All The Products We Have
   purchases:Purchases = { //The Base Purchase
    products:[],
    updated:new Date().toLocaleTimeString()
   };

  constructor(private store:Store<any>){

  }


  loadFromCart(){ //Loading From the Cart
    let subscribe = this.store.select(CartLoadingSuccessful).subscribe(
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


  getProductById(id:number):Products[]{ //Getting The Product Which is on the cart
    return this.products.filter(x=>x.id === id);
  }



  addToPurchase(){ //Adding To purchase
    console.log("Adding to purchases All the Carts",this.carts);
    this.carts.forEach(
      (data)=>{
          this.purchases.products.push(this.getProductById(data.id)[0]);
          this.store.dispatch(CartDeletion({cartId:data.id}));
      }
    );
      this.purchases.updated = new Date().toLocaleTimeString();
      console.info("The Purchase is",this.purchases);
  }
}
