import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductState } from './../../ReduxModules/ProductRedux/product.reducer';
import { ProductLoad, ProductSave, ProductUpdate, ProductLoadingSuccess, ProductDelete } from './../../ReduxModules/ProductRedux/product.actions';
import { Products, productCat } from './../../Entities/products';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-pr',
  templateUrl: './admin-pr.component.html',
  styleUrls: ['./admin-pr.component.css']
})
/**
 * This is Admin Specific Component
 */
export class AdminPRComponent implements OnInit {

  loader:boolean = false; //This is a simple Loader
  allProductCat:string[] = [ //All The Product Categories
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
  frm = new FormGroup({ //The FormControl which is directly mapped to the main user form
     id:new FormControl('',[Validators.required]), //Product Id
     name:new FormControl('',[Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i),Validators.maxLength(50),Validators.minLength(2)]),//Product Name with usual Validators
     category:new FormControl('',[Validators.required]),//The Product Categories
     details:new FormControl('',[Validators.required,Validators.maxLength(100)]),//The Product Details
     price:new FormControl('',[Validators.required,Validators.min(1),Validators.max(100000)]),//The Product Price
     image:new FormControl('',[]),//The Image of The Product
     feedback:new FormControl('',[Validators.maxLength(100)])//The Feedback for the product
  })

  isEdit:boolean = false; //Is Admin Wants to Edit



  /**
   *
   * @param store ngrx Store for Redux Operations
   * @param snack SnackBar For Creating The PopUp
   */
  constructor(private store:Store<any>,private snack:MatSnackBar) { this.item = {id:-1,category:productCat.Daily,details:"",feedback:"",image:[],name:"",price:-1
  ,ratings:0.0,reviews:[] //Injecting Store and initializing the item
}}

  ngOnInit(): void { //At the time of Initialization
    this.loader = true; //making the loader true for one sec to load all the required things
    setInterval(()=>{this.loader = false;},1000);
    this.store.select(ProductLoadingSuccess).subscribe(//Subscribing to the selection of ProductLoading Success Store
      (response:any)=>{console.log(response.products.products);this.productsArr = response.products.products;}) //Directly Assigning to current Product Array
  }

  /**
   *
   * @param data Getting The Type
   * @returns Returning The String Product Type
   */
  getCategory(data:productCat){ //Getting  the current Product category
    return productCat[data];
  }


  /**
   *
   * @returns Returning The Details Coming From The Form
   */
  getAllDetails(){ //Getting All the form Details
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

  submitData(){ //When The Update/Add button is clicked
    this.loader = true;
    setInterval(()=>{this.loader = false;},1000); //Again Making The Loader true for one second
    let allDetails = this.getAllDetails(); //Getting all the product details from given by user
    let product:Products = {id:-1,category:productCat.Daily,details:"",feedback:"",image:[],name:"",price:-1,ratings:0,reviews:[]};
    product.id = this.item.id; //setting the Id
    product.ratings = this.item.ratings; //setting the Ratings
    product.reviews = this.item.reviews; //setting the Reviews

    if(this.isEdit){ //For Updation Part Only Valid Changes are there
      //this.frm.get("id")?.disable();
      /**
       * The Part Is For Updation only
       */
      console.log("The Product TO be Edited",product);
      product.name = (allDetails.cname === null ? "" : allDetails.cname);
      product.category = (allDetails.category === null ? productCat.Daily : this.allProductCat.indexOf(allDetails.category));
      product.details = (allDetails.details === null ? "" : allDetails.details);
      product.feedback = (allDetails.feedback === null ? "" : allDetails.feedback);
      product.image = [(allDetails.image === null ? "" : allDetails.image)];
      product.price = (allDetails.price === null ? -1 : parseInt(allDetails.price));

      this.store.dispatch(ProductUpdate({product})); //Dispatching the Updation
      this.snack.open(`Updated ${product.name} Successfully`,"OK");
    }
    else{
      /**
       * This part is For Product Creation Only
       */

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

      this.store.dispatch(ProductSave({product})); //Now dispathing for product Creation
      this.snack.open(`Added ${product.name} Successfully`,"OK"); //The Product is Added Successfully
    }
  }

  //When The Item is Ediatble then setting the from values with default product vales
  /**
   * @param product The Product Item Which is needed to be entered
   */
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

  /**
   * @returns Is this Form is Valid Or not
   */
isValid(){ //Is the form valid or not
  return this.frm.valid;
}


/**
 * @returns Returns form Validity
 */
idValidity(){ //Is the Id valid or not
  return this.frm.get("id")?.valid;
}

/**
 * @returns Returns Name Validity
 */
nameValidity(){ //Is he name valid or not
  return this.frm.get("name")?.valid;
}

/**
 * @returns Returns Category Validity
 */
categoryValidity(){ //is The category valid or not
  return this.frm.get("category")?.valid;
}


/**
 * @returns Returns Feedback Validity
 */
feedbackValidity(){ //Is the feedback valid or not
  return this.frm.get("feedback")?.valid;
}



/**
 * @returns Returns Details Validity
 */
detailsValidity(){ //Is the details Valid or not
  return this.frm.get("details")?.valid;
}


/**
 * @returns Returns Price Validity
 */
priceValidity(){//Is the Price Valid or not
  return this.frm.get("price")?.valid;
}


/**
 *
 * @param item Product Item Which is Needed To be deleted
 */
deleteItem(item:Products){ //Deleting the Item
  console.warn("Item Need To be deleted",item.name);
  this.store.dispatch(ProductDelete({pid:item.id})); //Dispatching the service for deletion
  this.snack.open(`Product ${item.name} Deleted Successfully`,"OK");
}


}
