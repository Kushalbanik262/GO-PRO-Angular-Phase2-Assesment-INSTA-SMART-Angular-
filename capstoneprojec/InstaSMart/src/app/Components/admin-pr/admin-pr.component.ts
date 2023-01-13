import { ProductLoad, ProductSave } from './../../ReduxModules/ProductRedux/product.actions';
import { Products, productCat } from './../../Entities/products';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-pr',
  templateUrl: './admin-pr.component.html',
  styleUrls: ['./admin-pr.component.css']
})
export class AdminPRComponent implements OnInit {


  allProductCat:string[] = [
    "Daily",
    "LifeStyle",
    "Medicinal",
    "HouseHold",
    "Toys",
    "Electronics",
    "HomeAppliences"
  ];
  productsArr!:Products[];//All The Products We Want to Edit
  item!:Products; //For Loading The Current Selected Product For Updation
  frm = new FormGroup({ //The FormControl
     id:new FormControl('',[Validators.required]),
     name:new FormControl('',[Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i),Validators.maxLength(50),Validators.minLength(2)]),
     category:new FormControl('',[Validators.required]),
     details:new FormControl('',[Validators.required,Validators.maxLength(50)]),
     price:new FormControl('',[Validators.required,Validators.min(1),Validators.max(100000)]),
     image:new FormControl('',[]),
     feedback:new FormControl('',[Validators.maxLength(50)])
  })
  isEdit:boolean = false;
  constructor(private store:Store<any>) { this.item = {id:-1,category:productCat.Daily,details:"",feedback:"",image:[],name:"",price:-1
  ,ratings:0.0,reviews:[]
}}

  ngOnInit(): void {
    this.store.dispatch(ProductLoad());
    let subscription = this.store.subscribe(
      {
        next:(response)=>{
          this.productsArr = response.products.products;
          //if(this.productsArr.length > 0){subscription.unsubscribe();}
        }
      }
    )
  }

  getCategory(data:productCat){
    return productCat[data];
  }

  getAllDetails(){
    console.log("The Form Data is:",this.frm);
    let id = this.frm.get("id")!.value;
    let cname = this.frm.get("name")!.value;
    let category = this.frm.get("category")!.value;
    let price = this.frm.get("price")!.value;
    let details = this.frm.get("details")!.value;
    let feedback = this.frm.get("feedback")!.value;
    let image = this.frm.get("image")!.value;
    return {id,cname,category,price,details,feedback,image};
  }

  submitData(){

    if(this.isEdit){ //FOr Updation Part
      //this.store.dispatch()
    }
    else{
      let allDetails = this.getAllDetails();
      let product:Products = this.item;

      //Setting All The Values Of Product
      product.id = (allDetails.id === null ? -1 : parseInt(allDetails.id));
      product.name = (allDetails.cname === null ? "" : allDetails.cname);
      product.category = (allDetails.category === null ? productCat.Daily : this.allProductCat.indexOf(allDetails.category));
      product.details = (allDetails.details === null ? "" : allDetails.details);
      product.feedback = (allDetails.feedback === null ? "" : allDetails.feedback);
      product.image = [(allDetails.image === null ? "" : allDetails.image)];
      product.price = (allDetails.price === null ? -1 : parseInt(allDetails.price));
      product.ratings = 3.5;
      product.reviews = [];

      this.store.dispatch(ProductSave({product}));
      let subscription =  this.store.subscribe(
        {
          next:(response)=>{console.log("The Response Coming From Product Saving",response);subscription.unsubscribe();}
        }
      )
    }
  }

  editItem(product:Products){
    this.item = product;
    console.info(`The Item To be edited : ${product}`);
    this.isEdit = true;
    this.frm.setValue({
      id:product.id.toString(),
      name:product.name,
      details:product.details,
      category:productCat[product.category],
      feedback:product.feedback,
      image:product.image[0],
      price:product.price.toString()
    });
    console.log(this.frm.valid);
  }

isValid(){
  return this.frm.valid;
}


idValidity(){
  return this.frm.get("id")?.valid;
}

nameValidity(){
  return this.frm.get("name")?.valid;
}

categoryValidity(){
  return this.frm.get("category")?.valid;
}

feedbackValidity(){
  return this.frm.get("feedback")?.valid;
}

detailsValidity(){
  return this.frm.get("details")?.valid;
}

priceValidity(){
  return this.frm.get("price")?.valid;
}


}
