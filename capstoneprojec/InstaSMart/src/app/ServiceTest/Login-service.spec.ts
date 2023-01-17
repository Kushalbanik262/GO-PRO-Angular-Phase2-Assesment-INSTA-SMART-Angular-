import { RouterTestingModule } from '@angular/router/testing';
import { Users, UserPriviledges } from './../Entities/users';
import { LoginService } from 'src/app/Services/Login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { productCat, Products } from './../Entities/products';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../Modules/material-module/material-module.module';
import { StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { CartService } from '../Services/Cart.service';
import { AppSharedModule } from '../Modules/app-shared/app-shared.module';

/**
 * Spec For Login Service
 */

describe('Login Service', () => {
  let service: LoginService;
  let currentUser:Users;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      /**
       * Importing All The Needed Items
       */
      imports: [
        MaterialModuleModule,
        AppSharedModule,
        RouterModule,
        StoreModule.forRoot({}),
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModuleModule
      ],
      providers: [CartService]

    }).compileComponents();

   service= TestBed.inject(LoginService); //Creating The Service By Injection

   /**
    * Creating a user for testing
    */
   currentUser = {
    id:101,
    address:"Kolkata",
    buy:[],
    card:[
      {
        cvv:"003",
        id:7489,
        name:"SBI CLICK"
      }
    ],
    contact:"kushalbanik@gmail.com",
    locked:false,
    name:"Kushal Banik",
    password:"xyz1234",
    priviledge:UserPriviledges.USER,
    username:"kushalbanik"
   }

  });

  /**
   * Should create the service
   */
  it("Should Create",()=>{
    expect(service).toBeTruthy();
  });

  /**
   * Auto Logged In Must Not be activated
   */
  it("Initially Should Not Logged In",()=>{
    expect(service.IsLoggedIn()).toBeFalse();
  });

  /**
   * If The User Is Logged In Successfully There Must Be Valid User
   */
  it("Logged In Must Have a valid User",()=>{
    service.isLoggedIn = true;
    service.currentUser = currentUser;
    expect(service.IsLoggedIn()).toBeTrue();
    expect(service.currentUser).toEqual(currentUser);
  });


  /**
   * After Logged Out Successfully The LoggedIn User Must be demolished
   */
  it("After Logout Current User Must Be Demolished",()=>{
    service.isLoggedIn = true;
    service.currentUser = currentUser;
    service.logout();
    expect(service.currentUser.name).toEqual("-1");
  });

})
