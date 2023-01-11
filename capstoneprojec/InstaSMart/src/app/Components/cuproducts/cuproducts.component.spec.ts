import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUProductsComponent } from './cuproducts.component';

describe('CUProductsComponent', () => {
  let component: CUProductsComponent;
  let fixture: ComponentFixture<CUProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CUProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
