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

  sales!:sales[]; //All The Sales Needed to be rendered
  /**
   * @param store The Ngrx Store For Redux Operations
   */
  constructor(private store:Store<any>) { }
  ngAfterViewChecked(): void {
    // console.warn("Sales After view Checked",this.sales);
  }

  ngOnInit(): void {
    this.store.dispatch(SalesLoading()); //Dispatching the store for loading all the sales
    let subscribe = this.store.subscribe(//Subscribing to The method
      {
        next:(response)=>{console.log("Response From sales store:",response);this.sales = response.sales.sales; console.log("All Sales Are:",this.sales);}
      } //Assigning The Response Directly to the sales
    )
    //subscribe.unsubscribe();
    console.log("All Sales Are:",this.sales);
  }

}

