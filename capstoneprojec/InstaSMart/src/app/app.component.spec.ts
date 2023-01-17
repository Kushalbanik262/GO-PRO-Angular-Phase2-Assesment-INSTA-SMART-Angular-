import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from './Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './Modules/material-module/material-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';


/**
 * The Main Spec File Of Main
 *
 */

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
        BrowserModule,//The Browser Module
        AppRoutingModule, //The Main Router Module
        BrowserAnimationsModule, //Browser Animation Module Here
        MaterialModuleModule, //The Specific Module For Importing all the Material UI related Components
        AppSharedModule,//This is a custom Shared Module Which Shares The Data To other Modules
        FormsModule,//For Template Driven Forms
        ReactiveFormsModule,//For Reactive Forms
      ],
      declarations: [
        AppComponent,
        AppComponent, //Main App Component
        NavBarComponent, //The Main Navbar
        AboutUSComponent, //AboutUs component
        ContactUsComponent, //Contact Us Component
        NotFoundComponent, //The 404 Not Found Page
        AccessDeniedComponent //For the Specific Access Denied Page
      ],

    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
