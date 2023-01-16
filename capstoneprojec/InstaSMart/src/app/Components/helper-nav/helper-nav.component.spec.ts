import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperNavComponent } from './helper-nav.component';
import { LoginService } from 'src/app/Services/Login.service';

xdescribe('Cart View Navbar Component', () => {
  let component: HelperNavComponent;
  let fixture: ComponentFixture<HelperNavComponent>;
  let mockToolBarService:any;
  let routerSpy:any;
  beforeEach(async () => {
    mockToolBarService = jasmine.createSpyObj(['IsLoggedIn','getName','logout','getPriviledge']);
    routerSpy = {navigate: jasmine.createSpy('navigate')};

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Must Be Invisible When User is not Logged in",()=>{
    mockToolBarService.IsLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#helperNav")).toBeNull();
  });

  it("Must Be Visible When User is Logged in",()=>{
    mockToolBarService.IsLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("#helperNav")).toBeTruthy();
  });




});
