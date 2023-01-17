import { UserPriviledges } from './../../Entities/users';
import { Router } from '@angular/router';
import { CartLoading, CartLoadingSuccessful } from './../../ReduxModules/CartRedux/cart.actions';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/Services/Login.service';
import { Component,OnInit,OnChanges } from '@angular/core';
import { CartService } from 'src/app/Services/Cart.service';

@Component({
  selector: 'app-helper-nav',
  templateUrl: './helper-nav.component.html',
  styleUrls: ['./helper-nav.component.css']
})
/**
 * This is Helper Navigation Component
 */
export class HelperNavComponent implements OnInit,OnChanges {
  cartCount:number = 0; //Number of Products in cart
  star:number = 4.5; //Dummy User Rating
  searchOption:string = ""; //Searching Options
  searchKey:string = "";//The Key Of searching using the both Way Binding

  /**
   *
   * @param router for the routing operations
   * @param Lservice this is Login service for Login Related Informations
   * @param Cservice this is Cart Service for cart related Operations and Informations
   * @param store this is redux store
   */
  constructor(private router:Router,private Lservice:LoginService,private Cservice:CartService,private store:Store<any>){}
  ngOnInit(): void {
    this.store.select(CartLoadingSuccessful).subscribe(//Subscribing to the cart for getting any changes realtime
      {
        next:((response:any)=>{this.cartCount = response.carts.carts.length;})
      }
    )
  }
  ngOnChanges(){ //Change Detection purpose [Not Used]

  }
  isLoggedin(){ //Checking If the user logged in or not
    return this.Lservice.IsLoggedIn();
  }

  routeCart(){//To Route to the carts endpoint
    this.router.navigate(['showcart']);
  }

  isAdmin(){ //checking if its admin or not
    return this.Lservice.getPriviledge() == UserPriviledges.ADMIN;
  }
}
