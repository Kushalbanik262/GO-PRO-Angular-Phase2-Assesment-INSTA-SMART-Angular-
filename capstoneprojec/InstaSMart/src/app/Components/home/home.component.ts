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

  ////// Login Related Parameters ////////
  star:number = 4.5; //Dummy User Rating
  cartCount:number = 0; //Number of Products in cart
  searchText!:string; //placeholder for search text
  productsArr!:Products[];
  fProductArr:Products[] = []; //FOr filtered Products
  searchOption:string = ""; //Searching Options
  searchKey:string = "";//The Key Of searching using the both Way Binding
  loaded:boolean = false; //Loader state
  subscribe!:Subscription;


/**
 *
 * @param router for Routing Feature
 * @param Lservice The Login service information
 * @param Pservice The Product Service Part
 * @param store The Store o f Redux
 * @param snack Material UI Snackbar
 * @param Cservice The cart Service
 */

  constructor(
    private router:Router,
    private Lservice:LoginService,
    private Pservice:ProductService,
    private store:Store<any>,
    private snack:MatSnackBar,
    private Cservice:CartService,
    ){}

  ngOnDestroy(): void { //Unsubscribing when the component is destroyes
    console.warn("Unsubscribing From Home");
    this.subscribe.unsubscribe();
  }

  /**
   *
   * @returns Current Active UserId
   */
  getLoginId(){ //For Getting The LogedIn Customer Id
    return this.Lservice.currentUser.id;
  }

  /**
   *
   * @returns The Current Active User Previledge
   */
  getPriviledge(){//Getting The Current Logged in user Priviledge
    return this.Lservice.getPriviledge();
  }


  /**
   *
   * @returns The User IS Admin Or not
   */
  isAdmin(){//Is the User Admin or not
    return this.getPriviledge() == "ADMIN";
  }

  /**
   *
   * @returns is The User is Logged in or not
   */
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
        switch(this.searchOption){ //If Those Search keywords Are included or not
          case "name":
              if(response.name.includes(this.searchKey)){this.fProductArr.push(response);} //By Name
              break;
          case "category":
              if(productCat[response.category].includes(this.searchKey)){this.fProductArr.push(response);}//By category
              break;
          case "price":
              if(response.price < parseInt(this.searchKey)){this.fProductArr.push(response);}// By Price
              break;
          default:
              this.fProductArr = this.productsArr;
        }
      }
    )
    if(this.fProductArr.length == 0){
      this.snack.open("Sorry No Item Matched You Searched","OK"); //No Items are matched
    }
  }

  /**
   *
   * @param data the product category
   * @returns the product category String
   */
  getCategory(data:productCat){ //Getting the product dategory
    return productCat[data];
  }
  ngOnInit(): void {
    this.searchText = `Search Your way ${this.Lservice.getName()}!`;
    this.store.dispatch(ProductLoad()); //Dispatching the loading product
    this.subscribe = this.store.subscribe((response)=>{ // And Subscribing it
      console.log("Response Coming From DIspatch Store Home Products:",response);
      this.productsArr = response.products.products; //Storing int the ProductArray
      this.fProductArr = response.products.products; //Storing in the filtered product array currently
      if(this.productsArr.length > 0){this.loaded = true;}
    });
    this.cartCount = this.Cservice.allCarts.length; //Total Number Of Items in the Cart
  }

  routeCart(){ //FOr Routing to the ShowCart Function
    this.router.navigate(['showcart']);
  }

  /**
   *
   * @param item type product to add it to the cart
   */
  addToCart(item:Products){//Adding to the cart
    console.log("Trying To Add to Cart",item);
    this.Cservice.addCurrentCart(item);
    this.cartCount = this.Cservice.allCarts.length;
  }

/**
 *
 * @param item To Explore more about the Specific Product
 */
  explore(item:Products){//Exploring information about a specific product
      this.router.navigate(['product_details',item.id]); //Going to the specific product Page
  }

  /**
   *
   * @param product TO Delete The Specific Product
   */
  delete(product:Products){//Deleting a specific Product For admin usage only
    let pid = product.id;
    this.store.dispatch(ProductDelete({pid}));//Dispatching the Delete Product Feature
    this.store.subscribe( //Deletion response
      {
        next:(response)=>{console.warn("Deleting The Product ",response);}
      }
    )
  }


}
