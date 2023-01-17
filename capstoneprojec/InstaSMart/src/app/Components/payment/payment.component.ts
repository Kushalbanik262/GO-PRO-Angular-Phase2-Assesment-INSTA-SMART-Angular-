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

  ////////////    Personal Information Related Things  //////////////
  name:string = "";
  Id:string = "XXX";
  contact:string = "";
  amount:string | null = "";
  address:string = "";
  /////////////////////////////////

  ////////////////     card Information Related Things   //////////////////
  card!:number;
  Bname!:string;
  Cname!:string;
  cvv!:string;
  /////////////////////////////////


  ///////////////////  Payment Loaders  ///////////////////
  LoadPayment!:boolean;
  DoPayment:boolean = false;
  /////////////////////////////////////



  /**
   *
   * @param Pservice Purchase Service For Determining The purchases Done
   * @param store Ngrx Store for Redux Operations
   * @param Lservice Login Service to Get All The Login Details
   * @param active Activated Route to get URL path Parameters
   * @param snack Material SnackBar for popup creation
   * @param router Router Object For Routing functionalities
   */
  constructor(private Pservice:PurchaseService,private store:Store<any> ,private Lservice:LoginService,private active:ActivatedRoute,private snack:MatSnackBar,private router:Router) { }

  getCardDetails(){//All The Bank card Details
    this.Lservice.currentUser.card;
  }

  ngOnInit(): void {
    /**
     * Getting All The User Datas From The Login Service About The Current User
     */
    this.name = this.Lservice.getName();
    this.Id = this.Lservice.getId().toString();
    this.contact = this.Lservice.getCurrent().contact;
    this.amount = this.active.snapshot.paramMap.get("price");
    this.address = this.Lservice.getCurrent().address;

    this.card = this.Lservice.getCurrent().card[0].id;
    this.Bname = this.Lservice.getCurrent().card[0].name.split(":")[1];
    this.Cname = this.Lservice.getCurrent().card[0].name.split(":")[0];
    this.cvv = this.Lservice.getCurrent().card[0].cvv;

    this.LoadPayment = true;
    setTimeout(()=>{this.LoadPayment = false;},3000); //Loading Payment True For three seconds during fetching user Data
  }

  /**
   * For Doing The Payment
   */
  doPayment(){//For Doing The Payment
    this.DoPayment = true;
    this.Pservice.loadFromCart(); //Loading All The Items From The Current User cart
    setTimeout(()=>{
      this.DoPayment = false;
      this.Pservice.addToPurchase();
      /**
       * Waiting For 7 seconds for payment operation and Then navigating to the purchase Items
       */
      this.snack.open(`Payment Success ${this.amount}/- Paid Successfully Go To Purcheses`,"Ok").afterDismissed().subscribe(
        {
          next:(response)=>{ //When The Confirmation Is Given By The Popup then Navigating to the purchases page
            this.router.navigate(['/showcart/purchases']);
          }
        }
      )
    },7000);
  }
}
