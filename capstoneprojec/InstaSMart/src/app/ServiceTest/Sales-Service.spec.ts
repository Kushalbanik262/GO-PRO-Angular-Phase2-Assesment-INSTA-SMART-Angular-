import { sales } from './../Entities/sales';
import { Cart } from 'src/app/Entities/cart';
import { CartCrudService } from './../Services/CartCrud.service';
import { of } from 'rxjs';
import { productCat, Products } from './../Entities/products';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject,getTestBed } from '@angular/core/testing';
import { SalesService } from '../Services/SalesService';

/**
 * Spec To test Sales Service
 */


describe('Sales Service', () => {

  /**
   * All The Sales,service,injector,httpMock is there
   */
  let service: SalesService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let sales:sales[]

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [SalesService]

    }).compileComponents();

  service=TestBed.get(SalesService); //Generating the SalesService
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController); //Creating the HTTPMock By injecting


   sales =[//Creating some sales
    {
      id:1,
      category:"Winter Sale",
      details:"All Electronics ",
      image:"https://img.paisawapas.com/ovz3vew9pw/2017/07/26205443/AMAZON-DEAL-THUMBNAIL2.jpg",
      name:"Mega Winter Off",
      offer:"20% Off Over Headphones"
    },
    {
      id:2,
      category:"The Grand Gadget Sale",
      details:"All Gadgets",
      image:"https://pbs.twimg.com/media/ETZ7jT2XkAATR1m.jpg",
      name:"Bonanza On New Gadgets",
      offer:"30% CashBack"
    }
   ];

  });

  /**
   * Verify Must be Called After each test to close the http connection for testing
   */
  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });


  /**
   * The Service Should Be Created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * All The Sales Must Be fetched Properly
   */
  it("Get All Sales",()=>{
    let response:Products;
    const fn=spyOn(service, 'getAllSales').and.returnValue(
     of(sales)
    );

    service.getAllSales().subscribe(response=>{
      expect(response).toEqual(sales);
    });

   expect(fn).toHaveBeenCalled();
  });


  });
