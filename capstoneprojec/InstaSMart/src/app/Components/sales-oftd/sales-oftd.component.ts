import { sales } from './../../Entities/sales';
import { SalesLoading } from './../../ReduxModules/SalesRedux/sales.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit,AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-sales-oftd',
  templateUrl: './sales-oftd.component.html',
  styleUrls: ['./sales-oftd.component.css']
})
export class SalesOFTDComponent implements OnInit,AfterViewChecked {

  sales!:sales[];
  constructor(private store:Store<any>) { }
  ngAfterViewChecked(): void {
    console.warn("Sales After view Checked",this.sales);
  }

  ngOnInit(): void {
    this.store.dispatch(SalesLoading());
    let subscribe = this.store.subscribe(
      {
        next:(response)=>{console.log("Response From sales store:",response);this.sales = response.sales.sales; console.log("All Sales Are:",this.sales);}
      }
    )
    //subscribe.unsubscribe();
    console.log("All Sales Are:",this.sales);
  }

}

