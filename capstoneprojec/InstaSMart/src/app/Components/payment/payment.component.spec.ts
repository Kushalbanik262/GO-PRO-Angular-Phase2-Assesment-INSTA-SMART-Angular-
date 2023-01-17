import { PurchaseService } from 'src/app/Services/Purchase.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Users, UserPriviledges } from './../../Entities/users';
import { LoginService } from 'src/app/Services/Login.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';

describe('Payment Component', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let mockToolBarService:any;
  let prodService:any;
  prodService =  jasmine.createSpyObj(['loadFromCart','addToPurchase']);
  mockToolBarService = jasmine.createSpyObj(['getId','getName','getCurrent','getPriviledge','addToPurchase']);
  let currentUser:Users;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({}),
        MaterialModuleModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers:[
        { provide: LoginService, useValue: mockToolBarService },
        {provide: PurchaseService, useValue: prodService}
      ]
    })
    .compileComponents();

    currentUser = {

        id:101,
        name:"Kushal Banik",
        username:"kushal",
        password:"kushal1234",
        priviledge:UserPriviledges.USER, //This is the Normal User With name Kushal Banik
        address:"Khardah,Kolkata",
        contact:"kushalbanik93@gmail.com",
        buy:[],
        card:[{
          id:102900147852,
          cvv:"078",
          name:"SIMPLY CLICK:State Bank Of India"
        }],
        locked:false
      };

    mockToolBarService.getCurrent.and.returnValue(currentUser);
    mockToolBarService.getName.and.returnValue("Kushal Banik");
    mockToolBarService.getId.and.returnValue(101);
    mockToolBarService.getPriviledge.and.returnValue(currentUser.priviledge);

    prodService.loadFromCart.and.returnValue(true);
    prodService.addToPurchase.and.returnValue(true);

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should Not Do payment Automatically",()=>{
    expect(component.DoPayment).toBeFalse();
  });

  it("Payment Should Be Done When The Payment Button is Clicked",()=>{
    component.LoadPayment = false;
    component.DoPayment = false;
    component.doPayment();
    fixture.detectChanges();
    expect(component.DoPayment).toBeTrue();
  })

});
