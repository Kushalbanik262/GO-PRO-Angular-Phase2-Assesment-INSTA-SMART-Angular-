import { Cart } from 'src/app/Entities/cart';
import { CartCrudService } from './../Services/CartCrud.service';
import { of } from 'rxjs';
import { productCat, Products } from './../Entities/products';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject,getTestBed } from '@angular/core/testing';

/**
 * Testing Crud Operations Of Cart Service
 */


describe('Cart Crud Service', () => {
  let service: CartCrudService;
  let injector: TestBed;
  let httpMock: HttpTestingController; //Using Http Testing Controller
  let carts:Cart[];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [CartCrudService]

    }).compileComponents();

  service=TestBed.get(CartCrudService); //Creating The Service
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController); //Getting The mock


   carts =[ //Creating Some Carts
    {
      id:101,
      quantity:1,
      updated:new Date().toLocaleTimeString()
    },
    {
      id:102,
      quantity:2,
      updated:new Date().toLocaleTimeString()
    }
   ];

  });

  afterEach(() => { //Verify Must be Called After each test to close the http connection for testing
    console.log("After Each Called");
    httpMock.verify();
  });



  /**
   * The Component Should Be Created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Getting All The Datas From Current Cart
   */
  it("Get All Current Carts",()=>{
    let response:Products;
    const fn=spyOn(service, 'getCart').and.returnValue( //Spying On The service For getCart Method
     of(carts)
    );

    service.getCart().subscribe(response=>{
      expect(response).toEqual(carts); //Checking If Response is expected to our carts or not
    });

   expect(fn).toHaveBeenCalled();
  });

  /**
   * Testing For Cart Creation
   */
  it("Create Cart Here",
  inject([HttpTestingController,CartCrudService],
    (httpMock:HttpTestingController,service:CartCrudService)=>{
      let item:Cart ={ //This Cart We want to create
        id:101,
        quantity:1,
        updated:new Date().toLocaleTimeString()
       };

      let sz:number = service.getCarts().length; //Length of the array
      service.saveCart(item).subscribe(resp=>{;expect(resp).toBe(item)});

      const mock = httpMock.expectOne(service.url);
      expect(mock.cancelled).toBeFalsy();
      expect(mock.request.method).toEqual('POST'); //Method testing
      mock.flush(item);
      expect(service.getCarts().length).toBe(sz+1); //Checking if the method got successful or not
      httpMock.verify();
    })
  );

  /**
   * Updating The cart
   */
  it("Update Cart Item",()=>{
    let item1:Cart ={//The cart which is need to be Updated
      id:101,
      quantity:2,
      updated:new Date().toLocaleTimeString()
     };

    service.updateCart(item1).subscribe(resp=>expect(resp).toEqual(item1)); //Expecting The Updation Of cart is Successful
    const req = httpMock.expectOne(`${service.url}/${item1.id}`);
         expect(req.request.method).toBe('PUT'); //The Called Method Must Be PUT for Updation
         req.flush({item1});
      httpMock.verify();
  });


  /**
   * Deleting The Cart
   */
  it("Delete Cart",()=>{
    let pid:number = 111; //Cart Needs to Be deleted with this Id
     service.deleteCart(pid).subscribe(
       {
         next:(response)=>{console.log(response);}
       }
     )
     const req = httpMock.expectOne(`${service.url}/${pid}`); //checking if this url is called once or not
     expect(req.request.method).toBe('DELETE'); //The HTTP method Name must be DELETE
   });

});
