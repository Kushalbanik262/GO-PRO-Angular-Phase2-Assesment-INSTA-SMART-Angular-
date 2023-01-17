import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { productCat, Products } from './../Entities/products';
import { HttpClientModule } from '@angular/common/http';
import { CartEffects } from '../ReduxModules/CartRedux/cart.effects';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from './../ReduxModules/CartRedux/cart.reducer';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../Modules/material-module/material-module.module';
import { StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { CartService } from '../Services/Cart.service';
import { AppSharedModule } from '../Modules/app-shared/app-shared.module';

/**
 * Testing Spec For Cart Service
 */

describe('Cart Service For Adding and Deleting The Cart', () => {
  let service: CartService;
  let injector: TestBed;
  /**
   * Creating Two Dummy Products
   */

  let product1:Products = {
    id:101,
    category:productCat.Daily,
    details:"Soap For daily Usage",
    feedback:"Good For skin",
    image:["../soap"],
    name:"Dove Soap",
    price:300,
    ratings:3.7,
    reviews:[]
  };


  let product2:Products = {
    id:102,
    category:productCat.Daily,
    details:"Best Headphone in the market",
    feedback:"Best noise cancellation",
    image:["../headphone"],
    name:"Soat Headphones",
    price:2100,
    ratings:4.5,
    reviews:[]
  };
  beforeEach(async() => {

    /**
     * Importing All The Necessary Modules Needed for Testing
     */
    await TestBed.configureTestingModule({
      imports: [
        MaterialModuleModule,
        AppSharedModule,
        RouterModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature("carts",cartReducer),
        EffectsModule.forFeature([CartEffects]),
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [CartService]

    }).compileComponents();

   service= TestBed.inject(CartService) //Injecting The Service Through TestBed
  });

  /**
   * The Component Should Be created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  /**
   * Adding Product To The Cart Then Cart Must Be Increased
   */
  it("Adding to the cart Should Be Cart Increased",()=>{

    let sz:number = 0;
    service.addCurrentCart(product1);
    sz++;
    expect(service.allCarts.length).toBe(sz);
  });


  /**
   * Adding Same Product Will Not Increase Cart Count Will Increase Frequency Count
   */
  it("Adding Same Value to The cart",async()=>{
    let sz:number = 0;
    service.addCurrentCart(product1);
    sz++;
    expect(service.allCarts.length).toBe(sz);
    service.addCurrentCart(product1);
    expect(service.allCarts.length).toBe(sz);
  });

  /**
   * Adding Different Product Will  Increase Cart Count
   */
  it("Adding Different  Value to The cart",async()=>{
    let sz:number = 0;
    service.addCurrentCart(product1);
    sz++;
    expect(service.allCarts.length).toBe(sz);
    service.addCurrentCart(product2);
    sz++;
    expect(service.allCarts.length).toBe(sz);
  });

})
