import { StoreModule } from '@ngrx/store';
import { Purchases } from './../Entities/Purchases';
import { PurchaseService } from 'src/app/Services/Purchase.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { productCat } from '../Entities/products';




describe('Purchase Service', () => {
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

  service=TestBed.get(PurchaseService);
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController);


   Purchases = {
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

  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Fetching All The Users Successful or not
   */

  it("Creating Purchases",()=>{
    let response:Purchases;
    service.carts = [
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


    service.products = Purchases.products;
    service.addToPurchase();

    expect(service.purchases).toEqual(Purchases);

  });



})
