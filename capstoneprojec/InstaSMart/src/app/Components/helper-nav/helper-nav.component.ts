import { LoginService } from 'src/app/Services/Login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-helper-nav',
  templateUrl: './helper-nav.component.html',
  styleUrls: ['./helper-nav.component.css']
})
export class HelperNavComponent {
  cartCount:number = 0; //Number of Products in cart
  star:number = 4.5; //Dummy User Rating
  searchOption:string = ""; //Searching Options
  searchKey:string = "";//The Key Of searching using the both Way Binding

  constructor(private Lservice:LoginService){}

  isLoggedin(){ //Checking If the user logged in or not
    return this.Lservice.isLoggedIn;
  }
}
