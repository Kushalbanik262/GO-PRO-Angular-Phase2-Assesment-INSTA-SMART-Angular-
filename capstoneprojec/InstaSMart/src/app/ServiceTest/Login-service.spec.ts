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



describe('Login Service', () => {
  let service: LoginService;
  let injector: TestBed;
  let currentUser:Users;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
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

   service= TestBed.inject(LoginService);
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

  it("Should Create",()=>{
    expect(service).toBeTruthy();
  });

  it("Initially Should Not Logged In",()=>{
    expect(service.IsLoggedIn()).toBeFalse();
  });

  it("Logged In Must Have a valid User",()=>{
    service.isLoggedIn = true;
    service.currentUser = currentUser;
    expect(service.IsLoggedIn()).toBeTrue();
    expect(service.currentUser).toEqual(currentUser);
  });

  it("After Logout Current User Must Be Demolished",()=>{
    service.isLoggedIn = true;
    service.currentUser = currentUser;
    service.logout();
    expect(service.currentUser.name).toEqual("-1");
  });

})
