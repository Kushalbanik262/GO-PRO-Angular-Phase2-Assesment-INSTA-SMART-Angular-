import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { SalesEffect } from './../../ReduxModules/SalesRedux/sales.effects';
import { CartEffects } from 'src/app/ReduxModules/CartRedux/cart.effects';
import { ProductEffects } from './../../ReduxModules/ProductRedux/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { SalesReducer } from '../../ReduxModules/SalesRedux/sales.reducer';
import { cartReducer } from './../../ReduxModules/CartRedux/cart.reducer';
import { ProductReducer } from './../../ReduxModules/ProductRedux/product.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { LoginService } from 'src/app/Services/Login.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockToolBarService:any;


  beforeEach(async () => {
    mockToolBarService = jasmine.createSpyObj(['IsLoggedIn','getName','logout']);


    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports:[
    HttpClientModule,
    MaterialModuleModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("products",ProductReducer),
    StoreModule.forFeature("carts",cartReducer),
    StoreModule.forFeature("sales",SalesReducer),
    EffectsModule.forFeature([ProductEffects,CartEffects,SalesEffect]),
    AppSharedModule,
    ReactiveFormsModule,
    RouterTestingModule
      ],
      providers:[
        { provide: LoginService, useValue: mockToolBarService }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should Be disabled When User Is not Logged In",()=>{
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    mockToolBarService.IsLoggedIn.and.returnValue(false);
    mockToolBarService.getName.and.returnValue("");
    mockToolBarService.logout.and.returnValue(true);
    fixture.detectChanges();
    expect(component.isLoggedIn()).toBeFalse();
    expect(fixture.debugElement.nativeElement.querySelector("#login")).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector("#logout")).toBeFalsy();
  });



  it("Should Be Enabled When User Is Logged In",()=>{
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    mockToolBarService.IsLoggedIn.and.returnValue(true);
    mockToolBarService.getName.and.returnValue("Kushal");
    mockToolBarService.logout.and.returnValue(true);
    fixture.detectChanges();
    expect(component.isLoggedIn()).toBeTrue();
    expect(fixture.debugElement.nativeElement.querySelector("#logout")).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector("#login")).toBeFalsy();
  });

  it("Should Be The The Name Displayed When Logged in",()=>{
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    mockToolBarService.IsLoggedIn.and.returnValue(true);
    mockToolBarService.getName.and.returnValue("Kushal");
    mockToolBarService.logout.and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#loginName").textContent).toContain("KUSHAL");
  });

  // it("Should Logout When User Press On Logout",()=>{
  //   fixture = TestBed.createComponent(NavBarComponent);
  //   component = fixture.componentInstance;
  //   mockToolBarService.IsLoggedIn.and.returnValue(true);
  //   mockToolBarService.getName.and.returnValue("Kushal");
  //   mockToolBarService.logout.and.returnValue(true);
  //   fixture.detectChanges();
  //   expect(component.logout()).toBeTruthy();
  // })
});
