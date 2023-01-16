import { Cart } from 'src/app/Entities/cart';
import { CartCrudService } from './../Services/CartCrud.service';
import { of } from 'rxjs';
import { productCat, Products } from './../Entities/products';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject,getTestBed } from '@angular/core/testing';




xdescribe('Cart Crud Service', () => {
  let service: CartCrudService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
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

  service=TestBed.get(CartCrudService);
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController);


   carts =[
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

  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });

  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Get All Current Carts",()=>{
    let response:Products;
    const fn=spyOn(service, 'getCart').and.returnValue(
     of(carts)
    );

    service.getCart().subscribe(response=>{
      expect(response).toEqual(carts);
    });

   expect(fn).toHaveBeenCalled();
  });

  it("Create Cart Here",
  inject([HttpTestingController,CartCrudService],
    (httpMock:HttpTestingController,service:CartCrudService)=>{
      let item:Cart ={
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


  it("Update Cart Item",()=>{
    let item1:Cart ={
      id:101,
      quantity:2,
      updated:new Date().toLocaleTimeString()
     };
    // service.saveProduct(item)
    service.updateCart(item1).subscribe(resp=>expect(resp).toEqual(item1));
    const req = httpMock.expectOne(`${service.url}/${item1.id}`);
         expect(req.request.method).toBe('PUT');
         req.flush({item1});
      httpMock.verify();
  });


  it("Delete Cart",()=>{
    let pid:number = 111;
     // service.saveProduct(item)
     service.deleteCart(pid).subscribe(
       {
         next:(response)=>{console.log(response);}
       }
     )
     const req = httpMock.expectOne(`${service.url}/${pid}`);
     expect(req.request.method).toBe('DELETE');
   });

});
