import { productCat, Products } from './../../Entities/products';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from 'src/app/ReduxModules/CartRedux/cart.effects';
import { cartReducer } from './../../ReduxModules/CartRedux/cart.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { CartService } from 'src/app/Services/Cart.service';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {RouterModule} from "@angular/router"
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMap, ShowCartComponent } from './show-cart.component';

describe('ShowCartComponent', () => {
  let component: ShowCartComponent;
  let fixture: ComponentFixture<ShowCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCartComponent ],
      imports:[
        RouterTestingModule,
        RouterModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature("carts",cartReducer),
        EffectsModule.forFeature([CartEffects]),
        MaterialModuleModule,
        AppSharedModule,
        HttpClientModule
      ],
      providers:[CartService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Button Must Be Disabled If there is not Items in cart",()=>{
    expect(fixture.nativeElement.querySelector("#chkout").disabled).toBeTrue();
  });

  it("Button Must Be Enabled If There Are Atleast one item in the cart",()=>{
    let current = Object.assign([],component.allCarts);
     current.push(
      {
        id:101,
        quantity:1,
        updated:new Date().toLocaleTimeString()
      }
    );

    component.allCarts = current;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#chkout").disabled).toBeFalse();
  });

  it("Must Increase When The '+' Button is Clicked",()=>{
    let currentCart = Object.assign([],component.allCarts);
     currentCart.push(
      {
        id:101,
        quantity:1,
        updated:new Date().toLocaleTimeString()
      }
    );
    component.allCarts = currentCart;


    let cart = component.increase({
      product:{
         id:101,
          category:productCat.Daily,
          details:"FaceWash for Achne",
          feedback:"Really Good And Mostorizes Skin",
          image:["../nivea"],
          name:"Nivea Face Wash",
          price:600,
          ratings:3.4,
          reviews:[]
      },
      quantity:1,
      updated:new Date().toLocaleTimeString()
    });

   expect(cart.quantity).toBe(2);
  });

  it("Must Decrease When The '-' Button is Clicked",()=>{
    let currentCart = Object.assign([],component.allCarts);
     currentCart.push(
      {
        id:101,
        quantity:2,
        updated:new Date().toLocaleTimeString()
      }
    );
    component.allCarts = currentCart;


    let cart = component.decrease({
      product:{
         id:101,
          category:productCat.Daily,
          details:"FaceWash for Achne",
          feedback:"Really Good And Mostorizes Skin",
          image:["../nivea"],
          name:"Nivea Face Wash",
          price:600,
          ratings:3.4,
          reviews:[]
      },
      quantity:1,
      updated:new Date().toLocaleTimeString()
    });

   expect(cart.quantity).toBe(1);
  });

});
