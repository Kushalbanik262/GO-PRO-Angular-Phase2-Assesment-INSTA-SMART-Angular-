import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './../../Modules/app-shared/app-shared.module';
import { MaterialModuleModule } from './../../Modules/material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

xdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({}),
        MaterialModuleModule,
        HttpClientModule,
        AppSharedModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
