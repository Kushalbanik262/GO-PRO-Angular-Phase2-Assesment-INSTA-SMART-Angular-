import { UserPriviledges } from './../../Entities/users';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperNavComponent } from './helper-nav.component';
import { LoginService } from 'src/app/Services/Login.service';

describe('Cart View Helper Navbar Component', () => {
  let component: HelperNavComponent;
  let fixture: ComponentFixture<HelperNavComponent>;
  let mockToolBarService:any;
  beforeEach(async () => {
    mockToolBarService = jasmine.createSpyObj(['IsLoggedIn','getName','logout','getPriviledge']);

    await TestBed.configureTestingModule({
      declarations: [ HelperNavComponent ],
      imports:[
        MaterialModuleModule,
        AppSharedModule,
        RouterModule,
        HttpClientModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        provideMockStore({}),
        { provide: LoginService, useValue: mockToolBarService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {//The Helper Nav Component Should be created
    expect(component).toBeTruthy();
  });


  it("Must Be Invisible When User is not Logged in",()=>{ //This Navbar must be hidden when The User is not logged in
    mockToolBarService.IsLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#helperNav")).toBeNull();
  });

  it("Must Be Visible When User is Logged in",()=>{ //This Navbar Must be visible when the user is logged in
    mockToolBarService.IsLoggedIn.and.returnValue(true);
    mockToolBarService.getPriviledge.and.returnValue(UserPriviledges.USER);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#helperNav")).toBeTruthy();
  });




});
