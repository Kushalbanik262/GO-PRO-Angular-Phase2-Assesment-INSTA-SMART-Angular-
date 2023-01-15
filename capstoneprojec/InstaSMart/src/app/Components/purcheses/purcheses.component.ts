import { Purchases } from './../../Entities/Purchases';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/Services/Purchase.service';

@Component({
  selector: 'app-purcheses',
  templateUrl: './purcheses.component.html',
  styleUrls: ['./purcheses.component.css']
})
export class PurchesesComponent implements OnInit {

  constructor(private Pservice:PurchaseService) { }

  getAllPurchases():Purchases{
    console.log("All The Purchases",this.Pservice.purchases);
    return this.Pservice.purchases;
  }

  ngOnInit(): void {
  }

}
