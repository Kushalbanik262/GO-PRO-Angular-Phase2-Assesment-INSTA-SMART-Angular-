import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AdminPRComponent } from './admin-pr.component';

describe('Add Product Form By The Admin', () => {
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

  it('should create The Component', () => { // The component Must Be Created
    expect(component).toBeTruthy();
  });

  it("The Form Must Be There",()=>{ //The Form Must be Rendered
    expect(component.frm).toBeTruthy();
  });

  it("Initially Form Must Be Invalid",()=>{ //After Loading The the form must be Invalid
    expect(component.frm.valid).toBeFalse();
  });

  it("Checking The Validity Of The Form",()=>{//The Form Must Be Valid is Every Entered Data is According to The Business Logic
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

  it("Checking The Name Validity Without Letters",()=>{//Form Must Be Invalid If Name is not according to the business logic
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap 1234",//Numbers given in the name
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });


  it("Checking With Negative Price",()=>{ //Form Must Be Invalid If Price is not according to the business logic
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"-300"//price is nagative here
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });



  it("Checking With Price More than 100000",()=>{  //Form Must Be Invalid If Price is not according to the business logic
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      details:"Auyrvedic Soap",
      feedback:"This is Also Our Best Selling Product",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"2000000"//price is greater than 100000
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });


  it("Checking Name with Less than two keywords",()=>{  //Form Must Be Invalid If Name is not according to the business logic
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


  it("Checking FeedBack With More Than 100 Words",()=>{ //Form Must Be Invalid If Feedback is not according to the business logic
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

  it("Checking Details More Than 100 words",()=>{  //Form Must Be Invalid If Details is not according to the business logic
    fixture.detectChanges();
    component.frm.setValue({
      id:"101",
      category:"DAILY",
      //details more than 100 words
      details:"Auyrvedic Soap.This article provides free, ready-to-use feedback form templates in Microsoft Excel and PDF formats, so you can gather information about your company, processes, products, or employees. Learn what questions to include and how to effectively craft feedback forms to get the answers you need to improve your company’s efficiency.",
      feedback:"This is Also Our Best Selling Product.",
      image:"../dove.jpg",
      name:"Dove Soap",
      price:"300"
    })

    fixture.detectChanges();
    expect(component.frm.valid).toBeFalse();
  });

  it("Checking Button is disabled when the Form is Invalid",()=>{  //Checking Add/Update is disbled or not when the form is Invalid
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


  it("Checking Button is not disabled when the Form is Valid",()=>{//Checking Add/Update is enabled or not when the form is valid
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

  it("Checking Button is Update when Editable Option Is On",()=>{ //Checking Form is Rendering which option when user wants to update data
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
