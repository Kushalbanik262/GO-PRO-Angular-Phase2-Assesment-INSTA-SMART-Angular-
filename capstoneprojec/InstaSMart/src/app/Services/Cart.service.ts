import { LoginService } from 'src/app/Services/Login.service';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { Cart } from './../Entities/cart';
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
 currentCart!:Cart;
  subscribe!:Subscription;
 constructor(private store:Store<any>){
  this.store.dispatch(CartLoading());
  this.subscribe = this.store.subscribe(
    {
      next:((response:any)=>{console.log("Cart Response:",response.carts.carts); this.allCarts = response.carts.carts;})
    }
  )
 }

 setCurrentCart(userId:number){
  this.allCarts.forEach(
    (cart)=>{
      if(cart.id == userId){
        this.currentCart = cart;
        console.log("Current Cart is:",this.currentCart);
      }
    }
  );
 }





}
