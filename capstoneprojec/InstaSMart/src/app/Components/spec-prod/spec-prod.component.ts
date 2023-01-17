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
  //////// Specific Cart Related Variables //////
  id!:number;
  current!:Products;
  cartCount:number = 0; //Number Of Products in The Cart
  ///////////////////////////////////////////////////

  /**
   *
   * @param activate ActivatedRoute For Getting the PathVariable
   * @param store Ngrx Store For Redux Operations
   * @param Lservice Login Service for Login Related Datas
   * @param Cservice Cart Service For Cart Operations
   */
  constructor(private activate:ActivatedRoute,private store:Store<any>,private Lservice:LoginService,private Cservice:CartService) { }

  /**
   * Adding the Current Product To The Cart
   */
  addProduct(){
    this.cartCount = this.Cservice.allCarts.length;
    this.Cservice.addCurrentCart(this.current);
  }


 /**
  *
  * @returns The current User priviledge
  */
  getPriviledge(){
    return this.Lservice.getPriviledge();
  }

  /**
   *
   * @returns Is The Current user Admin Or not
   */
  isAdmin(){
    return this.getPriviledge() == "ADMIN";
  }

/**
 *
 * @returns Is Anyone LoggedIn or not
 */
  isLoggedIn(){
    return this.Lservice.isLoggedIn;
  }


 /**
  *
  * @returns The Current Category in String Format
  */
  getCategory(){
    return productCat[this.current?.category];
  }


  /**
   * During Initialization
   */
  ngOnInit(): void {
    let param = this.activate.snapshot.paramMap.get("id"); //Getting The Product Id For Displaying The Specific Product
    this.id = parseInt(param==null ? "0" : param);
    this.store.dispatch(ProductLoad());//Loading All The Products Through Redux
    let sub:Subscription = this.store.subscribe(
      {
        next:(response)=>{
          console.log("Response Is coming From Specific Product Page",response);
          response.products.products.forEach((product:any)=>{
            if(product.id == this.id){ //Tapping The Response
              this.current = product; //Assigning The Currrent Product
              sub.unsubscribe(); //Unsubscribing The Response
            }
          });
        }
      }
    )
  }

}
