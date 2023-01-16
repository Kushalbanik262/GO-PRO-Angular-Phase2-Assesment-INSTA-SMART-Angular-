import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AdminPRComponent } from './admin-pr.component';

xdescribe('Add Product Form By The Admin', () => {
  let component: AdminPRComponent;
  let fixture: ComponentFixture<AdminPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPRComponent ],
      imports:[
        MaterialModuleModule,
        AppSharedModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        provideMockStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create The Component', () => {
    expect(component).toBeTruthy();
  });

  it("The Form Must Be There",()=>{
    expect(component.frm).toBeTruthy();
  });

  it("Initially Form Must Be Invalid",()=>{
    expect(component.frm.valid).toBeFalse();
  });

  it("Checking The Validity Of The Form",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeTrue();
  });

  it("Checking The Name Validity Without Letters",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap 1234",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });


  it("Checking With Negative Price",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"-300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });



  it("Checking With Price More than 100000",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"2000000"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });


  it("Checking Name with Lessthan two keywords",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"D",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });


  it("Checking FeedBack With More Than 100 Words",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product.This article provides free, ready-to-use feedback form templates in Microsoft Excel and PDF formats, so you can gather information about your company, processes, products, or employees. Learn what questions to include and how to effectively craft feedback forms to get the answers you need to improve your company’s efficiency.",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });

  it("Checking Details More Than 100 words",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap.This article provides free, ready-to-use feedback form templates in Microsoft Excel and PDF formats, so you can gather information about your company, processes, products, or employees. Learn what questions to include and how to effectively craft feedback forms to get the answers you need to improve your company’s efficiency.",
      feedback:"This is Also Our Best Selling Product.",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });

  it("Checking Button is disabled when the Form is Invalid",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"D",
      price:"300"
    })

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#add").disabled).toBeTrue();
  });


  it("Checking Button is not disabled when the Form is Valid",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#add").disabled).toBeFalse();
  });

  it("Checking Button is Update when Editable Option Is On",()=>{
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    component.isEdit = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#add")).toBeNull();
    expect(fixture.nativeElement.querySelector("#update")).toBeTruthy();
  });


});
