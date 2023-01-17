

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from './Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './Modules/material-module/material-module.module';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryWebApi } from './InMemoryWebAPi/InMemoryAPI';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './AppEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/**
 * The Main App Module
 */
@NgModule({
  declarations: [
    AppComponent, //Main App Component
    NavBarComponent, //The Main Navbar
    AboutUSComponent, //AboutUs component
    ContactUsComponent, //Contact Us Component
    NotFoundComponent, //The 404 Not Found Page
    AccessDeniedComponent //For the Specific Access Denied Page
  ],
  //**Things We are importing */
  imports: [
    BrowserModule,//The Browser Module
    AppRoutingModule, //The Main Router Module
    BrowserAnimationsModule, //Browser Animation Module Here
    MaterialModuleModule, //The Specific Module For Importing all the Material UI related Components
    AppSharedModule,//This is a custom Shared Module Which Shares The Data To other Modules
    FormsModule,//For Template Driven Forms
    ReactiveFormsModule,//For Reactive Forms

    /*
     * Setting The Redux (NGRX) Features For The Root Part
     */
    StoreModule.forRoot({}),// Setting The Store Root
    EffectsModule.forRoot([AppEffects]),//This is the Effects Module With Root configration
    StoreDevtoolsModule.instrument(),//Setting The Redux Devtools Configuration

    /*
     *The Http Service Configuration
     */
    HttpClientModule, //The main Client Module
    HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApi),//As We are using in memory web api we are using this
    //and this 'InMemoryWebApi' is the speccific class which implements the 'InMemoryDbService' interface and the service is coming from that
  ],
  providers: [],
  bootstrap: [AppComponent]//BootStraping The AppComponent as Entryb Point
})
export class AppModule { }
