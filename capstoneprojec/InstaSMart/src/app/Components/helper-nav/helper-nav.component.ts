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
export class HelperNavComponent implements OnInit,OnChanges {
  cartCount:number = 0; //Number of Products in cart
  star:number = 4.5; //Dummy User Rating
  searchOption:string = ""; //Searching Options
  searchKey:string = "";//The Key Of searching using the both Way Binding

  constructor(private router:Router,private Lservice:LoginService,private Cservice:CartService,private store:Store<any>){}
  ngOnInit(): void {
    this.store.select(CartLoadingSuccessful).subscribe(
      {
        next:((response:any)=>{this.cartCount = response.carts.carts.length;})
      }
    )
  }
  ngOnChanges(){

  }
  isLoggedin(){ //Checking If the user logged in or not
    return this.Lservice.isLoggedIn;
  }

  routeCart(){
    this.router.navigate(['showcart']);
  }
}
