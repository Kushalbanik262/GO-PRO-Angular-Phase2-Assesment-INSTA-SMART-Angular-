import { of } from 'rxjs';
import { productCat, Products } from './../Entities/products';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject,getTestBed } from '@angular/core/testing';
import { ProductService } from '../Services/Products.service';




describe('ProductCrudService', () => {
  let service: ProductService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let items:Products[];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [ProductService]

    }).compileComponents();

  service=TestBed.get(ProductService);
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController);


   items =[{
    id:111,
    name:"soap",
    category:productCat.Daily,
    price:180,
    image:["../soap.jpg"],
    reviews:[],
    details:"Dove Soap",
    feedback:"Best Selling Product",
    ratings:2.3
   },
   {
     id:111,
     name:"Head Phones",
     category:productCat.Daily,
     price:180,
     image:["../headphones.jpg"],
     reviews:[],
     details:"Soat Headphones",
     feedback:"Value For Money",
     ratings:2.3
    }];
  });

  afterEach(() => {
    console.log("After Each Called");
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Get All Products ",()=>{
    let response:Products;
    const fn=spyOn(service, 'loadProducts').and.returnValue(
     of(items)
    );

    service.loadProducts().subscribe(response=>{
      expect(response).toEqual(items);
    });

   expect(fn).toHaveBeenCalled();
  });


  it("Create Product",
  inject([HttpTestingController,ProductService],
    (httpMock:HttpTestingController,service:ProductService)=>{
      let item:Products ={
        id:111,
        name:"soap",
        category:productCat.Daily,
        price:180,
        image:["../soap.jpg"],
        reviews:[],
        details:"Dove Soap",
        feedback:"Best Selling Product",
        ratings:2.3
       };

      let sz:number = service.getProducts().length; //Length of the array
      service.saveProduct(item).subscribe(resp=>{;expect(resp).toBe(item)});

      const mock = httpMock.expectOne(service.url);
      expect(mock.cancelled).toBeFalsy();
      expect(mock.request.method).toEqual('POST'); //Method testing
      mock.flush(item);
      expect(service.getProducts().length).toBe(sz+1); //Checking if the method got successful or not
      httpMock.verify();
    })
);


it("Update Product",()=>{
  let item1:Products ={
    id:111,
    name:"soap",
    category:productCat.Daily,
    price:180,
    image:["../soap.jpg"],
    reviews:[],
    details:"Dove Soap",
    feedback:"Best Selling Product",
    ratings:2.3
   };
  // service.saveProduct(item)
  service.updateProduct(item1).subscribe(resp=>expect(resp).toEqual(item1));
  const req = httpMock.expectOne(`${service.url}/${item1.id}`);
       expect(req.request.method).toBe('PUT');
       req.flush({item1});
    httpMock.verify();
});

it("Delete Product",()=>{
 let pid:number = 111;
  // service.saveProduct(item)
  service.deleteProduct(pid).subscribe(
    {
      next:(response)=>{console.log(response);}
    }
  )
  const req = httpMock.expectOne(`${service.url}/${pid}`);
  expect(req.request.method).toBe('DELETE');
});





});
