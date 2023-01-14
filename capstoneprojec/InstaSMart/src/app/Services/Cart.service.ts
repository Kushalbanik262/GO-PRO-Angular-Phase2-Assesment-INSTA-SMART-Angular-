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
export class CartService{

 allCarts!:Cart[];
 subscribe!:Subscription;
 AllProducts:Set<number> = new Set<number>();

 constructor(private store:Store<any>){
  this.store.dispatch(CartLoading());
  this.subscribe = this.store.subscribe(
    {
      next:((response:any)=>{console.log("Cart Response:",response.carts.carts); this.allCarts = response.carts.carts;})
    }
  )
 }

//  setCurrentCart(userId:number){
//   this.AllProducts.clear(); //If someone else logins
//   this.allCarts.forEach(
//     (cart)=>{
//       if(cart.id == userId){
//         this.currentCart.id = cart.id;
//         this.currentCart.updated = cart.updated;
//         cart.car.forEach(
//           c=>{this.currentCart.cartmap.push(c);}
//         )
//         console.log("Current Cart is:",this.currentCart);
//         console.log("Current Cart Length:",this.currentCart.cartmap.length);
//         this.currentCart.cartmap.forEach(
//           (data)=>{this.AllProducts.add(data.product.id);console.log("All Cart Products->",data);}
//         );
//       }
//     }
//   );
//  }

 addCurrentCart(product:Products):boolean{ //Adding To the Cart Also checking If it Exists Or not

  let allcarts = [...this.allCarts];
  let currentCart:Cart;
  //this.subscribe.unsubscribe();
  if(this.AllProducts.has(product.id)){ //If Its Present
    for(let i=0;i<this.allCarts.length;i++){
      let cart = {...this.allCarts[i]};
      if(product.id == cart.id){
            cart.quantity ++;
            cart.updated = new Date().toLocaleTimeString();
            console.log("Updating The Cart",cart);
            this.store.dispatch(CartUpdation({cart: cart}));
            break;
      }
   }

    return false;
  }
  else{
   let cart:Cart = {id:product.id,quantity:1,updated:new Date().toLocaleTimeString()};
   console.log("Adding The Cart",cart);
   this.store.dispatch(CartSave({cart}));
   this.AllProducts.add(product.id);
  }
  return true;
 }





}
