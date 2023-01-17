import { LoginService } from 'src/app/Services/Login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
/**
 * Testing The Login Component With Login Related Things
 */
describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockToolBarService:any;

  beforeEach(async () => {
    /**
     * Mocking The Login Service For The Login Method
     */
    mockToolBarService = jasmine.createSpyObj(['login']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        HttpClientModule,
        MaterialModuleModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers:[
        { provide: LoginService, useValue: mockToolBarService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { //Should Be Created
    expect(component).toBeTruthy();
  });


  it("Should Not Login Automatically",()=>{ //It Should Not Login Automatically
    expect(component.loginFlag).toBeFalsy();
  })

  it("Should Login When The Method Is called",()=>{ //It Should Login After it is Called
    component.tryLogin({
      username:"kushalbanik",
      password:"kushal1234"
    });
    expect(component.loginFlag).toBeTrue();
  });

});
