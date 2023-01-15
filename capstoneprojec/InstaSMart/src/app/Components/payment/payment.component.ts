import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.service';
import { PurchaseService } from 'src/app/Services/Purchase.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  name:string = "";
  Id:string = "XXX";
  contact:string = "";
  amount:string | null = "";
  address:string = "";

  card!:number;
  Bname!:string;
  Cname!:string;
  cvv!:string;

  LoadPayment!:boolean;
  DoPayment!:boolean;

  constructor(private Pservice:PurchaseService,private store:Store<any> ,private Lservice:LoginService,private active:ActivatedRoute,private snack:MatSnackBar,private router:Router) { }

  getCardDetails(){
    this.Lservice.currentUser.card;
  }

  ngOnInit(): void {
    this.name = this.Lservice.getName();
    this.Id = this.Lservice.getId().toString();
    this.contact = this.Lservice.currentUser.contact;
    this.amount = this.active.snapshot.paramMap.get("price");
    this.address = this.Lservice.currentUser.address;

    this.card = this.Lservice.currentUser.card[0].id;
    this.Bname = this.Lservice.currentUser.card[0].name.split(":")[1];
    this.Cname = this.Lservice.currentUser.card[0].name.split(":")[0];
    this.cvv = this.Lservice.currentUser.card[0].cvv;

    this.LoadPayment = true;
    setTimeout(()=>{this.LoadPayment = false;},3000);
  }

  doPayment(){
    this.DoPayment = true;
    this.Pservice.loadFromCart();
    setTimeout(()=>{
      this.DoPayment = false;
      this.Pservice.addToPurchase();
      this.snack.open(`Payment Success ${this.amount}/- Paid Successfully Go To Purcheses`,"Ok").afterDismissed().subscribe(
        {
          next:(response)=>{
            this.router.navigate(['/showcart/purchases']);
          }
        }
      )
    },7000);
  }
}
