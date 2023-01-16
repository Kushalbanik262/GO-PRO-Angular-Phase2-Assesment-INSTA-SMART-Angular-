import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('Contact US Form', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ],
      imports:[
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModuleModule,
        AppSharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        HttpClientModule
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("The Form Must Be Initialized",()=>{
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.frm).toBeTruthy();
  });

  it("Testing Form Validation with all the Valid Fields",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal",
      lastName:"Banik",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeTruthy();
  });

  it("Testing Form Validation with name InValid Fields",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal14",
      lastName:"Banik74",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();
  });



  it("Testing Form Validation with phn with charecters",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal14",
      lastName:"Banik74",
      address:"Kolkata",
      phn:"7980859rf3",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();
  });



  it("Testing Form Validation with phone InValid Field",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal",
      lastName:"Banik",
      address:"Kolkata",
      phn:"798085930",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();
  });

  it("Testing Form Validation with all InValid Fields",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal%7",
      lastName:"Badnik",
      address:"Kolkata#$",
      phn:"7980859##$30",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();
  });

  it("Button Should Be Disabled When the form is Invalid",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal47",
      lastName:"Banik",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#btn").disabled).toBeTruthy();
  });

  it("Button Should Be Enabled When the form is Valid",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal",
      lastName:"Banik",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#btn").disabled).toBeFalsy();
  });




  it("Checking All The Required Fields To Be True",()=>{
    fixture.detectChanges();

    component.frm.setValue({
      firstname:"Kushal",
      lastName:"Banik",
      address:"Kolkata",
      phn:"",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();

    component.frm.setValue({
      firstname:"Kushal",
      lastName:"",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:"Fresh Mart"
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();


    component.frm.setValue({
      firstname:"Kushal",
      lastName:"",
      address:"Kolkata",
      phn:"7980859303",
      comments:"All Services Are Good!",
      store:""
    });

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalsy();
  });


});






