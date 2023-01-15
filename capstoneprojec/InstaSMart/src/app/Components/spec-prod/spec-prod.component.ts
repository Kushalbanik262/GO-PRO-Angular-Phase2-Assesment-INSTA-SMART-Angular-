import { CartSave } from './../../ReduxModules/CartRedux/cart.actions';
import { CartService } from './../../Services/Cart.service';
import { UserPriviledges } from './../../Entities/users';
import { LoginService } from 'src/app/Services/Login.service';
import { Subscription } from 'rxjs';
import { ProductState } from './../../ReduxModules/ProductRedux/product.reducer';
import { Products, productCat } from './../../Entities/products';
import { ProductLoad } from './../../ReduxModules/ProductRedux/product.actions';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-spec-prod',
  templateUrl: './spec-prod.component.html',
  styleUrls: ['./spec-prod.component.css']
})
export class SpecProdComponent implements OnInit {
  id!:number;
  current!:Products;
  cartCount:number = 0;
  constructor(private activate:ActivatedRoute,private store:Store<any>,private Lservice:LoginService,private Cservice:CartService) { }

  addProduct(){
    this.cartCount = this.Cservice.allCarts.length;
    this.Cservice.addCurrentCart(this.current);
  }



  getPriviledge(){
    return this.Lservice.getPriviledge();
  }

  isAdmin(){
    return this.getPriviledge() == "ADMIN";
  }


  isLoggedIn(){
    return this.Lservice.isLoggedIn;
  }

  getCategory(){
    return productCat[this.current?.category];
  }


  ngOnInit(): void {
    let param = this.activate.snapshot.paramMap.get("id");
    this.id = parseInt(param==null ? "0" : param);
    this.store.dispatch(ProductLoad());
    let sub:Subscription = this.store.subscribe(
      {
        next:(response)=>{
          console.log("Response Is coming From Specific Product Page",response);
          response.products.products.forEach((product:any)=>{
            if(product.id == this.id){
              this.current = product;
              sub.unsubscribe();
            }
          });
        }
      }
    )
  }

}
