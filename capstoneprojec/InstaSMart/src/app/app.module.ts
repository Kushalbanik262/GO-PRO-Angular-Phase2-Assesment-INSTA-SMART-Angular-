import { InMemoryWebApi } from './InMemoryWebAPi/InMemoryAPI';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from './Modules/app-shared/app-shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './Modules/material-module/material-module.module';
import { AboutUSComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import {HttpClientModule} from "@angular/common/http"
import { AppEffects } from './AppEffects';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutUSComponent,
    ContactUsComponent,
    NotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    AppSharedModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApi),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
