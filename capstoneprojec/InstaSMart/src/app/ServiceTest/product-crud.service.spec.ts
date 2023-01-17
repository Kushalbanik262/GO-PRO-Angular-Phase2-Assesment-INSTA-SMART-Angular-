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

  /**
   * Spec To Test Product CRUD Operations
   */
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      /**
       * Importing The necessary things
       */
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [ProductService]

    }).compileComponents();

  service=TestBed.get(ProductService); //Creating The service
  injector = getTestBed();
  httpMock = injector.get(HttpTestingController); //Creating The Mock HTTP Controller

  /**
   * Creating Two MOck Items For Testing
   */

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

  /**
   * 'Verify' Must Be called after each Testcase to close the previous HTTP Connection
   */
  afterEach(() => {
    httpMock.verify();
  });


  /**
   * The Component Should Be Created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * The Products Fetching Must Be successful
   */
  it("Get All Products ",()=>{
    let response:Products;
    const fn=spyOn(service, 'loadProducts').and.returnValue( //Mocking On the Service for 'loadProducts' method
     of(items)
    );

    service.loadProducts().subscribe(response=>{
      expect(response).toEqual(items);
    });

   expect(fn).toHaveBeenCalled(); //Expecting This hasbeen called
  });


  /**
   * Product Creation Must be done
   */
  it("Create Product",
  inject([HttpTestingController,ProductService],
    (httpMock:HttpTestingController,service:ProductService)=>{
      let item:Products ={ //This item Needs to Be created
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

/**
 * Updation Of The Product Must Be successfull
 */
it("Update Product",()=>{
  let item1:Products ={ //This Product Needs to Be Updated
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
  service.updateProduct(item1).subscribe(resp=>expect(resp).toEqual(item1)); //Expected This Product Is Updated
  const req = httpMock.expectOne(`${service.url}/${item1.id}`);
       expect(req.request.method).toBe('PUT');
       req.flush({item1});
    httpMock.verify();
});

/**
 * Testing For Product Deletion
 */
it("Delete Product",()=>{
 let pid:number = 111; //Product Needs To Be deleted With this id
  // service.saveProduct(item)
  service.deleteProduct(pid).subscribe(
    {
      next:(response)=>{console.log(response);}
    }
  )
  const req = httpMock.expectOne(`${service.url}/${pid}`); //Expecting This Url has been called Once
  expect(req.request.method).toBe('DELETE'); // The HTTP Method which is called Must Be delete
});



});
