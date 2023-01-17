import { StoreModule } from '@ngrx/store';
import { Purchases } from './../Entities/Purchases';
import { PurchaseService } from 'src/app/Services/Purchase.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { productCat } from '../Entities/products';

/**
 * Spec For testing the purchase service
 */


describe('Purchase Service', () => {
  /**
   * Using The service,injector,httpmock and purchases for purchase service
   */
  let service:PurchaseService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let Purchases:Purchases;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      providers: [PurchaseService]

    }).compileComponents();

  service=TestBed.get(PurchaseService); //creating the service
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController);


   Purchases = { //Creating a demo purchase with three products
    products:[
      {
        id:12,
        name:"Onion",
        category:productCat.Daily,
        details:"Our Onions Comes Direct From the farmer with freashness",
        price:110,
        ratings:3.7,
        feedback:"Good in Nature and Fresh!",
        image:[],
        reviews:[]
      },
      {
        id:13,
        name:"Dolby Atmos Head Phone",
        category:productCat.Electronics,
        details:"This is The Headphone from SOat Company, with dolby Tech",
        price:2678,
        feedback:"Comes With crystal Clear sound and noise cancelation",
        image:[],
        ratings:4.5,
        reviews:[]
      },
      {
        id:20,
        category:productCat.LifeStyle,
        details:"This Is Fresh Moisturizer perfect for the winter",
        feedback:"This is our one of the best selling product",
        name:"Nivea Moisturizing Cream",
        image:[],
        price:180,
        ratings:3,
        reviews:[]
      }
    ],
    updated:new Date().toLocaleTimeString()
   }

  });

  /**
   * After each Must Be called with verify method for closing previous http connection
   */
  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });

  /**
   * Expecting The Service should be created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Fetching All The Users Successful or not
   */

  it("Creating Purchases",()=>{
    let response:Purchases;
    service.carts = [ //Adding to the carts
      {
        id:12,
        quantity:1,
        updated:new Date().toLocaleTimeString()
      },
      {
        id:13,
        quantity:2,
        updated:new Date().toLocaleTimeString()
      },
      {
        id:20,
        quantity:2,
        updated:new Date().toLocaleTimeString()
      }
    ];


    service.products = Purchases.products; //Adding the products
    service.addToPurchase(); //calling the function to add purchase

    expect(service.purchases).toEqual(Purchases); //Expecting The Purchase to be Purchases

  });



})
