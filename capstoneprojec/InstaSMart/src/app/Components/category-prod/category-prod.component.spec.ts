import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProdComponent } from './category-prod.component';

describe('CategoryProdComponent', () => {
  let component: CategoryProdComponent;
  let fixture: ComponentFixture<CategoryProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
