import { CartLoading } from './../../ReduxModules/CartRedux/cart.actions';
import { CartService } from './../../Services/Cart.service';
import { UserPriviledges } from './../../Entities/users';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductState } from './../../ReduxModules/ProductRedux/product.reducer';
import { ProductDelete, ProductLoad } from './../../ReduxModules/ProductRedux/product.actions';
import { Store } from '@ngrx/store';
import { productCat, Products } from './../../Entities/products';
import { ProductService } from './../../Services/Products.service';
import { LoginService } from './../../Services/Login.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/Entities/cart';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  star:number = 4.5; //Dummy User Rating
  cartCount:number = 0; //Number of Products in cart
  searchText!:string; //placeholder for search text
  productsArr!:Products[];
  fProductArr:Products[] = []; //FOr filtered Products
  searchOption:string = ""; //Searching Options
  searchKey:string = "";//The Key Of searching using the both Way Binding
  loaded:boolean = false; //Loader state
  subscribe!:Subscription;


  constructor(
    private router:Router,
    private Lservice:LoginService,
    private Pservice:ProductService,
    private store:Store<any>,
    private snack:MatSnackBar,
    private Cservice:CartService,
    ){}

  ngOnDestroy(): void {
    console.warn("Unsubscribing From Home");
    this.subscribe.unsubscribe();
  }

  getLoginId(){
    return this.Lservice.currentUser.id;
  }

  getPriviledge(){
    return this.Lservice.getPriviledge();
  }

  isAdmin(){
    return this.getPriviledge() == "ADMIN";
  }

  isLoggedin(){ //Checking If the user logged in or not
    return this.Lservice.isLoggedIn;
  }

  search(){ //Search Function
    this.loaded = false;
    setInterval(()=>{
      this.loaded = true
    },1000);
    console.log(this.searchOption,this.searchKey);
    this.fProductArr = [];
    this.productsArr.forEach(
      (response:Products)=>{
        console.log(response,response.name.includes(this.searchKey));
        switch(this.searchOption){
          case "name":
              if(response.name.includes(this.searchKey)){this.fProductArr.push(response);}
              break;
          case "category":
              if(productCat[response.category].includes(this.searchKey)){this.fProductArr.push(response);}
              break;
          case "price":
              if(response.price < parseInt(this.searchKey)){this.fProductArr.push(response);}
              break;
          default:
              this.fProductArr = this.productsArr;
        }
      }
    )
    if(this.fProductArr.length == 0){
      this.snack.open("Sorry No Item Matched You Searched","OK");
    }
  }

  getCategory(data:productCat){ //Getting the product dategory
    return productCat[data];
  }
  ngOnInit(): void {

    // if(this.Lservice.isLoggedIn){
    //   this.Cservice.setCurrentCart(this.Lservice.getId());
    // }

    this.searchText = `Search Your way ${this.Lservice.getName()}!`;
    this.store.dispatch(ProductLoad()); //Loading The product On Init
    this.subscribe = this.store.subscribe((response)=>{ // And Subscribing it
      console.log("Response Coming From DIspatch Store Home Products:",response);
      this.productsArr = response.products.products;
      this.fProductArr = response.products.products;
      if(this.productsArr.length > 0){this.loaded = true;}
    });
    this.cartCount = this.Cservice.allCarts.length;
  }

  routeCart(){
    this.router.navigate(['showcart']);
  }

  addToCart(item:Products){
    console.log("Trying To Add to Cart",item);
    this.Cservice.addCurrentCart(item);
    this.cartCount = this.Cservice.allCarts.length;
  }


  explore(item:Products){
      this.router.navigate(['product_details',item.id]); //Going to the specific product Page
  }

  delete(product:Products){
    let pid = product.id;
    this.store.dispatch(ProductDelete({pid}));
    this.store.subscribe(
      {
        next:(response)=>{console.warn("Deleting The Product ",response);}
      }
    )
  }


}
