import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartDeletion, CartLoading, CartLoadingSuccessful, CartUpdation } from './../../ReduxModules/CartRedux/cart.actions';
import { tap, Subscription } from 'rxjs';
import { ProductLoadingSuccess } from './../../ReduxModules/ProductRedux/product.actions';
import { Store } from '@ngrx/store';
import { Products } from './../../Entities/products';
import { Cart } from 'src/app/Entities/cart';
import { CartService } from './../../Services/Cart.service';
import { Component, OnInit } from '@angular/core';

export interface ProductMap{
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

  ///////////////// Cart Variables /////////
  allCarts:Cart[] = []; //All The Carts
  products!:Products[]; //All The Availabe Products
  name:string = "";//The Current user
  productMap:ProductMap[] = new Array(); //Mapping Of Product to the Cart
  loader:boolean = false; //Simple Cart loader
  total:number = 0; //Total Number of Items in The cart
  subscribe!:Subscription; //The Subscription
  /////////////////////////////////

  /**
   * @param Cservice The Cart Service used for cart related Operations
   * @param store The Ngrx Store Used For Redux Operation
   * @param router The Router Used For Routing Operation
   * @param snack MatSnackBar For popup Creation
   */
  constructor(private Cservice:CartService,private store:Store<any>,private router:Router,private snack:MatSnackBar) { }

  //For Checkout all The Products available in cart
  checkout(){
    this.router.navigate(['showcart/paymentWay/payment',(this.sumTotalInc())]); //Going To payment Page
  }


  //Getting The Product By The Id
  /**
   *
   * @param id The Product Id
   * @returns The Product With the given Id
   */
  getProductById(id:number):Products[]{
    return this.products.filter(x=>x.id === id);
  }


  //Get Cart By the Id
  /**
   *
   * @param id The Cart Id
   * @returns The Cart Which has the Id
   */
  getCartByPId(id:number):Cart[]{
    return this.allCarts.filter(p=>p.id == id);
  }

  /**
   * Method To Subscribe to The cart
   */
  subscribeToCart(){
    this.subscribe = this.store.select(CartLoadingSuccessful).subscribe( //Subscribing If The CartLoading is successful
      {
        next:((response:any)=>{
          this.total = 0;
          console.log("Loading Cart:",response.carts.carts);
          this.allCarts = response.carts.carts; //Assigning Values to the current cart from the response
          this.productMap.splice(0,this.productMap.length);//making the productMap Empty

          this.allCarts.forEach(data=>{ //Iterating Through Individual Carts
          let current:ProductMap = { //Making the Product to cart mapping Object
          product:this.getProductById(data.id)[0],
          quantity:data.quantity,
          updated:data.updated
         };
          this.total += (data.quantity * this.getProductById(data?.id)[0]?.price); //Calculating The total Price
          this.productMap.push(current);
        });
        setTimeout(()=>{this.loader = true},1000); //Loading The Screen FOr 1 sec Each Time When The Data Gets Updated
        })
      }
    )
  }

  /**
   * To Check Cart Empty Of not
   * @returns If There Is Anything in Th cart
   */
  hasCart(){
    return this.allCarts.length > 0;
  }


  /**
   * Initial Hook
   */
  ngOnInit(): void {
    this.subscribe = this.store.select(ProductLoadingSuccess).subscribe( //Getting All The Available Products from Redux Response
      {
        next:((response:any)=>{
          this.products = response.products.products;
        })
      }
    );
    this.subscribe.unsubscribe(); //Unsbscribing also after fetching
    this.subscribeToCart();//Then Subscribing to The cart to reflect Live Changes
  }

  /**
   * Removing The Specific Item From The cart
   * @param item ProductMap of Product and Cart Mapping
   */
  remove(item:ProductMap){
    console.warn("Removing:",item.product);
    let cid = item.product.id;
    // this.subscribe.unsubscribe();
    this.store.dispatch(CartDeletion({cartId:cid}));

  }

  /**
   * To Increment The Product Count
   * @param productMap The Product cart Mapping Which needs to be Incremented
   * @returns The Cart After Increment
   */
  increase(productMap:ProductMap){
    this.loader = false;
    let cart = {...this.getCartByPId(productMap.product?.id)[0]}; //Getting The Cart
    cart.quantity = cart.quantity + 1; //Increasing
    this.store.dispatch(CartUpdation({cart}));//Updating
    return cart;
  }

  /**
   *
   * @param productMap The Product cart Mapping Which needs to be Deacreased
   * @returns the updated Cart
   */
  decrease(productMap:ProductMap){
    this.loader = false;
    let cart = {...this.getCartByPId(productMap.product?.id)[0]}; //Getting The Cart
    if(cart.quantity == 1){
      this.snack.open(`This Item ${productMap.product.name} Will be Removed From Your Cart`,"OK").afterDismissed().subscribe(
        {
          next:(resp)=>{ this.store.dispatch(CartDeletion({cartId:cart.id}));}
        }
      )
      return cart;
    }
    cart.quantity = cart.quantity -1;
    this.store.dispatch(CartUpdation({cart}));//Dispatching The Updation Through Redux NGRX
    return cart;
  }



  /**
   * To Calculate the total price for any perticular product
   * @param data The ProductMap Product Cart Mapping
   * @returns the Total Price for a product in the cart
   */
  getTotal(data:ProductMap){
    return data.quantity * data.product.price;
  }

  /**
   *
   * @returns the calculated GST over the total price
   */
  calculateGst(){
    // console.log("GST",this.total,(this.total * 18 /100));
    return(this.total * 18 /100) ;
  }

  /**
   *
   * @returns The total price for all the products in cart
   */
  sumTotalInc(){
   let sum =  this.total + this.calculateGst() + 40;
   return sum <= 40 ? 0 : sum; //We can't take only delivery charge if cart is Empty
  }

}
