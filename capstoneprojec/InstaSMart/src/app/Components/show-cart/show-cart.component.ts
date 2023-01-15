import { Router } from '@angular/router';
import { CartDeletion, CartLoading, CartLoadingSuccessful, CartUpdation } from './../../ReduxModules/CartRedux/cart.actions';
import { tap, Subscription } from 'rxjs';
import { ProductLoadingSuccess } from './../../ReduxModules/ProductRedux/product.actions';
import { Store } from '@ngrx/store';
import { Products } from './../../Entities/products';
import { Cart } from 'src/app/Entities/cart';
import { CartService } from './../../Services/Cart.service';
import { Component, OnInit } from '@angular/core';

interface ProductMap{
  product:Products,
  quantity:number,
  updated:string
}


@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {
  allCarts!:Cart[];
  products!:Products[];
  name:string = "";
  productMap:ProductMap[] = new Array();
  loader:boolean = false;
  total:number = 0;
  subscribe!:Subscription;

  constructor(private Cservice:CartService,private store:Store<any>,private router:Router) { }


  checkout(){
    this.router.navigate(['showcart/paymentWay/payment',(this.total + this.calculateGst() + 40)]); //Going To payment Page
  }



  getProductById(id:number):Products[]{
    return this.products.filter(x=>x.id === id);
  }

  getCartByPId(id:number):Cart[]{
    return this.allCarts.filter(p=>p.id == id);
  }

  subscribeToCart(){
    this.subscribe = this.store.select(CartLoadingSuccessful).subscribe(
      {
        next:((response:any)=>{
          this.total = 0;
          console.log("Loading Cart:",response.carts.carts);
          this.allCarts = response.carts.carts;
          this.productMap.splice(0,this.productMap.length);

          this.allCarts.forEach(data=>{
          let current:ProductMap = {
          product:this.getProductById(data.id)[0],
          quantity:data.quantity,
          updated:data.updated
         };
          this.total += (data.quantity * this.getProductById(data?.id)[0]?.price);
          this.productMap.push(current);
        });
        setTimeout(()=>{this.loader = true},1000);
        })
      }
    )
    // this.allCarts = this.Cservice.allCarts;
    // this.allCarts.forEach(data=>{
    //         let current:ProductMap = {
    //         product:this.getProductById(data.id)[0],
    //         quantity:data.quantity,
    //         updated:data.updated
    //        };
    //        console.log("Cart Changing");
    //         this.total += (data.quantity * this.getProductById(data?.id)[0]?.price);
    //         this.productMap.push(current);
    //       });
    // setTimeout(()=>{this.loader = true},1000);
  }


  ngOnInit(): void {
    this.subscribe = this.store.select(ProductLoadingSuccess).subscribe(
      {
        next:((response:any)=>{
          this.products = response.products.products;
        })
      }
    );
    this.subscribe.unsubscribe();
    this.subscribeToCart();
  }

  remove(item:ProductMap){
    console.warn("Removing:",item.product);
    let cid = item.product.id;
    // this.subscribe.unsubscribe();
    this.store.dispatch(CartDeletion({cartId:cid}));

  }

  increase(productMap:ProductMap){
    this.loader = false;
    let cart = {...this.getCartByPId(productMap.product?.id)[0]}; //Getting The Cart
    cart.quantity = cart.quantity + 1;
    this.store.dispatch(CartUpdation({cart}));
  }

  decrease(productMap:ProductMap){
    this.loader = false;
    let cart = {...this.getCartByPId(productMap.product?.id)[0]}; //Getting The Cart
    cart.quantity = cart.quantity -1;
    this.store.dispatch(CartUpdation({cart}));
  }

  getTotal(data:ProductMap){
    return data.quantity * data.product.price;
  }

  calculateGst(){
    return parseInt((this.total * 18 /100).toPrecision(2)) ;
  }

}
