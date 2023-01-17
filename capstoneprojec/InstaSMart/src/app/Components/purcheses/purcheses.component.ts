import { LoginService } from './../../Services/Login.service';
import { Purchases } from './../../Entities/Purchases';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/Services/Purchase.service';

@Component({
  selector: 'app-purcheses',
  templateUrl: './purcheses.component.html',
  styleUrls: ['./purcheses.component.css']
})
export class PurchesesComponent implements OnInit {

  /**
   *
   * @param Pservice Purchase Service To Get Items which are purchased
   * @param Lservice Login Service To get All The Logged In User Related Information
   */
  constructor(private Pservice:PurchaseService,private Lservice:LoginService) { }

  getName(){ //Getting The Name Of User
    return this.Lservice.currentUser.username;
  }

  getAddress(){//Getting The Address Of The User
    return this.Lservice.currentUser.address;
  }

  getAllPurchases():Purchases{//Getting All The User Purchases
    console.log("All The Purchases",this.Pservice.purchases);
    return this.Pservice.purchases;
  }

  ngOnInit(): void {
  }

  getProductSize(){ //Getting The Products length from purchases
    return this.Pservice.purchases.products.length;
  }

}
